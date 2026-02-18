<template>
  <div class="dashboard-home">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>مرحباً، {{ user?.name || 'مستخدم' }}</h1>
        <p class="date">{{ currentDate }}</p>
      </div>
      <div class="header-actions">
        <button @click="refreshData" class="refresh-btn" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
        </button>
      </div>
    </div>

    <!-- Debug Info -->
    <div v-if="debugInfo" class="debug-section">
      <div class="debug-header" @click="showDebug = !showDebug">
        <i class="fas fa-bug"></i>
        <span>معلومات التصحيح</span>
        <i :class="showDebug ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </div>
      <div v-if="showDebug" class="debug-content">
        <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="fas fa-tasks"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">إجمالي المهام</span>
          <span class="stat-value">{{ userStats.total_tasks || 0 }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">مكتملة</span>
          <span class="stat-value">{{ userStats.completed_tasks || 0 }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">قيد التنفيذ</span>
          <span class="stat-value">{{ userStats.pending_tasks || 0 }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">متأخرة</span>
          <span class="stat-value">{{ userStats.overdue_tasks || 0 }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon gold">
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">نقاطي</span>
          <span class="stat-value">{{ userStats.total_points || 0 }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon info">
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">نسبة الإنجاز</span>
          <span class="stat-value">{{ userStats.completion_rate || 0 }}%</span>
        </div>
      </div>
    </div>

    <!-- Progress Bars -->
    <div class="progress-section">
      <div class="progress-card">
        <h3><i class="fas fa-tasks"></i> تقدم المهام</h3>
        <div class="progress-item">
          <span class="progress-label">الإنجاز الكلي</span>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: userStats.completion_rate + '%' }"></div>
            <span class="progress-value">{{ userStats.completion_rate || 0 }}%</span>
          </div>
        </div>
        <div class="progress-stats">
          <div class="stat">
            <span class="label">مكتمل:</span>
            <span class="value green">{{ userStats.completed_tasks || 0 }}</span>
          </div>
          <div class="stat">
            <span class="label">معلق:</span>
            <span class="value orange">{{ userStats.pending_tasks || 0 }}</span>
          </div>
          <div class="stat">
            <span class="label">متأخر:</span>
            <span class="value red">{{ userStats.overdue_tasks || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="progress-card">
        <h3><i class="fas fa-calendar"></i> هذا الشهر</h3>
        <div v-if="monthlyStats.length" class="monthly-stats">
          <div v-for="(stat, index) in monthlyStats" :key="index" class="monthly-item">
            <span class="month">{{ stat.month }}</span>
            <span class="count">{{ stat.count }} مهمة</span>
          </div>
        </div>
        <div v-else class="no-data">
          <p>لا توجد إحصائيات شهرية</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions">
      <h2><i class="fas fa-bolt"></i> إجراءات سريعة</h2>
      <div class="actions-grid">
        <router-link to="/dashboard/tasks/create" class="action-card" v-if="canCreateTasks">
          <i class="fas fa-plus-circle"></i>
          <span>مهمة جديدة</span>
        </router-link>
        <router-link to="/dashboard/tasks" class="action-card">
          <i class="fas fa-list"></i>
          <span>جميع المهام</span>
        </router-link>
        <router-link to="/dashboard/team" class="action-card">
          <i class="fas fa-users"></i>
          <span>الفريق</span>
        </router-link>
        <router-link to="/dashboard/profile" class="action-card">
          <i class="fas fa-user"></i>
          <span>ملفي</span>
        </router-link>
      </div>
    </div>

    <!-- Recent Tasks -->
    <div class="recent-tasks">
      <div class="section-header">
        <h2><i class="fas fa-history"></i> آخر المهام</h2>
        <router-link to="/dashboard/tasks" class="view-all">
          عرض الكل <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>

      <div class="tasks-table-container">
        <table class="tasks-table">
          <thead>
            <tr>
              <th>المهمة</th>
              <th>الحالة</th>
              <th>الأولوية</th>
              <th>تاريخ الاستحقاق</th>
              <th>التقدم</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in recentTasks" :key="task.id" @click="viewTask(task.id)" class="task-row">
              <td>
                <div class="task-title">{{ task.title }}</div>
                <div class="task-desc">{{ task.description || 'لا يوجد وصف' }}</div>
              </td>
              <td>
                <span :class="['status-badge', task.status]">{{ getStatusText(task.status) }}</span>
              </td>
              <td>
                <span :class="['priority-badge', task.priority]">{{ getPriorityText(task.priority) }}</span>
              </td>
              <td>
                <span :class="['due-date', { overdue: isOverdue(task.due_date) }]">
                  {{ formatDate(task.due_date) }}
                </span>
              </td>
              <td>
                <div class="progress-cell">
                  <div class="progress-bar-small">
                    <div class="progress-fill" :style="{ width: task.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ task.progress || 0 }}%</span>
                </div>
              </td>
            </tr>
            <tr v-if="recentTasks.length === 0">
              <td colspan="5" class="no-data">
                <i class="fas fa-tasks"></i>
                <p>لا توجد مهام حالياً</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Task Updates Feed -->
    <div class="updates-feed">
      <div class="section-header">
        <h2><i class="fas fa-rss"></i> آخر التحديثات</h2>
      </div>

      <div class="updates-list">
        <div v-for="update in recentUpdates" :key="update.id" class="update-item">
          <div class="update-avatar" :style="{ backgroundColor: getAvatarColor(update.user_name) }">
            {{ getInitials(update.user_name) }}
          </div>
          <div class="update-content">
            <div class="update-header">
              <span class="user-name">{{ update.user_name }}</span>
              <span class="update-time">{{ timeAgo(update.created_at) }}</span>
            </div>
            <p class="update-comment">{{ update.comment }}</p>
            <div class="update-task">
              <i class="fas fa-tasks"></i>
              <span>{{ update.task_title }}</span>
            </div>
          </div>
        </div>
        <div v-if="recentUpdates.length === 0" class="no-data">
          <i class="fas fa-rss"></i>
          <p>لا توجد تحديثات حديثة</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>جاري تحميل البيانات...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loading = ref(false)
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const userStats = ref({})
const recentTasks = ref([])
const recentUpdates = ref([])
const monthlyStats = ref([])

// Debug
const debugInfo = ref(null)
const showDebug = ref(false)

const currentDate = computed(() => {
  return new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const canCreateTasks = computed(() => {
  const role = user.value?.role
  return role === 'team_leader' || role === 'deputy_leader' || role === 'section_leader'
})

// ========== Helper Functions ==========
const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name) => {
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return colors[Math.abs(hash) % colors.length]
}

const getStatusText = (status) => {
  const map = {
    'pending': 'معلق',
    'in_progress': 'قيد التنفيذ',
    'completed': 'مكتمل',
    'overdue': 'متأخر'
  }
  return map[status] || status
}

const getPriorityText = (priority) => {
  const map = {
    'low': 'منخفضة',
    'medium': 'متوسطة',
    'high': 'عالية',
    'urgent': 'عاجلة'
  }
  return map[priority] || priority
}

const formatDate = (date) => {
  if (!date) return 'غير محدد'
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return 'غير محدد'
  }
}

const timeAgo = (date) => {
  if (!date) return ''
  
  const now = new Date()
  const past = new Date(date)
  const diffMs = now - past
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'الآن'
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`
  if (diffHours < 24) return `منذ ${diffHours} ساعة`
  if (diffDays < 7) return `منذ ${diffDays} يوم`
  return formatDate(date)
}

const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

// ========== Load Dashboard Data with Debug ==========
const loadDashboardData = async () => {
  loading.value = true
  debugInfo.value = { steps: [] }
  
  try {
    const token = localStorage.getItem('auth_token')
    const userId = user.value?.id
    
    debugInfo.value.token = token ? 'موجود' : 'غير موجود'
    debugInfo.value.userId = userId
    
    if (!token || !userId) {
      debugInfo.value.error = '❌ يجب تسجيل الدخول أولاً'
      loading.value = false
      return
    }

    console.log('🔍 جاري تحميل بيانات لوحة التحكم...')
    debugInfo.value.steps.push('بدء التحميل')

    // 1. جلب إحصائيات المستخدم
    try {
      debugInfo.value.steps.push('محاولة جلب الإحصائيات...')
      const statsRes = await axios.get(`http://TECHSTORM.kesug.com/api/users/${userId}/statistics`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      
      debugInfo.value.statsResponse = {
        status: statsRes.status,
        data: statsRes.data
      }
      
      if (statsRes.data.success) {
        userStats.value = statsRes.data.statistics || {}
        debugInfo.value.steps.push('✅ تم جلب الإحصائيات بنجاح')
        console.log('✅ Stats:', userStats.value)
      } else {
        debugInfo.value.steps.push('❌ فشل جلب الإحصائيات: ' + statsRes.data.error)
      }
    } catch (error) {
      debugInfo.value.statsError = {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      }
      debugInfo.value.steps.push('❌ خطأ في جلب الإحصائيات')
      console.error('❌ Stats error:', error)
    }

    // 2. جلب المهام
    try {
      debugInfo.value.steps.push('محاولة جلب المهام...')
      const tasksRes = await axios.get('http://TECHSTORM.kesug.com/api/tasks/my-tasks?limit=5', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      
      debugInfo.value.tasksResponse = {
        status: tasksRes.status,
        data: tasksRes.data
      }
      
      if (tasksRes.data.success) {
        recentTasks.value = tasksRes.data.tasks || tasksRes.data.data || []
        debugInfo.value.steps.push(`✅ تم جلب ${recentTasks.value.length} مهمة`)
        console.log('✅ Tasks:', recentTasks.value)
      } else {
        debugInfo.value.steps.push('❌ فشل جلب المهام: ' + tasksRes.data.error)
      }
    } catch (error) {
      debugInfo.value.tasksError = {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      }
      debugInfo.value.steps.push('❌ خطأ في جلب المهام')
      console.error('❌ Tasks error:', error)
    }

    // 3. جلب آخر التحديثات
    try {
      debugInfo.value.steps.push('محاولة جلب التحديثات...')
      const updatesRes = await axios.get('http://TECHSTORM.kesug.com/api/updates/recent?limit=10', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      
      debugInfo.value.updatesResponse = {
        status: updatesRes.status,
        data: updatesRes.data
      }
      
      if (updatesRes.data.success) {
        recentUpdates.value = updatesRes.data.data || []
        debugInfo.value.steps.push(`✅ تم جلب ${recentUpdates.value.length} تحديث`)
        console.log('✅ Updates:', recentUpdates.value)
      } else {
        debugInfo.value.steps.push('❌ فشل جلب التحديثات: ' + updatesRes.data.error)
      }
    } catch (error) {
      debugInfo.value.updatesError = {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      }
      debugInfo.value.steps.push('❌ خطأ في جلب التحديثات')
      console.error('❌ Updates error:', error)
    }

  } catch (error) {
    console.error('❌ خطأ عام:', error)
    debugInfo.value.generalError = error.message
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  loadDashboardData()
}

const viewTask = (taskId) => {
  router.push(`/dashboard/tasks/${taskId}`)
}

// ========== Lifecycle ==========
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard-home {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  color: #fff;
  min-height: 100vh;
  position: relative;
}

/* ===== Debug Section ===== */
.debug-section {
  background: #1a1a1a;
  border: 2px solid #2196f3;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
}

.debug-header {
  background: #2196f3;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}

.debug-header i:first-child {
  font-size: 1.2rem;
}

.debug-header i:last-child {
  margin-right: auto;
}

.debug-content {
  padding: 20px;
  max-height: 400px;
  overflow: auto;
}

.debug-content pre {
  color: #0f0;
  background: #000;
  padding: 15px;
  border-radius: 8px;
  font-size: 12px;
  direction: ltr;
  text-align: left;
}

/* ===== باقي الـ CSS زي ما هو ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 25px 30px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 5px;
  color: #FFD700;
  font-weight: 700;
}

.date {
  color: #b0b0b0;
  font-size: 1rem;
}

.refresh-btn {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  color: #FFD700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.2rem;
}

.refresh-btn:hover:not(:disabled) {
  background: #FFD700;
  color: #000;
  transform: rotate(180deg);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: #FFD700;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.15);
}

.stat-icon {
  width: 55px;
  height: 55px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.stat-icon.blue {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid #2196f3;
}

.stat-icon.green {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.stat-icon.orange {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.stat-icon.purple {
  background: rgba(156, 39, 176, 0.15);
  color: #9c27b0;
  border: 1px solid #9c27b0;
}

.stat-icon.gold {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.stat-icon.info {
  background: rgba(0, 188, 212, 0.15);
  color: #00bcd4;
  border: 1px solid #00bcd4;
}

.stat-info {
  flex: 1;
}

.stat-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
}

.progress-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.progress-card {
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
}

.progress-card h3 {
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-item {
  margin-bottom: 20px;
}

.progress-label {
  display: block;
  color: #b0b0b0;
  margin-bottom: 8px;
}

.progress-bar-container {
  position: relative;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 15px;
  transition: width 0.3s ease;
}

.progress-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  font-weight: 700;
  font-size: 0.9rem;
}

.progress-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.progress-stats .stat {
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.progress-stats .label {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.progress-stats .value {
  font-size: 1.2rem;
  font-weight: 700;
}

.progress-stats .value.green { color: #4caf50; }
.progress-stats .value.orange { color: #ff9800; }
.progress-stats .value.red { color: #f44336; }

.monthly-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.monthly-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.month {
  color: #FFD700;
  font-weight: 600;
}

.count {
  color: #fff;
}

.quick-actions {
  margin-bottom: 30px;
}

.quick-actions h2 {
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s;
}

.action-card:hover {
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
  transform: translateY(-5px);
}

.action-card i {
  font-size: 2rem;
  color: #FFD700;
}

.action-card span {
  font-size: 0.9rem;
  font-weight: 500;
}

.recent-tasks {
  margin-bottom: 30px;
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: #FFD700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.view-all {
  color: #b0b0b0;
  text-decoration: none;
  padding: 8px 15px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.view-all:hover {
  border-color: #FFD700;
  color: #FFD700;
}

.tasks-table-container {
  overflow-x: auto;
}

.tasks-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.tasks-table th {
  text-align: right;
  padding: 15px;
  color: #b0b0b0;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
}

.task-row {
  cursor: pointer;
  transition: all 0.3s;
}

.task-row:hover {
  background: rgba(255, 215, 0, 0.05);
}

.task-row td {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.task-title {
  color: #FFD700;
  font-weight: 600;
  margin-bottom: 3px;
}

.task-desc {
  color: #b0b0b0;
  font-size: 0.8rem;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.pending {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.status-badge.in_progress {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid #2196f3;
}

.status-badge.completed {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.status-badge.overdue {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.priority-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
}

.priority-badge.low {
  background: rgba(158, 158, 158, 0.15);
  color: #9e9e9e;
  border: 1px solid #9e9e9e;
}

.priority-badge.medium {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid #2196f3;
}

.priority-badge.high {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.priority-badge.urgent {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.due-date {
  color: #fff;
}

.due-date.overdue {
  color: #f44336;
  font-weight: 600;
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.progress-bar-small {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-text {
  color: #b0b0b0;
  font-size: 0.8rem;
  min-width: 35px;
}

.updates-feed {
  background: rgba(17, 17, 17, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.update-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  transition: all 0.3s;
}

.update-item:hover {
  border-color: #FFD700;
}

.update-avatar {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
}

.update-content {
  flex: 1;
}

.update-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.user-name {
  color: #FFD700;
  font-weight: 600;
}

.update-time {
  color: #666;
  font-size: 0.8rem;
}

.update-comment {
  color: #fff;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.update-task {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 30px;
  font-size: 0.8rem;
  color: #FFD700;
}

.update-task i {
  font-size: 0.7rem;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-data i {
  font-size: 3rem;
  color: #FFD700;
  opacity: 0.3;
  margin-bottom: 10px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 215, 0, 0.1);
  border-top: 4px solid #FFD700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: #FFD700;
  font-size: 1.2rem;
}

@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .progress-section {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .update-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .update-avatar {
    align-self: flex-start;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 15px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .progress-stats {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}

</style>
