<template>
  <div class="edit-task-view">
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
        <i class="fas fa-edit header-icon"></i>
        <div>
          <h1>تعديل المهمة</h1>
          <p class="header-subtitle" v-if="task">#{{ task.id }} - {{ task.title }}</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل بيانات المهمة...</p>
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

    <!-- Edit Form -->
    <div v-else-if="task" class="form-container">
      <form @submit.prevent="updateTask" class="task-form">
        <div class="form-group">
          <label>عنوان المهمة</label>
          <input type="text" v-model="form.title" required placeholder="أدخل عنوان المهمة">
        </div>

        <div class="form-group">
          <label>الوصف</label>
          <textarea v-model="form.description" required rows="5" placeholder="أدخل وصف المهمة"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>الحالة</label>
            <select v-model="form.status" required>
              <option value="pending">معلق</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          <div class="form-group">
            <label>الأولوية</label>
            <select v-model="form.priority" required>
              <option value="low">🟢 منخفضة</option>
              <option value="medium">🟡 متوسطة</option>
              <option value="high">🟠 عالية</option>
              <option value="urgent">🔴 عاجلة</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>القسم</label>
            <select v-model="form.section_id" required @change="onSectionChange">
              <option value="">اختر القسم</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>تاريخ الاستحقاق</label>
            <input type="datetime-local" v-model="form.due_date">
          </div>
        </div>

        <div class="form-group">
          <label>تعيين إلى</label>
          <select v-model="form.assigned_to">
            <option value="">غير معين</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>نسبة التقدم (0-100)</label>
          <input type="number" v-model="form.progress" min="0" max="100">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="submitting">
            <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ التغييرات</span>
          </button>
          <button type="button" class="btn-secondary" @click="goBack">إلغاء</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const submitting = ref(false)
const task = ref(null)
const error = ref(null)
const sections = ref([])
const availableUsers = ref([])

const form = reactive({
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  section_id: '',
  assigned_to: '',
  due_date: '',
  progress: 0
})

const loadTask = async () => {
  loading.value = true
  error.value = null
  
  try {
    const taskId = route.params.id
    const response = await axios.get(`http://TECHSTORM.kesug.com/api/tasks-public/${taskId}`)

    if (response.data.success) {
      task.value = response.data.data
      
      form.title = task.value.title || ''
      form.description = task.value.description || ''
      form.status = task.value.status || 'pending'
      form.priority = task.value.priority || 'medium'
      form.section_id = task.value.section_id || ''
      form.assigned_to = task.value.assigned_to || ''
      form.due_date = task.value.due_date ? task.value.due_date.slice(0, 16) : ''
      form.progress = task.value.progress || 0
      
      if (form.section_id) {
        await loadSectionUsers(form.section_id)
      }
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

const loadSectionUsers = async (sectionId) => {
  try {
    const response = await axios.get(`http://TECHSTORM.kesug.com/api/sections/${sectionId}/members`)
    if (response.data.success) {
      availableUsers.value = response.data.data || []
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

const onSectionChange = () => {
  if (!form.section_id) {
    availableUsers.value = []
    form.assigned_to = ''
    return
  }
  loadSectionUsers(form.section_id)
}

const updateTask = async () => {
  submitting.value = true
  
  try {
    const response = await axios.put(`http://TECHSTORM.kesug.com/api/tasks-public/${task.value.id}`, form)

    if (response.data.success) {
      alert('✅ تم تحديث المهمة بنجاح')
      router.push(`/dashboard/tasks/${task.value.id}`)
    }
  } catch (err) {
    console.error('Error updating task:', err)
    alert('❌ حدث خطأ في تحديث المهمة')
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadTask()
  loadSections()
})
</script>

<style scoped>
.edit-task-view {
  padding: 20px;
  color: #fff;
  max-width: 800px;
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
    radial-gradient(2px 2px at 40px 70px, #FFD700, rgba(0,0,0,0));
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
  margin-bottom: 30px;
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

.form-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #FFD700;
  font-size: 0.95rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
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
  min-height: 120px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-primary {
  flex: 2;
  padding: 14px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  flex: 1;
  padding: 14px;
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: #FFD700;
  color: #FFD700;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    padding: 20px;
  }
  
  .header-title {
    flex-wrap: wrap;
  }
  
  .header-title h1 {
    font-size: 1.5rem;
  }
}

[dir="rtl"] .btn-back i {
  transform: rotate(180deg);
}

[dir="rtl"] .btn-back:hover {
  transform: translateX(5px);
}

</style>
