<template>
  <div class="profile-view">
    <!-- خلفية فضائية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
    </div>

    <div class="profile-container">
      <!-- الهيدر -->
      <div class="profile-header">
        <div class="header-content">
          <i class="fas fa-user-circle header-icon"></i>
          <div>
            <h1>الملف الشخصي</h1>
            <p>عرض وتعديل بياناتك الشخصية</p>
          </div>
        </div>
      </div>

      <!-- المحتوى الرئيسي -->
      <div class="profile-content">
        <!-- بطاقة الصورة الشخصية -->
        <div class="profile-card avatar-card">
          <div class="avatar-wrapper">
            <div class="avatar" :style="{ backgroundColor: getAvatarColor() }">
              {{ getUserInitials() }}
            </div>
            <div class="avatar-status" :class="user.status"></div>
          </div>
          <h2>{{ user.name || 'مستخدم' }}</h2>
          <span :class="['role-badge', user.role]">{{ getRoleName(user.role) }}</span>
          <p class="member-since">عضو منذ {{ formatDate(user.created_at) }}</p>
        </div>

        <!-- بطاقة المعلومات الشخصية -->
        <div class="profile-card info-card">
          <div class="card-header">
            <i class="fas fa-info-circle"></i>
            <h3>المعلومات الشخصية</h3>
            <button @click="toggleEdit" class="edit-btn" v-if="!isEditing">
              <i class="fas fa-edit"></i>
              تعديل
            </button>
          </div>

          <!-- عرض المعلومات -->
          <div v-if="!isEditing" class="info-grid">
            <div class="info-item">
              <span class="info-label">الاسم الكامل:</span>
              <span class="info-value">{{ user.name || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">البريد الإلكتروني:</span>
              <span class="info-value">{{ user.email || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">الرقم الأكاديمي:</span>
              <span class="info-value">{{ user.academic_number || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">رقم الهاتف:</span>
              <span class="info-value">{{ user.phone || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">رقم الواتساب:</span>
              <span class="info-value">{{ user.whatsapp || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">القسم:</span>
              <span class="info-value">{{ user.section?.name || 'غير محدد' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">الدور:</span>
              <span class="info-value">{{ getRoleName(user.role) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">الحالة:</span>
              <span :class="['status-badge', user.status]">{{ getStatusName(user.status) }}</span>
            </div>
          </div>

          <!-- نموذج تعديل المعلومات -->
          <div v-else class="edit-form">
            <div class="form-group">
              <label>الاسم الكامل</label>
              <input type="text" v-model="editForm.name" placeholder="أدخل الاسم الكامل" />
            </div>
            <div class="form-group">
              <label>البريد الإلكتروني</label>
              <input type="email" v-model="editForm.email" placeholder="أدخل البريد الإلكتروني" />
            </div>
            <div class="form-group">
              <label>الرقم الأكاديمي</label>
              <input type="text" v-model="editForm.academic_number" placeholder="أدخل الرقم الأكاديمي" />
            </div>
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input type="tel" v-model="editForm.phone" placeholder="أدخل رقم الهاتف" />
            </div>
            <div class="form-group">
              <label>رقم الواتساب</label>
              <input type="tel" v-model="editForm.whatsapp" placeholder="أدخل رقم الواتساب" />
            </div>

            <div class="form-actions">
              <button @click="saveChanges" class="btn-save" :disabled="saving">
                <i v-if="saving" class="fas fa-spinner fa-spin"></i>
                <span v-else>حفظ التغييرات</span>
              </button>
              <button @click="cancelEdit" class="btn-cancel">إلغاء</button>
            </div>
          </div>
        </div>

        <!-- بطاقة تغيير كلمة المرور -->
        <div class="profile-card password-card">
          <div class="card-header">
            <i class="fas fa-lock"></i>
            <h3>تغيير كلمة المرور</h3>
          </div>

          <div class="password-form">
            <div class="form-group">
              <label>كلمة المرور الحالية</label>
              <div class="password-input">
                <input :type="showCurrentPassword ? 'text' : 'password'" v-model="passwordForm.current_password" placeholder="أدخل كلمة المرور الحالية" />
                <button type="button" @click="showCurrentPassword = !showCurrentPassword" class="toggle-password">
                  <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>كلمة المرور الجديدة</label>
              <div class="password-input">
                <input :type="showNewPassword ? 'text' : 'password'" v-model="passwordForm.new_password" placeholder="أدخل كلمة المرور الجديدة" />
                <button type="button" @click="showNewPassword = !showNewPassword" class="toggle-password">
                  <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>تأكيد كلمة المرور الجديدة</label>
              <div class="password-input">
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="passwordForm.new_password_confirmation" placeholder="أعد إدخال كلمة المرور الجديدة" />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="toggle-password">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <!-- مؤشر قوة كلمة المرور -->
            <div class="password-strength" v-if="passwordForm.new_password">
              <div class="strength-bar">
                <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.percentage + '%' }"></div>
              </div>
              <span class="strength-text" :class="passwordStrength.class">{{ passwordStrength.text }}</span>
            </div>

            <button @click="changePassword" class="btn-change-password" :disabled="changingPassword">
              <i v-if="changingPassword" class="fas fa-spinner fa-spin"></i>
              <span v-else>تغيير كلمة المرور</span>
            </button>
          </div>
        </div>

        <!-- إحصائيات سريعة -->
        <div class="profile-card stats-card">
          <div class="card-header">
            <i class="fas fa-chart-line"></i>
            <h3>إحصائيات سريعة</h3>
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ userStats.total_tasks || 0 }}</span>
              <span class="stat-label">إجمالي المهام</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userStats.completed_tasks || 0 }}</span>
              <span class="stat-label">المهام المكتملة</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userStats.pending_tasks || 0 }}</span>
              <span class="stat-label">المهام المعلقة</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ userStats.completion_rate || 0 }}%</span>
              <span class="stat-label">نسبة الإنجاز</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- رسائل التنبيه -->
    <div v-if="showAlert" class="alert" :class="alertType">
      <i :class="alertIcon"></i>
      <span>{{ alertMessage }}</span>
      <button @click="showAlert = false" class="close-alert">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// ========== State ==========
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const userStats = ref({})
const isEditing = ref(false)
const saving = ref(false)
const changingPassword = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// إظهار/إخفاء كلمة المرور
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// ========== Forms ==========
const editForm = reactive({
  name: '',
  email: '',
  academic_number: '',
  phone: '',
  whatsapp: ''
})

const passwordForm = reactive({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

// ========== Computed ==========
const alertIcon = computed(() => {
  return alertType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
})

// قوة كلمة المرور
const passwordStrength = computed(() => {
  const password = passwordForm.new_password
  if (!password) return { percentage: 0, text: '', class: '' }
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (password.match(/[a-z]+/)) strength += 25
  if (password.match(/[A-Z]+/)) strength += 25
  if (password.match(/[0-9]+/)) strength += 15
  if (password.match(/[$@#&!]+/)) strength += 10
  
  if (strength < 30) return { percentage: strength, text: 'ضعيفة', class: 'weak' }
  if (strength < 60) return { percentage: strength, text: 'متوسطة', class: 'medium' }
  if (strength < 80) return { percentage: strength, text: 'جيدة', class: 'good' }
  return { percentage: strength, text: 'قوية', class: 'strong' }
})

// ========== Methods ==========
const getUserInitials = () => {
  const name = user.value?.name || ''
  const nameParts = name.split(' ').filter(part => part.length > 0)
  
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  } else if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase()
  }
  return 'U'
}

const getAvatarColor = () => {
  const colors = [
    '#FFD700', '#FFA500', '#FF8C00', '#FF7F50',
    '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6'
  ]
  
  const name = user.value?.name || ''
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  
  return colors[Math.abs(hash) % colors.length]
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

const getStatusName = (status) => {
  const statuses = {
    'active': 'نشط',
    'inactive': 'غير نشط',
    'away': 'بعيد'
  }
  return statuses[status] || status
}

const formatDate = (date) => {
  if (!date) return 'غير محدد'
  try {
    const d = new Date(date)
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'غير محدد'
  }
}

const toggleEdit = () => {
  // ملء النموذج بالبيانات الحالية
  editForm.name = user.value.name || ''
  editForm.email = user.value.email || ''
  editForm.academic_number = user.value.academic_number || ''
  editForm.phone = user.value.phone || ''
  editForm.whatsapp = user.value.whatsapp || ''
  
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  // إعادة تعيين النموذج
  editForm.name = ''
  editForm.email = ''
  editForm.academic_number = ''
  editForm.phone = ''
  editForm.whatsapp = ''
}

const saveChanges = async () => {
  saving.value = true
  
  try {
    const response = await axios.post(`http://TECHSTORM.kesug.com/api/users-update/${user.value.id}`, editForm)
    
    if (response.data.success) {
      // تحديث بيانات المستخدم في localStorage
      const updatedUser = { ...user.value, ...editForm }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser
      
      showAlertMessage('success', 'تم تحديث البيانات بنجاح')
      isEditing.value = false
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    showAlertMessage('error', 'حدث خطأ في تحديث البيانات')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  // التحقق من صحة البيانات
  if (!passwordForm.current_password) {
    showAlertMessage('error', 'يرجى إدخال كلمة المرور الحالية')
    return
  }
  
  if (!passwordForm.new_password) {
    showAlertMessage('error', 'يرجى إدخال كلمة المرور الجديدة')
    return
  }
  
  if (passwordForm.new_password.length < 6) {
    showAlertMessage('error', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    return
  }
  
  if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
    showAlertMessage('error', 'كلمة المرور الجديدة غير متطابقة')
    return
  }
  
  changingPassword.value = true
  
  try {
    const response = await axios.post(`http://TECHSTORM.kesug.com/api/users-password/${user.value.id}`, {
      password: passwordForm.new_password
    })
    
    if (response.data.success) {
      showAlertMessage('success', 'تم تغيير كلمة المرور بنجاح')
      
      // إعادة تعيين النموذج
      passwordForm.current_password = ''
      passwordForm.new_password = ''
      passwordForm.new_password_confirmation = ''
    }
  } catch (error) {
    console.error('Error changing password:', error)
    showAlertMessage('error', 'حدث خطأ في تغيير كلمة المرور')
  } finally {
    changingPassword.value = false
  }
}

const loadUserStats = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    
    const response = await axios.get('http://TECHSTORM.kesug.com/api/dashboard/my-stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.data.success) {
      userStats.value = response.data.data || {}
    }
  } catch (error) {
    console.error('Error loading user stats:', error)
  }
}

const showAlertMessage = (type, message) => {
  alertType.value = type
  alertMessage.value = message
  showAlert.value = true
  
  setTimeout(() => {
    showAlert.value = false
  }, 3000)
}

// ========== Lifecycle ==========
onMounted(() => {
  loadUserStats()
})
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  color: #fff;
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
  background-repeat: no-repeat;
  background-size: 200px 200px;
  opacity: 0.4;
  animation: starsMove 100s linear infinite;
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

@keyframes starsMove {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}

.profile-container {
  position: relative;
  z-index: 10;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon {
  font-size: 3rem;
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  padding: 20px;
  border-radius: 50%;
  border: 1px solid #FFD700;
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

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 25px;
}

.profile-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.profile-card:hover {
  border-color: #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.1);
}

/* بطاقة الصورة الشخصية */
.avatar-card {
  text-align: center;
  grid-column: 1;
  grid-row: span 2;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: #000;
  margin: 0 auto;
  border: 3px solid #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  transition: all 0.3s;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
}

.avatar-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
}

.avatar-status.active {
  background: #10b981;
  box-shadow: 0 0 15px #10b981;
}

.avatar-status.inactive {
  background: #ef4444;
  box-shadow: 0 0 15px #ef4444;
}

.avatar-status.away {
  background: #f59e0b;
  box-shadow: 0 0 15px #f59e0b;
}

.avatar-card h2 {
  color: #FFD700;
  font-size: 1.5rem;
  margin: 10px 0 5px;
}

.role-badge {
  display: inline-block;
  padding: 6px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 10px 0;
}

.role-badge.team_leader {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.role-badge.deputy_leader {
  background: rgba(192, 192, 192, 0.15);
  color: #C0C0C0;
  border: 1px solid #C0C0C0;
}

.role-badge.section_leader {
  background: rgba(205, 127, 50, 0.15);
  color: #CD7F32;
  border: 1px solid #CD7F32;
}

.role-badge.member {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.member-since {
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* بطاقة المعلومات */
.info-card {
  grid-column: 2;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  position: relative;
}

.card-header i {
  color: #FFD700;
  font-size: 1.5rem;
}

.card-header h3 {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0;
  flex: 1;
}

.edit-btn {
  background: transparent;
  border: 1px solid #FFD700;
  color: #FFD700;
  padding: 8px 15px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.edit-btn:hover {
  background: #FFD700;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.info-value {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  width: fit-content;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.status-badge.away {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

/* نموذج التعديل */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.form-group input {
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.btn-save {
  flex: 2;
  padding: 12px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
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

/* بطاقة تغيير كلمة المرور */
.password-card {
  grid-column: 2;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding: 12px 45px 12px 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
}

.password-input input:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #b0b0b0;
  cursor: pointer;
  font-size: 1.1rem;
}

.toggle-password:hover {
  color: #FFD700;
}

/* مؤشر قوة كلمة المرور */
.password-strength {
  margin: 5px 0;
}

.strength-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 5px;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s;
}

.strength-fill.weak {
  background: #ef4444;
}

.strength-fill.medium {
  background: #f59e0b;
}

.strength-fill.good {
  background: #3b82f6;
}

.strength-fill.strong {
  background: #10b981;
}

.strength-text {
  font-size: 0.8rem;
}

.strength-text.weak {
  color: #ef4444;
}

.strength-text.medium {
  color: #f59e0b;
}

.strength-text.good {
  color: #3b82f6;
}

.strength-text.strong {
  color: #10b981;
}

.btn-change-password {
  padding: 12px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-change-password:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

/* بطاقة الإحصائيات */
.stats-card {
  grid-column: 2;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #FFD700;
  line-height: 1.2;
}

.stat-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* رسائل التنبيه */
.alert {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 15px 25px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.alert.success {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  color: #10b981;
}

.alert.error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid #ef4444;
  color: #ef4444;
}

.alert i {
  font-size: 1.3rem;
}

.close-alert {
  background: transparent;
  border: none;
  color: currentColor;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.7;
  transition: all 0.3s;
}

.close-alert:hover {
  opacity: 1;
  transform: scale(1.1);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .avatar-card {
    grid-row: auto;
  }
  
  .info-card,
  .password-card,
  .stats-card {
    grid-column: 1;
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .profile-container {
    padding: 20px;
  }
  
  .header-icon {
    font-size: 2.5rem;
    padding: 15px;
  }
  
  .header-content h1 {
    font-size: 1.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .profile-card {
    padding: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .alert {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}

[dir="rtl"] .toggle-password {
  right: auto;
  left: 10px;
}

[dir="rtl"] .alert {
  right: auto;
  left: 30px;
}

@media (max-width: 768px) {
  [dir="rtl"] .alert {
    left: 20px;
    right: 20px;
  }
}

</style>
