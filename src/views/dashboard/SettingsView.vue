<!-- src/views/dashboard/SettingsView.vue -->
<template>
  <div class="settings-view">
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
        <i class="fas fa-cog header-icon"></i>
        <div>
          <h1>الإعدادات</h1>
          <p>تخصيص إعدادات حسابك</p>
        </div>
      </div>
    </div>

    <!-- تبويبات الإعدادات -->
    <div class="settings-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="currentTab = tab.id"
        :class="['tab-btn', { active: currentTab === tab.id }]"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- محتوى الإعدادات -->
    <div class="settings-content">
      <!-- تبويب الملف الشخصي -->
      <div v-if="currentTab === 'profile'" class="settings-panel">
        <div class="panel-header">
          <i class="fas fa-user-circle"></i>
          <h3>إعدادات الملف الشخصي</h3>
        </div>

        <div class="settings-form">
          <div class="form-group">
            <label>الاسم الكامل</label>
            <input type="text" v-model="profileSettings.name" placeholder="أدخل اسمك الكامل" />
          </div>

          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" v-model="profileSettings.email" placeholder="أدخل بريدك الإلكتروني" />
          </div>

          <div class="form-group">
            <label>رقم الهاتف</label>
            <input type="tel" v-model="profileSettings.phone" placeholder="أدخل رقم هاتفك" />
          </div>

          <div class="form-group">
            <label>رقم الواتساب</label>
            <input type="tel" v-model="profileSettings.whatsapp" placeholder="أدخل رقم الواتساب" />
          </div>

          <button @click="saveProfileSettings" class="btn-save" :disabled="savingProfile">
            <i v-if="savingProfile" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ الإعدادات</span>
          </button>
        </div>
      </div>

      <!-- تبويب الإشعارات -->
      <div v-if="currentTab === 'notifications'" class="settings-panel">
        <div class="panel-header">
          <i class="fas fa-bell"></i>
          <h3>إعدادات الإشعارات</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>إشعارات البريد الإلكتروني</h4>
                <p>استلام إشعارات المهام عبر البريد الإلكتروني</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notificationSettings.email_notifications" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-tasks"></i>
              <div>
                <h4>إشعارات المهام الجديدة</h4>
                <p>تنبيه عند إنشاء مهمة جديدة</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notificationSettings.task_notifications" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-clock"></i>
              <div>
                <h4>تذكير المواعيد</h4>
                <p>تذكير قبل موعد استحقاق المهام</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notificationSettings.reminder_notifications" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-check-circle"></i>
              <div>
                <h4>إشعارات إكمال المهام</h4>
                <p>تنبيه عند إكمال أحد أعضاء الفريق مهمة</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="notificationSettings.completion_notifications" />
              <span class="slider"></span>
            </label>
          </div>

          <button @click="saveNotificationSettings" class="btn-save" :disabled="savingNotifications">
            <i v-if="savingNotifications" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ الإعدادات</span>
          </button>
        </div>
      </div>

      <!-- تبويب المظهر -->
      <div v-if="currentTab === 'appearance'" class="settings-panel">
        <div class="panel-header">
          <i class="fas fa-paint-brush"></i>
          <h3>إعدادات المظهر</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-moon"></i>
              <div>
                <h4>الوضع الليلي</h4>
                <p>تفعيل الألوان الداكنة</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="appearanceSettings.dark_mode" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-font"></i>
              <div>
                <h4>حجم الخط</h4>
                <p>تغيير حجم الخط في التطبيق</p>
              </div>
            </div>
            <select v-model="appearanceSettings.font_size" class="setting-select">
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-palette"></i>
              <div>
                <h4>اللون الرئيسي</h4>
                <p>اختر اللون المفضل للتطبيق</p>
              </div>
            </div>
            <div class="color-picker">
              <input type="color" v-model="appearanceSettings.primary_color" />
            </div>
          </div>

          <button @click="saveAppearanceSettings" class="btn-save" :disabled="savingAppearance">
            <i v-if="savingAppearance" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ الإعدادات</span>
          </button>
        </div>
      </div>

      <!-- تبويب الخصوصية والأمان -->
      <div v-if="currentTab === 'privacy'" class="settings-panel">
        <div class="panel-header">
          <i class="fas fa-shield-alt"></i>
          <h3>الخصوصية والأمان</h3>
        </div>

        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-globe"></i>
              <div>
                <h4>الملف الشخصي العام</h4>
                <p>ظهور ملفك الشخصي للأعضاء الآخرين</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="privacySettings.public_profile" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-phone"></i>
              <div>
                <h4>إظهار رقم الهاتف</h4>
                <p>ظهور رقم هاتفك للأعضاء الآخرين</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="privacySettings.show_phone" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-whatsapp"></i>
              <div>
                <h4>إظهار رقم الواتساب</h4>
                <p>ظهور رقم واتسابك للأعضاء الآخرين</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="privacySettings.show_whatsapp" />
              <span class="slider"></span>
            </label>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <i class="fas fa-history"></i>
              <div>
                <h4>سجل النشاطات</h4>
                <p>حفظ سجل نشاطاتك في التطبيق</p>
              </div>
            </div>
            <label class="switch">
              <input type="checkbox" v-model="privacySettings.save_activity" />
              <span class="slider"></span>
            </label>
          </div>

          <button @click="savePrivacySettings" class="btn-save" :disabled="savingPrivacy">
            <i v-if="savingPrivacy" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ الإعدادات</span>
          </button>
        </div>

        <!-- قسم تغيير كلمة المرور -->
        <div class="password-section">
          <h4>تغيير كلمة المرور</h4>
          
          <div class="form-group">
            <label>كلمة المرور الحالية</label>
            <input type="password" v-model="passwordForm.current_password" placeholder="أدخل كلمة المرور الحالية" />
          </div>

          <div class="form-group">
            <label>كلمة المرور الجديدة</label>
            <input type="password" v-model="passwordForm.new_password" placeholder="أدخل كلمة المرور الجديدة" />
          </div>

          <div class="form-group">
            <label>تأكيد كلمة المرور الجديدة</label>
            <input type="password" v-model="passwordForm.confirm_password" placeholder="أعد إدخال كلمة المرور الجديدة" />
          </div>

          <button @click="changePassword" class="btn-change-password" :disabled="changingPassword">
            <i v-if="changingPassword" class="fas fa-spinner fa-spin"></i>
            <span v-else>تغيير كلمة المرور</span>
          </button>
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
const currentTab = ref('profile')
const savingProfile = ref(false)
const savingNotifications = ref(false)
const savingAppearance = ref(false)
const savingPrivacy = ref(false)
const changingPassword = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

// ========== Tabs ==========
const tabs = [
  { id: 'profile', name: 'الملف الشخصي', icon: 'fas fa-user' },
  { id: 'notifications', name: 'الإشعارات', icon: 'fas fa-bell' },
  { id: 'appearance', name: 'المظهر', icon: 'fas fa-paint-brush' },
  { id: 'privacy', name: 'الخصوصية والأمان', icon: 'fas fa-shield-alt' }
]

// ========== Settings Forms ==========
const profileSettings = reactive({
  name: '',
  email: '',
  phone: '',
  whatsapp: ''
})

const notificationSettings = reactive({
  email_notifications: true,
  task_notifications: true,
  reminder_notifications: true,
  completion_notifications: true
})

const appearanceSettings = reactive({
  dark_mode: true,
  font_size: 'medium',
  primary_color: '#FFD700'
})

const privacySettings = reactive({
  public_profile: true,
  show_phone: true,
  show_whatsapp: true,
  save_activity: true
})

const passwordForm = reactive({
  current_password: '',
  new_password: '',
  confirm_password: ''
})

// ========== Computed ==========
const alertIcon = computed(() => {
  return alertType.value === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
})

// ========== Methods ==========
const loadSettings = () => {
  // تحميل إعدادات الملف الشخصي
  profileSettings.name = user.value.name || ''
  profileSettings.email = user.value.email || ''
  profileSettings.phone = user.value.phone || ''
  profileSettings.whatsapp = user.value.whatsapp || ''
  
  // تحميل الإعدادات من localStorage
  const savedNotifications = localStorage.getItem('notification_settings')
  if (savedNotifications) {
    Object.assign(notificationSettings, JSON.parse(savedNotifications))
  }
  
  const savedAppearance = localStorage.getItem('appearance_settings')
  if (savedAppearance) {
    Object.assign(appearanceSettings, JSON.parse(savedAppearance))
  }
  
  const savedPrivacy = localStorage.getItem('privacy_settings')
  if (savedPrivacy) {
    Object.assign(privacySettings, JSON.parse(savedPrivacy))
  }
}

const saveProfileSettings = async () => {
  savingProfile.value = true
  
  try {
    const response = await axios.post(`http://localhost:8000/api/users-update/${user.value.id}`, profileSettings)
    
    if (response.data.success) {
      const updatedUser = { ...user.value, ...profileSettings }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser
      
      showAlertMessage('success', 'تم حفظ إعدادات الملف الشخصي بنجاح')
    }
  } catch (error) {
    console.error('Error saving profile settings:', error)
    showAlertMessage('error', 'حدث خطأ في حفظ الإعدادات')
  } finally {
    savingProfile.value = false
  }
}

const saveNotificationSettings = async () => {
  savingNotifications.value = true
  
  try {
    localStorage.setItem('notification_settings', JSON.stringify(notificationSettings))
    showAlertMessage('success', 'تم حفظ إعدادات الإشعارات بنجاح')
  } catch (error) {
    console.error('Error saving notification settings:', error)
    showAlertMessage('error', 'حدث خطأ في حفظ الإعدادات')
  } finally {
    savingNotifications.value = false
  }
}

const saveAppearanceSettings = async () => {
  savingAppearance.value = true
  
  try {
    localStorage.setItem('appearance_settings', JSON.stringify(appearanceSettings))
    
    // تطبيق الإعدادات على الصفحة
    if (appearanceSettings.dark_mode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    
    document.documentElement.style.setProperty('--primary-color', appearanceSettings.primary_color)
    
    showAlertMessage('success', 'تم حفظ إعدادات المظهر بنجاح')
  } catch (error) {
    console.error('Error saving appearance settings:', error)
    showAlertMessage('error', 'حدث خطأ في حفظ الإعدادات')
  } finally {
    savingAppearance.value = false
  }
}

const savePrivacySettings = async () => {
  savingPrivacy.value = true
  
  try {
    localStorage.setItem('privacy_settings', JSON.stringify(privacySettings))
    showAlertMessage('success', 'تم حفظ إعدادات الخصوصية بنجاح')
  } catch (error) {
    console.error('Error saving privacy settings:', error)
    showAlertMessage('error', 'حدث خطأ في حفظ الإعدادات')
  } finally {
    savingPrivacy.value = false
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
  
  if (passwordForm.new_password !== passwordForm.confirm_password) {
    showAlertMessage('error', 'كلمة المرور الجديدة غير متطابقة')
    return
  }
  
  changingPassword.value = true
  
  try {
    const response = await axios.post(`http://localhost:8000/api/users-password/${user.value.id}`, {
      password: passwordForm.new_password
    })
    
    if (response.data.success) {
      showAlertMessage('success', 'تم تغيير كلمة المرور بنجاح')
      
      // إعادة تعيين النموذج
      passwordForm.current_password = ''
      passwordForm.new_password = ''
      passwordForm.confirm_password = ''
    }
  } catch (error) {
    console.error('Error changing password:', error)
    showAlertMessage('error', 'حدث خطأ في تغيير كلمة المرور')
  } finally {
    changingPassword.value = false
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
  loadSettings()
})
</script>

<style scoped>
.settings-view {
  padding: 20px;
  color: #fff;
  max-width: 1200px;
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
  margin-bottom: 30px;
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

.settings-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
  background: rgba(10, 10, 15, 0.5);
  padding: 10px;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.tab-btn {
  padding: 12px 25px;
  background: transparent;
  border: none;
  border-radius: 40px;
  color: #b0b0b0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  flex: 1;
  justify-content: center;
}

.tab-btn i {
  font-size: 1.2rem;
}

.tab-btn:hover {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.tab-btn.active {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #000;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.settings-content {
  position: relative;
  z-index: 10;
}

.settings-panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 25px;
  padding: 30px;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.panel-header i {
  color: #FFD700;
  font-size: 1.8rem;
}

.panel-header h3 {
  color: #FFD700;
  font-size: 1.3rem;
  margin: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: #b0b0b0;
  font-size: 0.95rem;
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

.form-group input::placeholder {
  color: #555;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 15px;
  transition: all 0.3s;
}

.setting-item:hover {
  background: rgba(255, 215, 0, 0.02);
  border-color: rgba(255, 215, 0, 0.3);
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.setting-info i {
  color: #FFD700;
  font-size: 1.3rem;
  width: 30px;
}

.setting-info h4 {
  color: #fff;
  font-size: 1rem;
  margin: 0 0 4px;
}

.setting-info p {
  color: #b0b0b0;
  font-size: 0.85rem;
  margin: 0;
}

/* Switch toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  transition: .3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: #b0b0b0;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #FFD700;
}

input:checked + .slider:before {
  transform: translateX(24px);
  background-color: #000;
}

.setting-select {
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  min-width: 120px;
}

.setting-select:focus {
  outline: none;
  border-color: #FFD700;
}

.color-picker input {
  width: 60px;
  height: 40px;
  border: 2px solid #FFD700;
  border-radius: 10px;
  cursor: pointer;
  background: transparent;
}

.color-picker input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker input::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}

.btn-save {
  padding: 14px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
  width: 100%;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.password-section h4 {
  color: #FFD700;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.btn-change-password {
  padding: 14px;
  background: transparent;
  border: 2px solid #FFD700;
  border-radius: 12px;
  color: #FFD700;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  margin-top: 20px;
}

.btn-change-password:hover:not(:disabled) {
  background: #FFD700;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-change-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Alert */
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

/* Responsive */
@media (max-width: 992px) {
  .settings-tabs {
    flex-direction: column;
    border-radius: 25px;
  }
  
  .tab-btn {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .settings-panel {
    padding: 20px;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .setting-info {
    width: 100%;
  }
  
  .switch {
    align-self: flex-end;
  }
  
  .setting-select {
    width: 100%;
  }
  
  .alert {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}

@media (max-width: 576px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-icon {
    font-size: 2rem;
    padding: 12px;
  }
  
  .header-content h1 {
    font-size: 1.5rem;
  }
}

[dir="rtl"] .slider:before {
  left: auto;
  right: 3px;
}

[dir="rtl"] input:checked + .slider:before {
  transform: translateX(-24px);
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
