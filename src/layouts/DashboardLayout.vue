<!-- src/layouts/DashboardLayout.vue -->
<template>
  <div class="dashboard-layout" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <!-- ===== خلفية فضائية ذهبية ===== -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
    </div>

    <!-- ===== سايد بار ===== -->
    <aside class="dashboard-sidebar" :class="{ 
      'mobile-open': isMobileSidebarOpen,
      'collapsed': isSidebarCollapsed 
    }">
      <div class="sidebar-header">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="logo-text" :class="{ 'hide-text': isSidebarCollapsed }">
            <span class="tech">TECH</span>
            <span class="storm">STORM</span>
          </div>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i :class="isSidebarCollapsed ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
        </button>
      </div>

      <div class="user-profile" :class="{ 'collapsed': isSidebarCollapsed }">
        <div class="user-avatar-wrapper">
          <div class="user-avatar" :style="{ backgroundColor: getAvatarColor(user?.fullName || user?.name) }">
            {{ getUserInitials(user?.fullName || user?.name) }}
          </div>
          <div class="user-status" :class="userStatus"></div>
        </div>
        <div class="user-info" :class="{ 'hide-text': isSidebarCollapsed }">
          <div class="user-name-wrapper">
            <h4>{{ user?.fullName || user?.name || 'مستخدم' }}</h4>
            <span :class="['role-badge', userRole]">
              {{ getRoleName(userRole) }}
            </span>
          </div>
          <span class="user-department">{{ getDepartmentName(userDepartment) }}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <!-- ===== Admin Navigation (Team Leader Only) ===== -->
        <template v-if="isTeamLeader">
          <div class="nav-section">
            <h3 class="nav-section-title" :class="{ 'hide-title': isSidebarCollapsed }">الإدارة</h3>
            <router-link to="/admin/applicants" class="nav-link" active-class="active">
              <i class="fas fa-file-signature"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">طلبات الانضمام</span>
              <span class="nav-badge" v-if="pendingCount">{{ pendingCount }}</span>
            </router-link>
            <router-link to="/admin/accepted" class="nav-link" active-class="active">
              <i class="fas fa-user-check"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الأعضاء المقبولين</span>
            </router-link>
            <router-link to="/admin/rejected" class="nav-link" active-class="active">
              <i class="fas fa-user-times"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الطلبات المرفوضة</span>
            </router-link>
            <router-link to="/admin/departments" class="nav-link" active-class="active">
              <i class="fas fa-sitemap"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">إدارة الأقسام</span>
            </router-link>
          </div>
        </template>

        <!-- ===== Deputy Leader Navigation ===== -->
        <template v-if="isDeputyLeader">
          <div class="nav-section">
            <h3 class="nav-section-title" :class="{ 'hide-title': isSidebarCollapsed }">صلاحيات النائب</h3>
            <router-link to="/admin/applicants" class="nav-link" active-class="active">
              <i class="fas fa-file-signature"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">طلبات الانضمام</span>
              <span class="nav-badge" v-if="pendingCount">{{ pendingCount }}</span>
            </router-link>
            <router-link to="/admin/accepted" class="nav-link" active-class="active">
              <i class="fas fa-user-check"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الأعضاء المقبولين</span>
            </router-link>
          </div>
        </template>

        <!-- ===== Section Leader Navigation ===== -->
        <template v-if="isSectionLeader">
          <div class="nav-section">
            <h3 class="nav-section-title" :class="{ 'hide-title': isSidebarCollapsed }">قسمي</h3>
            <router-link to="/department-head/members" class="nav-link" active-class="active">
              <i class="fas fa-users"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">أعضاء القسم</span>
            </router-link>
            <router-link to="/department-head/tasks" class="nav-link" active-class="active">
              <i class="fas fa-tasks"></i>
              <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">مهام القسم</span>
            </router-link>
          </div>
        </template>

        <!-- ===== Common Navigation (All Users) ===== -->
        <div class="nav-section">
          <h3 class="nav-section-title" :class="{ 'hide-title': isSidebarCollapsed }">عام</h3>
          <router-link to="/dashboard" class="nav-link" active-class="active" exact>
            <i class="fas fa-chart-pie"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">لوحة التحكم</span>
          </router-link>
          
          <!-- رابط الإحصائيات - للقائد والنائب فقط -->
          <router-link v-if="isTeamLeader || isDeputyLeader" to="/dashboard/statistics" class="nav-link" active-class="active">
            <i class="fas fa-chart-line"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الإحصائيات</span>
          </router-link>
          
          <router-link to="/dashboard/profile" class="nav-link" active-class="active">
            <i class="fas fa-user-circle"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الملف الشخصي</span>
          </router-link>
          <router-link to="/dashboard/tasks" class="nav-link" active-class="active">
            <i class="fas fa-tasks"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">المهام</span>
            <span class="nav-badge" v-if="myTasksCount">{{ myTasksCount }}</span>
          </router-link>
          
          <!-- إنشاء مهمة - للمدراء فقط (Leader, Deputy, Section Leader) -->
          <router-link v-if="canCreateTasks" to="/dashboard/tasks/create" class="nav-link" active-class="active">
            <i class="fas fa-plus-circle"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">مهمة جديدة</span>
          </router-link>
          
          <router-link to="/dashboard/team" class="nav-link" active-class="active">
            <i class="fas fa-users"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">الفريق</span>
          </router-link>
          <!-- ===== تم إزالة رابط الإعدادات ===== -->
        </div>

        <!-- ===== Logout ===== -->
        <div class="nav-section">
          <a @click="confirmLogout" class="nav-link logout-link">
            <i class="fas fa-sign-out-alt"></i>
            <span class="nav-text" :class="{ 'hide-text': isSidebarCollapsed }">تسجيل الخروج</span>
          </a>
        </div>
      </nav>
    </aside>

    <!-- ===== المحتوى الرئيسي ===== -->
    <main class="dashboard-main" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <!-- ===== الهيدر ===== -->
      <header class="dashboard-header">
        <div class="header-left">
          <button class="mobile-menu-toggle" @click="toggleMobileSidebar">
            <i class="fas fa-bars"></i>
          </button>
          <div class="page-title">
            <h1>{{ currentPageTitle }}</h1>
            <p>{{ currentPageDescription }}</p>
          </div>
        </div>

        <div class="header-right">
          <div class="header-actions">
            <button class="header-btn" @click="refreshData" :disabled="loading">
              <i class="fas fa-sync-alt" :class="{ 'fa-spin': loading }"></i>
            </button>
          </div>
          
          <div class="header-user">
            <div class="user-menu-btn" @click="toggleUserMenu">
              <div class="user-avatar-small-wrapper">
                <div class="user-avatar-small" :style="{ backgroundColor: getAvatarColor(user?.fullName || user?.name) }">
                  {{ getUserInitials(user?.fullName || user?.name) }}
                </div>
                <div class="user-status-small" :class="userStatus"></div>
              </div>
              <div class="user-info-small">
                <span class="user-name">{{ user?.fullName || user?.name || 'مستخدم' }}</span>
                <span class="user-role">{{ getRoleName(userRole) }}</span>
              </div>
              <i class="fas fa-chevron-down"></i>
            </div>
            
            <!-- User Dropdown Menu -->
            <div class="user-dropdown" v-if="isUserMenuOpen">
              <router-link to="/dashboard/profile" class="dropdown-item" @click="isUserMenuOpen = false">
                <i class="fas fa-user-circle"></i>
                <span>الملف الشخصي</span>
              </router-link>
              <!-- ===== تم إزالة رابط الإعدادات من القائمة المنسدلة ===== -->
              <div class="dropdown-divider"></div>
              <a @click="confirmLogout" class="dropdown-item logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>تسجيل الخروج</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- ===== المحتوى الديناميكي ===== -->
      <div class="dashboard-content">
        <router-view :key="$route.fullPath" />
      </div>
    </main>

    <!-- ===== Mobile Overlay ===== -->
    <div v-if="isMobileSidebarOpen" class="mobile-overlay" @click="closeMobileSidebar"></div>

    <!-- ===== Logout Confirmation Modal ===== -->
    <div v-if="showLogoutModal" class="modal-overlay" @click.self="cancelLogout">
      <div class="modal-content">
        <div class="modal-header">
          <i class="fas fa-sign-out-alt modal-icon"></i>
          <h3>تأكيد تسجيل الخروج</h3>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من تسجيل الخروج؟</p>
        </div>
        <div class="modal-footer">
          <button @click="logout" class="btn-logout-confirm" :disabled="logoutLoading">
            <i v-if="logoutLoading" class="fas fa-spinner fa-spin"></i>
            <span v-else>نعم، تسجيل خروج</span>
          </button>
          <button @click="cancelLogout" class="btn-cancel" :disabled="logoutLoading">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/config/api'

const router = useRouter()
const route = useRoute()

// ========== User Data ==========
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const userRole = computed(() => user.value?.role)
const userDepartment = computed(() => user.value?.section?.name)
const userStatus = computed(() => user.value?.status || 'active')
const userStats = ref({})
const loading = ref(false)

// ========== UI State ==========
const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)
const isUserMenuOpen = ref(false)
const showLogoutModal = ref(false)
const logoutLoading = ref(false)

// ========== Data Counts ==========
const pendingCount = ref(0)
const myTasksCount = ref(0)

// ========== Computed Permissions ==========
const isTeamLeader = computed(() => userRole.value === 'team_leader')
const isDeputyLeader = computed(() => userRole.value === 'deputy_leader')
const isSectionLeader = computed(() => userRole.value === 'section_leader')
const isMember = computed(() => userRole.value === 'member')
const canCreateTasks = computed(() => isTeamLeader.value || isDeputyLeader.value || isSectionLeader.value)

// ========== Page Title ==========
const currentPageTitle = computed(() => {
  return route.meta?.title || 'لوحة التحكم'
})

const currentPageDescription = computed(() => {
  const descriptions = {
    'طلبات الانضمام - TECH STORM': 'مراجعة وإدارة طلبات الأعضاء الجدد',
    'الأعضاء المقبولين - TECH STORM': 'بيانات وحسابات الأعضاء',
    'الطلبات المرفوضة - TECH STORM': 'سجل الطلبات المرفوضة',
    'الملف الشخصي - TECH STORM': 'عرض وتعديل بياناتك الشخصية',
    'المهام - TECH STORM': 'إدارة ومتابعة المهام',
    'إنشاء مهمة - TECH STORM': 'إنشاء مهمة جديدة وتوزيعها',
    'إدارة الأقسام - TECH STORM': 'تعديل وإضافة الأقسام',
    'الإحصائيات - TECH STORM': 'تحليلات ومؤشرات أداء الفريق'
  }
  return descriptions[route.meta?.title] || 'مرحباً بعودتك'
})

// ========== Helper Functions ==========
const getUserInitials = (name) => {
  if (!name) return 'U'
  
  // تقسيم الاسم وأخذ أول حرف من كل كلمة
  const nameParts = name.split(' ').filter(part => part.length > 0)
  
  if (nameParts.length >= 2) {
    // إذا كان الاسم ثلاثي، خذ أول حرفين
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  } else if (nameParts.length === 1) {
    // إذا كان اسم واحد، خذ أول حرفين من الاسم
    const singleName = nameParts[0]
    return singleName.substring(0, 2).toUpperCase()
  }
  
  return 'U'
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  
  // ألوان ذهبية متناسقة مع التصميم
  const colors = [
    '#FFD700', // ذهبي
    '#FFA500', // برتقالي ذهبي
    '#FF8C00', // برتقالي غامق
    '#FF7F50', // مرجاني
    '#FF6B6B', // أحمر فاتح
    '#10b981', // أخضر
    '#3b82f6', // أزرق
    '#8b5cf6'  // بنفسجي
  ]
  
  // اختيار لون بناءً على الاسم
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

const getDepartmentName = (dept) => {
  if (!dept) return ''
  return dept
}

// ========== Data Loading ==========
const loadDashboardData = async () => {
  try {
    // استخدم الرابط العام بدون Auth
    const response = await api.get('/dashboard-stats-public')
    if (response.data.success) {
      userStats.value = response.data.statistics
      myTasksCount.value = userStats.value.total_tasks || 0
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

const refreshData = () => {
  loadDashboardData()
}

// ========== UI Functions ==========
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
  localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.value)
}

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// ========== Logout ==========
const confirmLogout = () => {
  showLogoutModal.value = true
  isUserMenuOpen.value = false
}

const cancelLogout = () => {
  showLogoutModal.value = false
}

const logout = async () => {
  logoutLoading.value = true
  try {
    await api.post('/logout')
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    localStorage.removeItem('sidebarCollapsed')
    logoutLoading.value = false
    showLogoutModal.value = false
    router.push('/login')
  }
}

// ========== Lifecycle ==========
onMounted(() => {
  // Load sidebar state
  const savedState = localStorage.getItem('sidebarCollapsed')
  isSidebarCollapsed.value = savedState === 'true'
  
  // Load data
  loadDashboardData()
  
  // Close user menu when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-menu-btn') && !event.target.closest('.user-dropdown')) {
      isUserMenuOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for route changes to reload data
watch(() => route.path, () => {
  loadDashboardData()
})
</script>

<style scoped>
/* ===== كل الـ CSS الأصلي مع إضافة تحسينات للصورة ===== */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: 'Cairo', sans-serif;
  position: relative;
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
    radial-gradient(2px 2px at 40px 70px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80px 120px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 160px 200px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 300px 250px, #FFD700, rgba(0,0,0,0));
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

/* ===== سايد بار ===== */
.dashboard-sidebar {
  width: 280px;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 215, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
}

.dashboard-sidebar.collapsed {
  width: 90px;
}

.dashboard-sidebar.collapsed .logo-text.hide-text,
.dashboard-sidebar.collapsed .user-info.hide-text,
.dashboard-sidebar.collapsed .nav-text.hide-text,
.dashboard-sidebar.collapsed .nav-section-title.hide-title {
  display: none;
}

.dashboard-sidebar.collapsed .logo-wrapper {
  width: 100%;
  justify-content: center;
}

.dashboard-sidebar.collapsed .logo-icon {
  margin: 0;
}

.dashboard-sidebar.collapsed .user-profile.collapsed {
  justify-content: center;
  padding: 20px 10px;
}

.dashboard-sidebar.collapsed .user-avatar {
  width: 55px;
  height: 55px;
  font-size: 22px;
  margin: 0;
}

.dashboard-sidebar.collapsed .nav-link {
  justify-content: center;
  padding: 15px;
}

.dashboard-sidebar.collapsed .nav-link i {
  margin: 0;
  font-size: 1.3rem;
}

.dashboard-sidebar.collapsed .nav-badge {
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 3px 6px;
  font-size: 10px;
  margin: 0;
}

/* ===== Sidebar Header ===== */
.sidebar-header {
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.5rem;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s;
}

.tech {
  font-size: 1.4rem;
  font-weight: 900;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}

.storm {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.sidebar-toggle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #FFD700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.sidebar-toggle:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  transform: scale(1.05);
}

/* ===== User Profile محسّن ===== */
.user-profile {
  padding: 25px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.3s;
  position: relative;
}

.user-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.user-avatar:hover {
  transform: scale(1.05);
  border-color: #FFD700;
}

.user-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
}

.user-status.active {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.user-status.inactive {
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
}

.user-status.away {
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
}

.user-info {
  transition: opacity 0.3s;
  flex: 1;
  overflow: hidden;
}

.user-name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.user-name-wrapper h4 {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
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

.user-department {
  display: block;
  color: #b0b0b0;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Sidebar Navigation ===== */
.sidebar-nav {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-section {
  margin-bottom: 25px;
}

.nav-section-title {
  color: #b0b0b0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 15px;
  padding-right: 15px;
  transition: opacity 0.3s;
  white-space: nowrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 12px;
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  margin-bottom: 5px;
  position: relative;
  border: 1px solid transparent;
  white-space: nowrap;
}

.nav-link i {
  width: 20px;
  color: #b0b0b0;
  transition: all 0.3s;
  flex-shrink: 0;
}

.nav-text {
  transition: opacity 0.3s;
}

.nav-link:hover {
  background: rgba(255, 215, 0, 0.05);
  border-color: rgba(255, 215, 0, 0.2);
  color: #FFD700;
}

.nav-link:hover i {
  color: #FFD700;
  transform: scale(1.1);
}

.nav-link.active {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  color: #FFD700;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
}

.nav-link.active i {
  color: #FFD700;
}

.nav-badge {
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  padding: 2px 8px;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 700;
  margin-right: auto;
  transition: all 0.3s;
  flex-shrink: 0;
}

.logout-link {
  color: #ff6b6b;
}

.logout-link i {
  color: #ff6b6b;
}

.logout-link:hover {
  background: rgba(255, 107, 107, 0.1);
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* ===== Main Content ===== */
.dashboard-main {
  flex: 1;
  margin-right: 280px;
  transition: margin-right 0.4s;
  position: relative;
  z-index: 10;
}

.dashboard-main.sidebar-collapsed {
  margin-right: 90px;
}

/* ===== Dashboard Header ===== */
.dashboard-header {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.mobile-menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #FFD700;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.page-title h1 {
  color: #FFD700;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 5px;
  letter-spacing: 1px;
}

.page-title p {
  color: #b0b0b0;
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-btn {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.3s;
  position: relative;
  flex-shrink: 0;
}

.header-btn:hover:not(:disabled) {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  color: #FFD700;
  transform: translateY(-2px);
}

.header-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== Header User محسّن ===== */
.header-user {
  position: relative;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.user-menu-btn:hover {
  background: rgba(255, 215, 0, 0.05);
  border-color: #FFD700;
}

.user-avatar-small-wrapper {
  position: relative;
  flex-shrink: 0;
}

.user-avatar-small {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.user-menu-btn:hover .user-avatar-small {
  border-color: #FFD700;
  transform: scale(1.05);
}

.user-status-small {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
}

.user-status-small.active {
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.user-status-small.inactive {
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}

.user-info-small {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  color: #FFD700;
  font-size: 11px;
  white-space: nowrap;
}

.user-menu-btn i {
  color: #b0b0b0;
  font-size: 12px;
  transition: transform 0.3s;
  flex-shrink: 0;
}

.user-menu-btn:hover i {
  transform: rotate(180deg);
  color: #FFD700;
}

/* ===== User Dropdown ===== */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 240px;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  color: #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}

.dropdown-item:hover {
  background: rgba(255, 215, 0, 0.1);
  color: #FFD700;
}

.dropdown-item i {
  width: 18px;
  flex-shrink: 0;
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 215, 0, 0.1);
  margin: 8px 0;
}

.dropdown-item.logout {
  color: #ff6b6b;
}

.dropdown-item.logout:hover {
  background: rgba(255, 107, 107, 0.1);
}

/* ===== Dashboard Content ===== */
.dashboard-content {
  padding: 30px;
  position: relative;
  z-index: 20;
}

/* ===== Mobile Overlay ===== */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 90;
  display: none;
}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: rgba(10, 10, 15, 0.95);
  border-radius: 25px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 25px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.modal-icon {
  font-size: 3.5rem;
  color: #ff6b6b;
  margin-bottom: 10px;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.modal-header h3 {
  color: #ff6b6b;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-body {
  padding: 25px;
  text-align: center;
}

.modal-body p {
  color: #e0e0e0;
  font-size: 1.1rem;
}

.modal-footer {
  display: flex;
  gap: 15px;
  padding: 20px 25px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
}

.btn-logout-confirm {
  flex: 2;
  padding: 14px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-logout-confirm:hover:not(:disabled) {
  background: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.btn-logout-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  background: transparent;
  color: #e0e0e0;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover:not(:disabled) {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  color: #FFD700;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .dashboard-sidebar {
    right: -280px;
    width: 280px !important;
  }
  
  .dashboard-sidebar.mobile-open {
    right: 0;
  }
  
  .dashboard-main {
    margin-right: 0 !important;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-overlay {
    display: block;
  }
  
  .dashboard-sidebar.collapsed {
    width: 280px !important;
    right: -280px;
  }
  
  .dashboard-sidebar.collapsed.mobile-open {
    right: 0;
  }
  
  .dashboard-sidebar.collapsed .logo-text.hide-text,
  .dashboard-sidebar.collapsed .user-info.hide-text,
  .dashboard-sidebar.collapsed .nav-text.hide-text,
  .dashboard-sidebar.collapsed .nav-section-title.hide-title {
    display: flex !important;
  }
  
  .dashboard-sidebar.collapsed .nav-link {
    justify-content: flex-start;
    padding: 12px 15px;
  }
  
  .dashboard-sidebar.collapsed .nav-link i {
    margin-left: 15px;
    font-size: 1.1rem;
  }
  
  .dashboard-sidebar.collapsed .user-profile.collapsed {
    justify-content: flex-start;
    padding: 25px 20px;
  }
  
  .dashboard-sidebar.collapsed .user-avatar {
    width: 60px;
    height: 60px;
    font-size: 24px;
    margin-left: 15px;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 15px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .page-title h1 {
    font-size: 20px;
  }
  
  .page-title p {
    font-size: 12px;
  }
  
  .dashboard-content {
    padding: 20px;
  }
  
  .user-info-small {
    display: none;
  }
  
  .user-menu-btn {
    padding: 6px;
  }
  
  .user-avatar-small {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 576px) {
  .header-left {
    width: 100%;
    justify-content: space-between;
  }
  
  .page-title {
    flex: 1;
  }
  
  .page-title h1 {
    font-size: 18px;
  }
  
  .header-actions {
    gap: 10px;
  }
  
  .header-btn {
    width: 40px;
    height: 40px;
  }
  
  .dashboard-content {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    padding: 12px 15px;
  }
  
  .page-title h1 {
    font-size: 16px;
  }
  
  .page-title p {
    font-size: 11px;
  }
  
  .header-btn {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
  
  .user-avatar-small {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  
  .user-dropdown {
    width: 200px;
    left: auto;
    right: 0;
  }
  
  .dashboard-content {
    padding: 12px;
  }
}

/* ===== RTL Support ===== */
[dir="rtl"] .dashboard-sidebar {
  left: auto;
  right: 0;
  border-left: none;
  border-right: 1px solid rgba(255, 215, 0, 0.1);
}

[dir="rtl"] .dashboard-main {
  margin-right: 280px;
  margin-left: 0;
}

[dir="rtl"] .dashboard-main.sidebar-collapsed {
  margin-right: 90px;
}

[dir="rtl"] .sidebar-toggle i {
  transform: rotate(180deg);
}

[dir="rtl"] .user-dropdown {
  left: auto;
  right: 0;
}

[dir="rtl"] .dashboard-sidebar.collapsed .nav-link i {
  margin-left: 0;
  margin-right: 0;
}

[dir="rtl"] .dashboard-sidebar.collapsed .nav-badge {
  left: auto;
  right: 5px;
}

[dir="rtl"] .nav-section-title {
  padding-right: 0;
  padding-left: 15px;
  text-align: right;
}

[dir="rtl"] .user-status {
  right: auto;
  left: 2px;
}

[dir="rtl"] .user-status-small {
  right: auto;
  left: 0;
}

@media (max-width: 1024px) {
  [dir="rtl"] .dashboard-sidebar {
    right: -280px;
    left: auto;
  }
  
  [dir="rtl"] .dashboard-sidebar.mobile-open {
    right: 0;
    left: auto;
  }
  
  [dir="rtl"] .dashboard-main {
    margin-right: 0;
  }
  
  [dir="rtl"] .dashboard-sidebar.collapsed.mobile-open {
    right: 0;
    left: auto;
  }
  
  [dir="rtl"] .dashboard-sidebar.collapsed .nav-link i {
    margin-left: 0;
    margin-right: 15px;
  }
  
  [dir="rtl"] .dashboard-sidebar.collapsed .user-avatar {
    margin-left: 0;
    margin-right: 15px;
  }
}

@media (max-width: 480px) {
  [dir="rtl"] .user-dropdown {
    left: 0;
    right: auto;
  }
}
</style>
