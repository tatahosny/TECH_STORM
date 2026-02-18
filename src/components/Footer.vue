<template>
  <footer class="site-footer">
    <div class="container">
      <!-- المحتوى الرئيسي -->
      <div class="footer-content">
        <!-- القسم الأول: اللوجو والوصف -->
        <div class="footer-section brand-section">
          <div class="footer-logo">
            <div class="logo-icon">
              <i class="fas fa-bolt"></i>
            </div>
            <div class="logo-text">
              <span class="tech">TECH</span>
              <span class="storm">STORM</span>
            </div>
          </div>
          <p class="footer-description">
            فريق طلابي مصري بنشتغل على مشاريع تقنية حقيقية. بنتعلم، بنبدع، وبنصنع المستقبل.
          </p>
          <div class="footer-stats">
            <div class="stat">
              <span class="stat-number">13</span>
              <span class="stat-label">عضو</span>
            </div>
            <div class="stat">
              <span class="stat-number">6</span>
              <span class="stat-label">أقسام</span>
            </div>
            <div class="stat">
              <span class="stat-number">∞</span>
              <span class="stat-label">طموح</span>
            </div>
          </div>
        </div>

        <!-- القسم الثاني: روابط سريعة -->
        <div class="footer-section">
          <h3 class="footer-title">روابط سريعة</h3>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link :to="link.path" class="footer-link">
                <i class="fas fa-chevron-left"></i>
                {{ link.text }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- القسم الثالث: تواصل معنا -->
        <div class="footer-section">
          <h3 class="footer-title">تواصل معنا</h3>
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-university"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">الكلية</span>
                <span class="contact-text">جامعة برج العرب</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">البريد</span>
                <span class="contact-text">tatahosny208@gmail.com</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fab fa-whatsapp"></i>
              </div>
              <div class="contact-details">
                <span class="contact-label">واتساب</span>
                <span class="contact-text">+20 1555973628</span>
              </div>
            </div>
          </div>
        </div>

        <!-- القسم الرابع: تابعنا -->
        <div class="footer-section">
          <h3 class="footer-title">تابعنا</h3>
          <div class="social-links">
            <a v-for="social in socialLinks" :key="social.name" :href="social.link" target="_blank" class="social-link" :class="social.name">
              <i :class="social.icon"></i>
            </a>
          </div>
          <div class="newsletter">
            <p>انضم للنشرة البريدية</p>
            <div class="newsletter-input">
              <input type="email" placeholder="بريدك الإلكتروني" />
              <button>
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- الفوتر السفلي -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>
            <i class="fas fa-copyright"></i> 
            2024 TECH STORM. كل الحقوق محفوظة- , By Mostafa_Hosny
          </p>
        </div>
        <div class="footer-bottom-links">
          <router-link to="/privacy">سياسة الخصوصية</router-link>
          <span class="separator">•</span>
          <router-link to="/terms">شروط الاستخدام</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      quickLinks: [
        { path: '/', text: 'الرئيسية' },
        { path: '/projects', text: 'المشاريع' },
        { path: '/about', text: 'عن الفريق' },
        { path: '/team', text: 'الأعضاء' },
        { path: '/specializations', text: 'التخصصات' },
        { path: '/contact', text: 'تواصل معنا' }
      ],
      socialLinks: [
        { name: 'github', icon: 'fab fa-github', link: 'https://github.com/techstorm' },
        { name: 'linkedin', icon: 'fab fa-linkedin-in', link: 'https://linkedin.com/company/techstorm' },
        { name: 'facebook', icon: 'fab fa-facebook-f', link: '#' },
        { name: 'instagram', icon: 'fab fa-instagram', link: '#' }
      ]
    }
  }
}
</script>

<style scoped>
.site-footer {
  background: #0a0a0a;
  color: #fff;
  padding: 60px 0 0;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  margin-top: 60px;
  position: relative;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* ===== المحتوى الرئيسي ===== */
.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 50px;
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 30px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* ===== القسم الأول: البراند ===== */
.footer-section.brand-section {
  max-width: 100%;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
}

.logo-text {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.tech {
  font-size: 1.6rem;
  font-weight: 900;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.storm {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
}

.footer-description {
  color: #aaa;
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 25px;
}

/* ===== إحصائيات ===== */
.footer-stats {
  display: flex;
  gap: 25px;
  background: rgba(255, 215, 0, 0.05);
  padding: 15px 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #FFD700;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.75rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ===== عناوين الأقسام ===== */
.footer-title {
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: #fff;
  position: relative;
  padding-bottom: 12px;
  font-weight: 700;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 3px;
  background: #FFD700;
  border-radius: 3px;
}

/* ===== الروابط ===== */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 15px;
}

.footer-link {
  color: #aaa;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link i {
  font-size: 0.7rem;
  color: #FFD700;
  opacity: 0.5;
  transition: all 0.3s;
}

.footer-link:hover {
  color: #FFD700;
  transform: translateX(-5px);
}

.footer-link:hover i {
  opacity: 1;
  transform: translateX(-3px);
}

/* ===== معلومات التواصل ===== */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  font-size: 1rem;
  transition: all 0.3s;
}

.contact-item:hover .contact-icon {
  background: rgba(255, 215, 0, 0.1);
  border-color: #FFD700;
  transform: scale(1.05);
}

.contact-details {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 2px;
}

.contact-text {
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
}

/* ===== وسائل التواصل الاجتماعي ===== */
.social-links {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.social-link {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.3s;
  text-decoration: none;
}

.social-link:hover {
  background: #FFD700;
  color: #000;
  border-color: #FFD700;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
}

.social-link.github:hover { background: #333; color: #fff; }
.social-link.linkedin:hover { background: #0077b5; color: #fff; }
.social-link.facebook:hover { background: #1877f2; color: #fff; }
.social-link.instagram:hover { background: #e4405f; color: #fff; }

/* ===== النشرة البريدية ===== */
.newsletter {
  margin-top: 25px;
}

.newsletter p {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 12px;
  font-weight: 600;
}

.newsletter-input {
  display: flex;
  gap: 10px;
}

.newsletter-input input {
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.newsletter-input input:focus {
  outline: none;
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.05);
}

.newsletter-input button {
  width: 45px;
  height: 45px;
  background: #FFD700;
  border: none;
  border-radius: 12px;
  color: #000;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-input button:hover {
  background: #FFA500;
  transform: translateY(-2px);
}

/* ===== الفوتر السفلي ===== */
.footer-bottom {
  padding: 25px 0;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

.copyright p {
  color: #888;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.copyright i {
  color: #FFD700;
  font-size: 0.8rem;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer-bottom-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.footer-bottom-links a:hover {
  color: #FFD700;
}

.separator {
  color: rgba(255, 255, 255, 0.2);
}

/* ===== RTL ===== */
[dir="rtl"] .footer-title::after {
  right: 0;
  left: auto;
}

[dir="rtl"] .footer-link:hover {
  transform: translateX(5px);
}

[dir="rtl"] .footer-link i {
  transform: rotate(180deg);
}

[dir="rtl"] .footer-link:hover i {
  transform: rotate(180deg) translateX(-3px);
}
</style>