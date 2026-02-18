<template>
  <div class="team-view">
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
        <i class="fas fa-users header-icon"></i>
        <div>
          <h1>الفريق</h1>
          <p>جميع أعضاء TECH STORM</p>
        </div>
      </div>
      
      <div class="header-actions">
        <button class="btn-secondary" @click="refreshData" :disabled="loading">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
          تحديث
        </button>
      </div>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="stats-grid">
      <div class="stat-card">
        <i class="fas fa-users stat-icon"></i>
        <div class="stat-info">
          <span class="stat-value">{{ stats.total_members || 0 }}</span>
          <span class="stat-label">إجمالي الأعضاء</span>
        </div>
      </div>
      <div class="stat-card">
        <i class="fas fa-user-tie stat-icon"></i>
        <div class="stat-info">
          <span class="stat-value">{{ stats.team_leaders || 0 }}</span>
          <span class="stat-label">قادة الفريق</span>
        </div>
      </div>
      <div class="stat-card">
        <i class="fas fa-flag stat-icon"></i>
        <div class="stat-info">
          <span class="stat-value">{{ stats.section_leaders || 0 }}</span>
          <span class="stat-label">رؤساء الأقسام</span>
        </div>
      </div>
      <div class="stat-card">
        <i class="fas fa-user stat-icon"></i>
        <div class="stat-info">
          <span class="stat-value">{{ stats.members || 0 }}</span>
          <span class="stat-label">أعضاء</span>
        </div>
      </div>
    </div>

    <!-- الفلاتر -->
    <div class="filters-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="filters.search" 
          placeholder="🔍 بحث في الأعضاء..."
          @input="debouncedSearch"
        />
      </div>

      <div class="filter-group">
        <select v-model="filters.section" class="filter-select" @change="applyFilters">
          <option value="all">جميع الأقسام</option>
          <option v-for="section in sections" :key="section.id" :value="section.id">
            {{ section.name }}
          </option>
        </select>

        <select v-model="filters.role" class="filter-select" @change="applyFilters">
          <option value="all">جميع الأدوار</option>
          <option value="team_leader">قائد الفريق</option>
          <option value="deputy_leader">نائب القائد</option>
          <option value="section_leader">رئيس قسم</option>
          <option value="member">عضو</option>
        </select>

        <select v-model="filters.status" class="filter-select" @change="applyFilters">
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="away">بعيد</option>
        </select>
      </div>
    </div>

    <!-- تحميل -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل أعضاء الفريق...</p>
    </div>

    <!-- شبكة الأعضاء -->
    <div v-else-if="filteredMembers.length > 0" class="team-grid">
      <div v-for="member in filteredMembers" :key="member.id" class="member-card">
        <!-- صورة العضو -->
        <div class="member-avatar-wrapper">
          <div class="member-avatar" :style="{ backgroundColor: getAvatarColor(member.name) }">
            {{ getUserInitials(member.name) }}
          </div>
          <div class="member-status" :class="member.status"></div>
        </div>

        <!-- معلومات العضو -->
        <div class="member-info">
          <h3 class="member-name">{{ member.name }}</h3>
          <span :class="['member-role', member.role]">{{ getRoleName(member.role) }}</span>
          <span class="member-section">{{ member.section?.name || 'بدون قسم' }}</span>
        </div>

        <!-- أزرار التواصل -->
        <div class="member-actions">
          <a v-if="member.whatsapp" :href="`https://wa.me/${member.whatsapp}`" target="_blank" class="action-btn whatsapp" title="واتساب">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a v-if="member.phone" :href="`tel:${member.phone}`" class="action-btn phone" title="اتصال">
            <i class="fas fa-phone"></i>
          </a>
          <a :href="`mailto:${member.email}`" class="action-btn email" title="بريد إلكتروني">
            <i class="fas fa-envelope"></i>
          </a>
        </div>

        <!-- إحصائيات سريعة -->
        <div class="member-stats">
          <div class="stat" v-if="memberStats[member.id]">
            <i class="fas fa-tasks"></i>
            <span>{{ memberStats[member.id].total_tasks || 0 }} مهام</span>
          </div>
          <div class="stat" v-if="memberStats[member.id]">
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <span>{{ memberStats[member.id].completed_tasks || 0 }} مكتملة</span>
          </div>
        </div>
      </div>
    </div>

    <!-- لا توجد بيانات -->
    <div v-else-if="!loading" class="no-data">
      <i class="fas fa-users"></i>
      <h3>لا يوجد أعضاء</h3>
      <p>لم يتم العثور على أي أعضاء</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// ========== State ==========
const loading = ref(false)
const members = ref([])
const sections = ref([])
const memberStats = ref({})

// ========== Stats ==========
const stats = ref({
  total_members: 0,
  team_leaders: 0,
  deputy_leaders: 0,
  section_leaders: 0,
  members: 0
})

// ========== Filters ==========
const filters = reactive({
  search: '',
  section: 'all',
  role: 'all',
  status: 'all'
})

// ========== Computed ==========
const filteredMembers = computed(() => {
  let filtered = [...members.value]
  
  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(member => 
      member.name?.toLowerCase().includes(search) ||
      member.email?.toLowerCase().includes(search) ||
      member.academic_number?.toLowerCase().includes(search)
    )
  }
  
  if (filters.section !== 'all') {
    filtered = filtered.filter(member => member.section_id == filters.section)
  }
  
  if (filters.role !== 'all') {
    filtered = filtered.filter(member => member.role === filters.role)
  }
  
  if (filters.status !== 'all') {
    filtered = filtered.filter(member => member.status === filters.status)
  }
  
  return filtered
})

// ========== Methods ==========
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
  const colors = [
    '#FFD700', '#FFA500', '#FF8C00', '#FF7F50',
    '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1'
  ]
  
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

// ========== Load Data ==========
const loadMembers = async () => {
  loading.value = true
  
  try {
    const response = await axios.get('http://TECHSTORM.kesug.com/api/users-public')
    
    if (response.data.success) {
      members.value = response.data.data || []
      
      // حساب الإحصائيات
      stats.value = {
        total_members: members.value.length,
        team_leaders: members.value.filter(m => m.role === 'team_leader').length,
        deputy_leaders: members.value.filter(m => m.role === 'deputy_leader').length,
        section_leaders: members.value.filter(m => m.role === 'section_leader').length,
        members: members.value.filter(m => m.role === 'member').length
      }
    }
  } catch (error) {
    console.error('Error loading members:', error)
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

const loadMemberStats = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    
    for (const member of members.value) {
      const response = await axios.get(`http://TECHSTORM.kesug.com/api/users/${member.id}/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        memberStats.value[member.id] = response.data.data
      }
    }
  } catch (error) {
    console.error('Error loading member stats:', error)
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

const applyFilters = () => {}

const refreshData = () => {
  loadMembers()
  loadSections()
}

// ========== Lifecycle ==========
onMounted(() => {
  loadMembers()
  loadSections()
  
  // Load stats after members are loaded
  setTimeout(() => {
    if (members.value.length > 0) {
      loadMemberStats()
    }
  }, 500)
})
</script>

<style scoped>
.team-view {
  padding: 20px;
  color: #fff;
  max-width: 1400px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
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

.header-actions {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  padding: 12px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
}

.btn-secondary:hover:not(:disabled) {
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-2px);
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: #FFD700;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
  color: #FFD700;
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
  color: #b0b0b0;
  font-size: 0.9rem;
}

.filters-section {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
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
  padding: 12px 45px;
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

.loading-container {
  text-align: center;
  padding: 80px;
  position: relative;
  z-index: 10;
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  position: relative;
  z-index: 10;
}

.member-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.member-card:hover {
  transform: translateY(-5px);
  border-color: #FFD700;
  box-shadow: 0 15px 35px rgba(255, 215, 0, 0.15);
}

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.member-card:hover::before {
  opacity: 1;
}

.member-avatar-wrapper {
  position: relative;
  width: fit-content;
  margin: 0 auto 15px;
}

.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #000;
  border: 3px solid #FFD700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  transition: all 0.3s;
}

.member-card:hover .member-avatar {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
}

.member-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid #1a1a1a;
}

.member-status.active {
  background: #10b981;
  box-shadow: 0 0 15px #10b981;
}

.member-status.inactive {
  background: #ef4444;
  box-shadow: 0 0 15px #ef4444;
}

.member-status.away {
  background: #f59e0b;
  box-shadow: 0 0 15px #f59e0b;
}

.member-info {
  text-align: center;
  margin-bottom: 15px;
}

.member-name {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 0 0 5px;
  font-weight: 700;
}

.member-role {
  display: inline-block;
  padding: 4px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.member-role.team_leader {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.member-role.deputy_leader {
  background: rgba(192, 192, 192, 0.15);
  color: #C0C0C0;
  border: 1px solid #C0C0C0;
}

.member-role.section_leader {
  background: rgba(205, 127, 50, 0.15);
  color: #CD7F32;
  border: 1px solid #CD7F32;
}

.member-role.member {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.member-section {
  display: block;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.member-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s;
  text-decoration: none;
}

.action-btn.whatsapp {
  background: rgba(37, 211, 102, 0.15);
  border: 1px solid #25D366;
  color: #25D366;
}

.action-btn.phone {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid #3b82f6;
  color: #3b82f6;
}

.action-btn.email {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #ef4444;
}

.action-btn:hover {
  transform: translateY(-3px);
}

.action-btn.whatsapp:hover {
  background: #25D366;
  color: #fff;
  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
}

.action-btn.phone:hover {
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.action-btn.email:hover {
  background: #ef4444;
  color: #fff;
  box-shadow: 0 5px 15px rgba(239, 68, 68, 0.3);
}

.member-stats {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.stat i {
  color: #FFD700;
}

.no-data {
  text-align: center;
  padding: 80px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  position: relative;
  z-index: 10;
}

.no-data i {
  font-size: 4rem;
  color: #FFD700;
  opacity: 0.5;
  margin-bottom: 20px;
}

.no-data h3 {
  color: #FFD700;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.no-data p {
  color: #b0b0b0;
}

/* Responsive */
@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters-section {
    flex-direction: column;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
}

[dir="rtl"] .search-box i {
  right: 15px;
  left: auto;
}

[dir="rtl"] .filter-select {
  background-position: left 15px center;
  padding-left: 40px;
  padding-right: 20px;
}

</style>
