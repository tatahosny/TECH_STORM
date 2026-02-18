<template>
  <div class="login-page" dir="rtl">
    <!-- خلفية فضائية ذهبية متحركة -->
    <div class="space-bg">
      <!-- نجوم ذهبية -->
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      
      <!-- كواكب ذهبية -->
      <div class="planet planet-1"></div>
      <div class="planet planet-2"></div>
      <div class="planet planet-3"></div>
      
      <!-- سديم ذهبي -->
      <div class="nebula nebula-1"></div>
      <div class="nebula nebula-2"></div>
      
      <!-- أشعة ذهبية -->
      <div class="golden-rays"></div>
      
      <!-- جرادينت متحرك -->
      <div class="gradient-bg">
        <div class="gradient-sphere sphere-1"></div>
        <div class="gradient-sphere sphere-2"></div>
        <div class="gradient-sphere sphere-3"></div>
      </div>
      
      <div class="grid-overlay"></div>
    </div>

    <div class="container">
      <!-- الهيدر الفضائي الذهبي -->
      <div class="header-section">
        <div class="logo-wrapper">
          <div class="logo-glow"></div>
          <div class="logo-ring">
            <div class="planet-ring"></div>
            <img src="/techstorm-logo.png" alt="TECH STORM" class="hero-logo" />
          </div>
          <div class="orbiting-dots">
            <span class="dot-1"></span>
            <span class="dot-2"></span>
            <span class="dot-3"></span>
          </div>
        </div>
        
        <div class="brand-text">
          <h1 class="brand-title">
            <span class="gradient-text">TECH</span>
            <span class="brand-accent">STORM</span>
          </h1>
          <p class="brand-subtitle">عاصفة التكنولوجيا الذهبية في الفضاء الرقمي</p>
          <div class="brand-decoration">
            <i class="fas fa-gem"></i>
            <i class="fas fa-crown"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <!-- الجانب الأيمن - نظام الصلاحيات والتوثيق -->
        <div class="right-sidebar">
          <div class="permissions-card">
            <div class="permissions-header">
              <div class="header-glow"></div>
              <i class="fas fa-crown crown-icon"></i>
              <h3>نظام الصلاحيات</h3>
              <p>التسلسل القيادي لفريق TECH STORM</p>
            </div>
            
            <div class="hierarchy-tree">
              <!-- المستوى 1 - ليدر التيم -->
              <div class="hierarchy-node level-1">
                <div class="node-icon">
                  <i class="fas fa-crown"></i>
                </div>
                <div class="node-content">
                  <h4>ليدر التيم</h4>
                  <p>الرؤية العامة - إدارة الفريق - القرارات النهائية</p>
                  <div class="node-badge">السلطة القصوى</div>
                </div>
                <div class="node-line"></div>
              </div>
              
              <!-- المستوى 2 - نائب ليدر -->
              <div class="hierarchy-node level-2">
                <div class="node-icon">
                  <i class="fas fa-star"></i>
                </div>
                <div class="node-content">
                  <h4>نائب ليدر</h4>
                  <p>تنسيق المهام - متابعة الأقسام - نيابة القائد</p>
                  <div class="node-badge">السلطة التنفيذية</div>
                </div>
                <div class="node-line"></div>
              </div>
              
              <!-- المستوى 3 - ليدر قسم -->
              <div class="hierarchy-node level-3">
                <div class="node-icon">
                  <i class="fas fa-user-tie"></i>
                </div>
                <div class="node-content">
                  <h4>ليدر قسم</h4>
                  <p>إدارة التخصص (Hardware/Software/UI/UX)</p>
                  <div class="node-badge">سلطة إشرافية</div>
                </div>
                <div class="node-line"></div>
              </div>
              
              <!-- المستوى 4 - عضو -->
              <div class="hierarchy-node level-4">
                <div class="node-icon">
                  <i class="fas fa-user"></i>
                </div>
                <div class="node-content">
                  <h4>عضو</h4>
                  <p>تنفيذ المهام - تطوير المشاريع - مشاركة الفريق</p>
                  <div class="node-badge">عضو أساسي</div>
                </div>
              </div>
            </div>
            
            <div class="permissions-footer">
              <div class="stats">
                <div class="stat">
                  <span class="stat-number">٤</span>
                  <span class="stat-label">مستويات</span>
                </div>
                <div class="stat">
                  <span class="stat-number">13</span>
                  <span class="stat-label">عضو</span>
                </div>
                <div class="stat">
                  <span class="stat-number">4</span>
                  <span class="stat-label">أقسام</span>
                </div>
              </div>
              <div class="permissions-quote">
                <i class="fas fa-quote-right"></i>
                <p>القيادة الحقيقية هي تمكين الآخرين</p>
              </div>
            </div>
          </div>
          
          <div class="mission-card">
            <div class="mission-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <div class="mission-text">
              <h4>مهمتنا</h4>
              <p>بناء جيل من المبدعين التقنيين يقودون المستقبل</p>
            </div>
          </div>
        </div>

        <!-- الجانب الأيسر - بطاقة تسجيل الدخول -->
        <div class="left-side">
          <!-- بطاقة تسجيل الدخول -->
          <div class="login-card">
            <div class="login-header">
              <div class="header-icon">
                <i class="fas fa-user-astronaut"></i>
              </div>
              <h2>تسجيل الدخول</h2>
              <p>مرحباً بعودتك يا بطل! ⚡</p>
              <div class="header-decoration">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <!-- رسالة الخطأ المتحركة -->
            <transition name="slide-fade">
              <div v-if="errorMessage" class="error-message">
                <div class="error-content">
                  <i class="fas fa-exclamation-triangle"></i>
                  <p>{{ errorMessage }}</p>
                </div>
                <div class="error-progress"></div>
              </div>
            </transition>

            <!-- رسالة النجاح المتحركة -->
            <transition name="slide-fade">
              <div v-if="successMessage" class="success-message">
                <div class="success-content">
                  <i class="fas fa-check-circle"></i>
                  <p>{{ successMessage }}</p>
                </div>
              </div>
            </transition>

            <!-- نموذج تسجيل الدخول -->
            <form @submit.prevent="handleLogin" class="login-form">
              <div class="form-group">
                <label>
                  <i class="fas fa-envelope" style="color: var(--accent-color);"></i>
                  البريد الإلكتروني
                </label>
                <div class="input-wrapper">
                  <span class="input-prefix">
                    <i class="fas fa-envelope-open-text"></i>
                  </span>
                  <input
                    type="email"
                    v-model="email"
                    placeholder="member@techstorm.team"
                    required
                    dir="ltr"
                    :disabled="loading"
                  />
                  <div class="input-border"></div>
                  <div class="input-focus-bg"></div>
                </div>
              </div>

              <div class="form-group">
                <label>
                  <i class="fas fa-lock" style="color: var(--accent-color);"></i>
                  كلمة المرور
                </label>
                <div class="input-wrapper">
                  <span class="input-prefix">
                    <i class="fas fa-shield-alt"></i>
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="••••••••"
                    required
                    dir="ltr"
                    :disabled="loading"
                  />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    class="toggle-password"
                    :disabled="loading"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                  <div class="input-border"></div>
                  <div class="input-focus-bg"></div>
                </div>
                <div class="password-hint">
                  <i class="fas fa-info-circle"></i>
                  <span>كلمة المرور السرية بتاعة الفريق</span>
                </div>
              </div>

              <button 
                type="submit" 
                class="btn-login"
                :disabled="loading"
              >
                <span v-if="loading" class="btn-content">
                  <i class="fas fa-spinner fa-spin"></i>
                  <span>جاري فتح الأبواب...</span>
                </span>
                <span v-else class="btn-content">
                  <span>ادخل عالمنطقة السرية</span>
                  <i class="fas fa-arrow-left"></i>
                </span>
              </button>
            </form>

            <!-- بيانات تجريبية للاختبار -->
            <div class="demo-accounts">
              <p class="demo-title">📋 بيانات تجريبية:</p>
              <div class="demo-item" @click="fillDemoAccount('leader')">
                <span class="demo-role">قائد فريق:</span>
                leader@techstorm.team
              </div>
              <div class="demo-item" @click="fillDemoAccount('deputy')">
                <span class="demo-role">نائب قائد:</span>
                deputy@techstorm.team
              </div>
              <div class="demo-item" @click="fillDemoAccount('head')">
                <span class="demo-role">رئيس قسم:</span>
                head.software@techstorm.team
              </div>
            </div>

            <!-- فوتر البطاقة -->
            <div class="login-footer">
              <div class="footer-decoration">
                <span class="decoration-line"></span>
                <span class="decoration-icon">
                  <i class="fas fa-bolt"></i>
                </span>
                <span class="decoration-line"></span>
              </div>
              
              <div class="footer-content">
                <p>مش عضو في الفريق؟</p>
                <router-link to="/apply" class="btn-apply">
                  <span>قدم طلب انضمام</span>
                  <i class="fas fa-user-plus"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- رابط العودة -->
          <div class="back-to-home">
            <router-link to="/" class="btn-back">
              <i class="fas fa-home"></i>
              <span>الرجوع للصفحة الرئيسية</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/config/api';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

// تعبئة بيانات تجريبية
const fillDemoAccount = (type) => {
  if (type === 'leader') {
    email.value = 'leader@techstorm.team';
    password.value = 'password';
  } else if (type === 'deputy') {
    email.value = 'deputy@techstorm.team';
    password.value = 'password';
  } else if (type === 'head') {
    email.value = 'head.software@techstorm.team';
    password.value = 'password';
  }
};

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'يرجى إدخال البريد الإلكتروني وكلمة المرور';
    return;
  }

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    if (response.data.success) {
      // حفظ البيانات
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      successMessage.value = 'تم تسجيل الدخول بنجاح! جاري التحويل...';
      
      // تأخير بسيط قبل التحويل
      setTimeout(() => {
        // التوجيه حسب الدور
        const role = response.data.user.role;
        if (role === 'team_leader') {
          router.push('/admin/applicants');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      errorMessage.value = error.response.data?.error || 'خطأ في البريد أو كلمة المرور';
    } else if (error.request) {
      errorMessage.value = 'لا يمكن الاتصال بالسيرفر. تأكد من تشغيل Laravel';
    } else {
      errorMessage.value = 'حدث خطأ غير متوقع';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* ===== المتغيرات الذهبية الفضائية ===== */
:root {
  --primary-color: #000000;
  --secondary-color: #0a0a0a;
  --accent-color: #FFD700;
  --accent-glow: rgba(255, 215, 0, 0.3);
  --accent-dim: rgba(255, 215, 0, 0.1);
  --text-color: #ffffff;
  --muted-text: #e0e0e0;
  --border-color: rgba(255, 215, 0, 0.2);
  --card-bg: rgba(8, 8, 15, 0.9);
  --glass-bg: rgba(15, 15, 25, 0.95);
  --gradient-gold: linear-gradient(145deg, #FFD700, #FFA500);
  --gradient-space: linear-gradient(145deg, #000000, #0a0a1a);
  --error-color: #ff6b6b;
  --success-color: #51cf66;
}

/* ===== الصفحة الرئيسية الفضائية ===== */
.login-page {
  min-height: 100vh;
  background: #000000;
  position: relative;
  padding: 60px 20px;
  overflow-x: hidden;
  text-align: right;
  font-family: 'Cairo', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== الخلفية الفضائية الذهبية ===== */
.space-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at bottom, #0a0a1a 0%, #000000 100%);
}

/* النجوم */
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
    radial-gradient(2px 2px at 300px 150px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 500px 400px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 700px 300px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 900px 500px, #FFD700, rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 200px 200px;
  opacity: 0.5;
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
    radial-gradient(1px 1px at 380px 490px, #FFD700, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 560px 280px, #FFD700, rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 300px 300px;
  opacity: 0.3;
  animation: twinkle 4s ease-in-out infinite;
}

/* كواكب ذهبية */
.planet {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
  box-shadow: 0 0 50px rgba(255,215,0,0.1);
}

.planet-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -100px;
  opacity: 0.1;
  filter: blur(40px);
}

.planet-2 {
  width: 200px;
  height: 200px;
  bottom: 5%;
  right: -50px;
  opacity: 0.08;
  filter: blur(30px);
}

.planet-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 20%;
  opacity: 0.05;
  filter: blur(20px);
}

/* سديم ذهبي */
.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.nebula-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,215,0,0.05), transparent);
  top: -200px;
  right: -200px;
  animation: floatNebula 30s infinite;
}

.nebula-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,215,0,0.03), transparent);
  bottom: -300px;
  left: -200px;
  animation: floatNebula 40s infinite reverse;
}

/* أشعة ذهبية */
.golden-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 70%);
  animation: pulseRays 8s ease-in-out infinite;
}

@keyframes starsMove {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}

@keyframes floatNebula {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

@keyframes pulseRays {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.1;
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

.sphere-3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,215,0,0.06), rgba(255,215,0,0.01));
  top: 40%;
  left: 60%;
  animation-delay: -15s;
}

@keyframes floatSphere {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -40px) scale(1.1); }
  66% { transform: translate(-30px, 30px) scale(0.95); }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,215,0,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ===== الهيدر الفضائي الذهبي ===== */
.header-section {
  text-align: center;
  margin-bottom: 50px;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 25px;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 80%);
  filter: blur(40px);
  animation: pulseGlow 4s infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
}

.logo-ring {
  position: relative;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-ring {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid rgba(255,215,0,0.2);
  animation: rotatePlanet 30s linear infinite;
}

.planet-ring::before,
.planet-ring::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: var(--accent-color);
  border-radius: 50%;
  opacity: 0.3;
}

.planet-ring::after {
  top: auto;
  bottom: -5px;
}

@keyframes rotatePlanet {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbiting-dots {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.orbiting-dots span {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
  opacity: 0.5;
}

.dot-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbitDot 8s linear infinite;
}

.dot-2 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: orbitDot 8s linear infinite 4s;
}

.dot-3 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation: orbitDot 8s linear infinite 2s;
}

@keyframes orbitDot {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
}

.logo-ring::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255,215,0,0.2);
  animation: rotate 20s linear infinite;
}

.logo-ring::after {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  border: 1px dashed rgba(255,215,0,0.3);
  animation: rotateReverse 30s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotateReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.hero-logo {
  width: 100px;
  height: auto;
  position: relative;
  z-index: 2;
  transition: all 0.5s;
  filter: drop-shadow(0 0 20px rgba(255,215,0,0.2));
}

.hero-logo:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 30px rgba(255,215,0,0.3));
}

.brand-title {
  font-size: 2.8rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.gradient-text {
  color: #fff;
  font-weight: 700;
  letter-spacing: 2px;
}

.brand-accent {
  color: var(--accent-color);
  font-weight: 800;
  text-shadow: 0 0 30px rgba(255,215,0,0.3);
  letter-spacing: 4px;
}

.brand-subtitle {
  color: var(--muted-text);
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 10px;
}

.brand-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: var(--accent-color);
}

.brand-decoration i {
  opacity: 0.6;
  font-size: 1.1rem;
  animation: floatIcon 3s ease-in-out infinite;
}

.brand-decoration i:nth-child(2) {
  animation-delay: 0.5s;
}

.brand-decoration i:nth-child(3) {
  animation-delay: 1s;
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-5px); opacity: 1; }
}

/* ===== محتوى الصفحة ===== */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

/* ===== الجانب الأيمن - نظام الصلاحيات ===== */
.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.permissions-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 35px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.permissions-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.05), transparent);
  pointer-events: none;
}

.permissions-header {
  text-align: center;
  margin-bottom: 35px;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255,215,0,0.1), transparent);
  filter: blur(30px);
  animation: headerPulse 3s ease-in-out infinite;
}

@keyframes headerPulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}

.permissions-header .crown-icon {
  font-size: 2.5rem;
  color: var(--accent-color);
  margin-bottom: 15px;
  animation: crownFloat 3s ease-in-out infinite;
}

@keyframes crownFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.permissions-header h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

.permissions-header p {
  color: var(--muted-text);
  font-size: 0.95rem;
}

/* ===== شجرة الهرم القيادي ===== */
.hierarchy-tree {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 30px;
}

.hierarchy-node {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: rgba(255,215,0,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.3s;
}

.hierarchy-node:hover {
  background: rgba(255,215,0,0.05);
  border-color: var(--accent-color);
  transform: translateX(-5px);
}

.hierarchy-node.level-1 {
  border-right: 4px solid var(--accent-color);
}

.hierarchy-node.level-2 {
  border-right: 4px solid rgba(255,215,0,0.8);
}

.hierarchy-node.level-3 {
  border-right: 4px solid rgba(255,215,0,0.6);
}

.hierarchy-node.level-4 {
  border-right: 4px solid rgba(255,215,0,0.4);
}

.node-icon {
  width: 50px;
  height: 50px;
  background: rgba(255,215,0,0.1);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-color);
  flex-shrink: 0;
}

.hierarchy-node:hover .node-icon {
  background: rgba(255,215,0,0.2);
  border-color: var(--accent-color);
  transform: scale(1.05);
}

.node-content {
  flex: 1;
}

.node-content h4 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.node-content p {
  color: var(--muted-text);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.node-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,215,0,0.1);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: 600;
}

.node-line {
  position: absolute;
  bottom: -20px;
  right: 30px;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, var(--accent-color), transparent);
  opacity: 0.3;
}

.hierarchy-node:last-child .node-line {
  display: none;
}

/* ===== إحصائيات ===== */
.permissions-footer {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid var(--border-color);
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-color);
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  color: var(--muted-text);
  font-size: 0.8rem;
}

.permissions-quote {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255,215,0,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
}

.permissions-quote i {
  color: var(--accent-color);
  opacity: 0.3;
  font-size: 1.5rem;
}

.permissions-quote p {
  color: #fff;
  font-size: 0.9rem;
  font-style: italic;
}

/* ===== بطاقة المهمة ===== */
.mission-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  backdrop-filter: blur(20px);
  transition: all 0.3s;
}

.mission-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-5px);
}

.mission-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,215,0,0.1);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--accent-color);
}

.mission-text {
  flex: 1;
}

.mission-text h4 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.mission-text p {
  color: var(--muted-text);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ===== الجانب الأيسر - بطاقة تسجيل الدخول ===== */
.left-side {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.login-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 40px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.login-header {
  text-align: center;
  margin-bottom: 35px;
  position: relative;
}

.header-icon {
  width: 70px;
  height: 70px;
  background: rgba(255,215,0,0.05);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 2rem;
  color: var(--accent-color);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.header-decoration span {
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

.header-decoration span:nth-child(2) {
  animation-delay: 0.5s;
}

.header-decoration span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.login-header h2 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 800;
  letter-spacing: 2px;
}

.login-header p {
  color: var(--muted-text);
  font-size: 1.1rem;
}

/* ===== رسالة الخطأ ===== */
.error-message {
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid var(--error-color);
  border-radius: 20px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.error-content {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--error-color);
}

.error-content i {
  font-size: 1.2rem;
}

.error-content p {
  font-size: 0.95rem;
  font-weight: 500;
}

.error-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--error-color);
  width: 100%;
  animation: errorProgress 5s linear;
}

@keyframes errorProgress {
  from { width: 100%; }
  to { width: 0%; }
}

/* ===== رسالة النجاح ===== */
.success-message {
  background: rgba(81, 207, 102, 0.1);
  border: 1px solid var(--success-color);
  border-radius: 20px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}

.success-content {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--success-color);
}

.success-content i {
  font-size: 1.2rem;
}

.success-content p {
  font-size: 0.95rem;
  font-weight: 500;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ===== نموذج تسجيل الدخول ===== */
.login-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  margin-bottom: 10px;
  font-size: 0.95rem;
  font-weight: 600;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 16px 50px 16px 50px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.05);
}

.input-wrapper input::placeholder {
  color: rgba(255,255,255,0.3);
}

.input-wrapper input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.input-prefix {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 1rem;
  opacity: 0.7;
  z-index: 3;
}

.toggle-password {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--muted-text);
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  z-index: 3;
  transition: all 0.3s;
}

.toggle-password:hover:not(:disabled) {
  color: var(--accent-color);
}

.toggle-password:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  transition: width 0.3s;
  z-index: 3;
}

.input-wrapper:focus-within .input-border {
  width: 80%;
}

.input-focus-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(255,215,0,0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  border-radius: 20px;
  z-index: 1;
}

.input-wrapper:focus-within .input-focus-bg {
  opacity: 1;
}

.password-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: var(--muted-text);
  font-size: 0.8rem;
}

.password-hint i {
  color: var(--accent-color);
  opacity: 0.7;
}

.btn-login {
  width: 100%;
  padding: 16px;
  background: var(--gradient-gold);
  color: #000;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(255,215,0,0.2);
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-login:hover::before {
  width: 300px;
  height: 300px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255,215,0,0.3);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.btn-content i {
  font-size: 1.1rem;
}

/* ===== الحسابات التجريبية ===== */
.demo-accounts {
  margin-top: 25px;
  padding: 15px;
  background: rgba(255,215,0,0.03);
  border: 1px solid var(--border-color);
  border-radius: 20px;
}

.demo-title {
  color: var(--accent-color);
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
}

.demo-item {
  padding: 8px 12px;
  background: rgba(255,215,0,0.05);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.demo-item:hover {
  background: rgba(255,215,0,0.15);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.demo-role {
  color: var(--accent-color);
  font-weight: 600;
  margin-left: 5px;
}

/* ===== فوتر البطاقة ===== */
.login-footer {
  text-align: center;
  margin-top: 30px;
}

.footer-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.decoration-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
}

.decoration-icon i {
  color: var(--accent-color);
  opacity: 0.5;
  font-size: 0.9rem;
}

.footer-content p {
  color: var(--muted-text);
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.btn-apply {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 30px;
  background: transparent;
  color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.4s;
  width: 100%;
}

.btn-apply:hover {
  background: rgba(255,215,0,0.05);
  border-color: var(--accent-color);
  transform: translateY(-3px);
}

.btn-apply i {
  color: var(--accent-color);
  transition: transform 0.3s;
}

.btn-apply:hover i {
  transform: scale(1.1);
}

.back-to-home {
  text-align: center;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 25px;
  background: transparent;
  color: var(--muted-text);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.btn-back:hover {
  background: rgba(255,215,0,0.05);
  border-color: var(--accent-color);
  color: #fff;
  transform: translateX(-5px);
}

.btn-back i {
  transition: transform 0.3s;
}

.btn-back:hover i {
  transform: scale(1.1);
}

/* ===== RTL مخصص ===== */
[dir="rtl"] .input-prefix {
  right: 20px;
  left: auto;
}

[dir="rtl"] .toggle-password {
  left: 20px;
  right: auto;
}

[dir="rtl"] .input-wrapper input {
  padding: 16px 50px 16px 50px;
  text-align: right;
}

[dir="rtl"] .btn-back:hover {
  transform: translateX(5px);
}

[dir="rtl"] .btn-content i {
  transform: rotate(180deg);
}

[dir="rtl"] .btn-back i {
  transform: rotate(180deg);
}

[dir="rtl"] .btn-back:hover i {
  transform: rotate(180deg) scale(1.1);
}

[dir="rtl"] .hierarchy-node {
  border-right: 4px solid var(--accent-color);
  border-left: none;
}

[dir="rtl"] .node-line {
  right: auto;
  left: 30px;
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .brand-title {
    font-size: 2.2rem;
  }
  
  .permissions-header h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 60px 15px;
  }
  
  .login-card {
    padding: 30px 20px;
  }
  
  .permissions-card {
    padding: 30px 20px;
  }
  
  .brand-title {
    font-size: 2rem;
  }
  
  .hero-logo {
    width: 80px;
  }
  
  .logo-ring {
    width: 110px;
    height: 110px;
  }
  
  .login-header h2 {
    font-size: 1.8rem;
  }
  
  .hierarchy-node {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 25px 15px;
  }
  
  .permissions-card {
    padding: 25px 15px;
  }
  
  .brand-title {
    font-size: 1.6rem;
  }
  
  .btn-login {
    padding: 14px;
    font-size: 1rem;
  }
  
  .btn-apply {
    padding: 12px 20px;
  }
  
  .hierarchy-node {
    flex-direction: column;
    text-align: center;
  }
  
  .node-icon {
    margin: 0 auto;
  }
  
  .stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .mission-card {
    flex-direction: column;
    text-align: center;
  }
}

/* ===== Scrollbar ===== */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: rgba(255,215,0,0.2);
  border-radius: 5px;
  border: 1px solid rgba(255,215,0,0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-color);
}
</style>