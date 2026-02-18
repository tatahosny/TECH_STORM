<!-- src/views/admin/AssignHeadsView.vue -->
<template>
  <div class="assign-heads-view">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <div class="page-header">
      <div>
        <h1>👑 تعيين رؤساء الأقسام</h1>
        <p>قم بتعيين رؤساء الأقسام ورؤساء الفروع</p>
      </div>
      
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">الأقسام</span>
          <span class="stat-value">{{ departments.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">رؤساء أقسام</span>
          <span class="stat-value">{{ departmentHeadsCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">رؤساء فروع</span>
          <span class="stat-value">{{ subDepartmentLeadersCount }}</span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button 
        @click="activeTab = 'department-heads'" 
        :class="['tab', { active: activeTab === 'department-heads' }]"
      >
        <i class="fas fa-crown"></i>
        رؤساء الأقسام
      </button>
      <button 
        @click="activeTab = 'sub-leaders'" 
        :class="['tab', { active: activeTab === 'sub-leaders' }]"
      >
        <i class="fas fa-bolt"></i>
        رؤساء الفروع
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>جاري تحميل البيانات...</p>
    </div>

    <!-- ===== Department Heads Tab ===== -->
    <div v-else-if="activeTab === 'department-heads'" class="department-heads-tab">
      <div class="departments-grid">
        <div v-for="dept in departments" :key="dept.id" class="department-card">
          <div class="department-header" :style="{ backgroundColor: dept.color + '20', borderColor: dept.color }">
            <i :class="dept.icon" :style="{ color: dept.color }"></i>
            <h2>{{ dept.name }}</h2>
          </div>

          <div class="department-body">
            <!-- Current Department Head -->
            <div class="current-head-section">
              <h3>رئيس القسم الحالي</h3>
              <div v-if="departmentHeads[dept.id]" class="current-head">
                <div class="head-avatar" :style="{ backgroundColor: getAvatarColor(departmentHeads[dept.id].name) }">
                  {{ getUserInitials(departmentHeads[dept.id].name) }}
                </div>
                <div class="head-info">
                  <strong>{{ departmentHeads[dept.id].name }}</strong>
                  <span>{{ departmentHeads[dept.id].email }}</span>
                </div>
                <button @click="removeDepartmentHead(dept.id)" class="btn-remove">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-else class="no-head">
                <i class="fas fa-user-slash"></i>
                <p>لا يوجد رئيس قسم</p>
              </div>
            </div>

            <!-- Assign New Department Head -->
            <div class="assign-section">
              <h3>تعيين رئيس قسم جديد</h3>
              <div class="assign-form">
                <select v-model="selectedHead[dept.id]" class="form-select">
                  <option value="">اختر عضواً...</option>
                  <option v-for="member in getAvailableDepartmentMembers(dept.id)" :key="member.id" :value="member.id">
                    {{ member.name }} ({{ member.email }})
                  </option>
                </select>
                <button 
                  @click="assignDepartmentHead(dept.id)" 
                  class="btn-assign"
                  :disabled="!selectedHead[dept.id]"
                >
                  <i class="fas fa-check-circle"></i>
                  تعيين كرئيس قسم
                </button>
              </div>
            </div>

            <!-- Department Members -->
            <div class="members-section">
              <h3>أعضاء القسم</h3>
              <div class="members-list">
                <div v-for="member in getDepartmentMembers(dept.id)" :key="member.id" class="member-item">
                  <div class="member-avatar" :style="{ backgroundColor: getAvatarColor(member.name) }">
                    {{ getUserInitials(member.name) }}
                  </div>
                  <div class="member-info">
                    <strong>{{ member.name }}</strong>
                    <span>{{ getRoleName(member.role) }}</span>
                  </div>
                </div>
                <div v-if="!getDepartmentMembers(dept.id).length" class="no-members">
                  <i class="fas fa-users-slash"></i>
                  <p>لا يوجد أعضاء في هذا القسم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Sub-Department Leaders Tab ===== -->
    <div v-else-if="activeTab === 'sub-leaders'" class="sub-leaders-tab">
      <div class="departments-grid">
        <div v-for="dept in departments" :key="dept.id" class="department-card">
          <div class="department-header" :style="{ backgroundColor: dept.color + '20', borderColor: dept.color }">
            <i :class="dept.icon" :style="{ color: dept.color }"></i>
            <h2>{{ dept.name }}</h2>
            <span class="department-head-badge" v-if="departmentHeads[dept.id]">
              رئيس القسم: {{ departmentHeads[dept.id].name }}
            </span>
          </div>

          <div class="department-body">
            <div v-for="sub in dept.subDepartments || []" :key="sub.id" class="sub-department-item">
              <div class="sub-header">
                <i :class="sub.icon" :style="{ color: sub.color }"></i>
                <h4>{{ sub.name }}</h4>
              </div>

              <!-- Current Sub-Department Leader -->
              <div class="current-leader-section">
                <div v-if="subDepartmentLeaders[`${dept.id}_${sub.id}`]" class="current-leader">
                  <div class="leader-avatar" :style="{ backgroundColor: getAvatarColor(subDepartmentLeaders[`${dept.id}_${sub.id}`].name) }">
                    {{ getUserInitials(subDepartmentLeaders[`${dept.id}_${sub.id}`].name) }}
                  </div>
                  <div class="leader-info">
                    <strong>{{ subDepartmentLeaders[`${dept.id}_${sub.id}`].name }}</strong>
                    <span>{{ subDepartmentLeaders[`${dept.id}_${sub.id}`].email }}</span>
                  </div>
                  <button @click="removeSubDepartmentLeader(dept.id, sub.id)" class="btn-remove small">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div v-else class="no-leader">
                  <i class="fas fa-user-slash"></i>
                  <p>لا يوجد رئيس فرع</p>
                </div>
              </div>

              <!-- Assign New Sub-Department Leader -->
              <div class="assign-section small">
                <select v-model="selectedSubLeader[`${dept.id}_${sub.id}`]" class="form-select small">
                  <option value="">تعيين رئيس فرع...</option>
                  <option v-for="member in getAvailableSubDepartmentMembers(dept.id, sub.id)" :key="member.id" :value="member.id">
                    {{ member.name }}
                  </option>
                </select>
                <button 
                  @click="assignSubDepartmentLeader(dept.id, sub.id)" 
                  class="btn-assign small"
                  :disabled="!selectedSubLeader[`${dept.id}_${sub.id}`]"
                >
                  تعيين
                </button>
              </div>

              <!-- Sub-Department Members -->
              <div class="members-section small">
                <div class="members-list small">
                  <div v-for="member in getSubDepartmentMembers(dept.id, sub.id)" :key="member.id" class="member-item small">
                    <div class="member-avatar small" :style="{ backgroundColor: getAvatarColor(member.name) }">
                      {{ getUserInitials(member.name) }}
                    </div>
                    <div class="member-info">
                      <strong>{{ member.name }}</strong>
                    </div>
                  </div>
                  <div v-if="!getSubDepartmentMembers(dept.id, sub.id).length" class="no-members small">
                    <i class="fas fa-user-slash"></i>
                    <p>لا يوجد أعضاء</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDepartments } from '@/composables/useDepartments'
// تم إزالة import useTeamMembers غير المستخدم

// ========== State ==========
const activeTab = ref('department-heads')
const selectedHead = ref({})
const selectedSubLeader = ref({})

// ========== Composables ==========
const { 
  departments, 
  departmentHeads, 
  subDepartmentLeaders, 
  loading,
  fetchDepartments,
  assignDepartmentHead: assignHead,
  assignSubDepartmentLeader: assignSubLeader,
  removeDepartmentHead: removeHead,
  removeSubDepartmentLeader: removeSubLeader,
  getDepartmentMembers,
  getSubDepartmentMembers,
  getAvailableDepartmentMembers,
  getAvailableSubDepartmentMembers
} = useDepartments()

// ========== Computed ==========
const departmentHeadsCount = computed(() => {
  return Object.keys(departmentHeads.value || {}).length
})

const subDepartmentLeadersCount = computed(() => {
  return Object.keys(subDepartmentLeaders.value || {}).length
})

// ========== Methods ==========
const getUserInitials = (name) => {
  if (!name) return 'U'
  const parts = name.split(' ').filter(p => p.length > 0)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return 'U'
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

const getRoleName = (role) => {
  const roles = {
    'team_leader': '👑 قائد الفريق',
    'deputy_leader': '⭐ نائب القائد',
    'section_leader': '👥 رئيس قسم',
    'member': '👤 عضو'
  }
  return roles[role] || role
}

const assignDepartmentHead = async (departmentId) => {
  const userId = selectedHead.value[departmentId]
  if (!userId) return
  
  const success = await assignHead(departmentId, userId)
  
  if (success) {
    selectedHead.value[departmentId] = ''
    // استخدام نظام التنبيهات إذا كان موجود
    if (window.$alert) {
      window.$alert.success('تم تعيين رئيس القسم بنجاح')
    } else {
      alert('✅ تم تعيين رئيس القسم بنجاح')
    }
  } else {
    if (window.$alert) {
      window.$alert.error('فشل في تعيين رئيس القسم')
    } else {
      alert('❌ فشل في تعيين رئيس القسم')
    }
  }
}

const assignSubDepartmentLeader = async (departmentId, subDepartmentId) => {
  const key = `${departmentId}_${subDepartmentId}`
  const userId = selectedSubLeader.value[key]
  if (!userId) return
  
  const success = await assignSubLeader(departmentId, subDepartmentId, userId)
  
  if (success) {
    selectedSubLeader.value[key] = ''
    if (window.$alert) {
      window.$alert.success('تم تعيين رئيس الفرع بنجاح')
    } else {
      alert('✅ تم تعيين رئيس الفرع بنجاح')
    }
  } else {
    if (window.$alert) {
      window.$alert.error('فشل في تعيين رئيس الفرع')
    } else {
      alert('❌ فشل في تعيين رئيس الفرع')
    }
  }
}

const removeDepartmentHead = async (departmentId) => {
  if (!confirm('هل أنت متأكد من إزالة رئيس القسم؟')) return
  
  const success = await removeHead(departmentId)
  
  if (success) {
    if (window.$alert) {
      window.$alert.success('تم إزالة رئيس القسم بنجاح')
    } else {
      alert('✅ تم إزالة رئيس القسم بنجاح')
    }
  } else {
    if (window.$alert) {
      window.$alert.error('فشل في إزالة رئيس القسم')
    } else {
      alert('❌ فشل في إزالة رئيس القسم')
    }
  }
}

const removeSubDepartmentLeader = async (departmentId, subDepartmentId) => {
  if (!confirm('هل أنت متأكد من إزالة رئيس الفرع؟')) return
  
  const success = await removeSubLeader(departmentId, subDepartmentId)
  
  if (success) {
    if (window.$alert) {
      window.$alert.success('تم إزالة رئيس الفرع بنجاح')
    } else {
      alert('✅ تم إزالة رئيس الفرع بنجاح')
    }
  } else {
    if (window.$alert) {
      window.$alert.error('فشل في إزالة رئيس الفرع')
    } else {
      alert('❌ فشل في إزالة رئيس الفرع')
    }
  }
}

// ========== Lifecycle ==========
onMounted(async () => {
  await fetchDepartments()
})
</script>

<style scoped>
.assign-heads-view {
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

/* ===== Page Header ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
  gap: 20px;
}

.page-header h1 {
  font-size: 32px;
  color: #FFD700;
  margin-bottom: 8px;
  font-weight: 900;
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
  flex-wrap: wrap;
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
  flex-wrap: wrap;
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
  min-width: 200px;
}

.tab.active {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #000;
  box-shadow: 0 10px 25px rgba(255,215,0,0.3);
}

/* ===== Departments Grid ===== */
.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
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
}

.department-header {
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
  position: relative;
  flex-wrap: wrap;
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

.department-head-badge {
  background: rgba(255,215,0,0.1);
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 12px;
  color: #FFD700;
  border: 1px solid #FFD700;
  margin-right: auto;
}

.department-body {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* ===== Current Head Section ===== */
.current-head-section h3,
.assign-section h3,
.members-section h3 {
  color: #FFD700;
  font-size: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-head {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255,215,0,0.05);
  border-radius: 15px;
  flex-wrap: wrap;
}

.head-avatar {
  width: 50px;
  height: 50px;
  border-radius: 12px;
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
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
}

.head-info strong {
  color: #fff;
  font-size: 15px;
}

.head-info span {
  color: #b0b0b0;
  font-size: 12px;
}

.no-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background: rgba(255,255,255,0.02);
  border-radius: 15px;
  color: #b0b0b0;
  gap: 10px;
}

.no-head i {
  font-size: 30px;
  color: #b0b0b0;
}

/* ===== Assign Section ===== */
.assign-form {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.form-select {
  flex: 1;
  padding: 12px 18px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  min-width: 200px;
}

.form-select:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255,215,0,0.05);
}

.form-select option {
  background: #1a1a1a;
  color: #fff;
}

.btn-assign {
  padding: 12px 25px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-assign:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

.btn-assign:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-assign.small {
  padding: 8px 15px;
  font-size: 13px;
}

/* ===== Remove Button ===== */
.btn-remove {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #ef4444;
  color: white;
}

.btn-remove.small {
  width: 32px;
  height: 32px;
}

/* ===== Members Section ===== */
.members-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 5px;
}

.members-list::-webkit-scrollbar {
  width: 4px;
}

.members-list::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.02);
}

.members-list::-webkit-scrollbar-thumb {
  background: #FFD700;
  border-radius: 4px;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255,255,255,0.02);
  border-radius: 10px;
  transition: all 0.3s;
}

.member-item:hover {
  background: rgba(255,215,0,0.05);
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  flex-shrink: 0;
}

.member-avatar.small {
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.member-info strong {
  color: #fff;
  font-size: 14px;
}

.member-info span {
  color: #b0b0b0;
  font-size: 11px;
}

.no-members {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: rgba(255,255,255,0.02);
  border-radius: 10px;
  color: #b0b0b0;
}

.no-members i {
  font-size: 18px;
}

/* ===== Sub-Department Styles ===== */
.sub-department-item {
  padding: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

.sub-department-item:last-child {
  margin-bottom: 0;
}

.sub-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,215,0,0.1);
  flex-wrap: wrap;
}

.sub-header i {
  font-size: 1.2rem;
}

.sub-header h4 {
  color: #fff;
  font-size: 1.1rem;
  margin: 0;
}

.current-leader-section {
  margin-bottom: 10px;
}

.current-leader {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(139,92,246,0.05);
  border-radius: 12px;
  flex-wrap: wrap;
}

.leader-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  flex-shrink: 0;
}

.leader-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 150px;
}

.leader-info strong {
  color: #fff;
  font-size: 14px;
}

.leader-info span {
  color: #b0b0b0;
  font-size: 11px;
}

.no-leader {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  color: #b0b0b0;
  flex-wrap: wrap;
}

.no-leader i {
  font-size: 16px;
}

/* ===== Loading State ===== */
.loading-state {
  text-align: center;
  padding: 100px 20px;
  position: relative;
  z-index: 2;
}

.loading-state i {
  font-size: 50px;
  color: #FFD700;
  margin-bottom: 20px;
}

.loading-state p {
  color: #b0b0b0;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .departments-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .assign-heads-view {
    padding: 20px;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .tabs {
    flex-direction: column;
  }
  
  .tab {
    width: 100%;
  }
  
  .assign-form {
    flex-direction: column;
  }
  
  .form-select {
    width: 100%;
  }
  
  .btn-assign {
    width: 100%;
    justify-content: center;
  }
  
  .department-header {
    flex-direction: column;
    text-align: center;
  }
  
  .department-head-badge {
    margin-right: 0;
  }
  
  .current-head {
    flex-direction: column;
    text-align: center;
  }
  
  .head-info {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .stat-item {
    padding: 5px 10px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .department-header h2 {
    font-size: 1.2rem;
  }
  
  .member-item {
    flex-direction: column;
    text-align: center;
  }
  
  .member-info {
    align-items: center;
  }
}

/* ===== RTL Support ===== */
[dir="rtl"] .department-head-badge {
  margin-right: 0;
  margin-left: auto;
}

[dir="rtl"] .members-list {
  padding-right: 0;
  padding-left: 5px;
}
</style>
