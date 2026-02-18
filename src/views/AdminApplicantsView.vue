<template>
  <div class="admin-applicants">
    <!-- Header -->
    <div class="page-header">
      <h1>
        <i class="fas fa-user-plus"></i>
        طلبات الانضمام
      </h1>
      <div class="header-stats">
        <div class="stat-badge">
          <span class="stat-label">في الانتظار</span>
          <span class="stat-value pending">{{ stats.pending || 0 }}</span>
        </div>
        <div class="stat-badge">
          <span class="stat-label">مقبول</span>
          <span class="stat-value accepted">{{ stats.accepted || 0 }}</span>
        </div>
        <div class="stat-badge">
          <span class="stat-label">مرفوض</span>
          <span class="stat-value rejected">{{ stats.rejected || 0 }}</span>
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
          placeholder="بحث بالاسم أو البريد..."
          @input="filterApplicants"
        />
      </div>
      
      <div class="filter-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="filters.status = tab.value; filterApplicants()"
          :class="['filter-tab', { active: filters.status === tab.value }]"
        >
          <i :class="tab.icon"></i>
          {{ tab.label }}
          <span class="tab-count">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري التحميل...</p>
    </div>

    <!-- Applicants Table -->
    <div v-else class="table-container">
      <table class="applicants-table">
        <thead>
          <tr>
            <th>#</th>
            <th>الاسم</th>
            <th>البريد</th>
            <th>الرقم الأكاديمي</th>
            <th>الهاتف</th>
            <th>الواتساب</th>
            <th>التاريخ</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in filteredApplicants" :key="app.id">
            <td>{{ index + 1 }}</td>
            <td>{{ app.name || '-' }}</td>
            <td>{{ app.email || '-' }}</td>
            <td>{{ app.academic_number || '-' }}</td>
            <td dir="ltr">{{ app.phone || '-' }}</td>
            <td dir="ltr">{{ app.whatsapp || '-' }}</td>
            <td>{{ formatDate(app.created_at) }}</td>
            <td>
              <span :class="['status-badge', app.status]">{{ getStatusText(app.status) }}</span>
            </td>
            <td>
              <div class="actions">
                <button @click="viewDetails(app)" class="btn-icon view" title="عرض">
                  <i class="fas fa-eye"></i>
                </button>
                <button v-if="app.status === 'pending'" @click="openAcceptModal(app)" class="btn-icon accept" title="قبول">
                  <i class="fas fa-check"></i>
                </button>
                <button v-if="app.status === 'pending'" @click="openRejectModal(app)" class="btn-icon reject" title="رفض">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredApplicants.length === 0">
            <td colspan="9" class="no-data">لا توجد طلبات</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click.self="closeDetailsModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="fas fa-user"></i> تفاصيل المتقدم</h2>
          <button @click="closeDetailsModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body" v-if="selectedApplicant">
          <div class="detail-row"><strong>الاسم:</strong> {{ selectedApplicant.name }}</div>
          <div class="detail-row"><strong>البريد:</strong> {{ selectedApplicant.email }}</div>
          <div class="detail-row"><strong>الرقم الأكاديمي:</strong> {{ selectedApplicant.academic_number }}</div>
          <div class="detail-row"><strong>الهاتف:</strong> {{ selectedApplicant.phone }}</div>
          <div class="detail-row"><strong>الواتساب:</strong> {{ selectedApplicant.whatsapp }}</div>
          <div class="detail-row"><strong>تاريخ التقديم:</strong> {{ formatDateTime(selectedApplicant.created_at) }}</div>
          <div class="detail-row full"><strong>الرسالة:</strong> {{ selectedApplicant.message }}</div>
          
          <!-- عرض سبب الرفض إذا كان مرفوض -->
          <div v-if="selectedApplicant.status === 'rejected' && selectedApplicant.admin_notes" class="rejection-info">
            <h4><i class="fas fa-times-circle" style="color: #f44336;"></i> سبب الرفض:</h4>
            <p class="rejection-notes">{{ selectedApplicant.admin_notes }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeDetailsModal" class="btn btn-secondary">إغلاق</button>
        </div>
      </div>
    </div>

    <!-- Accept Modal -->
    <div v-if="showAcceptModal" class="modal-overlay" @click.self="closeAcceptModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="fas fa-check-circle" style="color: #4caf50;"></i> قبول المتقدم</h2>
          <button @click="closeAcceptModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="modal-body" v-if="selectedApplicant">
          <p class="section-title">اختر القسم لـ <strong>{{ selectedApplicant.name }}</strong></p>
          
          <!-- القسم الرئيسي -->
          <div class="form-group">
            <label><i class="fas fa-sitemap"></i> القسم الرئيسي</label>
            <select v-model="acceptForm.section_id" required @change="onSectionChange">
              <option value="">-- اختر القسم --</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.name }}
              </option>
            </select>
          </div>
          
          <!-- الأقسام الفرعية -->
          <div class="form-group" v-if="acceptForm.section_id">
            <label><i class="fas fa-code-branch"></i> الأقسام الفرعية</label>
            <div class="sub-sections-grid">
              <div v-for="sub in availableSubSections" :key="sub" class="sub-item">
                <label>
                  <input type="checkbox" :value="sub" v-model="acceptForm.sub_sections">
                  <span>{{ getSubName(sub) }}</span>
                </label>
              </div>
            </div>
            <small class="hint">يمكن اختيار أكثر من قسم</small>
          </div>
          
          <!-- الدور -->
          <div class="form-group">
            <label><i class="fas fa-user-tag"></i> الدور</label>
            <select v-model="acceptForm.role">
              <option value="member">عضو</option>
              <option value="section_leader">رئيس قسم</option>
            </select>
          </div>

          <!-- كلمة المرور -->
          <div class="form-group password-group">
            <label><i class="fas fa-lock"></i> كلمة المرور</label>
            <div class="password-input-wrapper">
              <input 
                :type="showPasswordField ? 'text' : 'password'" 
                v-model="acceptForm.password" 
                placeholder="أدخل كلمة المرور"
                required
              />
              <button type="button" @click="showPasswordField = !showPasswordField" class="toggle-password-btn">
                <i :class="showPasswordField ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <small class="hint">كلمة المرور سيتم استخدامها لتسجيل دخول العضو</small>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="acceptApplicant" class="btn btn-accept" :disabled="!acceptForm.section_id || !acceptForm.password || acceptLoading">
            <i v-if="acceptLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>قبول وإنشاء حساب</span>
          </button>
          <button @click="closeAcceptModal" class="btn btn-secondary">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- Account Created Modal -->
    <div v-if="showAccountModal" class="modal-overlay" @click.self="closeAccountModal">
      <div class="modal-content account-modal">
        <div class="modal-header success-header">
          <i class="fas fa-check-circle success-icon"></i>
          <h2>✅ تم إنشاء الحساب بنجاح</h2>
        </div>
        
        <div class="modal-body" v-if="newUser">
          <div class="user-card">
            <div class="user-avatar">
              <i class="fas fa-user-astronaut"></i>
            </div>
            <h3>{{ newUser.name }}</h3>
            <p class="user-role">{{ getRoleText(newUser.role) }}</p>
          </div>

          <!-- المعلومات الشخصية -->
          <div class="info-card">
            <h4><i class="fas fa-id-card"></i> المعلومات الشخصية</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">الاسم:</span>
                <span class="value">{{ newUser.name }}</span>
                <button @click="copyToClipboard(newUser.name)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="info-item">
                <span class="label">البريد:</span>
                <span class="value">{{ newUser.email }}</span>
                <button @click="copyToClipboard(newUser.email)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="info-item">
                <span class="label">كلمة المرور:</span>
                <span class="value password-field">
                  <span>{{ showPassword ? newUser.password : '••••••••' }}</span>
                  <button @click="showPassword = !showPassword" class="toggle-btn-small" title="إظهار/إخفاء">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </span>
                <button @click="copyToClipboard(newUser.password)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="info-item">
                <span class="label">الرقم الأكاديمي:</span>
                <span class="value">{{ newUser.academic_number }}</span>
                <button @click="copyToClipboard(newUser.academic_number)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- معلومات التواصل -->
          <div class="info-card">
            <h4><i class="fas fa-phone-alt"></i> معلومات التواصل</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">الهاتف:</span>
                <span class="value" dir="ltr">{{ newUser.phone }}</span>
                <button @click="copyToClipboard(newUser.phone)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="info-item">
                <span class="label">الواتساب:</span>
                <span class="value" dir="ltr">{{ newUser.whatsapp }}</span>
                <button @click="copyToClipboard(newUser.whatsapp)" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- معلومات القسم -->
          <div class="info-card">
            <h4><i class="fas fa-sitemap"></i> معلومات القسم</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">القسم:</span>
                <span class="value">{{ getSectionName(newUser.section_id) }}</span>
                <button @click="copyToClipboard(getSectionName(newUser.section_id))" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="info-item" v-if="newUser.sub_sections && newUser.sub_sections.length > 0">
                <span class="label">الأقسام الفرعية:</span>
                <span class="value">{{ getSubSectionsText(newUser.sub_sections) }}</span>
                <button @click="copyToClipboard(getSubSectionsText(newUser.sub_sections))" class="copy-btn-small" title="نسخ">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- أزرار الإجراءات -->
          <div class="action-buttons">
            <button @click="copyAllData" class="btn-copy-all">
              <i class="fas fa-copy"></i>
              نسخ كل البيانات
            </button>
            <a :href="`mailto:${newUser.email}?subject=مرحباً بك في TECH STORM&body=${getEmailBody()}`" class="btn-email" target="_blank">
              <i class="fas fa-envelope"></i>
              إرسال بريد
            </a>
            <a :href="`https://wa.me/${newUser.whatsapp}?text=${getWhatsAppMessage()}`" class="btn-whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i>
              إرسال واتساب
            </a>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeAccountModal" class="btn btn-primary">تم</button>
          <button @click="openNewAcceptModal" class="btn btn-outline">
            <i class="fas fa-user-plus"></i>
            قبول عضو آخر
          </button>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="modal-overlay" @click.self="closeRejectModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2><i class="fas fa-times-circle" style="color: #f44336;"></i> رفض المتقدم</h2>
          <button @click="closeRejectModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>
        
        <div class="modal-body" v-if="selectedApplicant">
          <p>هل أنت متأكد من رفض <strong>{{ selectedApplicant.name }}</strong>؟</p>
          <textarea v-model="rejectForm.notes" placeholder="سبب الرفض (اختياري)" rows="3"></textarea>
        </div>
        
        <div class="modal-footer">
          <button @click="rejectApplicant" class="btn btn-reject" :disabled="rejectLoading">
            <i v-if="rejectLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>تأكيد الرفض</span>
          </button>
          <button @click="closeRejectModal" class="btn btn-secondary">إلغاء</button>
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
const allApplicants = ref([])
const filteredApplicants = ref([])
const sections = ref([])
const selectedApplicant = ref(null)
const showDetailsModal = ref(false)
const showAcceptModal = ref(false)
const showRejectModal = ref(false)
const showAccountModal = ref(false)
const acceptLoading = ref(false)
const rejectLoading = ref(false)
const newUser = ref(null)
const showPassword = ref(false)
const showPasswordField = ref(false)

// ========== الفلاتر ==========
const filters = reactive({
  search: '',
  status: 'all'
})

// ========== نماذج القبول والرفض ==========
const acceptForm = reactive({
  section_id: '',
  sub_sections: [],
  role: 'member',
  password: ''
})

const rejectForm = reactive({
  notes: ''
})

// ========== الإحصائيات ==========
const stats = reactive({
  pending: 0,
  accepted: 0,
  rejected: 0
})

// ========== التبويبات ==========
const tabs = computed(() => [
  { value: 'all', label: 'الكل', icon: 'fas fa-list', count: allApplicants.value.length },
  { value: 'pending', label: 'في الانتظار', icon: 'fas fa-clock', count: stats.pending },
  { value: 'accepted', label: 'مقبول', icon: 'fas fa-user-check', count: stats.accepted },
  { value: 'rejected', label: 'مرفوض', icon: 'fas fa-user-times', count: stats.rejected }
])

// ========== الأقسام الفرعية المتاحة ==========
const availableSubSections = computed(() => {
  const section = sections.value.find(s => s.id === acceptForm.section_id)
  return section?.sub_sections || []
})

// ========== دوال مساعدة ==========
const getStatusText = (status) => {
  const map = {
    'pending': 'في الانتظار',
    'accepted': 'مقبول',
    'rejected': 'مرفوض'
  }
  return map[status] || status
}

const getRoleText = (role) => {
  const map = {
    'team_leader': 'قائد الفريق',
    'deputy_leader': 'نائب القائد',
    'section_leader': 'رئيس قسم',
    'member': 'عضو'
  }
  return map[role] || role
}

const getSubName = (sub) => {
  const map = {
    // Hardware
    'electronics': 'إلكترونيات',
    'components': 'مكونات',
    'structure': 'هيكل',
    'design': 'تصميم',
    // Software
    'frontend': 'فرونت إند',
    'backend': 'باك إند',
    'mobile': 'موبايل',
    'fullstack': 'فول ستاك',
    // UI/UX
    'ui_design': 'تصميم واجهات',
    'ux_research': 'بحث تجربة المستخدم',
    'prototyping': 'نموذج أولي',
    'graphics': 'رسومات',
    // Content
    'presentation': 'عروض تقديمية',
    'content_writing': 'كتابة محتوى',
    'documentation': 'توثيق',
    'media': 'ميديا'
  }
  return map[sub] || sub
}

const getSectionName = (sectionId) => {
  const section = sections.value.find(s => s.id === sectionId)
  return section ? section.name : 'غير محدد'
}

const getSubSectionsText = (subs) => {
  if (!subs || subs.length === 0) return 'لا يوجد'
  return subs.map(sub => getSubName(sub)).join('، ')
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return new Date(date).toLocaleDateString('ar-EG')
  } catch {
    return '-'
  }
}

const formatDateTime = (date) => {
  if (!date) return '-'
  try {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch {
    return '-'
  }
}

// ========== دوال النسخ ==========
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ تم النسخ')
  }).catch(() => {
    alert('❌ فشل النسخ')
  })
}

const copyAllData = () => {
  if (!newUser.value) return
  
  const data = `
اسم العضو: ${newUser.value.name}
البريد الإلكتروني: ${newUser.value.email}
كلمة المرور: ${newUser.value.password}
الرقم الأكاديمي: ${newUser.value.academic_number}
رقم الهاتف: ${newUser.value.phone}
رقم الواتساب: ${newUser.value.whatsapp}
القسم: ${getSectionName(newUser.value.section_id)}
${newUser.value.sub_sections && newUser.value.sub_sections.length > 0 ? `الأقسام الفرعية: ${getSubSectionsText(newUser.value.sub_sections)}` : ''}
الدور: ${getRoleText(newUser.value.role)}
  `.trim()
  
  copyToClipboard(data)
}

const getEmailBody = () => {
  if (!newUser.value) return ''
  
  return encodeURIComponent(`
مرحباً ${newUser.value.name}،

نرحب بك في فريق TECH STORM! 🎉

تم إنشاء حسابك بنجاح. إليك بيانات تسجيل الدخول:
----------------------------------------
البريد الإلكتروني: ${newUser.value.email}
كلمة المرور: ${newUser.value.password}
----------------------------------------

بياناتك الشخصية:
- الاسم: ${newUser.value.name}
- الرقم الأكاديمي: ${newUser.value.academic_number}
- الهاتف: ${newUser.value.phone}
- الواتساب: ${newUser.value.whatsapp}
- القسم: ${getSectionName(newUser.value.section_id)}
${newUser.value.sub_sections && newUser.value.sub_sections.length > 0 ? `- الأقسام الفرعية: ${getSubSectionsText(newUser.value.sub_sections)}` : ''}

يمكنك تسجيل الدخول الآن عبر الرابط:
http://localhost:5173/login

نتمنى لك رحلة ممتعة ومفيدة معنا! 🚀

تحياتنا،
فريق TECH STORM
  `.trim())
}

const getWhatsAppMessage = () => {
  if (!newUser.value) return ''
  
  return encodeURIComponent(`
مرحباً ${newUser.value.name}،

نرحب بك في فريق TECH STORM! 🎉

تم إنشاء حسابك بنجاح. إليك بيانات تسجيل الدخول:
البريد الإلكتروني: ${newUser.value.email}
كلمة المرور: ${newUser.value.password}

يمكنك تسجيل الدخول عبر: http://localhost:5173/login

نتمنى لك رحلة ممتعة معنا! 🚀
  `.trim())
}

// ========== فلترة الطلبات ==========
const filterApplicants = () => {
  let filtered = [...allApplicants.value]
  
  if (filters.status !== 'all') {
    filtered = filtered.filter(a => a.status === filters.status)
  }
  
  if (filters.search) {
    const s = filters.search.toLowerCase()
    filtered = filtered.filter(a => 
      (a.name && a.name.toLowerCase().includes(s)) ||
      (a.email && a.email.toLowerCase().includes(s))
    )
  }
  
  filteredApplicants.value = filtered
}

// ========== تحديث الإحصائيات ==========
const updateStats = () => {
  stats.pending = allApplicants.value.filter(a => a.status === 'pending').length
  stats.accepted = allApplicants.value.filter(a => a.status === 'accepted').length
  stats.rejected = allApplicants.value.filter(a => a.status === 'rejected').length
}

// ========== جلب الطلبات ==========
const loadApplicants = async () => {
  loading.value = true
  try {
    const res = await axios.get('http://localhost:8000/api/show-applicants')
    if (res.data.success) {
      allApplicants.value = res.data.data || []
      filteredApplicants.value = allApplicants.value
      updateStats()
    }
  } catch (e) {
    console.error('خطأ في جلب الطلبات:', e)
  } finally {
    loading.value = false
  }
}

// ========== جلب الأقسام ==========
const loadSections = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/show-sections')
    if (res.data.success) {
      sections.value = res.data.data || []
    }
  } catch (e) {
    console.error('خطأ في جلب الأقسام:', e)
  }
}

// ========== عند تغيير القسم ==========
const onSectionChange = () => {
  acceptForm.sub_sections = []
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

const openAcceptModal = (applicant) => {
  console.log('فتح مودال القبول للمتقدم:', applicant)
  selectedApplicant.value = applicant
  acceptForm.section_id = ''
  acceptForm.sub_sections = []
  acceptForm.role = 'member'
  acceptForm.password = ''
  showAcceptModal.value = true
}

const closeAcceptModal = () => { 
  showAcceptModal.value = false
  // لا تحذف selectedApplicant هنا
}

const openRejectModal = (applicant) => { 
  selectedApplicant.value = applicant
  rejectForm.notes = ''
  showRejectModal.value = true 
}

const closeRejectModal = () => { 
  showRejectModal.value = false
  selectedApplicant.value = null 
}

const closeAccountModal = () => { 
  showAccountModal.value = false
  newUser.value = null
  selectedApplicant.value = null
}

const openNewAcceptModal = () => {
  closeAccountModal()
  // نفتح مودال القبول للمتقدم نفسه أو لمتقدم جديد حسب المطلوب
}

// ========== قبول المتقدم ==========
const acceptApplicant = async () => {
  if (!selectedApplicant.value) {
    alert('لم يتم اختيار متقدم')
    return
  }
  
  if (!acceptForm.section_id) {
    alert('اختر القسم أولاً')
    return
  }
  
  if (!acceptForm.password) {
    alert('أدخل كلمة المرور')
    return
  }
  
  acceptLoading.value = true
  try {
    console.log('جاري قبول:', selectedApplicant.value)
    
    const response = await fetch(`http://localhost:8000/api/accept-user/${selectedApplicant.value.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        section_id: acceptForm.section_id,
        sub_sections: acceptForm.sub_sections,
        role: acceptForm.role,
        password: acceptForm.password
      })
    })
    
    const data = await response.json()
    console.log('الرد:', data)
    
    if (data.success) {
      closeAcceptModal()
      
      newUser.value = {
        name: selectedApplicant.value.name,
        email: selectedApplicant.value.email,
        password: acceptForm.password,
        academic_number: selectedApplicant.value.academic_number,
        phone: selectedApplicant.value.phone,
        whatsapp: selectedApplicant.value.whatsapp,
        section_id: acceptForm.section_id,
        sub_sections: acceptForm.sub_sections,
        role: acceptForm.role
      }
      
      showAccountModal.value = true
      await loadApplicants()
    } else {
      alert(data.error || 'حدث خطأ في السيرفر')
    }
  } catch (error) {
    console.error('خطأ في قبول المتقدم:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    acceptLoading.value = false
  }
}

// ========== رفض المتقدم (محدث) ==========
const rejectApplicant = async () => {
  if (!selectedApplicant.value) {
    alert('لم يتم اختيار متقدم')
    return
  }
  
  rejectLoading.value = true
  try {
    console.log('جاري رفض المتقدم:', selectedApplicant.value.id)
    
    // استخدام المسار الجديد reject-user (public)
    const response = await fetch(`http://localhost:8000/api/reject-user/${selectedApplicant.value.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        notes: rejectForm.notes
      })
    })
    
    const data = await response.json()
    console.log('الرد:', data)
    
    if (data.success) {
      alert('✅ تم الرفض بنجاح')
      closeRejectModal()
      await loadApplicants() // إعادة تحميل القائمة
    } else {
      alert(data.error || '❌ حدث خطأ في السيرفر')
    }
  } catch (error) {
    console.error('خطأ في رفض المتقدم:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    rejectLoading.value = false
  }
}

// ========== مراقبة الفلاتر ==========
watch(() => filters.status, filterApplicants)
watch(() => filters.search, filterApplicants)

// ========== التحميل الأولي ==========
onMounted(() => {
  loadApplicants()
  loadSections()
})
</script>

<style scoped>
.admin-applicants {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.page-header h1 {
  color: #FFD700;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-stats {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.stat-badge {
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 40px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-label {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: 700;
  font-size: 1.2rem;
  padding: 2px 10px;
  border-radius: 20px;
}

.stat-value.pending { background: rgba(255,193,7,0.2); color: #ffc107; }
.stat-value.accepted { background: rgba(76,175,80,0.2); color: #4caf50; }
.stat-value.rejected { background: rgba(244,67,54,0.2); color: #f44336; }

.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 300px;
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
  padding: 15px 45px 15px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #FFD700;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 12px 20px;
  background: transparent;
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 40px;
  color: #b0b0b0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.filter-tab:hover {
  border-color: #FFD700;
  color: #FFD700;
}

.filter-tab.active {
  background: #FFD700;
  border-color: #FFD700;
  color: #000;
}

.tab-count {
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.loading-container {
  text-align: center;
  padding: 100px;
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

.table-container {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 20px;
  overflow: auto;
  backdrop-filter: blur(10px);
}

.applicants-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.applicants-table th {
  background: rgba(255,215,0,0.05);
  padding: 20px 15px;
  color: #FFD700;
  border-bottom: 2px solid rgba(255,215,0,0.2);
  font-size: 0.95rem;
}

.applicants-table td {
  padding: 15px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
  color: #e0e0e0;
}

.applicants-table tbody tr:hover {
  background: rgba(255,215,0,0.02);
}

.status-badge {
  padding: 5px 12px;
  border-radius: 30px;
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.pending { background: rgba(255,193,7,0.2); color: #ffc107; border: 1px solid #ffc107; }
.status-badge.accepted { background: rgba(76,175,80,0.2); color: #4caf50; border: 1px solid #4caf50; }
.status-badge.rejected { background: rgba(244,67,54,0.2); color: #f44336; border: 1px solid #f44336; }

.actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-icon.view { background: rgba(33,150,243,0.1); color: #2196f3; border: 1px solid #2196f3; }
.btn-icon.accept { background: rgba(76,175,80,0.1); color: #4caf50; border: 1px solid #4caf50; }
.btn-icon.reject { background: rgba(244,67,54,0.1); color: #f44336; border: 1px solid #f44336; }

.btn-icon:hover {
  transform: translateY(-2px);
}

.btn-icon.view:hover { background: #2196f3; color: white; }
.btn-icon.accept:hover { background: #4caf50; color: white; }
.btn-icon.reject:hover { background: #f44336; color: white; }

.no-data {
  text-align: center;
  padding: 50px;
  color: #b0b0b0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #1a1a1a;
  border: 1px solid #FFD700;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.account-modal {
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255,215,0,0.2);
}

.modal-header h2 {
  color: #FFD700;
  font-size: 1.5rem;
}

.success-header {
  background: linear-gradient(135deg, #1a3a1a, #0a2a0a);
  text-align: center;
  flex-direction: column;
  gap: 10px;
}

.success-icon {
  font-size: 3rem;
  color: #4caf50;
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(255,215,0,0.2);
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

.section-title {
  color: #fff;
  margin-bottom: 20px;
}

.detail-row {
  margin-bottom: 10px;
  color: #fff;
}

.detail-row.full {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255,215,0,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 10px;
}

.rejection-info {
  margin-top: 20px;
  padding: 15px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: 10px;
}

.rejection-info h4 {
  color: #f44336;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.rejection-notes {
  color: #fff;
  line-height: 1.6;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #FFD700;
  margin-bottom: 5px;
}

.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 10px;
  color: #fff;
}

.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FFD700;
}

.sub-sections-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 10px;
  margin-bottom: 10px;
}

.sub-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
}

.sub-item input[type="checkbox"] {
  accent-color: #FFD700;
}

.hint {
  color: #b0b0b0;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}

.password-group {
  margin-top: 20px;
  border-top: 1px solid rgba(255,215,0,0.2);
  padding-top: 20px;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper input {
  width: 100%;
  padding: 12px 45px 12px 15px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
}

.password-input-wrapper input:focus {
  outline: none;
  border-color: #FFD700;
}

.toggle-password-btn {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #FFD700;
  cursor: pointer;
  font-size: 1.1rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.toggle-password-btn:hover {
  color: #fff;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(255,215,0,0.2);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-accept {
  background: #4caf50;
  color: white;
}

.btn-accept:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76,175,80,0.3);
}

.btn-reject {
  background: #f44336;
  color: white;
}

.btn-reject:hover:not(:disabled) {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244,67,54,0.3);
}

.btn-primary {
  background: #FFD700;
  color: #000;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255,215,0,0.3);
}

.btn-outline {
  background: transparent;
  border: 1px solid #FFD700;
  color: #FFD700;
}

.btn-outline:hover {
  background: rgba(255,215,0,0.1);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255,215,0,0.2);
  color: #fff;
}

.btn-secondary:hover {
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Account Modal Styles */
.user-card {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: 15px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 2.5rem;
  color: #000;
}

.user-card h3 {
  color: #FFD700;
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.user-role {
  color: #b0b0b0;
  font-size: 1rem;
}

.info-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
}

.info-card h4 {
  color: #FFD700;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
}

.info-item .label {
  color: #b0b0b0;
  min-width: 100px;
  font-size: 0.9rem;
}

.info-item .value {
  color: #fff;
  flex: 1;
}

.password-field {
  display: flex;
  align-items: center;
  gap: 5px;
}

.copy-btn-small,
.toggle-btn-small {
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.3);
  color: #FFD700;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.copy-btn-small:hover,
.toggle-btn-small:hover {
  background: #FFD700;
  color: #000;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.btn-copy-all,
.btn-email,
.btn-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-copy-all {
  background: #FFD700;
  color: #000;
}

.btn-email {
  background: #2196f3;
  color: white;
}

.btn-whatsapp {
  background: #25d366;
  color: white;
}

.btn-copy-all:hover,
.btn-email:hover,
.btn-whatsapp:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

@media (max-width: 992px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .sub-sections-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .info-item {
    flex-wrap: wrap;
  }
  
  .info-item .label {
    min-width: 100%;
    margin-bottom: 5px;
  }
  
  .filter-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .filter-tab {
    white-space: nowrap;
  }
}

@media (max-width: 576px) {
  .stat-badge {
    width: 100%;
    justify-content: center;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>