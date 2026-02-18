<template>
  <div class="admin-rejected">
    <!-- Header -->
    <div class="page-header">
      <div class="header-title">
        <i class="fas fa-user-times header-icon"></i>
        <h1>الطلبات المرفوضة</h1>
      </div>
      
      <div class="header-stats">
        <div class="stat-card">
          <span class="stat-value">{{ totalRejected }}</span>
          <span class="stat-label">إجمالي المرفوضين</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ lastWeekRejected }}</span>
          <span class="stat-label">خلال الأسبوع</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{{ rejectionRate }}%</span>
          <span class="stat-label">نسبة الرفض</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="filters.search" 
          placeholder="بحث بالاسم، البريد، أو الرقم الأكاديمي..."
          @input="filterApplicants"
        />
      </div>

      <div class="filter-group">
        <select v-model="filters.dateRange" class="filter-select" @change="filterApplicants">
          <option value="all">كل الفترات</option>
          <option value="today">اليوم</option>
          <option value="week">هذا الأسبوع</option>
          <option value="month">هذا الشهر</option>
          <option value="year">هذه السنة</option>
        </select>

        <select v-model="filters.sortBy" class="filter-select" @change="filterApplicants">
          <option value="newest">الأحدث أولاً</option>
          <option value="oldest">الأقدم أولاً</option>
          <option value="name_asc">الاسم (أ - ي)</option>
          <option value="name_desc">الاسم (ي - أ)</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل البيانات...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <p>{{ error }}</p>
      <button @click="loadRejectedApplicants" class="btn-retry">
        <i class="fas fa-redo"></i>
        إعادة المحاولة
      </button>
    </div>

    <!-- No Data -->
    <div v-else-if="filteredApplicants.length === 0" class="no-data-container">
      <div class="no-data-icon">
        <i class="fas fa-user-times"></i>
      </div>
      <h3>لا توجد طلبات مرفوضة</h3>
      <p>لم يتم رفض أي طلبات حتى الآن</p>
    </div>

    <!-- Rejected Applicants Grid -->
    <div v-else class="rejected-grid">
      <div v-for="applicant in filteredApplicants" :key="applicant.id" class="rejected-card" @click="viewDetails(applicant)">
        <div class="card-header">
          <div class="applicant-avatar">
            {{ getInitials(applicant.name) }}
          </div>
          <div class="applicant-info">
            <h3>{{ applicant.name }}</h3>
            <p class="applicant-email">
              <i class="fas fa-envelope"></i>
              {{ applicant.email }}
            </p>
          </div>
          <div class="card-actions" @click.stop>
            <button @click="viewDetails(applicant)" class="action-btn view" title="عرض التفاصيل">
              <i class="fas fa-eye"></i>
            </button>
            <button @click="openRestoreModal(applicant)" class="action-btn restore" title="استعادة الطلب">
              <i class="fas fa-undo"></i>
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label"><i class="fas fa-id-card"></i> الرقم الأكاديمي</span>
              <span class="info-value">{{ applicant.academic_number || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-phone"></i> الهاتف</span>
              <span class="info-value" dir="ltr">{{ applicant.phone || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fab fa-whatsapp"></i> الواتساب</span>
              <span class="info-value" dir="ltr">{{ applicant.whatsapp || '-' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label"><i class="fas fa-calendar"></i> تاريخ الرفض</span>
              <span class="info-value">{{ formatDate(applicant.updated_at) }}</span>
            </div>
          </div>

          <!-- Rejection Reason -->
          <div v-if="applicant.admin_notes" class="rejection-reason">
            <div class="reason-header">
              <i class="fas fa-times-circle"></i>
              <span>سبب الرفض</span>
            </div>
            <p class="reason-text">{{ applicant.admin_notes }}</p>
          </div>
          <div v-else class="rejection-reason no-reason">
            <i class="fas fa-info-circle"></i>
            <span>لم يتم تحديد سبب الرفض</span>
          </div>
        </div>

        <div class="card-footer">
          <div class="rejected-badge">
            <i class="fas fa-ban"></i>
            مرفوض
          </div>
          <span class="rejected-date">{{ formatRelativeTime(applicant.updated_at) }}</span>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click.self="closeDetailsModal">
      <div class="modal-content details-modal">
        <div class="modal-header">
          <h2><i class="fas fa-user"></i> تفاصيل المتقدم</h2>
          <button @click="closeDetailsModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="modal-body" v-if="selectedApplicant">
          <div class="details-grid">
            <div class="detail-section">
              <h3><i class="fas fa-id-card"></i> المعلومات الشخصية</h3>
              <div class="detail-row">
                <span class="detail-label">الاسم:</span>
                <span class="detail-value">{{ selectedApplicant.name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">البريد الإلكتروني:</span>
                <span class="detail-value">{{ selectedApplicant.email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">الرقم الأكاديمي:</span>
                <span class="detail-value">{{ selectedApplicant.academic_number }}</span>
              </div>
            </div>

            <div class="detail-section">
              <h3><i class="fas fa-phone-alt"></i> معلومات التواصل</h3>
              <div class="detail-row">
                <span class="detail-label">الهاتف:</span>
                <span class="detail-value" dir="ltr">{{ selectedApplicant.phone }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">الواتساب:</span>
                <span class="detail-value" dir="ltr">{{ selectedApplicant.whatsapp }}</span>
              </div>
            </div>

            <div class="detail-section full-width">
              <h3><i class="fas fa-clock"></i> التواريخ</h3>
              <div class="detail-row">
                <span class="detail-label">تاريخ التقديم:</span>
                <span class="detail-value">{{ formatDateTime(selectedApplicant.created_at) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">تاريخ الرفض:</span>
                <span class="detail-value">{{ formatDateTime(selectedApplicant.updated_at) }}</span>
              </div>
            </div>

            <div class="detail-section full-width">
              <h3><i class="fas fa-times-circle" style="color: #f44336;"></i> سبب الرفض</h3>
              <div class="rejection-detail">
                <p>{{ selectedApplicant.admin_notes || 'لم يتم تحديد سبب الرفض' }}</p>
              </div>
            </div>

            <div class="detail-section full-width">
              <h3><i class="fas fa-envelope"></i> رسالة المتقدم</h3>
              <div class="message-detail">
                <p>{{ selectedApplicant.message || 'لا توجد رسالة' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="openRestoreModal(selectedApplicant)" class="btn btn-restore">
            <i class="fas fa-undo"></i>
            استعادة الطلب
          </button>
          <button @click="closeDetailsModal" class="btn btn-secondary">إغلاق</button>
        </div>
      </div>
    </div>

    <!-- Restore Modal -->
    <div v-if="showRestoreModal" class="modal-overlay" @click.self="closeRestoreModal">
      <div class="modal-content restore-modal">
        <div class="modal-header warning-header">
          <i class="fas fa-exclamation-triangle warning-icon"></i>
          <h2>استعادة الطلب</h2>
        </div>
        
        <div class="modal-body" v-if="selectedApplicant">
          <p>هل أنت متأكد من استعادة طلب <strong>{{ selectedApplicant.name }}</strong>؟</p>
          <p class="restore-note">سيتم تحويل حالة الطلب إلى "في الانتظار" ويمكنك التعامل معه مرة أخرى</p>
          
          <div class="form-group">
            <label>ملاحظات (اختياري)</label>
            <textarea v-model="restoreForm.notes" placeholder="أضف ملاحظات حول استعادة الطلب..." rows="3"></textarea>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="restoreApplicant" class="btn btn-restore" :disabled="restoreLoading">
            <i v-if="restoreLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>تأكيد الاستعادة</span>
          </button>
          <button @click="closeRestoreModal" class="btn btn-secondary">إلغاء</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import axios from 'axios'

// ========== البيانات ==========
const loading = ref(false)
const error = ref(null)
const allRejected = ref([])
const filteredApplicants = ref([])
const selectedApplicant = ref(null)
const showDetailsModal = ref(false)
const showRestoreModal = ref(false)
const restoreLoading = ref(false)

// ========== الفلاتر ==========
const filters = reactive({
  search: '',
  dateRange: 'all',
  sortBy: 'newest'
})

// ========== نموذج الاستعادة ==========
const restoreForm = reactive({
  notes: ''
})

// ========== الإحصائيات ==========
const totalRejected = computed(() => allRejected.value.length)

const lastWeekRejected = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  
  return allRejected.value.filter(a => new Date(a.updated_at) >= oneWeekAgo).length
})

const rejectionRate = computed(() => {
  // لو عاوز تحسب النسبة بشكل دقيق، هتحتاج تجيب العدد الكلي
  // حالياً هي 0 لو مفيش مرفوضين
  if (totalRejected.value === 0) return 0
  return '25' // مؤقتاً
})

// ========== دوال مساعدة ==========
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return '-'
  }
}

const formatDateTime = (date) => {
  if (!date) return '-'
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '-'
  }
}

const formatRelativeTime = (date) => {
  if (!date) return ''
  
  try {
    const now = new Date()
    const past = new Date(date)
    const diffMs = now - past
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'الآن'
    if (diffMins < 60) {
      return `منذ ${diffMins} دقيقة`
    } else if (diffHours < 24) {
      return `منذ ${diffHours} ساعة`
    } else if (diffDays < 7) {
      return `منذ ${diffDays} يوم`
    } else {
      return formatDate(date)
    }
  } catch {
    return formatDate(date)
  }
}

// ========== جلب المرفوضين ==========
const loadRejectedApplicants = async () => {
  loading.value = true
  error.value = null
  
  try {
    const res = await axios.get('http://localhost:8000/api/show-applicants')
    
    if (res.data.success) {
      // فلترة المرفوضين فقط
      allRejected.value = (res.data.data || []).filter(a => a.status === 'rejected')
      filterApplicants()
    } else {
      error.value = 'حدث خطأ في جلب البيانات'
    }
  } catch (e) {
    console.error('خطأ في جلب المرفوضين:', e)
    error.value = 'فشل الاتصال بالخادم'
  } finally {
    loading.value = false
  }
}

// ========== فلترة المرفوضين ==========
const filterApplicants = () => {
  let filtered = [...allRejected.value]
  
  // فلترة حسب البحث
  if (filters.search) {
    const s = filters.search.toLowerCase()
    filtered = filtered.filter(a => 
      (a.name && a.name.toLowerCase().includes(s)) ||
      (a.email && a.email.toLowerCase().includes(s)) ||
      (a.academic_number && a.academic_number.toLowerCase().includes(s))
    )
  }
  
  // فلترة حسب التاريخ
  if (filters.dateRange !== 'all') {
    const now = new Date()
    let startDate = new Date()
    
    switch (filters.dateRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }
    
    filtered = filtered.filter(a => new Date(a.updated_at) >= startDate)
  }
  
  // ترتيب
  switch (filters.sortBy) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
      break
    case 'name_asc':
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      break
    case 'name_desc':
      filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
      break
  }
  
  filteredApplicants.value = filtered
}

// ========== دوال المودالات ==========
const viewDetails = (applicant) => {
  selectedApplicant.value = applicant
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedApplicant.value = null
}

const openRestoreModal = (applicant) => {
  selectedApplicant.value = applicant
  restoreForm.notes = ''
  showRestoreModal.value = true
  if (showDetailsModal.value) closeDetailsModal()
}

const closeRestoreModal = () => {
  showRestoreModal.value = false
  if (!showDetailsModal.value) {
    selectedApplicant.value = null
  }
}

// ========== استعادة الطلب ==========
const restoreApplicant = async () => {
  if (!selectedApplicant.value) return
  
  restoreLoading.value = true
  
  try {
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      alert('❌ يجب تسجيل الدخول أولاً')
      restoreLoading.value = false
      return
    }
    
    const response = await fetch(`http://localhost:8000/api/applicants/${selectedApplicant.value.id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'pending',
        notes: restoreForm.notes
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      alert('✅ تم استعادة الطلب بنجاح')
      closeRestoreModal()
      await loadRejectedApplicants() // إعادة تحميل القائمة
    } else {
      alert(data.error || '❌ حدث خطأ في استعادة الطلب')
    }
  } catch (error) {
    console.error('خطأ في استعادة الطلب:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    restoreLoading.value = false
  }
}

// ========== مراقبة الفلاتر ==========
watch(() => filters.search, filterApplicants)
watch(() => filters.dateRange, filterApplicants)
watch(() => filters.sortBy, filterApplicants)

// ========== التحميل الأولي ==========
onMounted(() => {
  loadRejectedApplicants()
})
</script>

<style scoped>
.admin-rejected {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  margin: 0 auto;
  direction: rtl;
}

/* ===== Header Styles ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-title h1 {
  color: #f44336;
  font-size: 2rem;
  margin: 0;
}

.header-icon {
  font-size: 2.5rem;
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
  padding: 15px;
  border-radius: 50%;
}

.header-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 15px;
  padding: 15px 25px;
  text-align: center;
  min-width: 120px;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #f44336;
  line-height: 1.2;
}

.stat-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* ===== Filters Section ===== */
.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-box {
  flex: 2;
  min-width: 300px;
  position: relative;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #f44336;
}

.search-box input {
  width: 100%;
  padding: 15px 45px 15px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #f44336;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.filter-group {
  flex: 1;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-select {
  flex: 1;
  min-width: 150px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #f44336;
}

.filter-select option {
  background: #1a1a1a;
  color: #fff;
}

/* ===== Loading & Error States ===== */
.loading-container {
  text-align: center;
  padding: 100px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(244, 67, 54, 0.1);
  border-top: 4px solid #f44336;
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
  padding: 100px;
  background: rgba(244, 67, 54, 0.05);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 20px;
}

.error-container i {
  font-size: 4rem;
  color: #f44336;
  margin-bottom: 20px;
}

.error-container p {
  color: #f44336;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn-retry {
  padding: 12px 30px;
  background: transparent;
  border: 1px solid #f44336;
  border-radius: 50px;
  color: #f44336;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-retry:hover {
  background: #f44336;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

/* ===== No Data ===== */
.no-data-container {
  text-align: center;
  padding: 80px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 20px;
}

.no-data-icon {
  width: 120px;
  height: 120px;
  background: rgba(244, 67, 54, 0.1);
  border: 2px dashed #f44336;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.no-data-icon i {
  font-size: 4rem;
  color: #f44336;
  opacity: 0.5;
}

.no-data-container h3 {
  color: #f44336;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.no-data-container p {
  color: #b0b0b0;
  font-size: 1.1rem;
}

/* ===== Rejected Grid ===== */
.rejected-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
}

.rejected-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  cursor: pointer;
}

.rejected-card:hover {
  transform: translateY(-5px);
  border-color: #f44336;
  box-shadow: 0 10px 30px rgba(244, 67, 54, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), transparent);
  border-bottom: 1px solid rgba(244, 67, 54, 0.2);
}

.applicant-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #f44336, #d32f2f);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);
}

.applicant-info {
  flex: 1;
}

.applicant-info h3 {
  margin: 0 0 5px;
  color: #fff;
  font-size: 1.2rem;
}

.applicant-email {
  margin: 0;
  color: #b0b0b0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.applicant-email i {
  color: #f44336;
  font-size: 0.8rem;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 35px;
  height: 35px;
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

.action-btn.view:hover {
  background: #2196f3;
  color: #fff;
  transform: translateY(-2px);
}

.action-btn.restore {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid #ffc107;
  color: #ffc107;
}

.action-btn.restore:hover {
  background: #ffc107;
  color: #000;
  transform: translateY(-2px);
}

.card-body {
  padding: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 10px;
  padding: 10px;
}

.info-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.info-label i {
  color: #f44336;
  margin-left: 5px;
}

.info-value {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
}

.rejection-reason {
  background: rgba(244, 67, 54, 0.05);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: 12px;
  padding: 15px;
}

.rejection-reason.no-reason {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.1);
}

.reason-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #f44336;
  font-weight: 600;
}

.reason-text {
  color: #fff;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(244, 67, 54, 0.2);
}

.rejected-badge {
  background: rgba(244, 67, 54, 0.2);
  border: 1px solid #f44336;
  color: #f44336;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.rejected-date {
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* ===== Modal Styles ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #1a1a1a;
  border: 1px solid #f44336;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.details-modal {
  max-width: 700px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(244, 67, 54, 0.2);
}

.modal-header h2 {
  color: #f44336;
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-header {
  background: linear-gradient(135deg, #3a1a1a, #2a0a0a);
  text-align: center;
  flex-direction: column;
  gap: 10px;
}

.warning-icon {
  font-size: 3rem;
  color: #ffc107;
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(244, 67, 54, 0.2);
  color: #b0b0b0;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  border-color: #f44336;
  color: #f44336;
  transform: rotate(90deg);
}

.modal-body {
  padding: 20px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 15px;
  padding: 15px;
}

.detail-section.full-width {
  grid-column: span 2;
}

.detail-section h3 {
  color: #f44336;
  font-size: 1.1rem;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-row {
  display: flex;
  margin-bottom: 10px;
}

.detail-label {
  width: 130px;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.detail-value {
  flex: 1;
  color: #fff;
  font-weight: 500;
}

.rejection-detail,
.message-detail {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  color: #fff;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(244, 67, 54, 0.2);
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-restore {
  background: #ffc107;
  color: #000;
}

.btn-restore:hover:not(:disabled) {
  background: #ffb300;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(244, 67, 54, 0.2);
  color: #fff;
}

.btn-secondary:hover {
  border-color: #f44336;
  color: #f44336;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Restore Modal Specific */
.restore-modal .form-group {
  margin-top: 20px;
}

.restore-modal label {
  display: block;
  color: #ffc107;
  margin-bottom: 5px;
}

.restore-modal textarea {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
}

.restore-modal textarea:focus {
  outline: none;
  border-color: #ffc107;
}

.restore-note {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-section.full-width {
    grid-column: auto;
  }
}

@media (max-width: 768px) {
  .rejected-grid {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .stat-card {
    width: 100%;
  }
  
  .card-header {
    flex-wrap: wrap;
  }
  
  .applicant-info {
    width: 100%;
  }
  
  .card-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
