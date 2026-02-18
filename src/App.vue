<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- ✅ لو الراوت بيبدأ بـ /dashboard أو /admin -> اعرض الداشبورد بس -->
    <template v-if="isDashboardRoute">
      <router-view />
    </template>
    
    <!-- ✅ غير كده -> اعرض الموقع العام -->
    <template v-else>
      <Header />
      <Navbar />
      <LightEffect />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </template>

    <!-- ✅ نظام التنبيهات المتقدم -->
    <Transition name="alert">
      <div v-if="alertState.visible" class="alert-overlay" @click.self="closeAlert">
        <div class="alert-container" :class="alertState.type">
          <!-- الأيقونة -->
          <div class="alert-icon">
            <i :class="getAlertIcon(alertState.type)"></i>
          </div>
          
          <!-- المحتوى -->
          <div class="alert-content">
            <h3 class="alert-title">{{ alertState.title }}</h3>
            <p class="alert-message">{{ alertState.message }}</p>
            
            <!-- أزرار التأكيد (فقط لنوع confirm) -->
            <div v-if="alertState.type === 'confirm'" class="alert-actions">
              <button class="btn-confirm" @click.stop="confirmAlert">
                <i class="fas fa-check"></i>
                {{ alertState.confirmText || 'تأكيد' }}
              </button>
              <button class="btn-cancel" @click.stop="closeAlert">
                <i class="fas fa-times"></i>
                {{ alertState.cancelText || 'إلغاء' }}
              </button>
            </div>
          </div>

          <!-- زر الإغلاق (للباقي) -->
          <button v-if="alertState.type !== 'confirm'" class="alert-close" @click="closeAlert">
            <i class="fas fa-times"></i>
          </button>

          <!-- شريط التقدم -->
          <div v-if="alertState.showProgress && alertState.type !== 'confirm'" 
               class="alert-progress" 
               :style="{ animationDuration: alertState.duration + 'ms' }">
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LightEffect from './components/LightEffect.vue'

export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Footer,
    LightEffect
  },
  setup() {
    const route = useRoute()
    
    // ========== نظام التنبيهات ==========
    const alertState = ref({
      visible: false,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      showProgress: true,
      confirmText: 'تأكيد',
      cancelText: 'إلغاء',
      resolve: null
    })

    // ✅ التحقق: هل الراوت الحالي هو صفحة من صفحات الداشبورد؟
    const isDashboardRoute = computed(() => {
      return route.path.startsWith('/dashboard') || 
             route.path.startsWith('/admin') ||
             route.path.startsWith('/department-head')
    })

    // ✅ دالة إظهار التنبيه
    const showAlert = (options) => {
      return new Promise((resolve) => {
        // إيقاف أي تنبيه سابق
        if (alertState.value.timeout) {
          clearTimeout(alertState.value.timeout)
        }

        alertState.value = {
          visible: true,
          type: options.type || 'info',
          title: options.title || getDefaultTitle(options.type),
          message: options.message,
          duration: options.duration || 5000,
          showProgress: options.showProgress !== false,
          confirmText: options.confirmText || 'تأكيد',
          cancelText: options.cancelText || 'إلغاء',
          resolve
        }

        // Auto close للتنبيهات العادية
        if (options.type !== 'confirm' && options.duration !== 0) {
          alertState.value.timeout = setTimeout(() => {
            closeAlert()
          }, options.duration || 5000)
        }
      })
    }

    // ✅ العنوان الافتراضي حسب النوع
    const getDefaultTitle = (type) => {
      const titles = {
        success: '✅ تم بنجاح',
        error: '❌ خطأ',
        warning: '⚠️ تحذير',
        info: 'ℹ️ تنبيه',
        confirm: '❓ تأكيد العملية'
      }
      return titles[type] || 'تنبيه'
    }

    // ✅ الأيقونة حسب النوع
    const getAlertIcon = (type) => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        confirm: 'fas fa-question-circle'
      }
      return icons[type] || 'fas fa-bell'
    }

    // ✅ إغلاق التنبيه
    const closeAlert = () => {
      if (alertState.value.timeout) {
        clearTimeout(alertState.value.timeout)
      }
      
      if (alertState.value.resolve) {
        alertState.value.resolve(false)
      }
      
      alertState.value.visible = false
    }

    // ✅ تأكيد التنبيه (لنوع confirm)
    const confirmAlert = () => {
      if (alertState.value.timeout) {
        clearTimeout(alertState.value.timeout)
      }
      
      if (alertState.value.resolve) {
        alertState.value.resolve(true)
      }
      
      alertState.value.visible = false
    }

    // ========== جعل دوال التنبيه متاحة عالمياً ==========
    // عشان نقدر نستخدمها في أي مكان
    window.$alert = {
      show: showAlert,
      success: (message, title, duration) => showAlert({ type: 'success', message, title, duration }),
      error: (message, title, duration) => showAlert({ type: 'error', message, title, duration }),
      warning: (message, title, duration) => showAlert({ type: 'warning', message, title, duration }),
      info: (message, title, duration) => showAlert({ type: 'info', message, title, duration }),
      confirm: (message, title, options = {}) => showAlert({ 
        type: 'confirm', 
        message, 
        title, 
        showProgress: false,
        ...options 
      })
    }

    // ========== مراقبة تغيير الراوت ==========
    watch(() => route.path, () => {
      // إغلاق أي تنبيه مفتوح عند تغيير الصفحة
      if (alertState.value.visible) {
        closeAlert()
      }
    })

    return {
      isDashboardRoute,
      alertState,
      getAlertIcon,
      closeAlert,
      confirmAlert
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #000000;
  --secondary-color: #111111;
  --accent-color: #ffffff;
  --text-color: #ffffff;
  --muted-text: #aaaaaa;
  --border-color: #333333;
  --card-bg: #0a0a0a;
  --gold: #FFD700;
  --gold-light: rgba(255, 215, 0, 0.1);
  --gold-gradient: linear-gradient(145deg, #FFD700, #FFA500);
}

body {
  background-color: var(--primary-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
}

/* ✅ ستايلات الموقع العام فقط */
.main-content {
  padding-top: 140px;
  min-height: calc(100vh - 200px);
}

/* ===== نظام التنبيهات المتقدم ===== */
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  direction: rtl;
  padding: 20px;
}

.alert-container {
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  border: 2px solid;
  border-radius: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
  animation: alertSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: flex-start;
  padding: 25px;
  gap: 18px;
}

/* ألوان حسب النوع */
.alert-container.success {
  border-color: #10b981;
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
}

.alert-container.error {
  border-color: #ef4444;
  box-shadow: 0 0 40px rgba(239, 68, 68, 0.3);
}

.alert-container.warning {
  border-color: #f59e0b;
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.3);
}

.alert-container.info {
  border-color: #3b82f6;
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
}

.alert-container.confirm {
  border-color: var(--gold);
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.3);
}

/* الأيقونة */
.alert-icon {
  width: 55px;
  height: 55px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
}

.success .alert-icon {
  color: #10b981;
  border: 2px solid #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.error .alert-icon {
  color: #ef4444;
  border: 2px solid #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

.warning .alert-icon {
  color: #f59e0b;
  border: 2px solid #f59e0b;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
}

.info .alert-icon {
  color: #3b82f6;
  border: 2px solid #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.confirm .alert-icon {
  color: var(--gold);
  border: 2px solid var(--gold);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

/* المحتوى */
.alert-content {
  flex: 1;
}

.alert-title {
  color: #fff;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.success .alert-title { color: #10b981; }
.error .alert-title { color: #ef4444; }
.warning .alert-title { color: #f59e0b; }
.info .alert-title { color: #3b82f6; }
.confirm .alert-title { color: var(--gold); }

.alert-message {
  color: #e0e0e0;
  font-size: 1rem;
  margin: 0;
  line-height: 1.7;
}

/* زر الإغلاق */
.alert-close {
  width: 35px;
  height: 35px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #b0b0b0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
  font-size: 1.1rem;
}

.alert-close:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: rotate(90deg);
  border-color: var(--gold);
}

/* شريط التقدم */
.alert-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  animation: alertProgress linear forwards;
  width: 100%;
}

.success .alert-progress { color: #10b981; }
.error .alert-progress { color: #ef4444; }
.warning .alert-progress { color: #f59e0b; }
.info .alert-progress { color: #3b82f6; }

/* أزرار التأكيد */
.alert-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
  width: 100%;
}

.btn-confirm {
  flex: 2;
  padding: 14px;
  background: var(--gold-gradient);
  border: none;
  border-radius: 15px;
  color: #000;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.5px;
}

.btn-confirm:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
}

.btn-cancel {
  flex: 1;
  padding: 14px;
  background: transparent;
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 15px;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-cancel:hover {
  border-color: var(--gold);
  color: var(--gold);
  transform: translateY(-2px);
  background: rgba(255, 215, 0, 0.05);
}

/* Animations */
@keyframes alertSlideIn {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes alertProgress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

/* Transition للـ overlay */
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}

.alert-enter-from .alert-container,
.alert-leave-to .alert-container {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

/* ===== باقي الستايلات ===== */
body.light-theme {
  --primary-color: #ffffff;
  --secondary-color: #f5f5f5;
  --accent-color: #000000;
  --text-color: #000000;
  --muted-text: #666666;
  --border-color: #dddddd;
  --card-bg: #f9f9f9;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--primary-color);
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted-text);
}

select, select option, select optgroup {
  background-color: #1a1a1a !important;
  color: #ffffff !important;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 130px;
  }
  
  .alert-container {
    padding: 20px;
    gap: 15px;
  }
  
  .alert-icon {
    width: 45px;
    height: 45px;
    font-size: 1.5rem;
  }
  
  .alert-title {
    font-size: 1.2rem;
  }
  
  .alert-message {
    font-size: 0.95rem;
  }
  
  .btn-confirm, .btn-cancel {
    padding: 12px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 116px;
  }
  
  .alert-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 25px 20px;
  }
  
  .alert-close {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  
  .alert-actions {
    flex-direction: column;
  }
  
  .btn-confirm, .btn-cancel {
    width: 100%;
  }
}
</style>