<!-- src/views/admin/DepartmentTasksView.vue -->
<template>
  <div class="department-tasks-view">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="page-header">
      <div>
        <h1>📊 متابعة مهام الأقسام</h1>
        <p>نظرة عامة على مهام جميع الأقسام والفروع</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">إجمالي المهام</span>
          <span class="stat-value">{{ totalTasks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">قيد التنفيذ</span>
          <span class="stat-value">{{ inProgressTasks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">مكتملة</span>
          <span class="stat-value">{{ completedTasks }}</span>
        </div>
      </div>
    </div>

    <!-- Department Overview -->
    <div class="department-overview">
      <div class="overview-card hardware">
        <div class="card-header">
          <i class="fas fa-microchip"></i>
          <h2>قسم هاردوير</h2>
          <span class="task-count">{{ hardwareTasks.length }} مهمة</span>
        </div>
        <div class="card-body">
          <div class="progress-info">
            <span>الإنجاز</span>
            <span class="percentage">{{ hardwareCompletionRate }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: hardwareCompletionRate + '%' }"></div>
          </div>
          <div class="stats-grid small">
            <div class="stat">
              <span class="label">⏳ قيد الانتظار</span>
              <span class="value">{{ hardwarePending }}</span>
            </div>
            <div class="stat">
              <span class="label">⚙️ قيد التنفيذ</span>
              <span class="value">{{ hardwareInProgress }}</span>
            </div>
            <div class="stat">
              <span class="label">✅ مكتملة</span>
              <span class="value">{{ hardwareCompleted }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="overview-card software">
        <div class="card-header">
          <i class="fas fa-code"></i>
          <h2>قسم سوفتوير</h2>
          <span class="task-count">{{ softwareTasks.length }} مهمة</span>
        </div>
        <div class="card-body">
          <div class="progress-info">
            <span>الإنجاز</span>
            <span class="percentage">{{ softwareCompletionRate }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: softwareCompletionRate + '%' }"></div>
          </div>
          <div class="stats-grid small">
            <div class="stat">
              <span class="label">⏳ قيد الانتظار</span>
              <span class="value">{{ softwarePending }}</span>
            </div>
            <div class="stat">
              <span class="label">⚙️ قيد التنفيذ</span>
              <span class="value">{{ softwareInProgress }}</span>
            </div>
            <div class="stat">
              <span class="label">✅ مكتملة</span>
              <span class="value">{{ softwareCompleted }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Department Details Tabs -->
    <div class="tabs">
      <button 
        v-for="dept in departments" 
        :key="dept.id"
        @click="selectedDepartment = dept.id"
        :class="['tab', { active: selectedDepartment === dept.id }]"
        :style="{ borderColor: dept.color }"
      >
        <i :class="dept.icon" :style="{ color: dept.color }"></i>
        {{ dept.name }}
      </button>
    </div>

    <!-- Department Tasks -->
    <div v-if="selectedDepartmentData" class="department-tasks">
      <!-- Sub-Department Filter -->
      <div class="filters">
        <select v-model="selectedSubDepartment" class="filter-select">
          <option value="">جميع الفروع</option>
          <option v-for="sub in selectedDepartmentData.subDepartments" :key="sub.id" :value="sub.id">
            {{ sub.name }}
          </option>
        </select>

        <select v-model="statusFilter" class="filter-select">
          <option value="all">جميع الحالات</option>
          <option value="department_pending">⏳ في انتظار رئيس القسم</option>
          <option value="sub_department_pending">⏳ في انتظار رئيس الفرع</option>
          <option value="member_pending">⏳ في انتظار الأعضاء</option>
          <option value="in_progress">⚙️ قيد التنفيذ</option>
          <option value="completed">✅ مكتملة</option>
        </select>

        <select v-model="priorityFilter" class="filter-select">
          <option value="all">جميع الأولويات</option>
          <option value="high">🔴 عالية</option>
          <option value="medium">🟡 متوسطة</option>
          <option value="low">🟢 منخفضة</option>
        </select>
      </div>

      <!-- Tasks Grid -->
      <div class="tasks-grid">
        <div v-for="task in filteredTasks" :key="task.id" class="task-card" :class="task.priority">
          <div class="task-header">
            <h3>{{ task.title }}</h3>
            <span class="priority-badge" :class="task.priority">
              {{ getPriorityName(task.priority) }}
            </span>
          </div>

          <p class="task-description">{{ task.description || 'لا يوجد وصف' }}</p>

          <div class="task-meta">
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span>{{ task.createdBy?.name }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(task.createdAt) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-code-branch"></i>
              <span>{{ getSubDepartmentName(task.assignedSubDepartment) }}</span>
            </div>
          </div>

          <div class="task-status">
            <span class="status-badge" :class="task.status">
              {{ getStatusName(task.status) }}
            </span>
            <span class="assigned-count">
              <i class="fas fa-users"></i>
              {{ task.assignedTo?.length || 0 }} عضو
            </span>
          </div>

          <div class="task-progress">
            <div class="progress-info">
              <span>تقدم المهمة</span>
              <span>{{ calculateProgress(task) }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: calculateProgress(task) + '%' }"></div>
            </div>
          </div>

          <div class="task-footer">
            <button @click="viewTaskDetails(task)" class="btn-view">
              <i class="fas fa-eye"></i>
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDepartments } from '@/composables/useDepartments'
import { useTasks } from '@/composables/useTasks'

const { departments, loadDepartments } = useDepartments()
const { tasks, loadAllTasks } = useTasks()

// ========== State ==========
const selectedDepartment = ref('hardware')
const selectedSubDepartment = ref('')
const statusFilter = ref('all')
const priorityFilter = ref('all')

// ========== Computed ==========
const selectedDepartmentData = computed(() => {
  return departments.value.find(d => d.id === selectedDepartment.value)
})

// Hardware Tasks
const hardwareTasks = computed(() => {
  return tasks.value.filter(t => t.department === 'hardware')
})

const hardwarePending = computed(() => {
  return hardwareTasks.value.filter(t => 
    t.status === 'department_pending' || 
    t.status === 'sub_department_pending' || 
    t.status === 'member_pending'
  ).length
})

const hardwareInProgress = computed(() => {
  return hardwareTasks.value.filter(t => t.status === 'in_progress').length
})

const hardwareCompleted = computed(() => {
  return hardwareTasks.value.filter(t => t.status === 'completed').length
})

const hardwareCompletionRate = computed(() => {
  if (hardwareTasks.value.length === 0) return 0
  return Math.round((hardwareCompleted.value / hardwareTasks.value.length) * 100)
})

// Software Tasks
const softwareTasks = computed(() => {
  return tasks.value.filter(t => t.department === 'software')
})

const softwarePending = computed(() => {
  return softwareTasks.value.filter(t => 
    t.status === 'department_pending' || 
    t.status === 'sub_department_pending' || 
    t.status === 'member_pending'
  ).length
})

const softwareInProgress = computed(() => {
  return softwareTasks.value.filter(t => t.status === 'in_progress').length
})

const softwareCompleted = computed(() => {
  return softwareTasks.value.filter(t => t.status === 'completed').length
})

const softwareCompletionRate = computed(() => {
  if (softwareTasks.value.length === 0) return 0
  return Math.round((softwareCompleted.value / softwareTasks.value.length) * 100)
})

// Overall Stats
const totalTasks = computed(() => tasks.value.length)
const inProgressTasks = computed(() => 
  tasks.value.filter(t => t.status === 'in_progress').length
)
const completedTasks = computed(() => 
  tasks.value.filter(t => t.status === 'completed').length
)

// Filtered Tasks
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    // Department filter
    if (task.department !== selectedDepartment.value) return false
    
    // Sub-department filter
    if (selectedSubDepartment.value && task.assignedSubDepartment !== selectedSubDepartment.value) {
      return false
    }
    
    // Status filter
    if (statusFilter.value !== 'all' && task.status !== statusFilter.value) {
      return false
    }
    
    // Priority filter
    if (priorityFilter.value !== 'all' && task.priority !== priorityFilter.value) {
      return false
    }
    
    return true
  })
})

// ========== Methods ==========
const getPriorityName = (priority) => {
  const names = {
    high: '🔴 عالية',
    medium: '🟡 متوسطة',
    low: '🟢 منخفضة'
  }
  return names[priority] || priority
}

const getStatusName = (status) => {
  const names = {
    department_pending: '⏳ في انتظار رئيس القسم',
    sub_department_pending: '⏳ في انتظار رئيس الفرع',
    member_pending: '⏳ في انتظار الأعضاء',
    in_progress: '⚙️ قيد التنفيذ',
    completed: '✅ مكتملة'
  }
  return names[status] || status
}

const getSubDepartmentName = (subId) => {
  const names = {
    electricity: 'كهرباء',
    structure: 'هيكل',
    components: 'مكونات',
    web_frontend: 'ويب فرونت',
    web_backend: 'ويب باك',
    mobile_frontend: 'موبايل فرونت',
    mobile_backend: 'موبايل باك'
  }
  return names[subId] || subId
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'غير محدد'
  const date = timestamp.toDate?.() || new Date(timestamp)
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date)
}

const calculateProgress = (task) => {
  if (task.status === 'completed') return 100
  if (task.status === 'in_progress') return 50
  if (task.status === 'member_pending') return 25
  if (task.status === 'sub_department_pending') return 15
  if (task.status === 'department_pending') return 5
  return 0
}

const viewTaskDetails = (task) => {
  // TODO: Navigate to task details
  console.log('View task:', task.id)
}

// ========== Lifecycle ==========
let unsubscribeDepts, unsubscribeTasks

onMounted(() => {
  unsubscribeDepts = loadDepartments()
  unsubscribeTasks = loadAllTasks()
})

onUnmounted(() => {
  if (unsubscribeDepts) unsubscribeDepts()
  if (unsubscribeTasks) unsubscribeTasks()
})
</script>

<style scoped>
.department-tasks-view {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  color: #fff;
}

/* ===== خلفية فضائية ===== */
.space-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ===== Page Header ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.page-header h1 {
  font-size: 32px;
  color: #FFD700;
  margin-bottom: 8px;
  font-weight: 900;
}

.page-header p {
  color: #b0b0b0;
  font-size: 16px;
}

.header-stats {
  display: flex;
  gap: 15px;
  background: rgba(255,215,0,0.03);
  padding: 12px;
  border-radius: 60px;
}

.stat-item {
  padding: 8px 20px;
  border-radius: 30px;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  color: #b0b0b0;
  font-size: 12px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #FFD700;
}

/* ===== Department Overview ===== */
.department-overview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.overview-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  padding: 25px;
  backdrop-filter: blur(10px);
}

.overview-card.hardware .card-header i {
  color: #3b82f6;
}

.overview-card.software .card-header i {
  color: #10b981;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.card-header i {
  font-size: 2rem;
}

.card-header h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.task-count {
  margin-right: auto;
  background: rgba(255,215,0,0.1);
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 13px;
  color: #FFD700;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #b0b0b0;
  font-size: 14px;
}

.percentage {
  color: #FFD700;
  font-weight: 700;
}

.progress-bar {
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 4px;
  transition: width 0.3s;
}

.stats-grid.small {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stats-grid.small .stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background: rgba(0,0,0,0.2);
  border-radius: 12px;
}

.stats-grid.small .stat .label {
  color: #b0b0b0;
  font-size: 11px;
}

.stats-grid.small .stat .value {
  color: #FFD700;
  font-size: 18px;
  font-weight: 700;
}

/* ===== Tabs ===== */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 50px;
  background: rgba(255,255,255,0.02);
  border: 1px solid transparent;
  color: #b0b0b0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab.active {
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  color: #FFD700;
}

/* ===== Filters ===== */
.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}

.filter-select {
  flex: 1;
  padding: 12px 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
}

/* ===== Tasks Grid ===== */
.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 2;
}

.task-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-card.high { border-right: 4px solid #ef4444; }
.task-card.medium { border-right: 4px solid #f59e0b; }
.task-card.low { border-right: 4px solid #10b981; }

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-header h3 {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.priority-badge {
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 700;
}

.priority-badge.high {
  background: rgba(239,68,68,0.15);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.priority-badge.medium {
  background: rgba(245,158,11,0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.priority-badge.low {
  background: rgba(16,185,129,0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.task-description {
  color: #b0b0b0;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

.task-meta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #b0b0b0;
  font-size: 12px;
}

.meta-item i {
  color: #FFD700;
}

.task-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.department_pending {
  background: rgba(245,158,11,0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.status-badge.sub_department_pending {
  background: rgba(139,92,246,0.15);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.status-badge.member_pending {
  background: rgba(59,130,246,0.15);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.status-badge.in_progress {
  background: rgba(16,185,129,0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.status-badge.completed {
  background: rgba(139,92,246,0.15);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}

.assigned-count {
  color: #b0b0b0;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.task-progress {
  margin-top: 5px;
}

.task-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.btn-view {
  padding: 8px 20px;
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: 30px;
  color: #FFD700;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-view:hover {
  background: #FFD700;
  color: #000;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .department-overview {
    grid-template-columns: 1fr;
  }
  
  .tasks-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .tabs {
    flex-direction: column;
  }
}

[dir="rtl"] .task-card.high,
[dir="rtl"] .task-card.medium,
[dir="rtl"] .task-card.low {
  border-right: none;
  border-left: 4px solid;
}

[dir="rtl"] .task-card.high { border-left-color: #ef4444; }
[dir="rtl"] .task-card.medium { border-left-color: #f59e0b; }
[dir="rtl"] .task-card.low { border-left-color: #10b981; }
</style>