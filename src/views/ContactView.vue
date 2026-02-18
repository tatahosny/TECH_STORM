<template>
  <div class="contact-page">
    <div class="container">
      <!-- الهيدر الفشيخ -->
      <div class="contact-header">
        <div class="header-glow"></div>
        <div class="floating-elements">
          <i class="fas fa-paper-plane floating-plane"></i>
          <i class="fas fa-envelope floating-envelope"></i>
          <i class="fas fa-headset floating-headset"></i>
        </div>
        <h1 class="page-title">
          تواصل مع 
          <span class="gradient-text">TECH STORM</span>
          <span class="title-bolt">⚡</span>
        </h1>
        <p class="page-subtitle">
          احنا هنا عشان نسمعك .. ونحول أفكارك لواقع
        </p>
        <div class="header-stats">
          <div class="stat-chip">
            <i class="fas fa-clock"></i>
            <span>الرد خلال ٢٤ ساعة</span>
          </div>
          <div class="stat-chip">
            <i class="fas fa-check-circle"></i>
            <span>دعم فني مجاني</span>
          </div>
          <div class="stat-chip">
            <i class="fas fa-star"></i>
            <span>٥٠+ مشروع ناجح</span>
          </div>
        </div>
      </div>

      <!-- المحتوى الرئيسي -->
      <div class="contact-content">
        <!-- الجانب الأيمن - الفورم -->
        <div class="form-wrapper">
          <div class="form-card">
            <div class="form-card-header">
              <div class="header-icon">
                <i class="fas fa-paper-plane"></i>
              </div>
              <h2>إرسال رسالة</h2>
              <p>املأ البيانات وهنرد عليك في أسرع وقت</p>
            </div>
            
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="input-group">
                <div class="input-icon">
                  <i class="fas fa-user"></i>
                </div>
                <input 
                  type="text" 
                  v-model="form.name" 
                  required
                  placeholder="الاسم الكامل"
                >
                <div class="input-border"></div>
              </div>
              
              <div class="input-group">
                <div class="input-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <input 
                  type="email" 
                  v-model="form.email" 
                  required
                  placeholder="البريد الإلكتروني"
                >
                <div class="input-border"></div>
              </div>
              
              <div class="input-group">
                <div class="input-icon">
                  <i class="fas fa-tag"></i>
                </div>
                <select v-model="form.subject" required>
                  <option value="" disabled selected>اختر موضوع الرسالة</option>
                  <option value="general">💬 استفسار عام</option>
                  <option value="project">🚀 مشروع جديد</option>
                  <option value="partnership">🤝 شراكة</option>
                  <option value="support">🛠️ دعم فني</option>
                  <option value="join">👥 انضمام للفريق</option>
                  <option value="other">📌 أخرى</option>
                </select>
                <div class="input-border"></div>
              </div>
              
              <div class="input-group textarea-group">
                <div class="input-icon">
                  <i class="fas fa-pencil-alt"></i>
                </div>
                <textarea 
                  v-model="form.message" 
                  rows="5"
                  required
                  placeholder="اكتب رسالتك هنا ..."
                ></textarea>
                <div class="input-border"></div>
              </div>
              
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">
                  <span>إرسال الرسالة</span>
                  <i class="fas fa-paper-plane btn-icon"></i>
                </span>
                <span v-else>
                  <span>جاري الإرسال</span>
                  <i class="fas fa-spinner fa-spin"></i>
                </span>
              </button>
              
              <transition name="slide-fade">
                <div v-if="submitStatus" class="submit-status" :class="submitStatus.type">
                  <div class="status-content">
                    <i :class="submitStatus.icon"></i>
                    <span>{{ submitStatus.message }}</span>
                  </div>
                  <div class="status-progress" v-if="submitStatus.type === 'success'"></div>
                </div>
              </transition>
            </form>
          </div>
        </div>

        <!-- الجانب الأيسر - معلومات التواصل -->
        <div class="info-wrapper">
          <!-- بطاقة وسائل التواصل -->
          <div class="info-card">
            <div class="info-card-header">
              <div class="header-glow-small"></div>
              <h3>🌐 وسائل التواصل</h3>
              <p>تواصل معنا بالطريقة اللي تناسبك</p>
            </div>
            
            <div class="contact-methods-grid">
              <a 
                v-for="method in contactMethods" 
                :key="method.id"
                :href="method.link" 
                target="_blank"
                class="contact-method-card"
                :class="method.color"
              >
                <div class="method-icon-wrapper">
                  <i :class="method.icon"></i>
                  <div class="icon-glow"></div>
                </div>
                <div class="method-info">
                  <h4>{{ method.title }}</h4>
                  <p>{{ method.content }}</p>
                </div>
                <div class="method-arrow">
                  <i class="fas fa-arrow-left"></i>
                </div>
              </a>
            </div>
          </div>

          <!-- بطاقة الأسئلة الشائعة -->
          <div class="faq-card">
            <div class="faq-header">
              <div class="faq-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="faq-title">
                <h3>الأسئلة الشائعة</h3>
                <p>أكثر ما بيتسأل عنه 👇</p>
              </div>
            </div>
            
            <div class="faq-list">
              <div 
                class="faq-item" 
                v-for="faq in faqs" 
                :key="faq.id"
                @click="toggleFaq(faq.id)"
                :class="{ active: activeFaq === faq.id }"
              >
                <div class="faq-question">
                  <div class="question-mark">
                    <i class="fas fa-question"></i>
                  </div>
                  <h4>{{ faq.question }}</h4>
                  <i :class="['fas', 'chevron', activeFaq === faq.id ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                </div>
                <transition name="faq-slide">
                  <div class="faq-answer" v-if="activeFaq === faq.id">
                    <p>{{ faq.answer }}</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- بطاقة الموقع -->
          <div class="location-card">
            <div class="location-bg-pattern"></div>
            <div class="location-content">
              <div class="location-icon">
                <i class="fas fa-map-marked-alt"></i>
              </div>
              <div class="location-details">
                <h4>مقر الفريق</h4>
                <p>المنطقة التكنولوجية، مبنى الابتكار، الطابق الثالث</p>
                <div class="location-badges">
                  <span class="badge">
                    <i class="fas fa-flag"></i> مصر
                  </span>
                  <span class="badge">
                    <i class="fas fa-building"></i> برج العرب
                  </span>
                </div>
              </div>
              <button class="location-btn">
                <i class="fas fa-directions"></i>
                <span>الاتجاهات</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- قسم الشركاء -->
      <div class="partners-section">
        <div class="partners-header">
          <h3>الثقة اللي بتشرفنا</h3>
          <p>شركاء النجاح اللي آمنوا بينا</p>
        </div>
        <div class="partners-grid">
          <div class="partner-item">
            <i class="fas fa-university"></i>
            <span>جامعة برج العرب</span>
          </div>
          <div class="partner-item">
            <i class="fas fa-flask"></i>
            <span>مركز البحوث</span>
          </div>
          <div class="partner-item">
            <i class="fas fa-microchip"></i>
            <span>TIEC</span>
          </div>
          <div class="partner-item">
            <i class="fas fa-leaf"></i>
            <span>نخلة القابضة</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      submitStatus: null,
      activeFaq: null,
      contactMethods: [
        {
          id: 1,
          icon: 'fas fa-envelope',
          title: 'البريد الإلكتروني',
          content: 'contact@techstorm.team',
          link: 'mailto:contact@techstorm.team',
          color: 'email',
          linkText: 'أرسل بريدًا'
        },
        {
          id: 2,
          icon: 'fab fa-whatsapp',
          title: 'واتساب',
          content: '+20 115 588 2277',
          link: 'https://wa.me/201155882277',
          color: 'whatsapp',
          linkText: 'ابدأ محادثة'
        },
        {
          id: 3,
          icon: 'fab fa-linkedin',
          title: 'لينكد إن',
          content: '@techstorm-team',
          link: 'https://linkedin.com/company/techstorm',
          color: 'linkedin',
          linkText: 'تابعنا'
        },
        {
          id: 4,
          icon: 'fab fa-github',
          title: 'جيت هاب',
          content: '@techstorm',
          link: 'https://github.com/techstorm',
          color: 'github',
          linkText: 'مشاريعنا'
        },
        {
          id: 5,
          icon: 'fab fa-behance',
          title: 'بيهانس',
          content: '@techstorm-design',
          link: 'https://behance.net/techstorm',
          color: 'behance',
          linkText: 'تصميماتنا'
        },
        {
          id: 6,
          icon: 'fas fa-phone',
          title: 'الهاتف',
          content: '+20 115 588 2277',
          link: 'tel:+201155882277',
          color: 'phone',
          linkText: 'اتصل بنا'
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'عاوز تتعاون معايا في مشروع؟',
          answer: 'أكيد! فقط املأ النموذج وحدد "مشروع جديد" وهنحدد مكالمة سريعة نسمع فيها فكرتك.'
        },
        {
          id: 2,
          question: 'عاوز انضم للفريق؟',
          answer: 'نستقبل طلبات الانضمام في بداية كل فصل دراسي. تقدر تقدم من خلال صفحة "طلب انضمام".'
        },
        {
          id: 3,
          question: 'إزاي أقدر أدعم الفريق؟',
          answer: 'تقدر تدعمنا بمشاركة مشاريعنا، أو لو مستثمر تقدر تتواصل معانا مباشرة.'
        },
        {
          id: 4,
          question: 'بتشتغلوا على مشاريع مفتوحة المصدر؟',
          answer: 'إيوه! كل مشاريعنا على GitHub متاحة للمجتمع التقني عشان نشارك المعرفة.'
        }
      ]
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.submitStatus = {
        type: 'success',
        icon: 'fas fa-check-circle',
        message: 'تم إرسال رسالتك! هنرد عليك خلال ٢٤ ساعة.'
      }
      
      this.isSubmitting = false
      
      // إعادة تعيين النموذج
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      // إخفاء رسالة النجاح بعد 5 ثواني
      setTimeout(() => {
        this.submitStatus = null
      }, 5000)
    },
    toggleFaq(faqId) {
      this.activeFaq = this.activeFaq === faqId ? null : faqId
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding: 120px 20px 80px;
  min-height: 100vh;
  background: var(--primary-color);
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

/* ===== الهيدر الفشيخ ===== */
.contact-header {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.header-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;
}

.floating-elements {
  position: relative;
  height: 60px;
  margin-bottom: 20px;
}

.floating-plane {
  position: absolute;
  top: 0;
  left: 20%;
  font-size: 2rem;
  color: rgba(255,215,0,0.3);
  transform: rotate(45deg);
  animation: float 6s ease-in-out infinite;
}

.floating-envelope {
  position: absolute;
  top: -20px;
  right: 25%;
  font-size: 2rem;
  color: rgba(255,215,0,0.2);
  animation: float 8s ease-in-out infinite reverse;
}

.floating-headset {
  position: absolute;
  bottom: -20px;
  left: 30%;
  font-size: 2rem;
  color: rgba(255,215,0,0.25);
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
}

.page-title {
  font-size: 4rem;
  margin-bottom: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.gradient-text {
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
}

.title-bolt {
  font-size: 3rem;
  animation: boltFlash 2s ease-in-out infinite;
}

@keyframes boltFlash {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.page-subtitle {
  font-size: 1.4rem;
  color: var(--muted-text);
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  padding: 0 20px;
}

.page-subtitle::before,
.page-subtitle::after {
  content: '✨';
  margin: 0 10px;
  opacity: 0.7;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 50px;
  color: var(--text-color);
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.stat-chip:hover {
  background: rgba(255,215,0,0.1);
  border-color: var(--accent-color);
  transform: translateY(-3px);
}

.stat-chip i {
  color: var(--accent-color);
}

/* ===== المحتوى الرئيسي ===== */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 80px;
}

@media (max-width: 1100px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

/* ===== الفورم ===== */
.form-wrapper {
  position: relative;
}

.form-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 40px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), #ffaa00, var(--accent-color));
  background-size: 200% 100%;
  animation: gradientMove 3s linear infinite;
}

@keyframes gradientMove {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

.form-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 50px rgba(0,0,0,0.3);
  border-color: var(--accent-color);
}

.form-card-header {
  text-align: center;
  margin-bottom: 40px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--accent-color);
  margin: 0 auto 20px;
  border: 1px solid rgba(255,215,0,0.3);
  animation: float 6s ease-in-out infinite;
}

.form-card-header h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.form-card-header p {
  color: var(--muted-text);
  font-size: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  right: 20px;
  color: var(--muted-text);
  z-index: 2;
  transition: all 0.3s;
}

.input-group:focus-within .input-icon {
  color: var(--accent-color);
}

.input-group input,
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 18px 50px 18px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
}

.input-group textarea {
  resize: vertical;
  min-height: 120px;
}

.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.02);
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
  z-index: 2;
}

.input-group:focus-within .input-border {
  width: 80%;
}

.textarea-group {
  align-items: flex-start;
}

.textarea-group .input-icon {
  top: 18px;
}

.submit-btn {
  padding: 18px 30px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.submit-btn::before {
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

.submit-btn:hover::before {
  width: 300px;
  height: 300px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.3);
}

.btn-icon {
  transition: transform 0.3s;
}

.submit-btn:hover .btn-icon {
  transform: translateX(-5px);
}

.submit-status {
  margin-top: 20px;
  padding: 15px 25px;
  border-radius: 20px;
  animation: slideUp 0.5s ease;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  font-size: 1rem;
}

.status-content i {
  font-size: 1.3rem;
}

.submit-status.success {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4caf50;
  color: #4caf50;
}

.submit-status.error {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
}

.status-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  animation: progress 5s linear;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== معلومات التواصل ===== */
.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-methods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

@media (max-width: 500px) {
  .contact-methods-grid {
    grid-template-columns: 1fr;
  }
}

.contact-method-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
}

.contact-method-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.02), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.contact-method-card:hover::before {
  transform: translateX(100%);
}

.contact-method-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.02);
}

.method-icon-wrapper {
  width: 50px;
  height: 50px;
  background: rgba(255,215,0,0.1);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  position: relative;
  flex-shrink: 0;
}

.contact-method-card.email .method-icon-wrapper {
  background: rgba(255,215,0,0.1);
  color: var(--accent-color);
}

.contact-method-card.whatsapp .method-icon-wrapper {
  background: rgba(37, 211, 102, 0.1);
  color: #25d366;
}

.contact-method-card.linkedin .method-icon-wrapper {
  background: rgba(0, 119, 181, 0.1);
  color: #0077b5;
}

.contact-method-card.github .method-icon-wrapper {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.contact-method-card.behance .method-icon-wrapper {
  background: rgba(23, 105, 255, 0.1);
  color: #1769ff;
}

.contact-method-card.phone .method-icon-wrapper {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.3s;
}

.contact-method-card:hover .icon-glow {
  opacity: 1;
}

.method-info {
  flex: 1;
}

.method-info h4 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: var(--text-color);
}

.method-info p {
  font-size: 0.85rem;
  color: var(--muted-text);
}

.method-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s;
  color: var(--accent-color);
}

.contact-method-card:hover .method-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ===== FAQ ===== */
.faq-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 30px;
}

.faq-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.faq-icon {
  width: 50px;
  height: 50px;
  background: rgba(255,215,0,0.1);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.faq-title h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: var(--text-color);
}

.faq-title p {
  color: var(--muted-text);
  font-size: 0.9rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-item:hover {
  border-color: rgba(255,215,0,0.3);
}

.faq-item.active {
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.02);
}

.faq-question {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.question-mark {
  width: 30px;
  height: 30px;
  background: rgba(255,215,0,0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.faq-question h4 {
  flex: 1;
  font-size: 1rem;
  color: var(--text-color);
}

.chevron {
  color: var(--accent-color);
  transition: transform 0.3s;
}

.faq-answer {
  padding: 0 20px 20px 65px;
}

.faq-answer p {
  color: var(--muted-text);
  line-height: 1.7;
  font-size: 0.95rem;
}

.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.3s ease;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ===== بطاقة الموقع ===== */
.location-card {
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(0,0,0,0.3));
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.location-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(var(--accent-color) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.05;
}

.location-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .location-content {
    flex-direction: column;
    text-align: center;
  }
}

.location-icon {
  width: 70px;
  height: 70px;
  background: rgba(255,215,0,0.1);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent-color);
}

.location-details {
  flex: 1;
}

.location-details h4 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: var(--text-color);
}

.location-details p {
  color: var(--muted-text);
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.location-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 15px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  font-size: 0.8rem;
  color: var(--muted-text);
}

.badge i {
  color: var(--accent-color);
}

.location-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.location-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

/* ===== قسم الشركاء ===== */
.partners-section {
  margin-top: 80px;
  text-align: center;
}

.partners-header {
  margin-bottom: 40px;
}

.partners-header h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.partners-header p {
  color: var(--muted-text);
  font-size: 1.1rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
}

.partner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  transition: all 0.4s;
}

.partner-item:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.02);
}

.partner-item i {
  font-size: 2rem;
  color: var(--accent-color);
}

.partner-item span {
  color: var(--text-color);
  font-weight: 600;
}

/* ===== RTL ===== */
[dir="rtl"] .input-icon {
  right: auto;
  left: 20px;
}

[dir="rtl"] .input-group input,
[dir="rtl"] .input-group select,
[dir="rtl"] .input-group textarea {
  padding: 18px 20px 18px 50px;
}

[dir="rtl"] .method-arrow {
  transform: translateX(10px);
}

[dir="rtl"] .contact-method-card:hover .method-arrow {
  transform: translateX(0);
}

[dir="rtl"] .submit-btn:hover .btn-icon {
  transform: translateX(5px);
}

[dir="rtl"] .floating-plane {
  transform: rotate(-45deg);
}

/* ===== Animations ===== */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-card,
.info-card,
.faq-card,
.location-card,
.partner-item {
  animation: slideIn 0.6s ease-out;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .contact-page {
    padding: 100px 15px 60px;
  }

  .page-title {
    font-size: 2.8rem;
  }

  .page-subtitle {
    font-size: 1.2rem;
  }

  .form-card {
    padding: 30px;
  }

  .form-card-header h2 {
    font-size: 1.8rem;
  }

  .contact-methods-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2.2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .header-stats {
    flex-direction: column;
  }

  .stat-chip {
    width: 100%;
    justify-content: center;
  }

  .form-card {
    padding: 25px;
  }

  .form-card-header h2 {
    font-size: 1.6rem;
  }

  .submit-btn {
    padding: 15px 25px;
    font-size: 1rem;
  }
}
</style>