<template>
  <div class="home">
    <!-- ========== الهيرو ========== -->
    <section class="hero">
      <div class="hero-content">
        <div class="logo-container">
          <img src="/techstorm-logo.png" alt="TECH STORM" class="hero-logo" />
        </div>
        
        <p class="hero-subtitle">مش بنذاكر بس .. بننفذ </p>
        <p class="hero-description">
          مجموعة طلاب بتجمع بين الدراسة والعمل على مشاريع تقنية واقعية
        </p>
        
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            <i class="fas fa-code"></i> مشاريعنا
          </a>
          <router-link to="/team" class="btn btn-outline">
            <i class="fas fa-users"></i> فريقنا
          </router-link>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <!-- ========== لمحة عن جرين شيلد ========== -->
    <section class="glance-section">
      <div class="container">
        <div class="glance-header">
          <span class="glance-badge">🤖 إنجاز 2024</span>
          <h2>روبوت <span class="gradient-text">جرين شيلد</span></h2>
          <p class="glance-sub">
            أول روبوت زراعي مصري لتحليل التربة واكتشاف أمراض النباتات
          </p>
        </div>

        <div class="glance-grid">
          <div class="glance-image">
            <img src="/greenshield-borg-elarab.jpg" alt="جرين شيلد في معرض برج العرب" />
            <span class="image-caption">معرض برج العرب - المركز الثاني</span>
          </div>
          <div class="glance-stats">
            <div class="stat-item-mini">
              <span class="stat-number">97%</span>
              <span class="stat-label">دقة تشخيص</span>
            </div>
            <div class="stat-item-mini">
              <span class="stat-number">7</span>
              <span class="stat-label">عناصر تربة</span>
            </div>
            <div class="stat-item-mini">
              <span class="stat-number">45</span>
              <span class="stat-label">مشروع منافس</span>
            </div>
          </div>
        </div>

        <div class="glance-action">
          <router-link to="/projects" class="btn-link">
            القصة الكاملة للمشروع <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== لمحة عن الفريق ========== -->
    <section class="team-glance">
      <div class="container">
        <div class="team-glance-content">
          <div class="team-glance-text">
            <span class="section-label">👥 فريق TECH STORM</span>
            <h3>فريق واحد .. مشروع واحد</h3>
            <p>
              19 عضو من التيم اشتغلو عشان يطلعو جرين شيلد للنور
              من التصميم للتنفيذ، ومن معامل الكلية لمعرض برج العرب.
            </p>
            <router-link to="/about" class="btn-text">
              اعرف عن الفريق <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
          <div class="team-glance-stats">
            <div class="stat-circle">
              <span class="big-number">19</span>
              <span>أعضاء</span>
            </div>
            <div class="stat-circle">
              <span class="big-number">8</span>
              <span>شهور</span>
            </div>
            <div class="stat-circle">
              <span class="big-number">2</span>
              <span>مركز</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== المشروع الوحيد ========== -->
    <section id="projects" class="projects-preview">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">المشروع الوحيد</h2>
          <p class="section-subtitle">جرين شيلد - المشروع الرسمي للفريق 2025</p>
        </div>

        <div class="projects-grid">
          <!-- المشروع المميز: جرين شيلد -->
          <div class="project-card featured">
            <div class="featured-badge">🏆 المركز الثاني</div>
            <div class="project-icon">
              <i class="fas fa-robot"></i>
            </div>
            <h3>جرين شيلد</h3>
            <p>روبوت زراعي لتحليل التربة واكتشاف أمراض النباتات بالذكاء الاصطناعي</p>
            <div class="project-tags">
              <span>روبوتكس</span>
              <span>ذكاء اصطناعي</span>
              <span>إنترنت الأشياء</span>
              <span>معرض برج العرب</span>
            </div>
            <div class="project-meta">
              <span class="project-year">2024</span>
              <span class="project-award">🥈 المركز الثاني</span>
            </div>
          </div>
        </div>

        <div class="view-all">
          <router-link to="/projects" class="btn-link">
            تفاصيل المشروع كاملة <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== لمحة عن المستثمر ========== -->
    <section class="investor-glance">
      <div class="container">
        <div class="investor-card">
          <div class="investor-quote-mini">
            <i class="fas fa-quote-right"></i>
            <p>
              "فريق TECH STORM عنده إمكانيات، بس الاستثمار بيحتاج جاهزية أكتر. 
              جرين شيلد مشروع واعد، والسنة الجاية هيطوروه."
            </p>
            <div class="quote-author">— مجدي مختار الطاهر</div>
            <span class="investor-tag-mini">مستثمر في AgriTech</span>
          </div>
          <div class="investor-action">
            <router-link to="/about" class="btn-text">
              قصة الاستثمار كاملة <i class="fas fa-arrow-left"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== كول تو أكشن ========== -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>عاوز تشارك في جرين شيلد 2.0؟</h2>
          <p>بنستقبل أعضاء جدد للموسم الجديد</p>
          <router-link to="/apply" class="btn btn-primary btn-large">
            <i class="fas fa-user-plus"></i> قدم دلوقتي
          </router-link>
          <router-link to="/contact" class="btn btn-outline btn-large">
            <i class="fas fa-envelope"></i> تواصل معانا
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
/* ========== الهيرو ========== */
.hero {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  position: relative;
  background: radial-gradient(circle at 10% 30%, rgba(255, 215, 0, 0.03) 0%, transparent 50%);
}
.hero-content {
  max-width: 800px;
  margin: 0 auto;
}
.logo-container {
  margin-bottom: 30px;
}
.hero-logo {
  width: min(280px, 80%);
  height: auto;
  transition: all 0.5s;
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.1));
}
.hero-logo:hover {
  transform: translateY(-10px);
  filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.2));
}
.hero-subtitle {
  font-size: 1.8rem;
  color: var(--accent-color);
  margin-bottom: 15px;
  font-weight: 700;
}
.hero-description {
  font-size: 1.2rem;
  color: var(--muted-text);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn {
  padding: 14px 32px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 2px solid transparent;
  cursor: pointer;
}
.btn-primary {
  background-color: var(--accent-color);
  color: var(--primary-color);
}
.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 215, 0, 0.25);
}
.btn-outline {
  background-color: transparent;
  color: var(--accent-color);
  border-color: var(--border-color);
}
.btn-outline:hover {
  background-color: rgba(255, 215, 0, 0.05);
  border-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.15);
}
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  color: var(--muted-text);
  font-size: 1.5rem;
  animation: bounce 2s infinite;
  opacity: 0.8;
}
.scroll-indicator:hover {
  opacity: 1;
  color: var(--accent-color);
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(15px); }
}

/* ========== عام ========== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* ========== لمحة جرين شيلد ========== */
.glance-section {
  padding: 80px 0;
  background: linear-gradient(145deg, rgba(255,215,0,0.03), transparent);
}
.glance-header {
  text-align: center;
  margin-bottom: 50px;
}
.glance-badge {
  display: inline-block;
  padding: 8px 25px;
  background: rgba(255,215,0,0.1);
  color: var(--accent-color);
  border-radius: 40px;
  font-size: 0.95rem;
  margin-bottom: 15px;
  font-weight: 600;
}
.glance-header h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.gradient-text {
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.glance-sub {
  font-size: 1.2rem;
  color: var(--muted-text);
  max-width: 600px;
  margin: 0 auto;
}
.glance-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  .glance-grid {
    grid-template-columns: 1fr;
  }
}
.glance-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 30px rgba(0,0,0,0.2);
}
.glance-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}
.glance-image:hover img {
  transform: scale(1.05);
}
.image-caption {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.85rem;
  backdrop-filter: blur(5px);
  border: 1px solid var(--accent-color);
}
.glance-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
.stat-item-mini {
  text-align: center;
}
.stat-number {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--accent-color);
  line-height: 1;
  margin-bottom: 5px;
}
.stat-label {
  font-size: 0.9rem;
  color: var(--muted-text);
}
.glance-action {
  text-align: center;
  margin-top: 40px;
}
.btn-link {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  padding: 10px 25px;
  border-radius: 30px;
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
}
.btn-link:hover {
  gap: 20px;
  background: rgba(255,215,0,0.1);
  border-color: var(--accent-color);
  transform: translateX(-5px);
}

/* ========== لمحة الفريق ========== */
.team-glance {
  padding: 80px 0;
}
.team-glance-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 768px) {
  .team-glance-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.section-label {
  display: inline-block;
  padding: 6px 20px;
  background: rgba(255,215,0,0.1);
  color: var(--accent-color);
  border-radius: 30px;
  font-size: 0.9rem;
  margin-bottom: 15px;
  font-weight: 600;
}
.team-glance-text h3 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.team-glance-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--muted-text);
  margin-bottom: 30px;
}
.btn-text {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.3s;
}
.btn-text:hover {
  gap: 15px;
}
.team-glance-stats {
  display: flex;
  justify-content: space-around;
}
.stat-circle {
  text-align: center;
}
.big-number {
  display: block;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--accent-color);
  line-height: 1;
  margin-bottom: 8px;
}

/* ========== المشروع الوحيد ========== */
.projects-preview {
  padding: 80px 0;
  background-color: var(--secondary-color);
}
.section-header {
  text-align: center;
  margin-bottom: 60px;
}
.section-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
}
.section-subtitle {
  font-size: 1.2rem;
  color: var(--muted-text);
}
.projects-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}
.project-card {
  background: var(--card-bg);
  border-radius: 30px;
  padding: 40px;
  border: 1px solid var(--border-color);
  transition: all 0.4s;
  position: relative;
  width: 100%;
}
.project-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-color);
  box-shadow: 0 30px 50px rgba(0,0,0,0.3);
}
.project-card.featured {
  border: 2px solid var(--accent-color);
  background: linear-gradient(145deg, var(--card-bg), rgba(255,215,0,0.05));
}
.featured-badge {
  position: absolute;
  top: -15px;
  right: 30px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  padding: 8px 25px;
  border-radius: 40px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}
.project-icon {
  font-size: 3rem;
  color: var(--accent-color);
  margin-bottom: 25px;
}
.project-card h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
}
.project-card p {
  color: var(--muted-text);
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1rem;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.project-tags span {
  padding: 6px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: 30px;
  font-size: 0.85rem;
  color: var(--muted-text);
  border: 1px solid var(--border-color);
}
.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}
.project-year {
  font-size: 0.95rem;
  color: var(--muted-text);
}
.project-award {
  font-size: 0.95rem;
  color: var(--accent-color);
  font-weight: 600;
}
.view-all {
  text-align: center;
  margin-top: 40px;
}

/* ========== لمحة المستثمر ========== */
.investor-glance {
  padding: 60px 0;
}
.investor-card {
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(255,100,100,0.05));
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}
@media (max-width: 768px) {
  .investor-card {
    flex-direction: column;
    text-align: center;
  }
}
.investor-quote-mini {
  flex: 1;
  position: relative;
  padding: 20px;
}
.investor-quote-mini i {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 3rem;
  color: var(--accent-color);
  opacity: 0.2;
}
.investor-quote-mini p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 15px;
  font-style: italic;
}
.quote-author {
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}
.investor-tag-mini {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.85rem;
  color: var(--muted-text);
  padding: 4px 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
}
.investor-action .btn-text {
  font-size: 1rem;
  white-space: nowrap;
}

/* ========== كول تو أكشن ========== */
.cta-section {
  padding: 80px 0;
  background: var(--primary-color);
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
.cta-content h2 {
  font-size: 2.2rem;
  margin-bottom: 15px;
}
.cta-content p {
  font-size: 1.2rem;
  color: var(--muted-text);
  margin-bottom: 40px;
}
.btn-large {
  padding: 16px 40px;
  font-size: 1.2rem;
  margin: 0 10px 10px;
}
@media (max-width: 480px) {
  .btn-large {
    width: 100%;
    margin: 10px 0;
  }
}

/* ========== RTL ========== */
[dir="rtl"] .btn-link:hover,
[dir="rtl"] .btn-text:hover {
  gap: 15px;
}
[dir="rtl"] .btn-link:hover {
  transform: translateX(5px);
}
[dir="rtl"] .featured-badge {
  right: auto;
  left: 30px;
}
[dir="rtl"] .investor-quote-mini i {
  right: auto;
  left: -10px;
}
[dir="rtl"] .image-caption {
  right: auto;
  left: 15px;
}
</style>