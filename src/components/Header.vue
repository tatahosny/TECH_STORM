<template>
  <header class="site-header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="brand">
          <div class="logo-wrapper">
            <div class="logo-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <div class="logo-text">
              <span class="storm">STORM</span>
              <span class="tech">TECH</span>
            </div>
          </div>
        </router-link>
        
        <div class="header-actions">
          <button class="theme-toggle" @click="toggleTheme" :aria-label="isDarkTheme ? 'الوضع النهاري' : 'الوضع الليلي'">
            <div class="toggle-icon-wrapper">
              <i class="fas" :class="themeIcon"></i>
              <div class="toggle-glow"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      isDarkTheme: true,
      isScrolled: false
    }
  },
  computed: {
    themeIcon() {
      return this.isDarkTheme ? 'fa-sun' : 'fa-moon'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      document.body.classList.toggle('light-theme', !this.isDarkTheme)
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  height: 80px;
  display: flex;
  align-items: center;
  background: transparent;
  backdrop-filter: blur(0);
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* تأثير الفضاء - نجوم متحركة في الخلفية */
.site-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 50%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(255, 215, 0, 0.01) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

/* تأثير الزجاج الفضائي */
.site-header.scrolled {
  height: 70px;
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

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.brand {
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
}

/* حلقة فضائية حول اللوجو */
.brand::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  animation: pulseRing 3s infinite;
  pointer-events: none;
}

@keyframes pulseRing {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

/* تأثير النبض الفضائي */
.logo-wrapper::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 3s infinite;
  z-index: -1;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; width: 100%; height: 100%; }
  50% { opacity: 0.6; width: 120%; height: 120%; }
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(145deg, #FFD700, #FF8C00);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 1.6rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  transform: rotate(0deg) scale(1);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* تأثير التوهج الذهبي */
.logo-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.5s;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand:hover .logo-icon {
  transform: rotate(10deg) scale(1.15);
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
}

.brand:hover .logo-icon::before {
  opacity: 0.3;
}

.logo-text {
  display: flex;
  align-items: baseline;
  gap: 8px;
  position: relative;
}

.tech {
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(145deg, #FFD700, #FFA500, #FF8C00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  transition: all 0.3s;
}

.storm {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}

.brand:hover .tech {
  transform: translateY(-3px);
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

.brand:hover .storm {
  transform: translateY(-3px);
  color: #FFD700;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.header-actions {
  display: flex;
  align-items: center;
}

.theme-toggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 215, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #FFD700;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

/* تأثير المجرة */
.theme-toggle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3), rgba(255, 140, 0, 0.2));
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.theme-toggle:hover {
  transform: rotate(360deg) scale(1.15);
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.theme-toggle:hover::before {
  width: 150px;
  height: 150px;
}

.toggle-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.3s;
  filter: blur(10px);
}

.theme-toggle:hover .toggle-glow {
  opacity: 0.6;
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .site-header { height: 70px; }
  .site-header.scrolled { height: 65px; }
  .tech { font-size: 1.8rem; }
  .storm { font-size: 1.6rem; }
  .logo-icon { width: 45px; height: 45px; font-size: 1.4rem; }
}

@media (max-width: 768px) {
  .site-header { height: 65px; }
  .site-header.scrolled { height: 60px; }
  .container { padding: 0 15px; }
  .logo-wrapper { gap: 8px; }
  .logo-icon { width: 42px; height: 42px; font-size: 1.3rem; }
  .tech { font-size: 1.6rem; }
  .storm { font-size: 1.4rem; }
  .theme-toggle { width: 45px; height: 45px; font-size: 1.2rem; }
}

@media (max-width: 480px) {
  .site-header { height: 60px; }
  .site-header.scrolled { height: 55px; }
  .logo-icon { width: 38px; height: 38px; font-size: 1.2rem; }
  .tech { font-size: 1.4rem; }
  .storm { font-size: 1.2rem; }
  .theme-toggle { width: 40px; height: 40px; font-size: 1.1rem; }
}

@media (max-width: 360px) {
  .logo-icon { display: none; }
  .tech { font-size: 1.3rem; }
  .storm { font-size: 1.1rem; }
}

</style>