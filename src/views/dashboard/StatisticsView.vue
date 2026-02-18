<template>
  <div class="statistics-view">
    <!-- خلفية فضائية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <!-- الهيدر -->
    <div class="page-header">
      <div class="header-content">
        <i class="fas fa-chart-line header-icon"></i>
        <div>
          <h1>الإحصائيات</h1>
          <p>تحليلات ومؤشرات أداء الفريق</p>
        </div>
      </div>
      
      <div class="header-actions">
        <select v-model="selectedSection" @change="filterBySection" class="section-filter">
          <option value="all">كل الأقسام</option>
          <option v-for="section in sections" :key="section.id" :value="section.id">
            {{ section.name }}
          </option>
        </select>
        
        <button class="btn-secondary" @click="refreshData" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          تحديث
        </button>
      </div>
    </div>

    <!-- تحميل -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل الإحصائيات...</p>
    </div>

    <div v-else class="statistics-content">
      <!-- بطاقات الإحصائيات الرئيسية -->
      <div class="stats-grid">
        <div class="stat-card total">
          <div class="stat-icon">
            <i class="fas fa-tasks"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.total_tasks || 0 }}</span>
            <span class="stat-label">إجمالي المهام</span>
          </div>
        </div>

        <div class="stat-card completed">
          <div class="stat-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.completed_tasks || 0 }}</span>
            <span class="stat-label">مهام مكتملة</span>
          </div>
        </div>

        <div class="stat-card in-progress">
          <div class="stat-icon">
            <i class="fas fa-spinner"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.in_progress_tasks || 0 }}</span>
            <span class="stat-label">قيد التنفيذ</span>
          </div>
        </div>

        <div class="stat-card pending">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.pending_tasks || 0 }}</span>
            <span class="stat-label">مهام معلقة</span>
          </div>
        </div>

        <div class="stat-card overdue">
          <div class="stat-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.overdue_tasks || 0 }}</span>
            <span class="stat-label">مهام متأخرة</span>
          </div>
        </div>

        <div class="stat-card members">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-details">
            <span class="stat-value">{{ stats.total_members || 0 }}</span>
            <span class="stat-label">إجمالي الأعضاء</span>
          </div>
        </div>
      </div>

      <!-- قسم التصحيح - هيظهر البيانات الخام -->
      <div class="debug-section" v-if="showDebug">
        <h4>معلومات التصحيح:</h4>
        <p>عدد المهام الكلي: {{ allTasks.length }}</p>
        <p>عدد المستخدمين: {{ allMembers.length }}</p>
        <p>المهام بدون assigned_to: {{ tasksWithoutAssignee.length }}</p>
        <p>المهام مع assigned_to: {{ tasksWithAssignee.length }}</p>
        <div v-if="tasksWithAssignee.length > 0">
          <p>أول مهمة: {{ JSON.stringify(tasksWithAssignee[0]) }}</p>
        </div>
      </div>

      <!-- 1. رسم بياني دائري لتوزيع المهام -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>توزيع المهام</h3>
        </div>
        <div class="pie-chart-container">
          <div class="pie-chart" :style="pieChartStyle">
            <div class="pie-center">
              <span>{{ stats.total_tasks || 0 }}</span>
              <small>إجمالي</small>
            </div>
          </div>
          <div class="pie-legend">
            <div class="legend-item">
              <span class="color-dot" style="background: #10b981;"></span>
              <span>مكتملة ({{ stats.completed_tasks }})</span>
            </div>
            <div class="legend-item">
              <span class="color-dot" style="background: #3b82f6;"></span>
              <span>قيد التنفيذ ({{ stats.in_progress_tasks }})</span>
            </div>
            <div class="legend-item">
              <span class="color-dot" style="background: #f59e0b;"></span>
              <span>معلقة ({{ stats.pending_tasks }})</span>
            </div>
            <div class="legend-item">
              <span class="color-dot" style="background: #ef4444;"></span>
              <span>متأخرة ({{ stats.overdue_tasks }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. رسم بياني أعمدة لأداء الأعضاء -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>أداء الأعضاء</h3>
          <span class="badge">{{ memberStats.length }} عضو لديهم مهام</span>
        </div>
        
        <div v-if="memberStats.length > 0" class="bars-chart">
          <div v-for="(member, index) in memberStats" :key="member.id" class="bar-item">
            <div class="bar-label">
              <div class="member-avatar-mini" :style="{ backgroundColor: getAvatarColor(member.name) }">
                {{ getUserInitials(member.name) }}
              </div>
              <span class="member-name">{{ member.name }}</span>
            </div>
            <div class="bar-wrapper">
              <div class="bar-fill" 
                   :style="{ 
                     width: (member.total_tasks / maxTasks * 100) + '%',
                     backgroundColor: getBarColor(index)
                   }">
                <span class="bar-value">{{ member.total_tasks }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-message">
          <i class="fas fa-chart-bar"></i>
          <p>لا يوجد أعضاء لديهم مهام في هذا القسم</p>
          <p class="small-text">تأكد من أن المهام لها assigned_to</p>
          <button @click="showDebug = !showDebug" class="debug-btn">عرض معلومات التصحيح</button>
        </div>
      </div>

      <!-- 3. قائمة بكل المهام (للتأكد) -->
      <div class="tasks-list" v-if="showDebug">
        <h4>قائمة المهام:</h4>
        <div v-for="task in allTasks" :key="task.id" class="task-item">
          <span>{{ task.title }}</span>
          <span>→ مخصص لـ: {{ task.assigned_to ? (task.assigned_to.name || task.assigned_to) : 'غير محدد' }}</span>
          <span :class="'status-badge ' + task.status">{{ task.status }}</span>
        </div>
      </div>

      <!-- 4. إحصائيات المهام كروت -->
      <div class="stats-cards">
        <div class="stat-square" v-for="stat in taskStats" :key="stat.label">
          <div class="stat-square-icon" :style="{ backgroundColor: stat.color + '20', color: stat.color }">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-square-content">
            <span class="stat-square-value">{{ stat.value }}</span>
            <span class="stat-square-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- 5. قائمة الأعضاء -->
      <div class="members-list">
        <h3>تفاصيل مهام الأعضاء</h3>
        <div class="members-grid">
          <div v-for="member in memberStats" :key="member.id" class="member-card">
            <div class="member-header">
              <div class="member-avatar" :style="{ backgroundColor: getAvatarColor(member.name) }">
                {{ getUserInitials(member.name) }}
              </div>
              <div class="member-info">
                <h4>{{ member.name }}</h4>
                <span class="member-role">{{ getRoleName(member.role) }}</span>
              </div>
            </div>
            
            <div class="member-details">
              <div class="detail-item">
                <span class="detail-label">إجمالي</span>
                <span class="detail-value">{{ member.total_tasks }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">مكتملة</span>
                <span class="detail-value" style="color: #10b981;">{{ member.completed_tasks }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">قيد التنفيذ</span>
                <span class="detail-value" style="color: #3b82f6;">{{ member.in_progress_tasks }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">معلقة</span>
                <span class="detail-value" style="color: #f59e0b;">{{ member.pending_tasks }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">متأخرة</span>
                <span class="detail-value" style="color: #ef4444;">{{ member.overdue_tasks }}</span>
              </div>
            </div>

            <div class="member-progress">
              <div class="progress-header">
                <span>نسبة الإنجاز</span>
                <span>{{ member.completion_rate }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: member.completion_rate + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// ========== State ==========
const loading = ref(false)
const selectedSection = ref('all')
const sections = ref([])
const allMembers = ref([])
const allTasks = ref([])
const showDebug = ref(false) // تشغيل وضع التصحيح

// ========== Computed ==========
// المهام بدون assignee
const tasksWithoutAssignee = computed(() => {
  return allTasks.value.filter(t => !t.assigned_to)
})

// المهام مع assignee
const tasksWithAssignee = computed(() => {
  return allTasks.value.filter(t => t.assigned_to)
})

// تصفية المهام حسب القسم
const filteredTasks = computed(() => {
  if (selectedSection.value === 'all') return allTasks.value
  return allTasks.value.filter(t => t.section_id == selectedSection.value)
})

// تصفية الأعضاء حسب القسم
const filteredMembers = computed(() => {
  if (selectedSection.value === 'all') return allMembers.value
  return allMembers.value.filter(m => m.section_id == selectedSection.value)
})

// إحصائيات عامة
const stats = computed(() => {
  const tasks = filteredTasks.value
  const members = filteredMembers.value
  
  const completed = tasks.filter(t => t.status === 'completed').length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const pending = tasks.filter(t => t.status === 'pending').length
  const overdue = tasks.filter(t => isOverdue(t)).length
  
  return {
    total_tasks: tasks.length,
    completed_tasks: completed,
    in_progress_tasks: inProgress,
    pending_tasks: pending,
    overdue_tasks: overdue,
    total_members: members.length,
    completion_rate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0
  }
})

// إحصائيات المهام
const taskStats = computed(() => {
  const s = stats.value
  return [
    { icon: 'fas fa-check-circle', label: 'مكتملة', value: s.completed_tasks, color: '#10b981' },
    { icon: 'fas fa-spinner', label: 'قيد التنفيذ', value: s.in_progress_tasks, color: '#3b82f6' },
    { icon: 'fas fa-clock', label: 'معلقة', value: s.pending_tasks, color: '#f59e0b' },
    { icon: 'fas fa-exclamation-triangle', label: 'متأخرة', value: s.overdue_tasks, color: '#ef4444' }
  ]
})

// إحصائيات الأعضاء (معدلة للتأكد من assigned_to)
const memberStats = computed(() => {
  console.log('All tasks:', allTasks.value.length)
  console.log('Tasks with assignee:', tasksWithAssignee.value.length)
  
  const stats = filteredMembers.value.map(user => {
    // التأكد من assigned_to - ممكن يكون object أو id
    const userTasks = filteredTasks.value.filter(t => {
      if (!t.assigned_to) return false
      
      // لو assigned_to هو object
      if (typeof t.assigned_to === 'object' && t.assigned_to !== null) {
        return t.assigned_to.id === user.id
      }
      
      // لو assigned_to هو id
      return t.assigned_to === user.id
    })
    
    const completed = userTasks.filter(t => t.status === 'completed').length
    
    return {
      ...user,
      total_tasks: userTasks.length,
      completed_tasks: completed,
      in_progress_tasks: userTasks.filter(t => t.status === 'in_progress').length,
      pending_tasks: userTasks.filter(t => t.status === 'pending').length,
      overdue_tasks: userTasks.filter(t => isOverdue(t)).length,
      completion_rate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0
    }
  })
  
  // فلترة الأعضاء اللي عندهم مهام
  const withTasks = stats.filter(m => m.total_tasks > 0)
  console.log('Members with tasks:', withTasks.length)
  
  return withTasks.sort((a, b) => b.total_tasks - a.total_tasks)
})

// أقصى عدد مهام
const maxTasks = computed(() => {
  if (memberStats.value.length === 0) return 1
  return Math.max(...memberStats.value.map(m => m.total_tasks))
})

// ستايل الرسم البياني الدائري
const pieChartStyle = computed(() => {
  const s = stats.value
  const total = s.total_tasks || 1
  
  const completed = (s.completed_tasks / total) * 100
  const inProgress = (s.in_progress_tasks / total) * 100
  const pending = (s.pending_tasks / total) * 100
  const overdue = (s.overdue_tasks / total) * 100
  
  let gradient = `conic-gradient(
    #10b981 0% ${completed}%,
    #3b82f6 ${completed}% ${completed + inProgress}%,
    #f59e0b ${completed + inProgress}% ${completed + inProgress + pending}%,
    #ef4444 ${completed + inProgress + pending}% 100%
  )`
  
  return { background: gradient }
})

// ========== Helper Functions ==========
const getUserInitials = (name) => {
  if (!name) return 'U'
  const parts = name.split(' ').filter(p => p.length > 0)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return 'U'
}

const getAvatarColor = (name) => {
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return colors[Math.abs(hash) % colors.length]
}

const getBarColor = (index) => {
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  return colors[index % colors.length]
}

const getRoleName = (role) => {
  const roles = {
    'team_leader': 'قائد الفريق',
    'deputy_leader': 'نائب القائد',
    'section_leader': 'رئيس قسم',
    'member': 'عضو'
  }
  return roles[role] || role
}

const isOverdue = (task) => {
  if (!task.due_date || task.status === 'completed') return false
  return new Date(task.due_date) < new Date()
}

// ========== Load Data ==========
const loadAllData = async () => {
  loading.value = true
  
  try {
    // جلب المهام
    const tasksRes = await axios.get('http://localhost:8000/api/tasks-public')
    allTasks.value = tasksRes.data.data || []
    console.log('Tasks loaded:', allTasks.value.length)
    
    // جلب المستخدمين
    const usersRes = await axios.get('http://localhost:8000/api/users-public')
    allMembers.value = usersRes.data.data || []
    console.log('Users loaded:', allMembers.value.length)
    
    // جلب الأقسام
    const sectionsRes = await axios.get('http://localhost:8000/api/show-sections')
    sections.value = sectionsRes.data.data || []
    console.log('Sections loaded:', sections.value.length)
    
    // عرض تفاصيل أول 3 مهام للتأكد
    console.log('Sample tasks:', allTasks.value.slice(0, 3))
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const filterBySection = () => {
  console.log('Filter changed to:', selectedSection.value)
}

const refreshData = () => {
  loadAllData()
}

// ========== Lifecycle ==========
onMounted(() => {
  loadAllData()
})
</script>

<style scoped>
.statistics-view {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
}

.space-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at bottom, #0a0a0a 0%, #000000 100%);
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(2px 2px at 20px 30px, #FFD700, rgba(0,0,0,0));
  opacity: 0.4;
  animation: starsMove 100s linear infinite;
}

.twinkling-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(1px 1px at 120px 330px, #FFD700, rgba(0,0,0,0));
  opacity: 0.2;
  animation: twinkle 4s ease-in-out infinite;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.08;
  animation: floatSphere 25s infinite;
}

.sphere-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,215,0,0.1), rgba(255,215,0,0.05));
  top: -200px;
  right: -200px;
}

.sphere-2 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(255,215,0,0.08), rgba(255,215,0,0.02));
  bottom: -300px;
  left: -200px;
}

@keyframes starsMove {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

@keyframes floatSphere {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.95); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  font-size: 2.5rem;
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  padding: 15px;
  border-radius: 50%;
}

.header-content h1 {
  color: #FFD700;
  font-size: 2rem;
  margin: 0 0 5px;
}

.header-content p {
  color: #b0b0b0;
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.section-filter {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  min-width: 200px;
}

.section-filter:focus {
  outline: none;
  border-color: #FFD700;
}

.btn-secondary {
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-secondary:hover:not(:disabled) {
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-2px);
}

.loading-container {
  text-align: center;
  padding: 80px;
  position: relative;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 215, 0, 0.1);
  border-top: 4px solid #FFD700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.statistics-content {
  position: relative;
  z-index: 10;
}

/* Debug Section */
.debug-section {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  color: #fff;
  font-family: monospace;
  direction: ltr;
  text-align: left;
}

.debug-section h4 {
  color: #ff6b6b;
  margin: 0 0 10px 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.stat-card.total .stat-icon {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.stat-card.completed .stat-icon {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.stat-card.in-progress .stat-icon {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.stat-card.pending .stat-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.stat-card.overdue .stat-icon {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.stat-card.members .stat-icon {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.stat-details {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* Chart Cards */
.chart-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.chart-header h3 {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0;
}

.badge {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* Pie Chart */
.pie-chart-container {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin: 20px auto;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: #1a1a1a;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFD700;
}

.pie-center span {
  font-size: 2rem;
  font-weight: 700;
  color: #FFD700;
  line-height: 1;
}

.pie-center small {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.pie-legend {
  flex: 1;
  min-width: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #fff;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

/* Bars Chart */
.bars-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.bar-label {
  min-width: 150px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.member-avatar-mini {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
}

.member-name {
  color: #FFD700;
  font-weight: 600;
  font-size: 0.9rem;
}

.bar-wrapper {
  flex: 1;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  transition: width 0.3s;
}

.bar-value {
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.empty-message {
  text-align: center;
  padding: 50px;
  color: #b0b0b0;
}

.empty-message i {
  font-size: 3rem;
  color: #FFD700;
  opacity: 0.5;
  margin-bottom: 15px;
}

.small-text {
  font-size: 0.8rem;
  margin-top: 10px;
}

.debug-btn {
  margin-top: 15px;
  padding: 8px 20px;
  background: transparent;
  border: 1px solid #FFD700;
  border-radius: 20px;
  color: #FFD700;
  cursor: pointer;
  transition: all 0.3s;
}

.debug-btn:hover {
  background: #FFD700;
  color: #000;
}

/* Tasks List */
.tasks-list {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #FFD700;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.tasks-list h4 {
  color: #FFD700;
  margin: 0 0 15px 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  color: #fff;
  direction: ltr;
  text-align: left;
}

.status-badge {
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.status-badge.completed {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid #10b981;
}

.status-badge.in_progress {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.stat-square {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s;
}

.stat-square:hover {
  transform: translateY(-3px);
  border-color: #FFD700;
}

.stat-square-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-square-content {
  flex: 1;
}

.stat-square-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.stat-square-label {
  color: #b0b0b0;
  font-size: 0.8rem;
}

/* Members List */
.members-list {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.members-list h3 {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0 0 20px;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.member-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s;
}

.member-card:hover {
  border-color: #FFD700;
  transform: translateY(-3px);
}

.member-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.member-avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  border: 2px solid #FFD700;
}

.member-info h4 {
  color: #FFD700;
  font-size: 1rem;
  margin: 0 0 4px;
}

.member-role {
  font-size: 0.8rem;
  color: #b0b0b0;
}

.member-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.detail-label {
  font-size: 0.7rem;
  color: #b0b0b0;
}

.detail-value {
  font-weight: 700;
  font-size: 1.1rem;
}

.member-progress {
  margin-bottom: 15px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #b0b0b0;
  font-size: 0.8rem;
}

.progress-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  transition: width 0.3s;
}

/* Responsive */
@media (max-width: 992px) {
  .pie-chart-container {
    flex-direction: column;
    align-items: center;
  }
  
  .pie-legend {
    width: 100%;
  }
  
  .bar-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .bar-label {
    min-width: auto;
    width: 100%;
  }
  
  .bar-wrapper {
    width: 100%;
  }
  
  .member-details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

[dir="rtl"] .bar-fill {
  justify-content: flex-start;
}
</style>