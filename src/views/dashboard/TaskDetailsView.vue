<template>
  <div class="task-details-view">
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
        <button class="btn-back" @click="goBack">
          <i class="fas fa-arrow-right"></i>
        </button>
        <i class="fas fa-tasks header-icon"></i>
        <div>
          <h1>تفاصيل المهمة</h1>
          <p class="header-subtitle" v-if="task">#{{ task.id }} - {{ task.title }}</p>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="btn-secondary" @click="loadTask" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          تحديث
        </button>
        <button v-if="canEditTask" class="btn-primary" @click="editTask">
          <i class="fas fa-edit"></i>
          تعديل
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل تفاصيل المهمة...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>حدث خطأ</h3>
      <p>{{ error }}</p>
      <div class="error-actions">
        <button class="btn-primary" @click="loadTask">إعادة المحاولة</button>
        <button class="btn-secondary" @click="goBack">العودة</button>
      </div>
    </div>

    <!-- Task Details -->
    <div v-else-if="task" class="task-details">
      <div class="details-grid">
        <!-- المعلومات الأساسية -->
        <div class="details-card main-info">
          <div class="card-header">
            <i class="fas fa-info-circle"></i>
            <h3>المعلومات الأساسية</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="info-label">الحالة:</span>
              <span :class="['status-badge', task.status]">
                <i :class="getStatusIcon(task.status)"></i>
                {{ getStatusText(task.status) }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">الأولوية:</span>
              <span :class="['priority-badge', task.priority]">
                <i :class="getPriorityIcon(task.priority)"></i>
                {{ getPriorityText(task.priority) }}
              </span>
            </div>
            <div class="info-row">
              <span class="info-label">القسم:</span>
              <span class="info-value">{{ task.section?.name || 'غير محدد' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">تاريخ الإنشاء:</span>
              <span class="info-value">{{ formatFullDate(task.created_at) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">تاريخ الاستحقاق:</span>
              <span :class="{ 'text-danger': isOverdue(task) }">
                {{ formatFullDate(task.due_date) }}
                <span v-if="isOverdue(task)" class="overdue-badge">متأخرة</span>
              </span>
            </div>
          </div>
        </div>

        <!-- المسؤولية -->
        <div class="details-card assignment-info">
          <div class="card-header">
            <i class="fas fa-user-tie"></i>
            <h3>المسؤولية</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="info-label">مسندة إلى:</span>
              <div class="user-info">
                <div class="user-avatar" :style="{ backgroundColor: getAvatarColor(task.assigned_to?.name) }">
                  {{ getUserInitials(task.assigned_to?.name) }}
                </div>
                <span>{{ task.assigned_to?.name || 'غير معين' }}</span>
              </div>
            </div>
            <div class="info-row">
              <span class="info-label">بواسطة:</span>
              <div class="user-info">
                <div class="user-avatar" :style="{ backgroundColor: getAvatarColor(task.assigned_by?.name) }">
                  {{ getUserInitials(task.assigned_by?.name) }}
                </div>
                <span>{{ task.assigned_by?.name || 'غير معروف' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- الوصف -->
        <div class="details-card description-card">
          <div class="card-header">
            <i class="fas fa-align-left"></i>
            <h3>الوصف</h3>
          </div>
          <div class="card-body">
            <p class="description-text">{{ task.description || 'لا يوجد وصف' }}</p>
          </div>
        </div>

        <!-- التقدم -->
        <div class="details-card progress-card">
          <div class="card-header">
            <i class="fas fa-chart-line"></i>
            <h3>نسبة التقدم</h3>
          </div>
          <div class="card-body">
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: (task.progress || 0) + '%' }"></div>
              </div>
              <span class="progress-text">{{ task.progress || 0 }}%</span>
            </div>
          </div>
        </div>

        <!-- Checklist -->
        <div class="details-card checklist-card" v-if="task.checklist && task.checklist.length">
          <div class="card-header">
            <i class="fas fa-check-double"></i>
            <h3>قائمة المهام الفرعية</h3>
            <span class="checklist-count">{{ getCompletedChecklist(task.checklist) }}/{{ task.checklist.length }}</span>
          </div>
          <div class="card-body">
            <div v-for="(item, index) in task.checklist" :key="index" class="checklist-item">
              <input 
                type="checkbox" 
                :checked="item.completed" 
                @change="toggleChecklistItem(index)"
                :disabled="!canUpdateTask"
              >
              <span :class="{ 'completed': item.completed }">{{ item.text }}</span>
            </div>
          </div>
        </div>

        <!-- التحديثات مع المرفقات -->
        <div class="details-card updates-card">
          <div class="card-header">
            <i class="fas fa-history"></i>
            <h3>التحديثات</h3>
            <button v-if="canUpdateTask" class="btn-add-update" @click="showAddUpdate = true">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div class="card-body">
            <div v-if="!task.updates || task.updates.length === 0" class="no-updates">
              <i class="fas fa-comment-slash"></i>
              <p>لا توجد تحديثات بعد</p>
            </div>
            <div v-else class="updates-list">
              <div v-for="update in task.updates" :key="update.id" class="update-item">
                <div class="update-header">
                  <div class="update-user">
                    <div class="user-avatar small" :style="{ backgroundColor: getAvatarColor(update.user?.name) }">
                      {{ getUserInitials(update.user?.name) }}
                    </div>
                    <span>{{ update.user?.name || 'مستخدم' }}</span>
                  </div>
                  <span class="update-date">{{ formatRelativeTime(update.created_at) }}</span>
                </div>
                <p class="update-comment">{{ update.comment }}</p>
                <div v-if="update.progress !== null" class="update-progress">
                  <span>التقدم: {{ update.progress }}%</span>
                </div>
                
                <!-- المرفقات مع روابط التحميل والعرض -->
                <div v-if="getAttachmentsList(update.attachments).length > 0" class="update-attachments">
                  <h4 class="attachments-title">
                    <i class="fas fa-paperclip"></i>
                    المرفقات ({{ getAttachmentsList(update.attachments).length }})
                  </h4>
                  <div v-for="(file, index) in getAttachmentsList(update.attachments)" :key="index" class="attachment-item">
                    <div class="file-icon">
                      <i :class="getFileIcon(file.name)"></i>
                    </div>
                    <div class="file-info">
                      <span class="file-name">{{ file.name }}</span>
                      <span class="file-size">{{ formatFileSize(file.size) }}</span>
                    </div>
                    <div class="file-actions">
                      <!-- زر العرض (يفتح في تبويب جديد) -->
                      <a :href="getFullUrl(file.path)" target="_blank" class="file-btn view" title="عرض الملف">
                        <i class="fas fa-eye"></i>
                      </a>
                      <!-- زر التحميل (بيدownload الملف بالاسم الأصلي) -->
                      <a 
                        :href="getFullUrl(file.path)" 
                        :download="file.name" 
                        class="file-btn download" 
                        title="تحميل الملف"
                      >
                        <i class="fas fa-download"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Update Modal -->
    <div v-if="showAddUpdate" class="modal-overlay" @click.self="showAddUpdate = false">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-plus-circle"></i>
          <h3>إضافة تحديث</h3>
          <button class="close-modal" @click="showAddUpdate = false">✕</button>
        </div>
        <form @submit.prevent="submitUpdate">
          <div class="modal-body">
            <div class="form-group">
              <label>التعليق</label>
              <textarea 
                v-model="updateForm.comment" 
                rows="4" 
                placeholder="أكتب تعليقك هنا..."
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label>نسبة التقدم (0-100)</label>
              <input 
                type="number" 
                v-model="updateForm.progress" 
                min="0" 
                max="100"
                placeholder="50"
              >
            </div>
            <div class="form-group">
              <label>المرفقات</label>
              <input 
                type="file" 
                multiple 
                @change="handleFileUpload"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip,.rar,.txt"
              >
              <small class="help-text">الملفات المسموحة: jpg, png, pdf, doc, zip, rar, txt (الحد الأقصى 10MB)</small>
            </div>
            <div v-if="updateForm.attachments.length > 0" class="selected-files">
              <h4>الملفات المحددة:</h4>
              <div v-for="(file, index) in updateForm.attachments" :key="index" class="selected-file">
                <i :class="getFileIcon(file.name)"></i>
                <span>{{ file.name }}</span>
                <span class="file-size">({{ formatFileSize(file.size) }})</span>
                <button type="button" @click="removeFile(index)" class="remove-file">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn-primary" :disabled="updateLoading">
              <i v-if="updateLoading" class="fas fa-spinner fa-spin"></i>
              <span v-else>إضافة التحديث</span>
            </button>
            <button type="button" class="btn-secondary" @click="showAddUpdate = false">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

// ========== State ==========
const loading = ref(false)
const updateLoading = ref(false)
const task = ref(null)
const error = ref(null)
const showAddUpdate = ref(false)
const updateForm = ref({
  comment: '',
  progress: null,
  attachments: []
})

// ========== User ==========
const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// ========== Permissions ==========
const isTeamLeaderOrDeputy = computed(() => {
  const role = currentUser.value?.role
  return role === 'team_leader' || role === 'deputy_leader'
})

const isSectionLeader = computed(() => {
  return currentUser.value?.role === 'section_leader'
})

const canEditTask = computed(() => {
  if (isTeamLeaderOrDeputy.value) return true
  if (isSectionLeader.value && task.value?.section_id === currentUser.value?.section_id) return true
  return task.value?.assigned_by === currentUser.value?.id
})

const canUpdateTask = computed(() => {
  return task.value?.assigned_to === currentUser.value?.id || canEditTask.value
})

// ========== Load Task ==========
const loadTask = async () => {
  loading.value = true
  error.value = null
  
  try {
    const taskId = route.params.id
    const response = await axios.get(`http://localhost:8000/api/tasks-public/${taskId}`)

    if (response.data.success) {
      const taskData = response.data.data
      
      // تأكد من أن updates موجودة
      if (taskData.updates) {
        taskData.updates = taskData.updates.map(update => {
          // تأكد من صيغة attachments
          if (update.attachments) {
            try {
              // إذا كانت string، حولها لـ array
              if (typeof update.attachments === 'string') {
                update.attachments = JSON.parse(update.attachments)
              }
              // تأكد أنها array
              if (!Array.isArray(update.attachments)) {
                update.attachments = []
              }
            } catch (e) {
              update.attachments = []
            }
          } else {
            update.attachments = []
          }
          return update
        })
      }
      
      task.value = taskData
    } else {
      error.value = response.data.error || 'حدث خطأ في تحميل المهمة'
    }
  } catch (err) {
    console.error('Error loading task:', err)
    error.value = err.response?.data?.error || 'حدث خطأ في الاتصال بالخادم'
  } finally {
    loading.value = false
  }
}

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

const getUserInitials = (name) => {
  if (!name) return 'U'
  const nameParts = name.split(' ').filter(part => part.length > 0)
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  } else if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase()
  }
  return 'U'
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return colors[Math.abs(hash) % colors.length]
}

const formatFullDate = (date) => {
  if (!date) return 'غير محدد'
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'غير محدد'
  }
}

const formatRelativeTime = (date) => {
  if (!date) return ''
  try {
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    
    if (diff < 60) return 'الآن'
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`
    if (diff < 604800) return `منذ ${Math.floor(diff / 86400)} يوم`
    return formatFullDate(date)
  } catch {
    return ''
  }
}

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// دالة لتحويل attachments إلى مصفوفة
const getAttachmentsList = (attachments) => {
  if (!attachments) return []
  
  if (typeof attachments === 'string') {
    try {
      return JSON.parse(attachments)
    } catch (e) {
      return []
    }
  }
  
  if (Array.isArray(attachments)) {
    return attachments
  }
  
  return []
}

// دالة للحصول على الرابط الكامل للملف
const getFullUrl = (path) => {
  if (!path) return '#'
  
  if (path.startsWith('http')) {
    return path
  }
  
  // تنظيف المسار من أي storage/ زائد
  let cleanPath = path.replace(/^storage\//, '')
  
  // إضافة base URL
  return `http://localhost:8000/storage/${cleanPath}`
}

// دالة لتحديد أيقونة الملف
const getFileIcon = (fileName) => {
  if (!fileName) return 'fas fa-file'
  
  const extension = fileName.split('.').pop().toLowerCase()
  
  const icons = {
    'jpg': 'fas fa-file-image',
    'jpeg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
    'gif': 'fas fa-file-image',
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'txt': 'fas fa-file-alt',
    'zip': 'fas fa-file-archive',
    'rar': 'fas fa-file-archive'
  }
  
  return icons[extension] || 'fas fa-file'
}

const isOverdue = (task) => {
  if (!task?.due_date || task?.status === 'completed') return false
  return new Date(task.due_date) < new Date()
}

const getCompletedChecklist = (checklist) => {
  if (!checklist || !Array.isArray(checklist)) return 0
  return checklist.filter(item => item.completed).length
}

// ========== Actions ==========
const goBack = () => {
  router.back()
}

const editTask = () => {
  router.push(`/dashboard/tasks/${task.value.id}/edit`)
}

const toggleChecklistItem = async (index) => {
  if (!canUpdateTask.value) return
  
  try {
    const checklist = [...task.value.checklist]
    checklist[index].completed = !checklist[index].completed
    
    const response = await axios.put(`http://localhost:8000/api/tasks-public/${task.value.id}`, {
      checklist
    })
    
    if (response.data.success) {
      task.value.checklist = checklist
    }
  } catch (err) {
    console.error('Error updating checklist:', err)
    alert('حدث خطأ في تحديث القائمة')
  }
}

const handleFileUpload = (event) => {
  updateForm.value.attachments = Array.from(event.target.files)
}

const removeFile = (index) => {
  updateForm.value.attachments.splice(index, 1)
}

// ========== Submit Update مع رفع الملفات ==========
const submitUpdate = async () => {
  if (!updateForm.value.comment) {
    alert('❌ من فضلك أدخل التعليق')
    return
  }
  
  updateLoading.value = true
  
  try {
    const formData = new FormData()
    formData.append('comment', updateForm.value.comment)
    
    if (updateForm.value.progress !== null && updateForm.value.progress !== '') {
      formData.append('progress', updateForm.value.progress)
    }
    
    // إضافة الملفات المرفوعة
    if (updateForm.value.attachments && updateForm.value.attachments.length > 0) {
      updateForm.value.attachments.forEach(file => {
        formData.append('attachments[]', file)
      })
    }
    
    const response = await axios.post(
      `http://localhost:8000/api/tasks-public/${task.value.id}/updates`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    
    if (response.data.success) {
      showAddUpdate.value = false
      updateForm.value = { comment: '', progress: null, attachments: [] }
      await loadTask()
      alert('✅ تم إضافة التحديث بنجاح')
    }
  } catch (err) {
    console.error('❌ Error adding update:', err)
    alert('❌ حدث خطأ في إضافة التحديث')
  } finally {
    updateLoading.value = false
  }
}

// ========== Lifecycle ==========
onMounted(() => {
  loadTask()
})
</script>

<style scoped>
.task-details-view {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
  position: relative;
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

/* ===== Header ===== */
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

.btn-back {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
}

.btn-back:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  transform: translateX(-5px);
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

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.btn-secondary:hover:not(:disabled) {
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-3px);
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Loading ===== */
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

/* ===== Error ===== */
.error-container {
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #f44336;
  border-radius: 30px;
  position: relative;
  z-index: 2;
}

.error-container i {
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 20px;
}

.error-container h3 {
  color: #f44336;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.error-container p {
  color: #b0b0b0;
  margin-bottom: 20px;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* ===== Task Details ===== */
.task-details {
  position: relative;
  z-index: 2;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.details-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.details-card:hover {
  border-color: #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.1);
}

.details-card.main-info,
.details-card.description-card,
.details-card.updates-card {
  grid-column: span 2;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.card-header i {
  color: #FFD700;
  font-size: 1.2rem;
}

.card-header h3 {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
}

.checklist-count {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.btn-add-update {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.btn-add-update:hover {
  background: #FFD700;
  color: #000;
  transform: scale(1.1);
}

.card-body {
  padding: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.info-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.info-label {
  width: 120px;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.info-value {
  color: #fff;
  flex: 1;
}

/* ===== Status & Priority Badges ===== */
.status-badge,
.priority-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
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

.priority-badge.urgent {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid #f44336;
}

.priority-badge.high {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid #ff9800;
}

.priority-badge.medium {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
  border: 1px solid #ffc107;
}

.priority-badge.low {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.text-danger {
  color: #f44336 !important;
}

.overdue-badge {
  background: #f44336;
  color: #fff;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  margin-left: 5px;
}

/* ===== User Info ===== */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
}

.user-avatar.small {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

/* ===== Description ===== */
.description-text {
  color: #fff;
  line-height: 1.8;
  font-size: 1rem;
  margin: 0;
  white-space: pre-wrap;
}

/* ===== Progress ===== */
.progress-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-text {
  color: #FFD700;
  font-size: 1rem;
  font-weight: 700;
  min-width: 45px;
}

/* ===== Checklist ===== */
.checklist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.checklist-item:last-child {
  border-bottom: none;
}

.checklist-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #FFD700;
}

.checklist-item span {
  color: #fff;
  flex: 1;
}

.checklist-item span.completed {
  text-decoration: line-through;
  color: #b0b0b0;
}

/* ===== Updates ===== */
.no-updates {
  text-align: center;
  padding: 40px;
  color: #b0b0b0;
}

.no-updates i {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0.5;
}

.updates-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.update-item {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  padding: 15px;
}

.update-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.update-user {
  display: flex;
  align-items: center;
  gap: 8px;
}

.update-date {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.update-comment {
  color: #fff;
  line-height: 1.6;
  margin: 10px 0;
  white-space: pre-wrap;
}

.update-progress {
  color: #FFD700;
  font-size: 0.9rem;
  margin: 10px 0;
}

/* المرفقات */
.update-attachments {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.attachments-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFD700;
  font-size: 0.95rem;
  margin-bottom: 12px;
}

.attachments-title i {
  font-size: 1rem;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.attachment-item:hover {
  background: rgba(255, 215, 0, 0.05);
  border-color: #FFD700;
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 215, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.file-name {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  word-break: break-word;
}

.file-size {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.file-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.file-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.file-btn.view {
  background: rgba(33, 150, 243, 0.1);
  border-color: rgba(33, 150, 243, 0.3);
  color: #2196f3;
}

.file-btn.view:hover {
  background: #2196f3;
  color: #fff;
  transform: translateY(-2px);
}

.file-btn.download {
  background: rgba(76, 175, 80, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
  color: #4caf50;
}

.file-btn.download:hover {
  background: #4caf50;
  color: #fff;
  transform: translateY(-2px);
}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
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
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  position: sticky;
  top: 0;
  z-index: 1;
}

.modal-header i {
  font-size: 1.5rem;
  color: #FFD700;
}

.modal-header h3 {
  color: #FFD700;
  font-size: 1.3rem;
  margin: 0;
  flex: 1;
}

.close-modal {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #b0b0b0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s;
}

.close-modal:hover {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  transform: scale(1.1);
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #b0b0b0;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input[type="file"] {
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 215, 0, 0.3);
  cursor: pointer;
}

.form-group input[type="file"]:hover {
  border-color: #FFD700;
}

.help-text {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-top: 5px;
}

.selected-files {
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
}

.selected-files h4 {
  color: #FFD700;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.selected-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 5px;
}

.selected-file i {
  color: #FFD700;
  width: 20px;
  flex-shrink: 0;
}

.selected-file span {
  color: #fff;
  flex: 1;
  font-size: 0.9rem;
  word-break: break-word;
}

.remove-file {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.remove-file:hover {
  background: #f44336;
  color: #fff;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .details-card.main-info,
  .details-card.description-card,
  .details-card.updates-card {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .btn-primary,
  .btn-secondary {
    flex: 1;
    justify-content: center;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .info-label {
    width: 100%;
  }
  
  .attachment-item {
    flex-wrap: wrap;
  }
  
  .file-info {
    width: 100%;
  }
  
  .file-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 576px) {
  .header-title {
    flex-wrap: wrap;
  }
  
  .btn-back {
    width: 40px;
    height: 40px;
  }
  
  .header-icon {
    font-size: 2rem;
    padding: 12px;
  }
  
  .header-title h1 {
    font-size: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
}

/* RTL Support */
[dir="rtl"] .btn-back i {
  transform: rotate(180deg);
}

[dir="rtl"] .btn-back:hover {
  transform: translateX(5px);
}

[dir="rtl"] .info-label {
  text-align: right;
}

[dir="rtl"] .file-actions {
  justify-content: flex-start;
}
</style>