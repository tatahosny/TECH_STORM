<template>
  <div class="tasks-view">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Header -->
    <div class="page-header">
      <div class="header-title">
        <i class="fas fa-tasks header-icon"></i>
        <div>
          <h1>المهام</h1>
          <p class="header-subtitle">إدارة ومتابعة جميع المهام</p>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="btn-primary" @click="goToCreateTask" v-if="canCreateTasks">
          <i class="fas fa-plus"></i>
          مهمة جديدة
        </button>
        <button class="btn-secondary" @click="refreshData" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          تحديث
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid" v-if="!loading">
      <div class="stat-card">
        <div class="stat-icon total">
          <i class="fas fa-tasks"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.total || 0 }}</span>
          <span class="stat-label">إجمالي المهام</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon completed">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.completed || 0 }}</span>
          <span class="stat-label">مكتملة</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon in_progress">
          <i class="fas fa-spinner"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.in_progress || 0 }}</span>
          <span class="stat-label">قيد التنفيذ</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon pending">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.pending || 0 }}</span>
          <span class="stat-label">معلقة</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon overdue">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.overdue || 0 }}</span>
          <span class="stat-label">متأخرة</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon progress">
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.completion_rate || 0 }}%</span>
          <span class="stat-label">نسبة الإنجاز</span>
        </div>
      </div>
    </div>

    <!-- Permission Badge -->
    <div class="permission-badge" v-if="!loading">
      <div class="permission-info" :class="userRole">
        <i :class="getRoleIcon()"></i>
        <span>
          {{ getRoleMessage() }}
        </span>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="filters.search" 
          placeholder="🔍 بحث في المهام..."
          @input="debouncedSearch"
        />
        <button v-if="filters.search" class="clear-search" @click="clearSearch">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-group">
        <select v-model="filters.status" class="filter-select" @change="applyFilters">
          <option value="all">جميع الحالات</option>
          <option value="pending">معلق</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
          <option value="overdue">متأخر</option>
        </select>

        <select v-model="filters.priority" class="filter-select" @change="applyFilters">
          <option value="all">جميع الأولويات</option>
          <option value="urgent">🔴 عاجلة</option>
          <option value="high">🟠 عالية</option>
          <option value="medium">🟡 متوسطة</option>
          <option value="low">🟢 منخفضة</option>
        </select>

        <!-- فلتر القسم - يظهر فقط للليدر والنائب -->
        <select v-if="canViewAllSections" v-model="filters.section" class="filter-select" @change="applyFilters">
          <option value="all">جميع الأقسام</option>
          <option v-for="section in sections" :key="section.id" :value="section.id">
            {{ section.name }}
          </option>
        </select>
      </div>

      <div class="sort-group">
        <select v-model="filters.sort_by" class="filter-select" @change="applyFilters">
          <option value="created_at">تاريخ الإنشاء</option>
          <option value="due_date">تاريخ الاستحقاق</option>
          <option value="priority">الأولوية</option>
          <option value="title">العنوان</option>
          <option value="progress">نسبة التقدم</option>
        </select>
        <button @click="toggleSortDir" class="sort-dir-btn" :title="filters.sort_dir === 'asc' ? 'تصاعدي' : 'تنازلي'">
          <i :class="filters.sort_dir === 'asc' ? 'fas fa-sort-amount-down-alt' : 'fas fa-sort-amount-up'"></i>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل المهام...</p>
    </div>

    <!-- Tasks Grid -->
    <div v-else-if="filteredTasks.length > 0" class="tasks-grid">
      <div v-for="task in filteredTasks" :key="task.id" class="task-card" :class="task.priority">
        <!-- Card Header -->
        <div class="task-header">
          <div class="task-priority" :class="task.priority">
            <i :class="getPriorityIcon(task.priority)"></i>
            <span>{{ getPriorityText(task.priority) }}</span>
          </div>
          <div class="task-ids">
            <span class="task-id">#{{ task.id }}</span>
            <span class="task-section-badge" v-if="task.section">
              {{ task.section.name }}
            </span>
          </div>
        </div>

        <!-- Card Title -->
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-description">{{ truncateText(task.description, 100) }}</p>

        <!-- Card Meta -->
        <div class="task-meta">
          <div class="meta-item" v-if="task.assigned_to">
            <i class="fas fa-user"></i>
            <span>{{ task.assigned_to_name || 'غير محدد' }}</span>
          </div>
          <div class="meta-item" v-else>
            <i class="fas fa-user-slash"></i>
            <span class="text-muted">غير معين</span>
          </div>
          
          <div class="meta-item">
            <i class="fas fa-calendar-alt"></i>
            <span :class="{ 'text-danger': isOverdue(task) }">
              {{ formatDate(task.due_date) }}
              <span v-if="isOverdue(task)" class="overdue-badge">متأخرة</span>
            </span>
          </div>

          <div class="meta-item" v-if="task.assigned_by">
            <i class="fas fa-user-tie"></i>
            <span>{{ task.assigned_by_name || 'غير محدد' }}</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="task-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: (task.progress || 0) + '%' }"></div>
          </div>
          <span class="progress-text">{{ task.progress || 0 }}%</span>
        </div>

        <!-- Checklist Preview -->
        <div class="checklist-preview" v-if="task.checklist && task.checklist.length">
          <i class="fas fa-check-double"></i>
          <span>{{ getCompletedChecklist(task.checklist) }}/{{ task.checklist.length }}</span>
        </div>

        <!-- Attachments Preview -->
        <div class="attachments-preview" v-if="task.attachments && task.attachments.length">
          <i class="fas fa-paperclip"></i>
          <span>{{ task.attachments.length }} ملف</span>
        </div>

        <!-- Card Footer -->
        <div class="task-footer">
          <span :class="['task-status', task.status]">
            <i :class="getStatusIcon(task.status)"></i>
            {{ getStatusText(task.status) }}
          </span>
          
          <div class="task-actions">
            <router-link :to="`/dashboard/tasks/${task.id}`" class="action-btn view" title="عرض التفاصيل">
              <i class="fas fa-eye"></i>
            </router-link>
            <button v-if="canEditTask(task)" @click.stop="editTask(task)" class="action-btn edit" title="تعديل">
              <i class="fas fa-edit"></i>
            </button>
            <button v-if="canDeleteTask(task)" @click.stop="confirmDelete(task)" class="action-btn delete" title="حذف">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Data -->
    <div v-else-if="!loading" class="no-data-container">
      <div class="no-data-icon">
        <i class="fas fa-tasks"></i>
      </div>
      <h3>لا توجد مهام</h3>
      <p v-if="userRole === 'member'">لم يتم تعيين أي مهام لك بعد</p>
      <p v-else-if="userRole === 'section_leader'">لا توجد مهام في قسمك حالياً</p>
      <p v-else>لم يتم إنشاء أي مهام بعد</p>
      <button v-if="canCreateTasks" class="btn-primary" @click="goToCreateTask">
        <i class="fas fa-plus"></i>
        إنشاء مهمة جديدة
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content delete-modal">
        <div class="modal-header warning-header">
          <i class="fas fa-exclamation-triangle warning-icon"></i>
          <h2>حذف المهمة</h2>
        </div>

        <div class="modal-body">
          <p>هل أنت متأكد من حذف مهمة <strong>{{ selectedTask?.title }}</strong>؟</p>
          <p class="warning-text">
            هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف المهمة وجميع تحديثاتها
          </p>

          <div class="form-group">
            <label>اكتب "حذف" لتأكيد العملية</label>
            <input 
              type="text" 
              v-model="deleteConfirmText" 
              placeholder="حذف"
              :class="{ error: deleteConfirmText !== 'حذف' && deleteConfirmText !== '' }"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button 
            @click="deleteTask" 
            class="btn-delete" 
            :disabled="deleteConfirmText !== 'حذف' || deleteLoading"
          >
            <i v-if="deleteLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>تأكيد الحذف</span>
          </button>
          <button @click="closeDeleteModal" class="btn-cancel">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// ========== State ==========
const loading = ref(false)
const deleteLoading = ref(false)
const tasks = ref([])
const sections = ref([])
const selectedTask = ref(null)
const deleteConfirmText = ref('')
const showDeleteModal = ref(false)

// ========== Stats ==========
const stats = ref({
  total: 0,
  completed: 0,
  in_progress: 0,
  pending: 0,
  overdue: 0,
  completion_rate: 0
})

// ========== Filters ==========
const filters = reactive({
  search: '',
  status: 'all',
  priority: 'all',
  section: 'all',
  sort_by: 'created_at',
  sort_dir: 'desc'
})

// ========== User and Permissions ==========
const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// للتأكد من أن userId موجود
console.log('Current User:', currentUser.value)

// تحديد صلاحيات المستخدم
const userRole = computed(() => currentUser.value?.role || 'member')
const userSectionId = computed(() => currentUser.value?.section_id)
const userId = computed(() => currentUser.value?.id)

const canViewAllTasks = computed(() => {
  const role = userRole.value
  return ['team_leader', 'deputy_leader'].includes(role)
})

const canViewSectionTasks = computed(() => {
  const role = userRole.value
  return ['team_leader', 'deputy_leader', 'section_leader'].includes(role)
})

const canViewOwnTasks = computed(() => {
  return true // الجميع يشوف مهامه
})

const canCreateTasks = computed(() => {
  const role = userRole.value
  return ['team_leader', 'deputy_leader', 'section_leader'].includes(role)
})

const canViewAllSections = computed(() => {
  const role = userRole.value
  return ['team_leader', 'deputy_leader'].includes(role)
})

// ========== Filtered Tasks with Permissions ==========
const filteredTasks = computed(() => {
  console.log('Filtering tasks. Total tasks:', tasks.value.length)
  console.log('User role:', userRole.value)
  console.log('User ID:', userId.value)
  
  // أولاً: تطبيق فلتر الصلاحيات
  let permissionFiltered = []
  
  if (canViewAllTasks.value) {
    // الليدر والنائب: كل المهام
    permissionFiltered = [...tasks.value]
    console.log('Leader/Deputy: showing all tasks:', permissionFiltered.length)
  } else if (userRole.value === 'section_leader') {
    // رئيس القسم: مهام قسمه فقط
    permissionFiltered = tasks.value.filter(task => {
      const match = task.section_id === userSectionId.value
      if (match) console.log('Section leader task match:', task.id)
      return match
    })
    console.log('Section leader: showing section tasks:', permissionFiltered.length)
  } else {
    // عضو عادي: مهامه هو فقط - التأكد من المقارنة الصحيحة
    permissionFiltered = tasks.value.filter(task => {
      // التأكد من أن assigned_to موجود ومطابق لـ userId
      const assignedToId = task.assigned_to ? 
        (typeof task.assigned_to === 'object' ? task.assigned_to.id : task.assigned_to) : null
      
      const match = assignedToId === userId.value
      if (match) console.log('Member task match:', task.id, 'assigned_to:', assignedToId, 'user_id:', userId.value)
      return match
    })
    console.log('Member: showing own tasks:', permissionFiltered.length)
  }
  
  // إذا مفيش مهام بعد الفلتر، نرجع array فاضي
  if (permissionFiltered.length === 0) {
    console.log('No tasks after permission filter')
    return []
  }
  
  // ثانياً: تطبيق فلتر البحث والتصنيف
  let filtered = [...permissionFiltered]
  
  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(task => 
      (task.title?.toLowerCase() || '').includes(search) ||
      (task.description?.toLowerCase() || '').includes(search)
    )
  }
  
  if (filters.status !== 'all') {
    filtered = filtered.filter(task => task.status === filters.status)
  }
  
  if (filters.priority !== 'all') {
    filtered = filtered.filter(task => task.priority === filters.priority)
  }
  
  // فلتر القسم - يظهر فقط للصلاحيات المناسبة
  if (filters.section !== 'all' && canViewAllSections.value) {
    filtered = filtered.filter(task => task.section_id == filters.section)
  }
  
  // ترتيب المهام
  filtered.sort((a, b) => {
    let aVal = a[filters.sort_by]
    let bVal = b[filters.sort_by]
    
    if (filters.sort_by === 'due_date' || filters.sort_by === 'created_at') {
      aVal = aVal ? new Date(aVal).getTime() : 0
      bVal = bVal ? new Date(bVal).getTime() : 0
    }
    
    if (filters.sort_by === 'priority') {
      const priorityWeight = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 }
      aVal = priorityWeight[a.priority] || 0
      bVal = priorityWeight[b.priority] || 0
    }
    
    if (filters.sort_dir === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
  
  console.log('Final filtered tasks:', filtered.length)
  return filtered
})

// ========== Helper Functions ==========
const getPriorityIcon = (priority) => {
  const icons = {
    'low': 'fas fa-arrow-down',
    'medium': 'fas fa-minus',
    'high': 'fas fa-arrow-up',
    'urgent': 'fas fa-exclamation'
  }
  return icons[priority] || 'fas fa-tasks'
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

const getStatusIcon = (status) => {
  const icons = {
    'pending': 'fas fa-clock',
    'in_progress': 'fas fa-spinner',
    'completed': 'fas fa-check-circle',
    'overdue': 'fas fa-exclamation-triangle'
  }
  return icons[status] || 'fas fa-tasks'
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

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (date) => {
  if (!date) return 'غير محدد'
  try {
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
    
    if (diff === 0) return 'اليوم'
    if (diff === 1) return 'أمس'
    if (diff < 7) return `منذ ${diff} أيام`
    return d.toLocaleDateString('ar-EG')
  } catch {
    return 'غير محدد'
  }
}

const isOverdue = (task) => {
  if (!task.due_date || task.status === 'completed') return false
  return new Date(task.due_date) < new Date()
}

const getCompletedChecklist = (checklist) => {
  if (!checklist || !Array.isArray(checklist)) return 0
  return checklist.filter(item => item.completed).length
}

const getRoleIcon = () => {
  const icons = {
    'team_leader': 'fas fa-crown',
    'deputy_leader': 'fas fa-star',
    'section_leader': 'fas fa-flag',
    'member': 'fas fa-user'
  }
  return icons[userRole.value] || 'fas fa-user'
}

const getRoleMessage = () => {
  if (canViewAllTasks.value) {
    return '👑 أنت تشاهد جميع المهام (الليدر والنائب)'
  }
  if (userRole.value === 'section_leader') {
    return `🏢 أنت تشاهد مهام قسم: ${getSectionName(userSectionId.value)}`
  }
  return '📋 أنت تشاهد مهامك فقط'
}

const getSectionName = (sectionId) => {
  const section = sections.value.find(s => s.id === sectionId)
  return section?.name || 'القسم'
}

const canEditTask = (task) => {
  const role = userRole.value
  
  // الليدر والنائب: تعديل كل المهام
  if (role === 'team_leader' || role === 'deputy_leader') return true
  
  // رئيس القسم: تعديل مهام قسمه فقط
  if (role === 'section_leader' && task.section_id === userSectionId.value) return true
  
  // منشئ المهمة: تعديل مهامه
  if (task.assigned_by === userId.value) return true
  
  return false
}

const canDeleteTask = (task) => {
  const role = userRole.value
  // فقط الليدر والنائب يمكنهم الحذف
  return role === 'team_leader' || role === 'deputy_leader'
}

const canViewTask = (task) => {
  const role = userRole.value
  
  // الليدر والنائب: كل المهام
  if (role === 'team_leader' || role === 'deputy_leader') return true
  
  // رئيس القسم: مهام قسمه
  if (role === 'section_leader' && task.section_id === userSectionId.value) return true
  
  // العضو: مهامه هو فقط
  const assignedToId = task.assigned_to ? 
    (typeof task.assigned_to === 'object' ? task.assigned_to.id : task.assigned_to) : null
  if (assignedToId === userId.value) return true
  
  return false
}

// ========== Load Tasks with Permission Filter ==========
const loadTasks = async () => {
  loading.value = true
  
  try {
    // استخدام API المحمي بدل العام لجلب المهام حسب الصلاحيات
    const token = localStorage.getItem('auth_token')
    
    const response = await axios.get('http://TECHSTORM.kesug.com/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      tasks.value = response.data.data || []
      
      // تجهيز البيانات للعرض
      tasks.value.forEach(task => {
        // التعامل مع assigned_to
        if (task.assigned_to) {
          if (typeof task.assigned_to === 'object') {
            task.assigned_to_name = task.assigned_to.name || 'غير معين'
            task.assigned_to_id = task.assigned_to.id
          } else {
            task.assigned_to_name = 'غير معين'
            task.assigned_to_id = task.assigned_to
          }
        } else {
          task.assigned_to_name = 'غير معين'
          task.assigned_to_id = null
        }
        
        // التعامل مع assigned_by
        if (task.assigned_by) {
          if (typeof task.assigned_by === 'object') {
            task.assigned_by_name = task.assigned_by.name || 'غير معروف'
          } else {
            task.assigned_by_name = 'غير معروف'
          }
        } else {
          task.assigned_by_name = 'غير معروف'
        }
      })
      
      console.log('Tasks loaded from protected API:', tasks.value.length)
      
      // حساب الإحصائيات بناءً على المهام المسموح بها
      calculateStats()
    }
  } catch (error) {
    console.error('❌ Error loading tasks from protected API:', error)
    
    // إذا فشل API المحمي، استخدم API العام مع تطبيق الفلتر محلياً
    try {
      const publicResponse = await axios.get('http://TECHSTORM.kesug.com/api/tasks-public')
      
      if (publicResponse.data.success) {
        let allTasks = publicResponse.data.data || []
        console.log('All tasks from public API:', allTasks.length)
        
        // تجهيز البيانات للعرض
        allTasks.forEach(task => {
          // التعامل مع assigned_to
          if (task.assigned_to) {
            if (typeof task.assigned_to === 'object') {
              task.assigned_to_name = task.assigned_to.name || 'غير معين'
              task.assigned_to_id = task.assigned_to.id
            } else {
              task.assigned_to_name = 'غير معين'
              task.assigned_to_id = task.assigned_to
            }
          } else {
            task.assigned_to_name = 'غير معين'
            task.assigned_to_id = null
          }
          
          // التعامل مع assigned_by
          if (task.assigned_by) {
            if (typeof task.assigned_by === 'object') {
              task.assigned_by_name = task.assigned_by.name || 'غير معروف'
            } else {
              task.assigned_by_name = 'غير معروف'
            }
          } else {
            task.assigned_by_name = 'غير معروف'
          }
        })
        
        tasks.value = allTasks
        console.log('Tasks loaded from public API:', tasks.value.length)
        
        // حساب الإحصائيات
        calculateStats()
      }
    } catch (publicError) {
      console.error('❌ Error loading public tasks:', publicError)
      tasks.value = []
    }
  } finally {
    loading.value = false
  }
}

// حساب الإحصائيات
const calculateStats = () => {
  // نحتاج لحساب الإحصائيات بناءً على المهام التي تظهر للمستخدم
  let tasksForStats = []
  
  if (canViewAllTasks.value) {
    tasksForStats = tasks.value
  } else if (userRole.value === 'section_leader') {
    tasksForStats = tasks.value.filter(t => t.section_id === userSectionId.value)
  } else {
    tasksForStats = tasks.value.filter(t => {
      const assignedToId = t.assigned_to ? 
        (typeof t.assigned_to === 'object' ? t.assigned_to.id : t.assigned_to) : null
      return assignedToId === userId.value
    })
  }
  
  const completed = tasksForStats.filter(t => t.status === 'completed').length
  const in_progress = tasksForStats.filter(t => t.status === 'in_progress').length
  const pending = tasksForStats.filter(t => t.status === 'pending').length
  const overdue = tasksForStats.filter(t => isOverdue(t)).length
  
  stats.value = {
    total: tasksForStats.length,
    completed,
    in_progress,
    pending,
    overdue,
    completion_rate: tasksForStats.length > 0 
      ? Math.round((completed / tasksForStats.length) * 100) 
      : 0
  }
  
  console.log('Stats calculated:', stats.value)
}

// ========== Load Sections ==========
const loadSections = async () => {
  try {
    const response = await axios.get('http://TECHSTORM.kesug.com/api/show-sections')
    if (response.data.success) {
      sections.value = response.data.data || []
    }
  } catch (error) {
    console.error('Error loading sections:', error)
  }
}

// ========== Filter Functions ==========
let searchTimeout
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 500)
}

const applyFilters = () => {
  // الفلتر يتم تلقائياً عبر computed
}

const clearSearch = () => {
  filters.search = ''
  applyFilters()
}

const toggleSortDir = () => {
  filters.sort_dir = filters.sort_dir === 'asc' ? 'desc' : 'asc'
}

// ========== Navigation ==========
const goToCreateTask = () => {
  router.push('/dashboard/tasks/create')
}

const editTask = (task) => {
  router.push(`/dashboard/tasks/edit/${task.id}`)
}

// ========== Delete Task ==========
const confirmDelete = (task) => {
  selectedTask.value = task
  deleteConfirmText.value = ''
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedTask.value = null
  deleteConfirmText.value = ''
}

const deleteTask = async () => {
  if (!selectedTask.value || deleteConfirmText.value !== 'حذف') return
  
  deleteLoading.value = true
  try {
    const token = localStorage.getItem('auth_token')
    
    const response = await axios.delete(`http://TECHSTORM.kesug.com/api/tasks/${selectedTask.value.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      closeDeleteModal()
      await loadTasks()
      alert('✅ تم حذف المهمة بنجاح')
    } else {
      alert(response.data.error || 'حدث خطأ في حذف المهمة')
    }
  } catch (error) {
    console.error('Error deleting task:', error)
    
    // إذا فشل API المحمي، جرب العام
    try {
      const publicResponse = await axios.delete(`http://TECHSTORM.kesug.com/api/tasks-public/${selectedTask.value.id}`)
      
      if (publicResponse.data.success) {
        closeDeleteModal()
        await loadTasks()
        alert('✅ تم حذف المهمة بنجاح')
      }
    } catch (publicError) {
      alert('❌ ' + (publicError.response?.data?.error || 'حدث خطأ في حذف المهمة'))
    }
  } finally {
    deleteLoading.value = false
  }
}

// ========== Refresh ==========
const refreshData = () => {
  loadTasks()
  loadSections()
}

// ========== Watch Filters ==========
watch(() => filters.status, applyFilters)
watch(() => filters.priority, applyFilters)
watch(() => filters.section, applyFilters)
watch(() => filters.sort_by, applyFilters)
watch(() => filters.sort_dir, applyFilters)

// ========== Lifecycle ==========
onMounted(() => {
  loadTasks()
  loadSections()
})
</script>

<style scoped>
.tasks-view {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
  position: relative;
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
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80px 120px, #FFD700, rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 200px 200px;
  opacity: 0.4;
  animation: starsMove 100s linear infinite;
}

@keyframes starsMove {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}

.twinkling-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 120px 330px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 240px 170px, #FFD700, rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 300px 300px;
  opacity: 0.2;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
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
  animation-delay: -8s;
}

@keyframes floatSphere {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.95); }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,215,0,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.15;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.header-title {
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

.header-title h1 {
  color: #FFD700;
  font-size: 2rem;
  margin: 0 0 5px;
}

.header-subtitle {
  color: #b0b0b0;
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  padding: 12px 25px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-secondary {
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-3px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: #FFD700;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.15);
}

.stat-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.stat-icon.total {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.stat-icon.completed {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.stat-icon.in_progress {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid #2196f3;
}

.stat-icon.pending {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.stat-icon.overdue {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.stat-icon.progress {
  background: rgba(156, 39, 176, 0.15);
  color: #9c27b0;
  border: 1px solid #9c27b0;
}

.stat-info {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.stat-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
}

.permission-badge {
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.permission-info {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  border-radius: 30px;
  color: #fff;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
}

.permission-info i {
  color: #FFD700;
  font-size: 1.2rem;
}

.permission-info.team_leader i,
.permission-info.deputy_leader i {
  color: #FFD700;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 5px #FFD700; }
  50% { text-shadow: 0 0 20px #FFD700; }
}

.filters-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.search-box {
  flex: 2;
  min-width: 250px;
  position: relative;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #FFD700;
}

.search-box input {
  width: 100%;
  padding: 12px 45px 12px 45px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.clear-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #b0b0b0;
  cursor: pointer;
  font-size: 1rem;
}

.clear-search:hover {
  color: #f44336;
}

.filter-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex: 3;
}

.filter-select {
  min-width: 130px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: left 15px center;
  padding-left: 40px;
}

.filter-select:focus {
  outline: none;
  border-color: #FFD700;
}

.sort-group {
  display: flex;
  gap: 5px;
}

.sort-dir-btn {
  width: 45px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #FFD700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-dir-btn:hover {
  background: #FFD700;
  color: #000;
  transform: translateY(-2px);
}

.loading-container {
  text-align: center;
  padding: 80px;
  position: relative;
  z-index: 2;
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

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 2;
}

.task-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  position: relative;
}

.task-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 15px 35px rgba(255, 215, 0, 0.15);
}

.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.task-card.urgent::before { background: #f44336; }
.task-card.high::before { background: #ff9800; }
.task-card.medium::before { background: #ffc107; }
.task-card.low::before { background: #4caf50; }

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.task-priority {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.task-priority.urgent {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.task-priority.high {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.task-priority.medium {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
  border: 1px solid #ffc107;
}

.task-priority.low {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.task-ids {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-id {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.task-section-badge {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.task-title {
  padding: 15px 20px 5px;
  font-size: 1.2rem;
  color: #FFD700;
  margin: 0;
  font-weight: 700;
}

.task-description {
  padding: 0 20px 15px;
  color: #b0b0b0;
  font-size: 0.9rem;
  line-height: 1.6;
}

.task-meta {
  padding: 0 20px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 0.9rem;
}

.meta-item i {
  width: 16px;
  color: #FFD700;
}

.text-danger {
  color: #f44336 !important;
}

.text-muted {
  color: #b0b0b0;
}

.overdue-badge {
  background: #f44336;
  color: #fff;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  margin-left: 5px;
}

.task-progress {
  padding: 0 20px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
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
  color: #FFD700;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 35px;
}

.checklist-preview,
.attachments-preview {
  padding: 0 20px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b0b0b0;
  font-size: 0.8rem;
}

.checklist-preview i,
.attachments-preview i {
  color: #FFD700;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.task-status {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

.task-status.pending {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.task-status.in_progress {
  background: rgba(33, 150, 243, 0.15);
  color: #2196f3;
  border: 1px solid #2196f3;
}

.task-status.completed {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.task-status.overdue {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.task-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.action-btn.view {
  background: rgba(33, 150, 243, 0.1);
  border: 1px solid #2196f3;
  color: #2196f3;
}

.action-btn.edit {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid #ffc107;
  color: #ffc107;
}

.action-btn.delete {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
}

.action-btn.view:hover {
  background: #2196f3;
  color: #fff;
  transform: translateY(-2px);
}

.action-btn.edit:hover {
  background: #ffc107;
  color: #000;
  transform: translateY(-2px);
}

.action-btn.delete:hover {
  background: #f44336;
  color: #fff;
  transform: translateY(-2px);
}

.no-data-container {
  text-align: center;
  padding: 80px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  position: relative;
  z-index: 2;
}

.no-data-icon {
  width: 100px;
  height: 100px;
  background: rgba(255, 215, 0, 0.1);
  border: 2px dashed #FFD700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.no-data-icon i {
  font-size: 3rem;
  color: #FFD700;
  opacity: 0.5;
}

.no-data-container h3 {
  color: #FFD700;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.no-data-container p {
  color: #b0b0b0;
  margin-bottom: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #1a1a1a;
  border: 1px solid #FFD700;
  border-radius: 25px;
  max-width: 450px;
  width: 90%;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.warning-header {
  background: linear-gradient(135deg, #3a1a1a, #2a0a0a);
}

.warning-icon {
  font-size: 3rem;
  color: #ffc107;
  margin-bottom: 10px;
}

.modal-header h2 {
  color: #FFD700;
  font-size: 1.5rem;
  margin: 0;
}

.modal-body {
  padding: 20px;
  color: #fff;
}

.warning-text {
  color: #f44336;
  font-size: 0.9rem;
  margin: 10px 0;
}

.form-group {
  margin-top: 20px;
}

.form-group label {
  display: block;
  color: #b0b0b0;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  text-align: center;
}

.form-group input.error {
  border-color: #f44336;
}

.form-group input:focus {
  outline: none;
  border-color: #FFD700;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.btn-delete {
  flex: 2;
  padding: 12px;
  background: #f44336;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-delete:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  border-color: #FFD700;
  color: #FFD700;
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .filter-group {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tasks-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-delete,
  .btn-cancel {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .task-footer {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  
  .task-actions {
    justify-content: center;
  }
}

[dir="rtl"] .search-box i {
  right: 15px;
  left: auto;
}

[dir="rtl"] .search-box input {
  padding: 12px 45px 12px 45px;
}

[dir="rtl"] .clear-search {
  left: 15px;
  right: auto;
}

[dir="rtl"] .filter-select {
  background-position: left 15px center;
  padding-left: 40px;
  padding-right: 20px;
}

[dir="rtl"] .task-card::before {
  left: auto;
  right: 0;
}

</style>
