<!-- src/views/admin/AdminDepartmentsView.vue -->
<template>
  <div class="admin-departments">
    <!-- Header -->
    <div class="page-header">
      <div class="header-title">
        <i class="fas fa-sitemap header-icon"></i>
        <div>
          <h1>إدارة الأقسام</h1>
          <p class="header-subtitle">إنشاء وتعديل الأقسام والفروع</p>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="btn-primary" @click="openCreateModal">
          <i class="fas fa-plus"></i>
          قسم جديد
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
        <div class="stat-icon departments">
          <i class="fas fa-sitemap"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ departments.length }}</span>
          <span class="stat-label">إجمالي الأقسام</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon leaders">
          <i class="fas fa-crown"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ departmentsWithLeaders }}</span>
          <span class="stat-label">رؤساء الأقسام</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon members">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ totalMembers }}</span>
          <span class="stat-label">إجمالي الأعضاء</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon tasks">
          <i class="fas fa-tasks"></i>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ totalSubSections }}</span>
          <span class="stat-label">إجمالي الأقسام الفرعية</span>
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
          placeholder="بحث عن قسم..."
          @input="filterDepartments"
        />
        <button v-if="filters.search" class="clear-search" @click="clearSearch">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="filter-group">
        <select v-model="filters.sortBy" class="filter-select" @change="filterDepartments">
          <option value="name_asc">الاسم (أ - ي)</option>
          <option value="name_desc">الاسم (ي - أ)</option>
          <option value="id_asc">الأقدم أولاً</option>
          <option value="id_desc">الأحدث أولاً</option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل الأقسام...</p>
    </div>

    <!-- Departments Grid -->
    <div v-else-if="filteredDepartments.length > 0" class="departments-grid">
      <div v-for="dept in filteredDepartments" :key="dept.id" class="department-card">
        <!-- Card Header -->
        <div class="card-header">
          <div class="department-icon" :style="{ backgroundColor: getDepartmentColor(dept.id) }">
            <i :class="getDepartmentIcon(dept.name)"></i>
          </div>
          <div class="department-title">
            <h3>{{ dept.name }}</h3>
            <span class="department-type">{{ getTypeName(dept.type) }}</span>
          </div>
          <div class="card-actions">
            <button @click.stop="editDepartment(dept)" class="action-btn edit" title="تعديل">
              <i class="fas fa-edit"></i>
            </button>
            <button @click.stop="confirmDelete(dept)" class="action-btn delete" title="حذف">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <!-- Card Body -->
        <div class="card-body">
          <!-- Description -->
          <p v-if="dept.description" class="department-description">{{ dept.description }}</p>

          <!-- Leader Info -->
          <div class="leader-section" v-if="dept.leader">
            <div class="leader-avatar" :style="{ backgroundColor: getAvatarColor(dept.leader.name) }">
              {{ getInitials(dept.leader.name) }}
            </div>
            <div class="leader-info">
              <span class="leader-label">رئيس القسم</span>
              <span class="leader-name">{{ dept.leader.name }}</span>
            </div>
            <button @click.stop="openAssignLeaderModal(dept)" class="change-leader-btn" title="تغيير رئيس القسم">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
          <div v-else class="leader-section no-leader">
            <i class="fas fa-user-slash"></i>
            <span>لا يوجد رئيس قسم</span>
            <button @click.stop="openAssignLeaderModal(dept)" class="assign-leader-btn">
              تعيين رئيس
            </button>
          </div>

          <!-- Sub Sections -->
          <div class="sub-sections">
            <h4>
              <i class="fas fa-code-branch"></i>
              الأقسام الفرعية
              <span class="sub-count">{{ getSubSectionsCount(dept) }}</span>
            </h4>
            
            <div v-if="getSubSectionsCount(dept) > 0" class="sub-tags">
              <span v-for="sub in getSubSectionsArray(dept)" :key="sub" class="sub-tag">
                {{ getSubName(sub) }}
              </span>
            </div>
            <p v-else class="no-sub">لا توجد أقسام فرعية</p>

            <!-- Edit Sub Sections Button -->
            <button @click.stop="editSubSections(dept)" class="edit-sub-btn">
              <i class="fas fa-pencil-alt"></i>
              تعديل الأقسام الفرعية
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="quick-stats">
            <div class="stat-item">
              <i class="fas fa-calendar"></i>
              <div class="stat-detail">
                <span class="stat-number">{{ formatDate(dept.created_at) }}</span>
                <span class="stat-desc">تاريخ الإنشاء</span>
              </div>
            </div>
            <div class="stat-item">
              <i class="fas fa-id-card"></i>
              <div class="stat-detail">
                <span class="stat-number">#{{ dept.id }}</span>
                <span class="stat-desc">رقم القسم</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <button @click.stop="viewMembers(dept)" class="footer-link">
            <i class="fas fa-users"></i>
            <span>الأعضاء</span>
          </button>
          <button @click.stop="viewTasks(dept)" class="footer-link">
            <i class="fas fa-tasks"></i>
            <span>المهام</span>
          </button>
        </div>
      </div>
    </div>

    <!-- No Data -->
    <div v-else-if="!loading" class="no-data-container">
      <div class="no-data-icon">
        <i class="fas fa-sitemap"></i>
      </div>
      <h3>لا توجد أقسام</h3>
      <p>لم يتم إضافة أي أقسام بعد</p>
      <button class="btn-primary" @click="openCreateModal">
        <i class="fas fa-plus"></i>
        إضافة قسم جديد
      </button>
    </div>

    <!-- Create/Edit Department Modal -->
    <div v-if="showDepartmentModal" class="modal-overlay" @click.self="closeDepartmentModal">
      <div class="modal-content department-modal">
        <div class="modal-header">
          <h2>
            <i :class="editingDepartment ? 'fas fa-edit' : 'fas fa-plus-circle'"></i>
            {{ editingDepartment ? 'تعديل القسم' : 'إضافة قسم جديد' }}
          </h2>
          <button @click="closeDepartmentModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>

        <form @submit.prevent="saveDepartment" class="modal-body">
          <!-- Department Name -->
          <div class="form-group">
            <label><i class="fas fa-tag"></i> اسم القسم <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="departmentForm.name" 
              placeholder="أدخل اسم القسم"
              required
            />
          </div>

          <!-- Department Type -->
          <div class="form-group">
            <label><i class="fas fa-tag"></i> نوع القسم</label>
            <select v-model="departmentForm.type">
              <option value="">-- اختر النوع --</option>
              <option value="hardware">⚙️ Hardware</option>
              <option value="software">💻 Software</option>
              <option value="ui_ux">🎨 UI/UX</option>
              <option value="content">📝 Content</option>
              <option value="media">📸 Media</option>
              <option value="marketing">📊 Marketing</option>
              <option value="ai">🤖 AI</option>
              <option value="security">🛡️ Security</option>
            </select>
          </div>

          <!-- Department Description -->
          <div class="form-group">
            <label><i class="fas fa-align-left"></i> وصف القسم</label>
            <textarea 
              v-model="departmentForm.description" 
              placeholder="وصف مختصر للقسم..."
              rows="3"
            ></textarea>
          </div>

          <!-- Sub Sections -->
          <div class="form-group">
            <label><i class="fas fa-code-branch"></i> الأقسام الفرعية</label>
            <div class="sub-sections-editor">
              <div v-for="(sub, index) in departmentForm.sub_sections" :key="index" class="sub-section-item">
                <input 
                  type="text" 
                  v-model="departmentForm.sub_sections[index]" 
                  placeholder="اسم القسم الفرعي"
                />
                <button type="button" @click="removeSubSection(index)" class="remove-sub-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              
              <button type="button" @click="addSubSection" class="add-sub-btn">
                <i class="fas fa-plus"></i>
                إضافة قسم فرعي
              </button>
            </div>
          </div>

          <!-- Available Leaders -->
          <div class="form-group">
            <label><i class="fas fa-crown"></i> رئيس القسم</label>
            <select v-model="departmentForm.leader_id">
              <option :value="null">-- اختر رئيس القسم --</option>
              <option v-for="leader in availableLeaders" :key="leader.id" :value="leader.id">
                {{ leader.name }} ({{ leader.email }})
              </option>
            </select>
            <small class="hint">اختر رئيساً للقسم من الأعضاء المتاحين</small>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="submit" class="btn-save" :disabled="saving">
              <i v-if="saving" class="fas fa-spinner fa-spin"></i>
              <span v-else>{{ editingDepartment ? 'تحديث' : 'حفظ' }}</span>
            </button>
            <button type="button" @click="closeDepartmentModal" class="btn-cancel">إلغاء</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Assign Leader Modal -->
    <div v-if="showAssignLeaderModal" class="modal-overlay" @click.self="closeAssignLeaderModal">
      <div class="modal-content assign-modal">
        <div class="modal-header">
          <h2><i class="fas fa-crown"></i> تعيين رئيس قسم</h2>
          <button @click="closeAssignLeaderModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <p class="modal-description">
            اختر رئيساً لقسم <strong>{{ selectedDepartment?.name }}</strong>
          </p>

          <!-- Leaders List -->
          <div class="leaders-list">
            <div 
              v-for="leader in availableLeaders" 
              :key="leader.id"
              class="leader-item"
              :class="{ selected: assignForm.leader_id === leader.id }"
              @click="selectLeader(leader.id)"
            >
              <div class="leader-avatar" :style="{ backgroundColor: getAvatarColor(leader.name) }">
                {{ getInitials(leader.name) }}
              </div>
              <div class="leader-details">
                <span class="leader-name">{{ leader.name }}</span>
                <span class="leader-email">{{ leader.email }}</span>
              </div>
              <div class="leader-check" v-if="assignForm.leader_id === leader.id">
                <i class="fas fa-check-circle"></i>
              </div>
            </div>

            <div v-if="availableLeaders.length === 0" class="no-leaders">
              <i class="fas fa-users-slash"></i>
              <p>لا يوجد أعضاء متاحين للتعيين</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="assignLeader" class="btn-save" :disabled="!assignForm.leader_id || assignLoading">
            <i v-if="assignLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>تعيين</span>
          </button>
          <button @click="closeAssignLeaderModal" class="btn-cancel">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- Edit Sub Sections Modal -->
    <div v-if="showSubSectionsModal" class="modal-overlay" @click.self="closeSubSectionsModal">
      <div class="modal-content sub-modal">
        <div class="modal-header">
          <h2><i class="fas fa-code-branch"></i> تعديل الأقسام الفرعية</h2>
          <button @click="closeSubSectionsModal" class="close-btn"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body">
          <p class="modal-description">
            قسم: <strong>{{ selectedDepartment?.name }}</strong>
          </p>

          <div class="sub-sections-editor">
            <div v-for="(sub, index) in subForm.sections" :key="index" class="sub-section-item">
              <input 
                type="text" 
                v-model="subForm.sections[index]" 
                placeholder="اسم القسم الفرعي"
              />
              <button type="button" @click="removeSubSectionItem(index)" class="remove-sub-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <button type="button" @click="addSubSectionItem" class="add-sub-btn">
              <i class="fas fa-plus"></i>
              إضافة قسم فرعي
            </button>
          </div>

          <!-- Sub Templates -->
          <div class="sub-templates">
            <h4>قوالب جاهزة:</h4>
            <div class="template-tags">
              <span 
                v-for="template in subTemplates" 
                :key="template"
                class="template-tag"
                @click="addTemplateSubs(template)"
              >
                {{ getSubName(template) }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="saveSubSections" class="btn-save" :disabled="subSaving">
            <i v-if="subSaving" class="fas fa-spinner fa-spin"></i>
            <span v-else>حفظ التغييرات</span>
          </button>
          <button @click="closeSubSectionsModal" class="btn-cancel">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content delete-modal">
        <div class="modal-header warning-header">
          <i class="fas fa-exclamation-triangle warning-icon"></i>
          <h2>حذف القسم</h2>
        </div>

        <div class="modal-body">
          <p>هل أنت متأكد من حذف قسم <strong>{{ selectedDepartment?.name }}</strong>؟</p>
          <p class="warning-text">
            هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف القسم نهائياً
          </p>

          <div class="form-group">
            <label>اكتب "حذف" لتأكيد العملية</label>
            <input 
              type="text" 
              v-model="deleteConfirmText" 
              placeholder="حذف"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button 
            @click="deleteDepartment" 
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
const saving = ref(false)
const subSaving = ref(false)
const assignLoading = ref(false)
const deleteLoading = ref(false)
const departments = ref([])
const availableLeaders = ref([])
const filteredDepartments = ref([])
const selectedDepartment = ref(null)
const editingDepartment = ref(null)
const deleteConfirmText = ref('')

// ========== Modal States ==========
const showDepartmentModal = ref(false)
const showAssignLeaderModal = ref(false)
const showSubSectionsModal = ref(false)
const showDeleteModal = ref(false)

// ========== Filters ==========
const filters = reactive({
  search: '',
  sortBy: 'name_asc'
})

// ========== Forms ==========
const departmentForm = reactive({
  name: '',
  type: '',
  description: '',
  sub_sections: [],
  leader_id: null
})

const assignForm = reactive({
  leader_id: null
})

const subForm = reactive({
  sections: []
})

// ========== Computed ==========
const departmentsWithLeaders = computed(() => {
  return departments.value.filter(d => d.leader).length
})

const totalMembers = computed(() => {
  let count = 0
  departments.value.forEach(dept => {
    // لو كان في users array
    if (dept.users && Array.isArray(dept.users)) {
      count += dept.users.length
    }
    // لو كان في members_count
    else if (dept.members_count) {
      count += dept.members_count
    }
    // لو كان في users_count
    else if (dept.users_count) {
      count += dept.users_count
    }
  })
  return count
})

const totalSubSections = computed(() => {
  return departments.value.reduce((sum, dept) => {
    return sum + getSubSectionsCount(dept)
  }, 0)
})

// ========== Helper Functions ==========
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  
  const colors = [
    '#FFD700', '#FFA500', '#FF8C00', '#FF7F50',
    '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  
  return colors[Math.abs(hash) % colors.length]
}

const getDepartmentColor = (id) => {
  const colors = [
    '#FFD700', '#FFA500', '#FF8C00', '#FF7F50',
    '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6'
  ]
  return colors[(id % colors.length)]
}

const getDepartmentIcon = (name) => {
  const nameLower = (name || '').toLowerCase()
  
  if (nameLower.includes('hardware') || nameLower.includes('هاردوير')) return 'fa-microchip'
  if (nameLower.includes('software') || nameLower.includes('سوفت')) return 'fa-code'
  if (nameLower.includes('ui') || nameLower.includes('ux') || nameLower.includes('تصميم')) return 'fa-paint-brush'
  if (nameLower.includes('content') || nameLower.includes('محتوى')) return 'fa-pen-fancy'
  if (nameLower.includes('media') || nameLower.includes('ميديا')) return 'fa-camera'
  if (nameLower.includes('marketing') || nameLower.includes('تسويق')) return 'fa-chart-line'
  if (nameLower.includes('ai') || nameLower.includes('ذكاء')) return 'fa-robot'
  if (nameLower.includes('security') || nameLower.includes('أمن')) return 'fa-shield-alt'
  
  return 'fa-sitemap'
}

const getTypeName = (type) => {
  const types = {
    'hardware': '⚙️ Hardware',
    'software': '💻 Software',
    'ui_ux': '🎨 UI/UX',
    'content': '📝 Content',
    'media': '📸 Media',
    'marketing': '📊 Marketing',
    'ai': '🤖 AI',
    'security': '🛡️ Security'
  }
  return types[type] || type || 'قسم'
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

const getSubSectionsArray = (dept) => {
  if (!dept || !dept.sub_sections) return []
  
  if (typeof dept.sub_sections === 'string') {
    try {
      const parsed = JSON.parse(dept.sub_sections)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  if (Array.isArray(dept.sub_sections)) {
    return dept.sub_sections
  }
  
  return []
}

const getSubSectionsCount = (dept) => {
  return getSubSectionsArray(dept).length
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

// ========== Load Data ==========
const loadDepartments = async () => {
  loading.value = true
  
  try {
    const response = await axios.get('http://TECHSTORM.kesug.com/api/show-sections')
    
    if (response.data.success) {
      departments.value = response.data.data || []
      
      // جلب عدد الأعضاء لكل قسم
      for (let dept of departments.value) {
        try {
          const membersRes = await axios.get(`http://TECHSTORM.kesug.com/api/sections/${dept.id}/members`)
          if (membersRes.data.success) {
            dept.members_count = membersRes.data.data?.length || 0
          }
        } catch (error) {
          console.error(`Error loading members for department ${dept.id}:`, error)
          dept.members_count = 0
        }
      }
      
      filterDepartments()
    }
  } catch (error) {
    console.error('Error loading departments:', error)
  } finally {
    loading.value = false
  }
}

const loadAvailableLeaders = async () => {
  try {
    const response = await axios.get('http://TECHSTORM.kesug.com/api/users-public')
    if (response.data.success) {
      availableLeaders.value = (response.data.data || []).filter(u => 
        u.role !== 'team_leader' && u.role !== 'deputy_leader'
      )
    }
  } catch (error) {
    console.error('Error loading leaders:', error)
  }
}

// ========== Save Department ==========
const saveDepartment = async () => {
  if (!departmentForm.name) {
    alert('يرجى إدخال اسم القسم')
    return
  }
  
  saving.value = true
  
  try {
    const formData = {
      name: departmentForm.name,
      type: departmentForm.type || 'software',
      description: departmentForm.description || '',
      sub_sections: departmentForm.sub_sections.filter(s => s && s.trim() !== ''),
      leader_id: departmentForm.leader_id || null
    }
    
    let url = 'http://TECHSTORM.kesug.com/api/sections'
    let method = 'POST'
    
    if (editingDepartment.value) {
      url = `http://TECHSTORM.kesug.com/api/sections/${editingDepartment.value.id}`
      method = 'PUT'
    }
    
    const response = await axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    if (response.data.success) {
      alert(editingDepartment.value ? '✅ تم تحديث القسم' : '✅ تم إضافة القسم')
      closeDepartmentModal()
      await loadDepartments()
      await loadAvailableLeaders()
    } else {
      if (response.data.errors) {
        const errorMessages = Object.values(response.data.errors).flat().join('\n')
        alert(`❌ ${errorMessages}`)
      } else {
        alert(`❌ ${response.data.error || 'حدث خطأ'}`)
      }
    }
  } catch (error) {
    console.error('Error saving department:', error)
    
    if (error.response) {
      alert(`❌ خطأ ${error.response.status}: ${error.response.data?.error || error.response.statusText}`)
    } else if (error.request) {
      alert('❌ لا يمكن الاتصال بالسيرفر. تأكد من تشغيل Laravel')
    } else {
      alert('❌ حدث خطأ في الاتصال: ' + error.message)
    }
  } finally {
    saving.value = false
  }
}

// ========== Filter Functions ==========
const filterDepartments = () => {
  let filtered = [...departments.value]
  
  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(d => 
      d.name && d.name.toLowerCase().includes(search)
    )
  }
  
  switch (filters.sortBy) {
    case 'name_asc':
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      break
    case 'name_desc':
      filtered.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
      break
    case 'id_asc':
      filtered.sort((a, b) => a.id - b.id)
      break
    case 'id_desc':
      filtered.sort((a, b) => b.id - a.id)
      break
  }
  
  filteredDepartments.value = filtered
}

const clearSearch = () => {
  filters.search = ''
  filterDepartments()
}

// ========== Department CRUD ==========
const openCreateModal = () => {
  editingDepartment.value = null
  departmentForm.name = ''
  departmentForm.type = ''
  departmentForm.description = ''
  departmentForm.sub_sections = []
  departmentForm.leader_id = null
  showDepartmentModal.value = true
}

const editDepartment = (dept) => {
  editingDepartment.value = dept
  departmentForm.name = dept.name || ''
  departmentForm.type = dept.type || ''
  departmentForm.description = dept.description || ''
  departmentForm.sub_sections = getSubSectionsArray(dept)
  departmentForm.leader_id = dept.leader_id || null
  showDepartmentModal.value = true
}

const closeDepartmentModal = () => {
  showDepartmentModal.value = false
  editingDepartment.value = null
}

// ========== Assign Leader ==========
const openAssignLeaderModal = (dept) => {
  selectedDepartment.value = dept
  assignForm.leader_id = dept.leader_id || null
  showAssignLeaderModal.value = true
}

const closeAssignLeaderModal = () => {
  showAssignLeaderModal.value = false
  selectedDepartment.value = null
}

const selectLeader = (leaderId) => {
  assignForm.leader_id = leaderId
}

const assignLeader = async () => {
  if (!selectedDepartment.value || !assignForm.leader_id) {
    alert('يرجى اختيار رئيس للقسم')
    return
  }
  
  assignLoading.value = true
  try {
    const response = await axios.put(
      `http://TECHSTORM.kesug.com/api/sections/${selectedDepartment.value.id}`,
      { leader_id: assignForm.leader_id }
    )
    
    if (response.data.success) {
      alert('✅ تم تعيين رئيس القسم بنجاح')
      closeAssignLeaderModal()
      await loadDepartments()
    } else {
      alert(response.data.error || 'حدث خطأ في التعيين')
    }
  } catch (error) {
    console.error('Error assigning leader:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    assignLoading.value = false
  }
}

// ========== Sub Sections Management ==========
const editSubSections = (dept) => {
  selectedDepartment.value = dept
  subForm.sections = [...getSubSectionsArray(dept)]
  showSubSectionsModal.value = true
}

const closeSubSectionsModal = () => {
  showSubSectionsModal.value = false
  selectedDepartment.value = null
}

const addSubSectionItem = () => {
  subForm.sections.push('')
}

const removeSubSectionItem = (index) => {
  subForm.sections.splice(index, 1)
}

const addTemplateSubs = (template) => {
  if (!subForm.sections.includes(template)) {
    subForm.sections.push(template)
  }
}

const saveSubSections = async () => {
  if (!selectedDepartment.value) return
  
  subSaving.value = true
  try {
    const response = await axios.put(
      `http://TECHSTORM.kesug.com/api/sections/${selectedDepartment.value.id}`,
      { sub_sections: subForm.sections.filter(s => s && s.trim() !== '') }
    )
    
    if (response.data.success) {
      alert('✅ تم تحديث الأقسام الفرعية')
      closeSubSectionsModal()
      await loadDepartments()
    } else {
      alert(response.data.error || 'حدث خطأ في التحديث')
    }
  } catch (error) {
    console.error('Error saving sub sections:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    subSaving.value = false
  }
}

// ========== Department Form Sub Sections ==========
const addSubSection = () => {
  departmentForm.sub_sections.push('')
}

const removeSubSection = (index) => {
  departmentForm.sub_sections.splice(index, 1)
}

// ========== Delete Department ==========
const confirmDelete = (dept) => {
  selectedDepartment.value = dept
  deleteConfirmText.value = ''
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedDepartment.value = null
  deleteConfirmText.value = ''
}

const deleteDepartment = async () => {
  if (!selectedDepartment.value) return
  
  if (deleteConfirmText.value !== 'حذف') {
    alert('❌ الرجاء كتابة "حذف" لتأكيد العملية')
    return
  }
  
  deleteLoading.value = true
  try {
    const response = await axios.delete(
      `http://TECHSTORM.kesug.com/api/sections/${selectedDepartment.value.id}`
    )
    
    if (response.data.success) {
      alert('✅ تم حذف القسم بنجاح')
      closeDeleteModal()
      await loadDepartments()
      await loadAvailableLeaders()
    } else {
      alert(response.data.error || 'حدث خطأ في الحذف')
    }
  } catch (error) {
    console.error('Error deleting department:', error)
    alert('❌ حدث خطأ في الاتصال بالسيرفر')
  } finally {
    deleteLoading.value = false
  }
}

// ========== Navigation ==========
const viewMembers = (dept) => {
  router.push(`/admin/department/${dept.id}/members`)
}

const viewTasks = (dept) => {
  router.push(`/admin/department/${dept.id}/tasks`)
}

// ========== Refresh Data ==========
const refreshData = () => {
  loadDepartments()
  loadAvailableLeaders()
}

// ========== Watch Filters ==========
watch(() => filters.search, filterDepartments)
watch(() => filters.sortBy, filterDepartments)

// ========== Lifecycle ==========
onMounted(() => {
  loadDepartments()
  loadAvailableLeaders()
})
</script>

<style scoped>
/* ===== كل الـ CSS من ملفك الأصلي بدون تغيير ===== */
.admin-departments {
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
  gap: 15px;
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

/* ===== Stats Grid ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(10px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.departments {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
}

.stat-icon.leaders {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.stat-icon.members {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon.tasks {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-info {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.stat-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.9rem;
}

/* ===== Filters ===== */
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
  color: #FFD700;
}

.search-box input {
  width: 100%;
  padding: 15px 45px 15px 45px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
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
  flex: 1;
  display: flex;
  gap: 10px;
}

.filter-select {
  flex: 1;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #FFD700;
}

/* ===== Loading ===== */
.loading-container {
  text-align: center;
  padding: 100px;
}

.spinner {
  width: 60px;
  height: 60px;
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

/* ===== Departments Grid ===== */
.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.department-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.department-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 15px 35px rgba(255, 215, 0, 0.15);
}

/* Card Header */
.card-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 215, 0, 0.05);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.department-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #000;
}

.department-title {
  flex: 1;
}

.department-title h3 {
  color: #FFD700;
  font-size: 1.1rem;
  margin: 0 0 3px;
}

.department-type {
  color: #b0b0b0;
  font-size: 0.8rem;
}

.card-actions {
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

.action-btn.edit {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid #ffc107;
  color: #ffc107;
}

.action-btn.edit:hover {
  background: #ffc107;
  color: #000;
}

.action-btn.delete {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
}

.action-btn.delete:hover {
  background: #f44336;
  color: #fff;
}

/* Card Body */
.card-body {
  padding: 20px;
}

.department-description {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

/* Leader Section */
.leader-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-bottom: 20px;
}

.leader-section.no-leader {
  background: rgba(255, 193, 7, 0.05);
  border: 1px dashed #ffc107;
  color: #ffc107;
  display: flex;
  align-items: center;
  gap: 10px;
}

.leader-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
}

.leader-info {
  flex: 1;
}

.leader-label {
  display: block;
  color: #b0b0b0;
  font-size: 0.7rem;
  margin-bottom: 2px;
}

.leader-name {
  display: block;
  color: #FFD700;
  font-weight: 600;
  font-size: 0.9rem;
}

.change-leader-btn,
.assign-leader-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.change-leader-btn:hover,
.assign-leader-btn:hover {
  background: #FFD700;
  color: #000;
}

.assign-leader-btn {
  width: auto;
  padding: 0 12px;
}

/* Sub Sections */
.sub-sections {
  margin-bottom: 20px;
}

.sub-sections h4 {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sub-count {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
  padding: 2px 8px;
  border-radius: 30px;
  font-size: 0.7rem;
}

.sub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.sub-tag {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 30px;
  padding: 4px 12px;
  font-size: 0.8rem;
  color: #fff;
}

.no-sub {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.edit-sub-btn {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px dashed rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.edit-sub-btn:hover {
  background: rgba(255, 215, 0, 0.1);
  border-style: solid;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
}

.stat-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 8px;
  text-align: center;
}

.stat-item i {
  color: #FFD700;
  font-size: 1rem;
  margin-bottom: 3px;
}

.stat-number {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff;
}

.stat-desc {
  display: block;
  font-size: 0.6rem;
  color: #b0b0b0;
}

/* Card Footer */
.card-footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.footer-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 12px;
  color: #b0b0b0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.footer-link:hover {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.footer-link:first-child {
  border-left: 1px solid rgba(255, 215, 0, 0.1);
}

/* ===== No Data ===== */
.no-data-container {
  text-align: center;
  padding: 80px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
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

/* ===== Modal Styles ===== */
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
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.department-modal {
  max-width: 700px;
}

.assign-modal {
  max-width: 500px;
}

.sub-modal {
  max-width: 550px;
}

.delete-modal {
  max-width: 450px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.modal-header h2 {
  color: #FFD700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-header {
  background: linear-gradient(135deg, #3a1a1a, #2a0a0a);
  text-align: center;
  flex-direction: column;
}

.warning-icon {
  font-size: 3rem;
  color: #ffc107;
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.2);
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

.modal-description {
  color: #fff;
  margin-bottom: 20px;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #FFD700;
  margin-bottom: 5px;
}

.required {
  color: #f44336;
  margin-right: 3px;
}

.form-group input,
.form-group select,
.form-group textarea {
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
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #FFD700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

/* Sub Sections Editor */
.sub-sections-editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sub-section-item {
  display: flex;
  gap: 10px;
}

.sub-section-item input {
  flex: 1;
}

.remove-sub-btn {
  width: 40px;
  height: 40px;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  border-radius: 10px;
  color: #f44336;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.remove-sub-btn:hover {
  background: #f44336;
  color: #fff;
}

.add-sub-btn {
  width: 100%;
  padding: 12px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px dashed #FFD700;
  border-radius: 10px;
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}

.add-sub-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  border-style: solid;
}

/* Sub Templates */
.sub-templates {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.sub-templates h4 {
  color: #b0b0b0;
  margin-bottom: 10px;
}

.template-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.template-tag {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  padding: 6px 12px;
  font-size: 0.8rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.template-tag:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
}

/* Leaders List */
.leaders-list {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 15px;
}

.leader-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.leader-item:hover {
  background: rgba(255, 215, 0, 0.05);
  border-color: #FFD700;
}

.leader-item.selected {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
}

.leader-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
}

.leader-details {
  flex: 1;
}

.leader-name {
  display: block;
  color: #fff;
  font-weight: 600;
  margin-bottom: 2px;
}

.leader-email {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
}

.leader-check {
  color: #4caf50;
  font-size: 1.5rem;
}

.no-leaders {
  text-align: center;
  padding: 30px;
  color: #b0b0b0;
}

.no-leaders i {
  font-size: 3rem;
  margin-bottom: 10px;
  opacity: 0.5;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.btn-save,
.btn-delete {
  flex: 2;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-save {
  background: #4caf50;
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.btn-delete {
  background: #f44336;
  color: white;
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

.btn-cancel:hover:not(:disabled) {
  border-color: #FFD700;
  color: #FFD700;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint {
  display: block;
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-top: 5px;
}

/* Responsive */
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
    width: 100%;
    justify-content: center;
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .departments-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-save,
  .btn-delete,
  .btn-cancel {
    width: 100%;
  }
  
  .footer-link span {
    display: none;
  }
  
  .footer-link i {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-wrap: wrap;
  }
  
  .card-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
  }
}

/* RTL Support */
[dir="rtl"] .footer-link:first-child {
  border-left: none;
  border-right: 1px solid rgba(255, 215, 0, 0.1);
}

[dir="rtl"] .search-box i {
  right: 15px;
  left: auto;
}

[dir="rtl"] .search-box input {
  padding: 15px 45px 15px 45px;
}

[dir="rtl"] .clear-search {
  left: 15px;
  right: auto;
}

</style>
