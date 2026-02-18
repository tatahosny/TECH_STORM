<template>
  <div class="apply-page" dir="rtl">
    <!-- خلفية فضائية ذهبية متحركة -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="gradient-sphere sphere-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="container">
      <!-- الهيدر الفضائي الذهبي -->
      <div class="hero-section">
        <div class="logo-wrapper">
          <div class="logo-gold-glow"></div>
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
        
        <div class="header-content">
          <h1 class="animate-title">
            <span class="gradient-text">انضم لفريق</span>
            <span class="brand-accent">TECH STORM</span>
          </h1>
          <p class="subtitle animate-subtitle">
            <span class="typed-text">{{ displayedText }}</span>
            <span class="cursor">|</span>
          </p>
          <div class="brand-decoration">
            <i class="fas fa-gem"></i>
            <i class="fas fa-crown"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      </div>

      <!-- رسالة الترحيب الذهبية -->
      <div class="welcome-message-card">
        <div class="welcome-icon-grid">
          <div class="welcome-icon-ring">
            <i class="fas fa-heart"></i>
          </div>
          <div class="welcome-icon-ring">
            <i class="fas fa-rocket"></i>
          </div>
          <div class="welcome-icon-ring">
            <i class="fas fa-infinity"></i>
          </div>
        </div>
        
        <h2 class="welcome-title">مكانك هنا ... حتى لو لسه في الأول</h2>
        
        <div class="welcome-text-box">
          <div class="quote-mark right">❝</div>
          <p class="welcome-paragraph">
            إحنا مش شرط نكون عباقرة من أول يوم. إحنا بنقبل الناس اللي عندها <strong>استعداد تشارك، تتعب، وتتعلم</strong>. 
            الخبرة مش شرط، الشغف هو الأساس 🔥
          </p>
          <div class="quote-mark left">❞</div>
        </div>

        <div class="welcome-badges">
          <div class="welcome-badge">
            <i class="fas fa-seedling"></i>
            <span>نبدأ من الصفر</span>
          </div>
          <div class="welcome-badge">
            <i class="fas fa-chart-line"></i>
            <span>ملناش سقف طموح</span>
          </div>
          <div class="welcome-badge">
            <i class="fas fa-users"></i>
            <span>نتعلم من بعض</span>
          </div>
        </div>
      </div>

      <!-- بطاقة النظام الذهبية -->
      <div class="system-showcase">
        <div class="system-card">
          <div class="system-header">
            <div class="system-badge">
              <span class="badge-pulse">⚡ نظام متكامل 2026</span>
            </div>
            <div class="system-icon-grid">
              <div class="icon-ring">
                <i class="fas fa-robot"></i>
              </div>
              <div class="icon-ring">
                <i class="fas fa-cloud-upload-alt"></i>
              </div>
              <div class="icon-ring">
                <i class="fas fa-shield-alt"></i>
              </div>
            </div>
          </div>

          <h3>منصة TECH STORM الداخلية</h3>
          <p class="system-intro">بيئة عمل ذكية لإدارة فرق التكنولوجيا وتطوير المهارات</p>

          <div class="features-matrix">
            <div class="feature-block" v-for="(feature, index) in systemFeatures" :key="index">
              <div class="feature-icon" :style="{ '--i': index }">
                <i :class="feature.icon"></i>
              </div>
              <div class="feature-content">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
                <div class="feature-tags">
                  <span v-for="tag in feature.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="system-stats">
            <div class="stat-item">
              <div class="stat-number">٤</div>
              <div class="stat-label">أقسام رئيسية</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">٨</div>
              <div class="stat-label">تخصصات فرعية</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">٣</div>
              <div class="stat-label">مستويات صلاحية</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">∞</div>
              <div class="stat-label">سقف الطموح</div>
            </div>
          </div>
        </div>
      </div>

      <!-- رسالة ذهبية -->
      <div class="growth-message">
        <div class="growth-line"></div>
        <div class="growth-content">
          <i class="fas fa-bolt growth-icon"></i>
          <span>مش مهم مستواك النهارده .. المهم إنك مستعد تبدأ الرحلة معانا</span>
          <i class="fas fa-bolt growth-icon"></i>
        </div>
        <div class="growth-line"></div>
      </div>

      <!-- نموذج التسجيل الذهبي -->
      <div class="form-container">
        <div class="form-header">
          <div class="header-decoration"></div>
          <div class="header-icon">
            <i class="fas fa-pen-fancy"></i>
          </div>
          <h2>طلب الانضمام</h2>
          <p>املأ البيانات وهنبدأ معاك خطوة بخطوة</p>
        </div>

        <!-- Error Message -->
        <transition name="slide-fade">
          <div v-if="errorMessage" class="error-message">
            <div class="error-content">
              <i class="fas fa-exclamation-triangle"></i>
              <p>{{ errorMessage }}</p>
            </div>
            <div class="error-progress"></div>
          </div>
        </transition>

        <div v-if="successMessage" class="success-state">
          <div class="success-animation">
            <div class="checkmark-circle">
              <div class="checkmark"></div>
            </div>
          </div>
          <h3>🎉 تم استلام طلبك!</h3>
          <p class="success-main">هنكون معاك في أول خطوة في رحلتك مع TECH STORM</p>
          <p class="success-sub">هنرد عليك خلال ٤٨ ساعة على واتساب</p>
          <div class="success-actions">
            <button @click="resetForm" class="btn btn-outline">
              <i class="fas fa-pen"></i>
              طلب جديد
            </button>
            <router-link to="/" class="btn btn-primary">
              <i class="fas fa-home"></i>
              الصفحة الرئيسية
            </router-link>
          </div>
        </div>

        <form v-else @submit.prevent="submitApplication" class="elegant-form">
          <div class="form-grid">
            <!-- الاسم الثلاثي -->
            <div class="form-group full-width" :class="{ 'has-error': fieldErrors.fullName }">
              <label>
                <i class="fas fa-user"></i>
                الاسم الثلاثي
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="formData.fullName"
                  placeholder="مثال: أحمد محمد علي"
                  required
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.fullName }"
                />
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div v-if="fieldErrors.fullName" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.fullName[0]) }}
              </div>
            </div>

            <!-- رقم الهاتف -->
            <div class="form-group" :class="{ 'has-error': fieldErrors.phone }">
              <label>
                <i class="fas fa-phone"></i>
                رقم الهاتف
              </label>
              <div class="input-wrapper">
                <span class="input-prefix">+20</span>
                <input
                  type="tel"
                  v-model="formData.phone"
                  placeholder="1234567890"
                  required
                  dir="ltr"
                  maxlength="10"
                  @input="validateNumericInput($event, 'phone')"
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.phone }"
                />
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div v-if="fieldErrors.phone" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.phone[0]) }}
              </div>
            </div>

            <!-- واتساب -->
            <div class="form-group" :class="{ 'has-error': fieldErrors.whatsapp }">
              <label>
                <i class="fab fa-whatsapp"></i>
                واتساب
              </label>
              <div class="input-wrapper">
                <span class="input-prefix">+20</span>
                <input
                  type="tel"
                  v-model="formData.whatsapp"
                  placeholder="1234567890"
                  required
                  dir="ltr"
                  maxlength="10"
                  @input="validateNumericInput($event, 'whatsapp')"
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.whatsapp }"
                />
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div v-if="fieldErrors.whatsapp" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.whatsapp[0]) }}
              </div>
            </div>

            <!-- الرقم الأكاديمي -->
            <div class="form-group" :class="{ 'has-error': fieldErrors.academicNumber }">
              <label>
                <i class="fas fa-graduation-cap"></i>
                الرقم الأكاديمي
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="formData.academicNumber"
                  placeholder="1234567"
                  required
                  dir="ltr"
                  maxlength="7"
                  @input="validateNumericInput($event, 'academicNumber')"
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.academicNumber }"
                />
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div v-if="fieldErrors.academicNumber" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.academicNumber[0]) }}
              </div>
            </div>

            <!-- البريد الإلكتروني -->
            <div class="form-group" :class="{ 'has-error': fieldErrors.email }">
              <label>
                <i class="fas fa-envelope"></i>
                البريد الإلكتروني
              </label>
              <div class="input-wrapper">
                <input
                  type="email"
                  v-model="formData.email"
                  placeholder="name@example.com"
                  required
                  dir="ltr"
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.email }"
                />
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div v-if="fieldErrors.email" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.email[0]) }}
              </div>
            </div>

            <!-- رسالة الانضمام -->
            <div class="form-group full-width" :class="{ 'has-error': fieldErrors.reason }">
              <label>
                <i class="fas fa-lightbulb"></i>
                رسالة الانضمام
              </label>
              <div class="input-wrapper">
                <textarea
                  v-model="formData.reason"
                  rows="5"
                  placeholder="اكتبلنا عن نفسك .. بتعرف تعمل ايه؟ عاوز تتعلم ايه؟ وليه اخترت TECH STORM؟"
                  required
                  :disabled="isSubmitting"
                  :class="{ 'error-input': fieldErrors.reason }"
                ></textarea>
                <div class="input-focus-bg"></div>
                <div class="input-border"></div>
              </div>
              <div class="textarea-hint">
                <i class="fas fa-info-circle"></i>
                مش مهم خبرتك، المهم شغفك واستعدادك تتعلم
              </div>
              <div v-if="fieldErrors.reason" class="field-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ getArabicErrorMessage(fieldErrors.reason[0]) }}
              </div>
            </div>
          </div>

          <div class="form-footer">
           <button
            type="submit"
            class="btn btn-submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i>
              جاري الإرسال...
            </span>
            <span v-else>
              ابدأ رحلتك معانا
              <i class="fas fa-arrow-left"></i>
            </span>
          </button>
            
            <div class="form-note">
              <i class="fas fa-shield-alt"></i>
              <span>بياناتك آمنة ١٠٠٪ وهتستخدم بس للتواصل معاك</span>
            </div>
          </div>
        </form>
      </div>

      <!-- قسم الطموح الذهبي -->
      <div class="ambition-section">
        <div class="ambition-card">
          <div class="ambition-stats">
            <div class="ambition-stat">
              <span class="ambition-number">٠</span>
              <span class="ambition-label">خبرة مطلوبة</span>
            </div>
            <div class="ambition-stat">
              <span class="ambition-number">∞</span>
              <span class="ambition-label">فرص للتعلم</span>
            </div>
            <div class="ambition-stat">
              <span class="ambition-number">🚀</span>
              <span class="ambition-label">سقف طموح مفتوح</span>
            </div>
          </div>
          <div class="ambition-quote">
            <i class="fas fa-quote-right"></i>
            <p>إحنا مش بندور على ناس شاطرة بس، إحنا بنبني ناس شاطرة من الأول</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import api from "@/config/api";

// بيانات النموذج
const formData = reactive({
  fullName: "",
  phone: "",
  academicNumber: "",
  email: "",
  whatsapp: "",
  reason: "",
});

// حالات النموذج
const isSubmitting = ref(false);
const successMessage = ref(false);
const errorMessage = ref("");
const fieldErrors = ref({});

// تأثير الكتابة
const displayedText = ref("");
const fullText = "مش مهم خبرتك .. المهم شغفك واستعدادك";
const typingSpeed = 100;
let typingInterval;

onMounted(() => {
  startTypingEffect();
});

onUnmounted(() => {
  clearInterval(typingInterval);
});

const startTypingEffect = () => {
  let i = 0;
  typingInterval = setInterval(() => {
    if (i < fullText.length) {
      displayedText.value += fullText.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        displayedText.value = "";
        startTypingEffect();
      }, 3000);
    }
  }, typingSpeed);
};

// مميزات النظام
const systemFeatures = [
  {
    icon: "fas fa-tasks",
    title: "نظام المهام الذكي",
    description: "إدارة متكاملة للمشاريع مع تتبع الأداء في الوقت الفعلي",
    tags: ["رفع ملفات", "تقييم", "مواعيد"]
  },
  {
    icon: "fas fa-chart-network",
    title: "تحليلات الأداء",
    description: "إحصائيات دقيقة لمتابعة التفاعل والإنجازات",
    tags: ["نقاط", "مستويات", "تقارير"]
  },
  {
    icon: "fas fa-sitemap",
    title: "الهيكل التنظيمي",
    description: "هندسة: كهرباء، هيكل، مكونات | برمجيات: ويب، موبايل",
    tags: ["Hardware", "Software", "UI/UX"]
  },
  {
    icon: "fas fa-crown",
    title: "نظام الصلاحيات",
    description: "ليدر التيم - نائب ليدر - ليدر قسم - عضو",
    tags: ["إشراف كامل", "إدارة", "متابعة"]
  }
];

// دالة لترجمة رسائل الخطأ
const getArabicErrorMessage = (error) => {
  if (error.includes('required')) {
    return 'هذا الحقل مطلوب';
  } else if (error.includes('min.string') && error.includes('fullName')) {
    return 'الاسم قصير جداً (على الأقل 3 أحرف)';
  } else if (error.includes('min.string') && error.includes('reason')) {
    return 'الرسالة قصيرة جداً (على الأقل 10 كلمات)';
  } else if (error.includes('max.string')) {
    return 'النص طويل جداً';
  } else if (error.includes('email')) {
    return 'البريد الإلكتروني غير صحيح';
  } else if (error.includes('unique')) {
    if (error.includes('email')) {
      return 'البريد الإلكتروني مستخدم بالفعل';
    } else if (error.includes('academic_number')) {
      return 'الرقم الأكاديمي مستخدم بالفعل';
    }
  } else if (error.includes('numeric')) {
    return 'يجب أن يحتوي على أرقام فقط';
  } else if (error.includes('size') || error.includes('digits')) {
    if (error.includes('phone')) {
      return 'رقم الهاتف يجب أن يكون 10 أرقام';
    } else if (error.includes('academic')) {
      return 'الرقم الأكاديمي يجب أن يكون 7 أرقام';
    }
  }
  return error;
};

// التحقق من صحة المدخلات
const validateNumericInput = (event, field) => {
  const value = event.target.value.replace(/[^0-9]/g, "");
  formData[field] = value;
  // مسح خطأ هذا الحقل عند التعديل
  if (fieldErrors.value[field]) {
    delete fieldErrors.value[field];
  }
};

// إرسال الطلب
const submitApplication = async () => {
  // مسح الأخطاء السابقة
  fieldErrors.value = {};
  
  // التحقق من جميع الحقول
  const emptyFields = [];
  for (const [key, value] of Object.entries(formData)) {
    if (!value) {
      emptyFields.push(key);
    }
  }
  
  if (emptyFields.length > 0) {
    errorMessage.value = "يرجى ملء جميع الحقول";
    return;
  }

  // التحقق من أرقام الهواتف
  if (formData.phone.length !== 10) {
    errorMessage.value = "رقم الهاتف يجب أن يكون 10 أرقام";
    return;
  }

  if (formData.whatsapp.length !== 10) {
    errorMessage.value = "رقم الواتساب يجب أن يكون 10 أرقام";
    return;
  }

  // التحقق من الرقم الأكاديمي
  if (formData.academicNumber.length !== 7) {
    errorMessage.value = "الرقم الأكاديمي يجب أن يكون 7 أرقام";
    return;
  }

  // التحقق من صيغة البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errorMessage.value = "البريد الإلكتروني غير صحيح";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await api.post("/apply", {
      fullName: formData.fullName,
      phone: formData.phone,
      academicNumber: formData.academicNumber,
      email: formData.email,
      whatsapp: formData.whatsapp,
      reason: formData.reason,
    });

    if (response.data.success) {
      successMessage.value = true;
      // تفريغ النموذج
      Object.keys(formData).forEach((key) => (formData[key] = ""));
      
      // التمرير للأعلى لإظهار رسالة النجاح
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (error) {
    console.error("Error:", error);
    
    if (error.response) {
      // السيرفر رد بخطأ
      if (error.response.data.errors) {
        // أخطاء التحقق من Laravel
        const errors = error.response.data.errors;
        
        // تخزين أخطاء الحقول
        fieldErrors.value = errors;
        
        // عرض أول خطأ
        const firstErrorField = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstErrorField][0];
        
        // ترجمة رسائل الخطأ
        if (firstErrorMessage.includes('fullName')) {
          errorMessage.value = "الاسم غير صحيح";
        } else if (firstErrorMessage.includes('phone')) {
          errorMessage.value = "رقم الهاتف غير صحيح";
        } else if (firstErrorMessage.includes('whatsapp')) {
          errorMessage.value = "رقم الواتساب غير صحيح";
        } else if (firstErrorMessage.includes('academicNumber')) {
          errorMessage.value = "الرقم الأكاديمي غير صحيح";
        } else if (firstErrorMessage.includes('email')) {
          errorMessage.value = "البريد الإلكتروني غير صحيح";
        } else if (firstErrorMessage.includes('reason')) {
          errorMessage.value = "الرسالة قصيرة جداً";
        } else if (firstErrorMessage.includes('min.string')) {
          // هذا هو الخطأ اللي بتظهر
          const field = firstErrorField;
          if (field === 'fullName') {
            errorMessage.value = "الاسم قصير جداً (على الأقل 3 أحرف)";
          } else if (field === 'reason') {
            errorMessage.value = "الرسالة قصيرة جداً (على الأقل 10 كلمات)";
          }
        } else if (firstErrorMessage.includes('unique')) {
          if (firstErrorField === 'email') {
            errorMessage.value = "البريد الإلكتروني مستخدم بالفعل";
          } else if (firstErrorField === 'academicNumber') {
            errorMessage.value = "الرقم الأكاديمي مستخدم بالفعل";
          }
        } else {
          errorMessage.value = firstErrorMessage;
        }
      } else {
        errorMessage.value = error.response.data?.error || "حدث خطأ في السيرفر";
      }
    } else if (error.request) {
      // لا يوجد استجابة من السيرفر
      errorMessage.value = "لا يمكن الاتصال بالسيرفر. تأكد من اتصالك بالإنترنت";
    } else {
      // خطأ آخر
      errorMessage.value = "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى";
    }
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  successMessage.value = false;
  errorMessage.value = "";
  fieldErrors.value = {};
};
</script>

<style scoped>
/* ===== كل الـ CSS الأصلي كما هو ===== */
:root {
  --primary-color: #000000;
  --secondary-color: #0a0a0a;
  --accent-color: #FFD700;
  --accent-glow: rgba(255, 215, 0, 0.3);
  --text-color: #ffffff;
  --muted-text: #e0e0e0;
  --border-color: rgba(255, 215, 0, 0.2);
  --card-bg: rgba(10, 10, 10, 0.95);
  --glass-bg: rgba(20, 20, 20, 0.98);
  --gradient-gold: linear-gradient(145deg, #FFD700, #FFA500);
  --error-color: #ff6b6b;
  --success-color: #10b981;
}

/* ===== باقي الـ CSS الأصلي بالكامل ===== */
.apply-page {
  min-height: 100vh;
  background: #000000;
  position: relative;
  padding: 80px 20px;
  overflow-x: hidden;
  text-align: right;
  font-family: 'Cairo', sans-serif;
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
  background: radial-gradient(ellipse at bottom, #0a0a0a 0%, #000000 100%);
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
    radial-gradient(2px 2px at 300px 150px, #FFD700, rgba(0,0,0,0));
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

.sphere-3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,215,0,0.06), rgba(255,215,0,0.01));
  top: 40%;
  left: 60%;
  animation-delay: -15s;
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
  opacity: 0.15;
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

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ===== الهيدر الذهبي ===== */
.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
}

.logo-gold-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 80%);
  filter: blur(50px);
  animation: goldPulse 4s infinite;
}

@keyframes goldPulse {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
}

.logo-ring {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.planet-ring {
  position: absolute;
  width: 200px;
  height: 200px;
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
  background: #FFD700;
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
  width: 220px;
  height: 220px;
}

.orbiting-dots span {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #FFD700;
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
  width: 150px;
  height: auto;
  position: relative;
  z-index: 2;
  transition: all 0.5s;
  filter: drop-shadow(0 0 20px rgba(255,215,0,0.3));
}

.hero-logo:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 30px rgba(255,215,0,0.5));
}

.animate-title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  margin-bottom: 15px;
}

.gradient-text {
  color: #fff;
  display: block;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.brand-accent {
  color: #FFD700;
  display: block;
  font-size: 1.3em;
  margin-top: 5px;
  text-shadow: 0 0 30px rgba(255,215,0,0.4);
  letter-spacing: 4px;
  font-weight: 800;
}

.subtitle {
  font-size: 1.3rem;
  color: var(--muted-text);
  margin-bottom: 15px;
}

.typed-text {
  color: #FFD700;
  font-weight: 600;
}

.cursor {
  color: #FFD700;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.brand-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #FFD700;
  margin-top: 15px;
}

.brand-decoration i {
  opacity: 0.6;
  font-size: 1.2rem;
  animation: floatIcon 3s ease-in-out infinite;
}

.brand-decoration i:nth-child(2) { animation-delay: 0.5s; }
.brand-decoration i:nth-child(3) { animation-delay: 1s; }

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-5px); opacity: 1; }
}

/* ===== رسالة الترحيب الذهبية ===== */
.welcome-message-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  padding: 50px 40px;
  margin-bottom: 50px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.welcome-message-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.welcome-icon-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.welcome-icon-ring {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255,215,0,0.03);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.8rem;
  transition: all 0.4s;
  animation: float 6s infinite;
}

.welcome-icon-ring:nth-child(1) { animation-delay: 0s; }
.welcome-icon-ring:nth-child(2) { animation-delay: 1s; }
.welcome-icon-ring:nth-child(3) { animation-delay: 2s; }

.welcome-icon-ring:hover {
  transform: translateY(-10px) scale(1.1);
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  box-shadow: 0 0 30px rgba(255,215,0,0.2);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.welcome-title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(255,215,0,0.3);
}

.welcome-text-box {
  position: relative;
  max-width: 800px;
  margin: 0 auto 30px;
  padding: 30px 50px;
}

.quote-mark {
  position: absolute;
  font-size: 5rem;
  color: rgba(255,215,0,0.15);
  font-family: serif;
}

.quote-mark.right {
  top: -20px;
  right: -20px;
}

.quote-mark.left {
  bottom: -40px;
  left: -20px;
  transform: rotate(180deg);
}

.welcome-paragraph {
  font-size: 1.4rem;
  line-height: 1.8;
  color: #f0f0f0;
  text-align: center;
  font-weight: 500;
}

.welcome-paragraph strong {
  color: #FFD700;
  font-weight: 800;
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: rgba(255,215,0,0.5);
  text-underline-offset: 8px;
}

.welcome-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.welcome-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: rgba(255,215,0,0.03);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

.welcome-badge:hover {
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  transform: translateY(-3px);
}

.welcome-badge i {
  color: #FFD700;
  font-size: 1.1rem;
}

/* ===== رسالة النمو الذهبية ===== */
.growth-message {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
}

.growth-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent);
}

.growth-content {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 30px;
  background: rgba(255,215,0,0.02);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .growth-content {
    white-space: normal;
    text-align: center;
  }
}

.growth-icon {
  color: #FFD700;
  animation: flash 2s infinite;
}

@keyframes flash {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ===== بطاقة النظام الذهبية ===== */
.system-showcase {
  margin-bottom: 50px;
}

.system-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 50px;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.system-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255,215,0,0.05), transparent);
  opacity: 0;
  transition: opacity 0.4s;
}

.system-card:hover {
  border-color: #FFD700;
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0,0,0,0.5);
}

.system-card:hover::after {
  opacity: 1;
}

.system-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.badge-pulse {
  background: rgba(255,215,0,0.1);
  color: #FFD700;
  padding: 10px 30px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 2px;
  border: 1px solid rgba(255,215,0,0.3);
  animation: badgePulse 2s infinite;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.1); }
  50% { box-shadow: 0 0 40px rgba(255,215,0,0.2); }
}

.system-icon-grid {
  display: flex;
  gap: 15px;
}

.icon-ring {
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: rgba(255,215,0,0.03);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.5rem;
  transition: all 0.4s;
}

.icon-ring:hover {
  transform: translateY(-5px) scale(1.1);
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
}

.system-card h3 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 10px;
}

.system-intro {
  font-size: 1.2rem;
  color: var(--muted-text);
  margin-bottom: 40px;
}

/* ===== مصفوفة المميزات ===== */
.features-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin: 40px 0;
}

.feature-block {
  display: flex;
  gap: 20px;
  padding: 30px;
  background: rgba(255,215,0,0.02);
  border-radius: 25px;
  border: 1px solid var(--border-color);
  transition: all 0.4s;
}

.feature-block:hover {
  transform: translateY(-8px);
  border-color: #FFD700;
  background: rgba(255,215,0,0.03);
  box-shadow: 0 20px 30px rgba(0,0,0,0.3);
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  background: rgba(255,215,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1.8rem;
  border: 1px solid var(--border-color);
  flex-shrink: 0;
  transition: all 0.4s;
}

.feature-block:hover .feature-icon {
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  transform: rotate(5deg) scale(1.1);
}

.feature-content h4 {
  color: #fff;
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: 700;
}

.feature-content p {
  color: var(--muted-text);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 15px;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tags span {
  background: rgba(255,215,0,0.03);
  color: var(--muted-text);
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.feature-tags span:hover {
  background: rgba(255,215,0,0.1);
  border-color: #FFD700;
  color: #FFD700;
}

/* ===== إحصائيات النظام ===== */
.system-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
  padding-top: 40px;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 800;
  color: #FFD700;
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  color: var(--muted-text);
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, rgba(255,215,0,0.3), transparent);
}

/* ===== حاوية النموذج الذهبية ===== */
.form-container {
  background: var(--glass-bg);
  border: 1px solid var(--border-color);
  border-radius: 60px;
  padding: 60px;
  margin: 60px 0;
  backdrop-filter: blur(20px);
}

.form-header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
}

.header-decoration {
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
  margin: 0 auto 30px;
  border-radius: 2px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255,215,0,0.05);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  border: 1px solid var(--border-color);
  color: #FFD700;
  font-size: 2rem;
}

.form-header h2 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 15px;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255,215,0,0.3);
}

.form-header p {
  color: var(--muted-text);
  font-size: 1.2rem;
}

/* ===== النموذج المتطور ===== */
.elegant-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.full-width {
  grid-column: span 2;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  margin-bottom: 12px;
  font-size: 0.95rem;
  font-weight: 600;
}

.form-group label i {
  color: #FFD700;
  opacity: 0.9;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.input-wrapper input:focus,
.input-wrapper textarea:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255,215,0,0.05);
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FFD700, transparent);
  transition: width 0.3s;
  z-index: 3;
}

.input-wrapper:focus-within .input-border {
  width: 80%;
}

.input-prefix {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #FFD700;
  font-size: 0.9rem;
  opacity: 0.9;
  z-index: 3;
  font-weight: 600;
}

.input-wrapper input[dir="ltr"] {
  text-align: left;
  padding-left: 60px;
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
}

.input-wrapper:focus-within .input-focus-bg {
  opacity: 1;
}

.textarea-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: var(--muted-text);
  font-size: 0.85rem;
}

.textarea-hint i {
  color: #FFD700;
  opacity: 0.9;
}

/* ===== Error Message Styles ===== */
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

/* ===== Field Error Styles ===== */
.form-group.has-error .input-wrapper input,
.form-group.has-error .input-wrapper textarea {
  border-color: var(--error-color);
  background: rgba(255, 107, 107, 0.05);
}

.field-error {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--error-color);
  font-size: 0.85rem;
  margin-top: 5px;
  animation: fadeIn 0.3s ease;
}

.field-error i {
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* ===== ذيل النموذج ===== */
.form-footer {
  margin-top: 50px;
  text-align: center;
}

.btn {
  padding: 16px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  letter-spacing: 1px;
}

.btn-primary {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #000;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.3);
}

.btn-outline {
  background: transparent;
  color: #fff;
  border-color: var(--border-color);
}

.btn-outline:hover {
  background: rgba(255,215,0,0.05);
  border-color: #FFD700;
  transform: translateY(-5px);
}

.btn-submit {
  background: linear-gradient(145deg, #FFD700, #FFC800, #FFD700);
  background-size: 200% 200%;
  color: #000000;
  padding: 18px 50px;
  font-size: 1.2rem;
  border: none;
  box-shadow: 
    0 10px 30px rgba(255, 215, 0, 0.25),
    0 0 0 1px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  animation: goldPulse 2.5s infinite;
}

.btn-submit i {
  color: #000;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(145deg, #FFE55C, #FFD700, #FFE55C);
  background-size: 200% 200%;
  transform: translateY(-5px) scale(1.02);
  box-shadow: 
    0 25px 45px rgba(255, 215, 0, 0.4),
    0 0 0 2px rgba(255, 215, 0, 0.5);
  animation: none;
}

.btn-submit:hover:not(:disabled) i {
  transform: translateX(-5px);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 
    0 15px 30px rgba(255, 215, 0, 0.35),
    0 0 0 2px rgba(255, 215, 0, 0.6);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(145deg, #B8860B, #DAA520);
  color: rgba(0, 0, 0, 0.7);
}

/* تأثير تموج ذهبي عند الضغط */
.btn-submit::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.btn-submit:focus:not(:active)::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
}

/* نبض ذهبي للزر */
@keyframes goldPulse {
  0% {
    box-shadow: 
      0 10px 30px rgba(255, 215, 0, 0.25),
      0 0 0 1px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 
      0 15px 40px rgba(255, 215, 0, 0.4),
      0 0 0 2px rgba(255, 215, 0, 0.5);
  }
  100% {
    box-shadow: 
      0 10px 30px rgba(255, 215, 0, 0.25),
      0 0 0 1px rgba(255, 215, 0, 0.3);
  }
}

/* تأثير بريق متحرك */
.btn-submit::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.7s;
}

.btn-submit:hover:not(:disabled)::before {
  left: 100%;
}

/* للشاشات الصغيرة */
@media (max-width: 768px) {
  .btn-submit {
    padding: 16px 30px;
    font-size: 1.1rem;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .btn-submit {
    padding: 14px 25px;
    font-size: 1rem;
  }
}

.form-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
  color: var(--muted-text);
  font-size: 0.9rem;
}

.form-note i {
  color: #FFD700;
  opacity: 0.9;
}

/* ===== حالة النجاح ===== */
.success-state {
  text-align: center;
  padding: 40px 20px;
}

.success-animation {
  margin-bottom: 30px;
}

.checkmark-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255,215,0,0.03);
  border: 2px solid #FFD700;
  margin: 0 auto;
  position: relative;
  animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.checkmark {
  width: 35px;
  height: 70px;
  border: solid #FFD700;
  border-width: 0 4px 4px 0;
  transform: rotate(45deg);
  position: absolute;
  top: 25px;
  left: 42px;
  animation: drawCheck 0.5s ease 0.3s both;
}

@keyframes drawCheck {
  from { width: 0; height: 0; opacity: 0; }
  to { width: 35px; height: 70px; opacity: 1; }
}

.success-state h3 {
  font-size: 2.2rem;
  color: #FFD700;
  margin-bottom: 15px;
}

.success-main {
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 10px;
  font-weight: 600;
}

.success-sub {
  color: var(--muted-text);
  font-size: 1.1rem;
  margin-bottom: 40px;
}

.success-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ===== قسم الطموح الذهبي ===== */
.ambition-section {
  margin-top: 80px;
}

.ambition-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  padding: 50px;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.ambition-card::before {
  content: '∞';
  position: absolute;
  bottom: -50px;
  right: -50px;
  font-size: 15rem;
  color: rgba(255,215,0,0.03);
  font-weight: 800;
}

.ambition-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.ambition-stat {
  text-align: center;
}

.ambition-number {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  color: #FFD700;
  margin-bottom: 10px;
  line-height: 1;
}

.ambition-label {
  color: var(--muted-text);
  font-size: 1rem;
  letter-spacing: 2px;
}

.ambition-quote {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  padding: 30px;
}

.ambition-quote i {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5rem;
  color: #FFD700;
  opacity: 0.2;
}

.ambition-quote p {
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.7;
  font-style: italic;
  font-weight: 500;
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .system-card,
  .form-container {
    padding: 40px 30px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .full-width {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .apply-page {
    padding: 60px 15px;
  }
  
  .hero-logo {
    width: 120px;
  }
  
  .logo-ring {
    width: 140px;
    height: 140px;
  }
  
  .planet-ring {
    width: 160px;
    height: 160px;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-paragraph {
    font-size: 1.2rem;
  }
  
  .welcome-message-card {
    padding: 40px 20px;
  }
  
  .system-stats {
    flex-direction: column;
  }
  
  .stat-divider {
    width: 80px;
    height: 1px;
  }
  
  .system-card h3 {
    font-size: 1.6rem;
  }
  
  .features-matrix {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    padding: 40px 20px;
  }
  
  .form-header h2 {
    font-size: 2rem;
  }
  
  .success-actions {
    flex-direction: column;
  }
  
  .btn-outline,
  .btn-primary,
  .btn-submit {
    width: 100%;
    justify-content: center;
  }
  
  .ambition-stats {
    flex-direction: column;
    gap: 30px;
  }
  
  .ambition-quote p {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .hero-logo {
    width: 100px;
  }
  
  .logo-ring {
    width: 120px;
    height: 120px;
  }
  
  .planet-ring {
    width: 140px;
    height: 140px;
  }
  
  .welcome-title {
    font-size: 1.6rem;
  }
  
  .welcome-paragraph {
    font-size: 1rem;
  }
  
  .welcome-badges {
    flex-direction: column;
  }
  
  .welcome-badge {
    width: 100%;
    justify-content: center;
  }
  
  .system-card h3 {
    font-size: 1.4rem;
  }
  
  .system-header {
    flex-direction: column;
  }
  
  .growth-content {
    flex-direction: column;
  }
}

/* ===== RTL مخصص ===== */
[dir="rtl"] .input-prefix {
  left: auto;
  right: 20px;
}

[dir="rtl"] .input-wrapper input[dir="ltr"] {
  padding-left: 20px;
  padding-right: 60px;
}

[dir="rtl"] .btn-submit i {
  transform: rotate(180deg);
}

[dir="rtl"] .ambition-quote i {
  right: auto;
  left: 0;
}

[dir="rtl"] .quote-mark.right {
  right: auto;
  left: -20px;
}

[dir="rtl"] .quote-mark.left {
  left: auto;
  right: -20px;
  transform: rotate(0deg);
}

[dir="rtl"] .planet-ring::before,
[dir="rtl"] .planet-ring::after {
  left: auto;
  right: 50%;
  transform: translateX(50%);
}

/* ===== Scrollbar ذهبي ===== */
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
  background: #FFD700;
}
</style>
