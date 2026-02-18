<!-- src/views/admin/AdminDepartmentsView.vue -->
<template>
  <div class="admin-departments">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="page-header">
      <div>
        <h1>🏢 إدارة الأقسام</h1>
        <p>عرض وإدارة أقسام الفريق والفروع</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">الأقسام</span>
          <span class="stat-value">{{ departments.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">الفروع</span>
          <span class="stat-value">{{ totalSubDepartments }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">الأعضاء</span>
          <span class="stat-value">{{ totalMembers }}</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button 
        @click="activeTab = 'departments'" 
        :class="['tab', { active: activeTab === 'departments' }]"
      >
        <i class="fas fa-sitemap"></i>
        الأقسام
      </button>
      <button 
        @click="activeTab = 'subdepartments'" 
        :class="['tab', { active: activeTab === 'subdepartments' }]"
      >
        <i class="fas fa-code-branch"></i>
        الفروع
      </button>
      <button 
        @click="activeTab = 'heads'" 
        :class="['tab', { active: activeTab === 'heads' }]"
      >
        <i class="fas fa-crown"></i>
        الرؤساء
      </button>
    </div>

    <!-- ===== Departments Tab ===== -->
    <div v-if="activeTab === 'departments'" class="departments-tab">
      <div class="departments-grid">
        <div v-for="dept in departments" :key="dept.id" class="department-card">
          <div class="department-header" :style="{ backgroundColor: dept.color + '20', borderColor: dept.color }">
            <i :class="dept.icon" :style="{ color: dept.color }"></i>
            <h2>{{ dept.name }}</h2>
          </div>
          
          <div class="department-body">
            <div class="info-row">
              <i class="fas fa-user-tie"></i>
              <span>رئيس القسم:</span>
              <strong>{{ dept.headName || 'غير معين' }}</strong>
            </div>
            
            <div class="info-row">
              <i class="fas fa-users"></i>
              <span>عدد الأعضاء:</span>
              <strong>{{ getDepartmentMemberCount(dept.id) }}</strong>
            </div>
            
            <div class="info-row">
              <i class="fas fa-code-branch"></i>
              <span>الفروع:</span>
              <strong>{{ dept.subDepartments?.length || 0 }}</strong>
            </div>
            
            <div class="info-row">
              <i class="fas fa-tasks"></i>
              <span>المهام:</span>
              <strong>{{ getDepartmentTaskCount(dept.id) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SubDepartments Tab ===== -->
    <div v-if="activeTab === 'subdepartments'" class="subdepartments-tab">
      <div class="filters">
        <select v-model="selectedDepartment" class="filter-select">
          <option value="">جميع الأقسام</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }}
          </option>
        </select>
      </div>

      <div class="subdepartments-grid">
        <div v-for="dept in filteredDepartments" :key="dept.id" class="department-section">
          <h3 class="department-title">
            <i :class="dept.icon" :style="{ color: dept.color }"></i>
            {{ dept.name }}
          </h3>
          
          <div class="subdepartments-list">
            <div v-for="sub in dept.subDepartments" :key="sub.id" class="subdepartment-card">
              <div class="sub-header">
                <i :class="sub.icon"></i>
                <h4>{{ sub.name }}</h4>
              </div>
              
              <div class="sub-body">
                <div class="info-row">
                  <i class="fas fa-user-tie"></i>
                  <span>رئيس الفرع:</span>
                  <strong>{{ sub.leaderName || 'غير معين' }}</strong>
                </div>
                
                <div class="info-row">
                  <i class="fas fa-users"></i>
                  <span>عدد الأعضاء:</span>
                  <strong>{{ getSubDepartmentMemberCount(dept.id, sub.id) }}</strong>
                </div>
                
                <div class="info-row">
                  <i class="fas fa-tasks"></i>
                  <span>المهام:</span>
                  <strong>{{ getSubDepartmentTaskCount(dept.id, sub.id) }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Heads Tab ===== -->
    <div v-if="activeTab === 'heads'" class="heads-tab">
      <div class="heads-grid">
        <!-- Department Heads -->
        <div class="heads-section">
          <h3><i class="fas fa-crown"></i> رؤساء الأقسام</h3>
          <div class="heads-list">
            <div v-for="(head, deptId) in departmentHeads" :key="deptId" class="head-card">
              <div class="head-avatar" :style="{ backgroundColor: getAvatarColor(head.fullName) }">
                {{ getUserInitials(head.fullName) }}
              </div>
              <div class="head-info">
                <h4>{{ head.fullName }}</h4>
                <p class="head-department">{{ getDepartmentName(deptId) }}</p>
                <p class="head-email">{{ head.email }}</p>
              </div>
            </div>
            <div v-if="!Object.keys(departmentHeads).length" class="empty-state small">
              <i class="fas fa-user-slash"></i>
              <p>لا يوجد رؤساء أقسام</p>
            </div>
          </div>
        </div>

        <!-- Sub-Department Leaders -->
        <div class="heads-section">
          <h3><i class="fas fa-bolt"></i> رؤساء الفروع</h3>
          <div class="heads-list">
            <div v-for="(leader, key) in subDepartmentLeaders" :key="key" class="head-card">
              <div class="head-avatar" :style="{ backgroundColor: getAvatarColor(leader.fullName) }">
                {{ getUserInitials(leader.fullName) }}
              </div>
              <div class="head-info">
                <h4>{{ leader.fullName }}</h4>
                <p class="head-department">
                  {{ getDepartmentName(leader.subDepartmentLeaderOf?.departmentId) }} - 
                  {{ getSubDepartmentName(leader.subDepartmentLeaderOf?.subDepartment) }}
                </p>
                <p class="head-email">{{ leader.email }}</p>
              </div>
            </div>
            <div v-if="!Object.keys(subDepartmentLeaders).length" class="empty-state small">
              <i class="fas fa-user-slash"></i>
              <p>لا يوجد رؤساء فروع</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDepartments } from '@/composables/useDepartments'
import { useTeamMembers } from '@/composables/useTeamMembers'
import { useTasks } from '@/composables/useTasks'

const { 
  departments, 
  departmentHeads, 
  subDepartmentLeaders, 
  loadDepartments,
  getDepartmentMembers,
  getSubDepartmentMembers 
} = useDepartments()

const { teamMembers, loadTeamMembers } = useTeamMembers()
const { tasks, loadAllTasks } = useTasks()

// ========== State ==========
const activeTab = ref('departments')
const selectedDepartment = ref('')

// ========== Computed ==========
const totalSubDepartments = computed(() => {
  return departments.value.reduce((acc, dept) => acc + (dept.subDepartments?.length || 0), 0)
})

const totalMembers = computed(() => {
  return teamMembers.value.length
})

const filteredDepartments = computed(() => {
  if (!selectedDepartment.value) return departments.value
  return departments.value.filter(d => d.id === selectedDepartment.value)
})

// ========== Methods ==========
const getUserInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B']
  return colors[name.length % colors.length]
}

const getDepartmentName = (deptId) => {
  const dept = departments.value.find(d => d.id === deptId)
  return dept?.name || deptId
}

const getSubDepartmentName = (subId) => {
  const names = {
    electricity: 'كهرباء',
    structure: 'هيكل',
    components: 'مكونات',
    web_frontend: 'ويب فرونت',
    web_backend: 'ويب باك',
    mobile_frontend: 'موبايل فرونت',
    mobile_backend: 'موبايل باك'
  }
  return names[subId] || subId
}

const getDepartmentMemberCount = (departmentId) => {
  return teamMembers.value.filter(m => 
    m.role?.department === departmentId || m.roleData?.department === departmentId
  ).length
}

const getSubDepartmentMemberCount = (departmentId, subDepartmentId) => {
  return teamMembers.value.filter(m => 
    (m.role?.department === departmentId || m.roleData?.department === departmentId) &&
    (m.role?.subDepartment === subDepartmentId || m.roleData?.subDepartment === subDepartmentId)
  ).length
}

const getDepartmentTaskCount = (departmentId) => {
  return tasks.value.filter(t => t.department === departmentId).length
}

const getSubDepartmentTaskCount = (departmentId, subDepartmentId) => {
  return tasks.value.filter(t => 
    t.department === departmentId && t.subDepartment === subDepartmentId
  ).length
}

// ========== Lifecycle ==========
let unsubscribeDepts, unsubscribeMembers, unsubscribeTasks

onMounted(() => {
  unsubscribeDepts = loadDepartments()
  unsubscribeMembers = loadTeamMembers()
  unsubscribeTasks = loadAllTasks()
})

onUnmounted(() => {
  if (unsubscribeDepts) unsubscribeDepts()
  if (unsubscribeMembers) unsubscribeMembers()
  if (unsubscribeTasks) unsubscribeTasks()
})
</script>

<style scoped>
.admin-departments {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  color: #fff;
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
  background: transparent;
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
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.3; }
}

@keyframes floatSphere {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.95); }
}

/* ===== Page Header ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.page-header h1 {
  font-size: 32px;
  color: #FFD700;
  margin-bottom: 8px;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255,215,0,0.3);
}

.page-header p {
  color: #b0b0b0;
  font-size: 16px;
}

.header-stats {
  display: flex;
  gap: 15px;
  background: rgba(255,215,0,0.03);
  padding: 12px;
  border-radius: 60px;
  border: 1px solid rgba(255,215,0,0.2);
  backdrop-filter: blur(10px);
}

.stat-item {
  padding: 8px 20px;
  border-radius: 30px;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  color: #b0b0b0;
  font-size: 12px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #FFD700;
}

/* ===== Tabs ===== */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: rgba(255,255,255,0.02);
  padding: 8px;
  border-radius: 60px;
  border: 1px solid rgba(255,215,0,0.2);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 50px;
  background: transparent;
  border: none;
  color: #b0b0b0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tab i {
  font-size: 1.1rem;
}

.tab.active {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #000;
  box-shadow: 0 10px 25px rgba(255,215,0,0.3);
}

/* ===== Departments Grid ===== */
.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  position: relative;
  z-index: 2;
}

.department-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.department-card:hover {
  border-color: #FFD700;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.department-header {
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
}

.department-header i {
  font-size: 2rem;
}

.department-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
}

.department-body {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #b0b0b0;
  font-size: 14px;
}

.info-row i {
  width: 20px;
  color: #FFD700;
}

.info-row strong {
  color: #fff;
  margin-right: auto;
}

/* ===== Filters ===== */
.filters {
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
}

.filter-select {
  width: 100%;
  max-width: 300px;
  padding: 14px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255,215,0,0.05);
}

/* ===== SubDepartments Grid ===== */
.subdepartments-grid {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  z-index: 2;
}

.department-section {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  padding: 25px;
}

.department-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFD700;
  font-size: 1.3rem;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
}

.subdepartments-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.subdepartment-card {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 20px;
  padding: 20px;
  transition: all 0.3s;
}

.subdepartment-card:hover {
  border-color: #FFD700;
  transform: translateY(-3px);
}

.sub-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
}

.sub-header i {
  color: #FFD700;
  font-size: 1.2rem;
}

.sub-header h4 {
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
}

.sub-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===== Heads Grid ===== */
.heads-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  position: relative;
  z-index: 2;
}

.heads-section {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  padding: 25px;
}

.heads-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FFD700;
  font-size: 1.2rem;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
}

.heads-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.head-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 20px;
  transition: all 0.3s;
}

.head-card:hover {
  border-color: #FFD700;
  transform: translateX(-5px);
}

.head-avatar {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  flex-shrink: 0;
}

.head-info {
  flex: 1;
}

.head-info h4 {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 5px;
}

.head-department {
  color: #FFD700;
  font-size: 0.85rem;
  margin-bottom: 3px;
}

.head-email {
  color: #b0b0b0;
  font-size: 0.8rem;
}

/* ===== Empty State ===== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #b0b0b0;
}

.empty-state.small {
  padding: 40px 20px;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #b0b0b0;
}

.empty-state p {
  font-size: 1rem;
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .admin-departments {
    padding: 20px;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .heads-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    border-radius: 30px;
  }
  
  .departments-grid {
    grid-template-columns: 1fr;
  }
  
  .subdepartments-list {
    grid-template-columns: 1fr;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-around;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* RTL Support */
[dir="rtl"] .head-card:hover {
  transform: translateX(5px);
}
</style>
