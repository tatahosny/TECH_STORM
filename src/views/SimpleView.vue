<template>
  <div class="simple-view" dir="rtl">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="container">
      <!-- الهيدر -->
      <div class="header">
        <div class="logo">
          <img src="/techstorm-logo.png" alt="TECH STORM" />
          <h1>TECH STORM</h1>
        </div>
        <p class="subtitle">عرض بيانات المتقدمين - نسخة تجريبية</p>
      </div>

      <!-- حالة التحميل -->
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>جاري تحميل البيانات...</p>
      </div>

      <!-- رسالة الخطأ -->
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>حدث خطأ</h3>
        <p>{{ error }}</p>
        <button @click="fetchData" class="retry-btn">
          <i class="fas fa-sync-alt"></i>
          إعادة المحاولة
        </button>
      </div>

      <!-- عرض البيانات -->
      <div v-else>
        <!-- إحصائيات سريعة -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">إجمالي المتقدمين</span>
              <span class="stat-value">{{ applicants.length }}</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon pending">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">في الانتظار</span>
              <span class="stat-value">{{ pendingCount }}</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon accepted">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">مقبول</span>
              <span class="stat-value">{{ acceptedCount }}</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon rejected">
              <i class="fas fa-times-circle"></i>
            </div>
            <div class="stat-info">
              <span class="stat-label">مرفوض</span>
              <span class="stat-value">{{ rejectedCount }}</span>
            </div>
          </div>
        </div>

        <!-- رسالة عدم وجود بيانات -->
        <div v-if="applicants.length === 0" class="no-data">
          <i class="fas fa-inbox"></i>
          <h3>لا توجد بيانات</h3>
          <p>لم يتم إضافة أي متقدمين بعد</p>
        </div>

        <!-- قائمة المتقدمين -->
        <div v-else class="applicants-grid">
          <div v-for="(applicant, index) in applicants" :key="applicant.id" class="applicant-card">
            <div class="card-header">
              <div class="applicant-number">#{{ index + 1 }}</div>
              <div :class="['status-badge', applicant.status]">
                {{ getStatusText(applicant.status) }}
              </div>
            </div>
            
            <div class="card-body">
              <div class="info-row">
                <i class="fas fa-user"></i>
                <span class="info-label">الاسم:</span>
                <span class="info-value">{{ applicant.name || '-' }}</span>
              </div>
              
              <div class="info-row">
                <i class="fas fa-envelope"></i>
                <span class="info-label">البريد:</span>
                <span class="info-value">{{ applicant.email || '-' }}</span>
              </div>
              
              <div class="info-row">
                <i class="fas fa-phone"></i>
                <span class="info-label">الهاتف:</span>
                <span class="info-value" dir="ltr">{{ applicant.phone || '-' }}</span>
              </div>
              
              <div class="info-row">
                <i class="fab fa-whatsapp"></i>
                <span class="info-label">واتساب:</span>
                <span class="info-value" dir="ltr">{{ applicant.whatsapp || '-' }}</span>
              </div>
              
              <div class="info-row">
                <i class="fas fa-graduation-cap"></i>
                <span class="info-label">الرقم الأكاديمي:</span>
                <span class="info-value">{{ applicant.academic_number || '-' }}</span>
              </div>
              
              <div class="info-row">
                <i class="fas fa-calendar-alt"></i>
                <span class="info-label">تاريخ التقديم:</span>
                <span class="info-value">{{ formatDate(applicant.created_at) }}</span>
              </div>
              
              <div class="message-box">
                <i class="fas fa-quote-right"></i>
                <p>{{ applicant.message || 'لا توجد رسالة' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- رابط العودة -->
      <div class="back-link">
        <router-link to="/" class="btn-back">
          <i class="fas fa-home"></i>
          العودة للرئيسية
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const applicants = ref([])
const loading = ref(true)
const error = ref('')

// حساب الإحصائيات
const pendingCount = computed(() => {
  return applicants.value.filter(a => a.status === 'pending').length
})

const acceptedCount = computed(() => {
  return applicants.value.filter(a => a.status === 'accepted').length
})

const rejectedCount = computed(() => {
  return applicants.value.filter(a => a.status === 'rejected').length
})

// دوال مساعدة
const getStatusText = (status) => {
  const map = {
    'pending': 'في الانتظار',
    'reviewed': 'تمت المراجعة',
    'accepted': 'مقبول',
    'rejected': 'مرفوض'
  }
  return map[status] || status
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return '-'
    return d.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return '-'
  }
}

// جلب البيانات
const fetchData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.get('http://localhost:8000/api/show-applicants')
    console.log('API Response:', response.data)
    
    if (response.data.success) {
      applicants.value = response.data.data || []
    } else {
      error.value = 'فشل في تحميل البيانات'
    }
  } catch (e) {
    console.error('Error fetching data:', e)
    if (e.response) {
      error.value = `خطأ ${e.response.status}: ${e.response.data?.error || e.response.statusText}`
    } else if (e.request) {
      error.value = 'لا يمكن الاتصال بالسيرفر. تأكد من تشغيل Laravel'
    } else {
      error.value = e.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.simple-view {
  min-height: 100vh;
  background: #000000;
  position: relative;
  padding: 60px 20px;
  overflow-x: hidden;
  text-align: right;
  font-family: 'Cairo', sans-serif;
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
  background: transparent;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80px 120px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 200px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 300px 150px, #FFD700, rgba(0,0,0,0));
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
  background: transparent;
  background-image: 
    radial-gradient(1px 1px at 120px 330px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 240px 170px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 380px 490px, #FFD700, rgba(0,0,0,0));
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
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.3; }
}

@keyframes floatSphere {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.95); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ===== Header ===== */
.header {
  text-align: center;
  margin-bottom: 50px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.logo img {
  width: 60px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(255,215,0,0.3));
}

.logo h1 {
  color: #FFD700;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 0 0 30px rgba(255,215,0,0.4);
}

.subtitle {
  color: #b0b0b0;
  font-size: 1.2rem;
}

/* ===== Stats Cards ===== */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 10px 30px rgba(255,215,0,0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: rgba(255,215,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.5rem;
}

.stat-icon.pending {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.stat-icon.accepted {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.stat-icon.rejected {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
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

/* ===== Loading ===== */
.loading-container {
  text-align: center;
  padding: 100px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255,215,0,0.1);
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
  padding: 60px 20px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid #f44336;
  border-radius: 30px;
  max-width: 500px;
  margin: 0 auto;
}

.error-container i {
  font-size: 3rem;
  color: #f44336;
  margin-bottom: 15px;
}

.error-container h3 {
  color: #f44336;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.error-container p {
  color: #ff8a80;
  margin-bottom: 20px;
}

.retry-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.retry-btn:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(244, 67, 54, 0.3);
}

/* ===== No Data ===== */
.no-data {
  text-align: center;
  padding: 80px 20px;
  background: rgba(255,255,255,0.02);
  border: 2px dashed rgba(255,215,0,0.3);
  border-radius: 30px;
}

.no-data i {
  font-size: 4rem;
  color: #b0b0b0;
  margin-bottom: 15px;
}

.no-data h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.no-data p {
  color: #b0b0b0;
}

/* ===== Applicants Grid ===== */
.applicants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.applicant-card {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
}

.applicant-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 15px 30px rgba(255,215,0,0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255,215,0,0.05);
  border-bottom: 1px solid rgba(255,215,0,0.2);
}

.applicant-number {
  color: #FFD700;
  font-weight: 700;
  font-size: 1rem;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid #ffc107;
}

.status-badge.accepted {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid #4caf50;
}

.status-badge.rejected {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid #f44336;
}

.card-body {
  padding: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255,215,0,0.05);
}

.info-row i {
  width: 20px;
  color: #FFD700;
  font-size: 1rem;
}

.info-label {
  color: #b0b0b0;
  font-size: 0.9rem;
  min-width: 100px;
}

.info-value {
  color: #fff;
  font-size: 0.95rem;
  flex: 1;
}

.message-box {
  margin-top: 15px;
  padding: 15px;
  background: rgba(255,215,0,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 12px;
  position: relative;
}

.message-box i {
  position: absolute;
  top: 10px;
  right: 15px;
  color: rgba(255,215,0,0.2);
  font-size: 1.5rem;
}

.message-box p {
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-right: 30px;
}

/* ===== Back Link ===== */
.back-link {
  text-align: center;
  margin-top: 40px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 30px;
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 30px;
  color: #FFD700;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-back:hover {
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  transform: translateX(-5px);
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
  
  .applicants-grid {
    grid-template-columns: 1fr;
  }
  
  .logo h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .info-label {
    min-width: auto;
  }
}
</style>