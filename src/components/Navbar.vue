<template>
  <nav class="site-navbar" :class="{ 'scrolled': isScrolled, 'menu-open': isMobileMenuOpen }">
    <div class="container">
      <div class="nav-content">
        <!-- زر القائمة للموبايل - فضائي -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu" :aria-label="isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'">
          <div class="hamburger-box">
            <div class="hamburger-inner" :class="{ active: isMobileMenuOpen }"></div>
          </div>
          <div class="hamburger-glow"></div>
        </button>
        
        <!-- الروابط الرئيسية - فضائية -->
        <ul class="nav-links" :class="{ 'active': isMobileMenuOpen }">
          <li v-for="link in navLinks" :key="link.path">
            <router-link 
              :to="link.path" 
              class="nav-link" 
              :class="{ 'active': isActiveRoute(link.path) }"
              @click="closeMobileMenu"
            >
              <div class="link-icon">
                <i :class="link.icon"></i>
              </div>
              <span class="link-text">{{ link.title }}</span>
              <div class="link-glow"></div>
            </router-link>
          </li>
          
          <!-- زر تسجيل الدخول - يظهر فقط في قائمة الموبايل -->
          <li v-if="!isAuthenticated" class="mobile-only-login">
            <router-link to="/login" class="nav-link login-mobile-link" @click="closeMobileMenu">
              <div class="link-icon">
                <i class="fas fa-sign-in-alt"></i>
              </div>
              <span>تسجيل الدخول</span>
              <div class="link-glow"></div>
            </router-link>
          </li>
        </ul>
        
        <!-- قسم المستخدم (ديسكتوب) - فضائي -->
        <div class="desktop-user-section">
          <template v-if="isAuthenticated">
            <div class="user-menu-wrapper">
              <button class="user-btn" @click="toggleUserMenu">
                <div class="user-avatar-container">
                  <div class="user-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="user-status" :class="{ 'admin': isAdmin }"></div>
                  <div class="avatar-glow"></div>
                </div>
                <span class="user-name">{{ userEmail.split('@')[0] }}</span>
                <i class="fas fa-chevron-down" :class="{ 'rotated': showUserMenu }"></i>
              </button>
              
              <transition name="fade">
                <div class="user-dropdown" v-if="showUserMenu">
                  <div class="dropdown-glow"></div>
                  <router-link to="/member/profile" class="dropdown-item" @click="closeAllMenus">
                    <i class="fas fa-user-circle"></i>
                    <span>الملف الشخصي</span>
                  </router-link>
                  <router-link to="/member/tasks" class="dropdown-item" @click="closeAllMenus">
                    <i class="fas fa-tasks"></i>
                    <span>مهامي</span>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item logout-btn" @click="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </transition>
            </div>
          </template>
          
          <template v-else>
            <router-link to="/login" class="login-btn">
              <i class="fas fa-sign-in-alt"></i>
              <span>تسجيل الدخول</span>
              <div class="btn-glow"></div>
            </router-link>
          </template>
        </div>
      </div>
    </div>
    
    <!-- غطاء فضائي للموبايل -->
    <transition name="fade">
      <div class="mobile-menu-overlay" v-if="isMobileMenuOpen" @click="closeAllMenus"></div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'SiteNavbar',
  data() {
    return {
      isMobileMenuOpen: false,
      showUserMenu: false,
      isAuthenticated: false,
      userEmail: '',
      isAdmin: false,
      isScrolled: false,
      navLinks: [
        { path: '/', title: 'الرئيسية', icon: 'fas fa-home' },
        { path: '/projects', title: 'المشاريع', icon: 'fas fa-code' },
        { path: '/about', title: 'عن الفريق', icon: 'fas fa-info-circle' },
        { path: '/team', title: 'الأعضاء', icon: 'fas fa-users' },
        { path: '/specializations', title: 'التخصصات', icon: 'fas fa-cogs' },
        { path: '/contact', title: 'تواصل', icon: 'fas fa-envelope' },
        { path: '/apply', title: 'طلب انضمام', icon: 'fas fa-user-plus' }
      ]
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    closeAllMenus() {
      this.closeMobileMenu()
      this.showUserMenu = false
    },
    isActiveRoute(path) {
      return this.$route.path === path
    },
    checkAuthStatus() {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          this.isAuthenticated = true
          this.userEmail = user.email || 'مستخدم'
          this.isAdmin = user.role === 'admin' || user.role === 'leader'
        } catch (e) {
          console.error('Error parsing user data', e)
          this.isAuthenticated = false
        }
      } else {
        this.isAuthenticated = false
        this.userEmail = ''
        this.isAdmin = false
      }
    },
    logout() {
      localStorage.removeItem('user')
      this.isAuthenticated = false
      this.userEmail = ''
      this.isAdmin = false
      this.closeAllMenus()
      if (this.$router) {
        this.$router.push('/')
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    handleResize() {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu()
      }
    }
  },
  mounted() {
    this.checkAuthStatus()
    this.handleResize()
    this.$watch('$route', this.checkAuthStatus)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('storage', this.checkAuthStatus)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('storage', this.checkAuthStatus)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.site-navbar {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(0);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* تأثير الفضاء - نجوم متحركة */
.site-navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.02) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.02) 0%, transparent 60%);
  pointer-events: none;
  z-index: -1;
}

/* تأثير الزجاج الفضائي عند التمرير */
.site-navbar.scrolled {
  top: 70px;
  height: 55px;
  background: rgba(5, 5, 10, 0.7);
  backdrop-filter: blur(15px) saturate(180%);
  border-bottom: 1px solid rgba(255, 215, 0, 0.25);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  position: relative;
  z-index: 2;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}

/* ===== زر الهامبرجر الفضائي ===== */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #FFD700;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  width: 44px;
  height: 44px;
  position: relative;
  background: rgba(255, 215, 0, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(5px);
}

.hamburger-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.3s;
  filter: blur(10px);
}

.mobile-menu-btn:hover .hamburger-glow {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.hamburger-box {
  width: 24px;
  height: 24px;
  position: relative;
}

.hamburger-inner {
  width: 24px;
  height: 2px;
  background: #FFD700;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #FFD700;
  border-radius: 4px;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.hamburger-inner::before { transform: translateY(-8px); }
.hamburger-inner::after { transform: translateY(8px); }

.hamburger-inner.active {
  background: transparent;
}

.hamburger-inner.active::before {
  transform: rotate(45deg);
}

.hamburger-inner.active::after {
  transform: rotate(-45deg);
}

/* ===== الروابط الفضائية ===== */
.nav-links {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

/* ===== الشرط الصحيح لقائمة الموبايل الجانبية ===== */
@media (max-width: 768px) {
  .nav-links {
    position: fixed !important;
    top: 0 !important;
    right: -100% !important;
    width: 280px !important;
    height: 100vh !important;
    background: rgba(5, 5, 10, 0.98) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    flex-direction: column !important;
    padding: 100px 20px 30px !important;
    gap: 10px !important;
    transition: right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    z-index: 999 !important;
    border-left: 1px solid rgba(255, 215, 0, 0.2) !important;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5) !important;
    display: flex !important;
    margin: 0 !important;
    overflow-y: auto !important;
  }
  
  .nav-links.active {
    right: 0 !important;
  }
  
  /* تأكيد إخفاء قسم الديسكتوب */
  .desktop-user-section {
    display: none !important;
  }
}

/* ستايل الروابط في جميع الشاشات */
.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 18px;
  border-radius: 30px;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
}

.link-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 80%);
  opacity: 0;
  transition: width 0.6s, height 0.6s, opacity 0.3s;
  pointer-events: none;
}

.nav-link:hover {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateY(-2px);
}

.nav-link:hover .link-glow {
  width: 150px;
  height: 150px;
  opacity: 0.5;
}

.nav-link.active {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: transform 0.3s;
}

.nav-link:hover .link-icon {
  transform: scale(1.2) rotate(5deg);
}

/* ستايل خاص للموبايل */
@media (max-width: 768px) {
  .nav-link {
    width: 100% !important;
    padding: 14px 20px !important;
    font-size: 1rem !important;
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
  
  .nav-link.active {
    background: rgba(255, 215, 0, 0.1) !important;
    border-color: rgba(255, 215, 0, 0.3) !important;
  }
}

/* ===== قسم المستخدم الفضائي ===== */
.desktop-user-section {
  display: flex;
  align-items: center;
  margin-right: 0;
}

@media (min-width: 769px) {
  .desktop-user-section {
    display: flex !important;
  }
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #FFD700;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 22px;
  border-radius: 30px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  transition: all 0.4s;
  background: rgba(255, 215, 0, 0.03);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 80%);
  opacity: 0;
  transition: width 0.6s, height 0.6s;
}

.login-btn:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
}

.login-btn:hover .btn-glow {
  width: 200px;
  height: 200px;
  opacity: 0.5;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 215, 0, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: #fff;
  padding: 6px 18px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.user-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 80%);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.user-btn:hover::before {
  width: 200px;
  height: 200px;
}

.user-btn:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  transform: translateY(-2px);
}

.user-avatar-container {
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(145deg, #FFD700, #FF8C00);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #000;
  position: relative;
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, transparent 80%);
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s;
}

.user-btn:hover .avatar-glow {
  opacity: 0.7;
}

.user-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #4caf50;
  border-radius: 50%;
  border: 2px solid #000;
}

.user-status.admin { background: #FFD700; }

.user-dropdown {
  position: absolute;
  top: calc(100% + 15px);
  left: 0;
  min-width: 240px;
  background: rgba(8, 8, 15, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.1), transparent);
  pointer-events: none;
}

/* ===== ريل تبع ===== */
[dir="rtl"] .nav-links {
  right: auto;
  left: -100%;
  border-left: none;
  border-right: 1px solid rgba(255, 215, 0, 0.2);
}

[dir="rtl"] .nav-links.active {
  right: auto;
  left: 0;
}

[dir="rtl"] .user-dropdown {
  left: auto;
  right: 0;
}

/* ===== غطاء الموبايل الفضائي ===== */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 998;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .site-navbar { top: 70px; height: 55px; }
  .site-navbar.scrolled { top: 65px; height: 52px; }
}

@media (max-width: 768px) {
  .site-navbar { top: 65px; height: 52px; }
  .site-navbar.scrolled { top: 60px; height: 50px; }
}

@media (max-width: 480px) {
  .site-navbar { top: 60px; height: 50px; }
  .site-navbar.scrolled { top: 55px; height: 48px; }
  .nav-links { 
    width: 260px !important;
    padding: 90px 15px 30px !important;
  }
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ===== الحل النهائي لإخفاء زر تسجيل الدخول المزدوج ===== */
@media (min-width: 769px) {
  .mobile-only-login {
    display: none !important;
  }
}

/* ستايل زر تسجيل الدخول في الموبايل */
.mobile-only-login {
  margin-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding-top: 15px;
}

.mobile-only-login .nav-link {
  background: rgba(255, 215, 0, 0.08) !important;
  border: 1px solid rgba(255, 215, 0, 0.3) !important;
  color: #FFD700 !important;
}

.mobile-only-login .nav-link:hover {
  background: rgba(255, 215, 0, 0.15) !important;
  border-color: #FFD700 !important;
}
</style>