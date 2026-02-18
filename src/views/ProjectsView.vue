<template>
  <div class="projects-page">
    <div class="container">
      <div class="page-header">
        <h1>المشاريع</h1>
        <p>جرين شيلد - المشروع الوحيد لفريق TECH STORM السنة اللي فاتت</p>
      </div>
      
      <!-- مشروع جرين شيلد فقط -->
      <div class="project-card featured">
        <div class="project-badge">
          <span>🤖 المشروع الرسمي للفريق 2025</span>
        </div>
        
        <div class="project-header">
          <div class="project-icon-wrapper">
            <i class="fas fa-robot"></i>
          </div>
          <div class="project-title-wrapper">
            <h2>جرين شيلد <span class="trademark">™</span></h2>
            <p class="project-subtitle">Green Shield - أول روبوت زراعي مصري لتحليل التربة واكتشاف أمراض النباتات</p>
          </div>
        </div>

        <div class="project-showcase">
          <!-- ===== صورة جرين شيلد في المعرض ===== -->
          <div class="project-image-container">
            <img 
              src="/greenshield-borg-elarab.jpg" 
              alt="روبوت جرين شيلد في معرض برج العرب" 
              class="project-image"
              @error="handleImageError"
            />
            <div class="image-caption">
              <i class="fas fa-calendar-alt"></i>
              <span>معرض برج العرب - مارس 2025</span>
            </div>
          </div>

          <div class="project-details">
            <!-- الإنجاز الرئيسي -->
            <div class="achievement-card">
              <div class="achievement-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="achievement-text">
                <h4>المركز الثاني</h4>
                <p>على مستوى 54 مشروع  في معرض جامعة برج العرب</p>
              </div>
            </div>

            <!-- مواصفات الروبوت -->
            <div class="specs-grid">
              <div class="spec-item">
                <i class="fas fa-microchip"></i>
                <span>7 عناصر تربة</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-camera"></i>
                <span>كاميرا 4K + حرارية</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-brain"></i>
                <span>دقة تشخيص 97%</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-flask"></i>
                <span>12 مرض نباتي</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-battery-full"></i>
                <span>4 ساعات شغل</span>
              </div>
              <div class="spec-item">
                <i class="fas fa-map-marked-alt"></i>
                <span>حركة ذاتية</span>
              </div>
            </div>

            <!-- قصة المشروع -->
            <div class="story-section">
              <h4>📋 قصة المشروع</h4>
              <p>جرين شيلد هو المشروع الوحيد اللي اشتغل عليه فريق TECH STORM السنة اللي فاتت. بدأ كمشروع تخرج 2023، واتطور على مدار 8 شهور. الفريق صرف من فلوسه الخاصة عشان يخرج النموذج الأولي.</p>
              <p>الروبوت بيمشي في الأرض الزراعية، بيحلل التربة ويصور النباتات، وبيكتشف الأمراض باستخدام الذكاء الاصطناعي. اتعرض في <strong>معرض جامعة برج العرب الدولي</strong> وحصل على المركز الثاني.</p>
            </div>

            <!-- قصة المستثمر -->
            <div class="investor-story">
              <h4>📖 قصة الاستثمار</h4>
              <div class="investor-timeline">
                <div class="timeline-item">
                  <span class="timeline-date">أغسطس 2025</span>
                  <p>التقينا بالمهندس <strong>مجدي مختار الطاهر</strong> في معرض جامعة برج العرب</p>
                </div>
                <div class="timeline-item">
                  <span class="timeline-date">سبتمبر 2025</span>
                  <p>اترشحنا في برنامج "ابتكار" لتسريع الشركات الناشئة</p>
                </div>
                <div class="timeline-item highlight">
                  <span class="timeline-date">سبتمبر 2025</span>
                  <p>المهندس مجدي اعتذر عن الاستثمار - المشروع محتاج جاهزية أكتر</p>
                  <span class="lesson-badge">درس تعلمناه</span>
                </div>
              </div>
              <div class="investor-quote">
                <i class="fas fa-quote-right"></i>
                <p>"فريق TECH STORM عنده إمكانيات، بس الاستثمار بيحتاج نموذج عمل واضح وجاهزية للسوق. أتمنى لهم التوفيق في مشوارهم."</p>
                <span class="quote-author">— مجدي مختار الطاهر</span>
              </div>
            </div>

            <!-- فريق العمل -->
            <div class="team-section">
              <h4>👥 أعضاء الفريق</h4>
              <div class="team-card">
                <div class="team-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="team-info">
                  <p class="team-count">11 عضو أساسي</p>
                  <div class="team-members">
                    <span>مصطفى حسنى</span>
                    <span>عبد المجيد صابر</span>
                    <span>عصام محمد</span>
                    <span>عادل محمد</span>
                    <span>محمود يوسف</span>
                    <span>محمد مجدى</span>
                    <span>شهاب محمد</span>
                    <span>مرام محمد عباس</span>
                    <span>سما ولاء</span>
                    <span>روان محمود</span>
                    <span>جود هشام</span>
                  </div>
                  <p class="team-note">فريق جرين شيلد 2025</p>
                </div>
              </div>
            </div>

            <!-- ===== صورة الفريق في المعرض - مكبرة ===== -->
            <div class="team-photo-section">
              <h4>📸 الفريق في معرض برج العرب</h4>
              <div class="team-photo-container">
                <img 
                  src="/team-borg-elarab.jpg" 
                  alt="فريق TECH STORM في معرض برج العرب" 
                  class="team-photo"
                  @error="handleTeamImageError"
                />
                <div class="team-photo-caption">
                  <i class="fas fa-calendar-alt"></i>
                  <span>معرض برج العرب - اغسطس 2025</span>
                </div>
              </div>
     
            </div>

            <!-- حالة المشروع -->
            <div class="project-footer">
              <div class="project-status">
                <span class="status-badge completed">✅ مكتمل - معروض في المعرض</span>
                <span class="status-badge legacy">📌 مشروع 2025</span>
              </div>
              <router-link to="/nabta" class="btn-next-project">
                <span>المشروع الجديد: ؟؟؟</span>
                <i class="fas fa-arrow-left"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsView',
  methods: {
    handleImageError(e) {
      e.target.style.display = 'none';
      e.target.parentElement.classList.add('image-error');
      console.log('صورة جرين شيلد مش موجودة - أضف الصورة في /public/greenshield-borg-elarab.jpg');
    },
    handleTeamImageError(e) {
      e.target.style.display = 'none';
      e.target.parentElement.classList.add('image-error');
      console.log('صورة الفريق مش موجودة - أضف الصورة في /public/team-borg-elarab.jpg');
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding: 120px 20px 80px;
  min-height: 100vh;
  background: var(--primary-color);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 3.5rem;
  margin-bottom: 15px;
  color: var(--text-color);
  font-weight: 800;
}

.page-header p {
  font-size: 1.3rem;
  color: var(--muted-text);
  max-width: 600px;
  margin: 0 auto;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  padding: 40px;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.project-badge {
  position: absolute;
  top: -15px;
  right: 30px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  padding: 10px 30px;
  border-radius: 40px;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
  z-index: 10;
}

.project-header {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
}

.project-icon-wrapper {
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: var(--accent-color);
  border: 1px solid rgba(255,215,0,0.3);
  flex-shrink: 0;
}

.project-title-wrapper h2 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: var(--text-color);
}

.trademark {
  font-size: 1.2rem;
  color: var(--accent-color);
}

.project-subtitle {
  font-size: 1.1rem;
  color: var(--muted-text);
}

.project-showcase {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ===== صورة المشروع ===== */
.project-image-container {
  width: 100%;
  height: 300px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(0,0,0,0.2));
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}

.project-image:hover {
  transform: scale(1.02);
}

.image-caption {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 12px 25px;
  border-radius: 40px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--accent-color);
  z-index: 5;
}

.image-caption i {
  color: var(--accent-color);
}

/* ===== صورة الفريق - مكبرة ===== */
.team-photo-section {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 30px;
  margin-top: 20px;
}

.team-photo-section h4 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.team-photo-container {
  width: 100%;
  height: 350px; /* تم التكبير من 250px إلى 350px */
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--border-color);
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(0,0,0,0.2));
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
}

.team-photo:hover {
  transform: scale(1.02);
}

.team-photo-caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 12px 25px;
  border-radius: 40px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--accent-color);
  z-index: 5;
}

.team-photo-caption i {
  color: var(--accent-color);
}

.team-photo-note {
  text-align: center;
  margin-top: 20px;
  font-size: 0.95rem;
  color: var(--muted-text);
  font-style: italic;
  padding: 10px;
  background: rgba(255,215,0,0.05);
  border-radius: 30px;
  border: 1px solid rgba(255,215,0,0.2);
}

/* ===== Placeholder في حالة عدم وجود الصورة ===== */
.project-image-container.image-error,
.team-photo-container.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(0,0,0,0.2));
  border: 2px dashed var(--border-color);
}

.project-image-container.image-error::before {
  content: '🖼️ اضغط هنا لإضافة الصورة';
  color: var(--muted-text);
  font-size: 1.1rem;
}

.team-photo-container.image-error::before {
  content: '🖼️ أضف صورة الفريق هنا';
  color: var(--muted-text);
  font-size: 1.1rem;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.achievement-card {
  background: linear-gradient(145deg, rgba(255,215,0,0.1), rgba(255,215,0,0.02));
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 30px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.achievement-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,215,0,0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent-color);
  flex-shrink: 0;
}

.achievement-text h4 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: var(--accent-color);
}

.achievement-text p {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.6;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 25px;
}

@media (max-width: 768px) {
  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .specs-grid {
    grid-template-columns: 1fr;
  }
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255,255,255,0.02);
  border-radius: 15px;
  border: 1px solid var(--border-color);
}

.spec-item i {
  font-size: 1.2rem;
  color: var(--accent-color);
  width: 24px;
}

.spec-item span {
  font-size: 0.95rem;
  color: var(--text-color);
}

.story-section,
.investor-story,
.team-section {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 30px;
}

.story-section h4,
.investor-story h4,
.team-section h4 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.story-section p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--muted-text);
  margin-bottom: 15px;
}

.story-section p:last-child {
  margin-bottom: 0;
}

.investor-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

.timeline-item {
  position: relative;
  padding-right: 30px;
  border-right: 2px solid var(--border-color);
}

.timeline-item::before {
  content: '';
  position: absolute;
  right: -9px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--border-color);
}

.timeline-item.highlight {
  border-right-color: var(--accent-color);
}

.timeline-item.highlight::before {
  background: var(--accent-color);
  box-shadow: 0 0 20px var(--accent-color);
}

.timeline-date {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.timeline-item p {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 8px;
}

.lesson-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,100,100,0.2);
  color: #ff6464;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.investor-quote {
  background: linear-gradient(145deg, rgba(255,215,0,0.05), rgba(255,100,100,0.05));
  border-radius: 20px;
  padding: 25px;
  position: relative;
  margin-top: 20px;
}

.investor-quote i {
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2.5rem;
  color: var(--accent-color);
  opacity: 0.2;
}

.investor-quote p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 15px;
  font-style: italic;
}

.quote-author {
  color: var(--accent-color);
  font-weight: 600;
}

.team-card {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.team-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,215,0,0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--accent-color);
  flex-shrink: 0;
}

.team-info {
  flex: 1;
}

.team-count {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 12px;
}

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.team-members span {
  padding: 6px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  font-size: 0.85rem;
  color: var(--muted-text);
  transition: all 0.3s;
}

.team-members span:hover {
  background: rgba(255,215,0,0.1);
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.team-note {
  font-size: 0.9rem;
  color: var(--muted-text);
  font-style: italic;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  padding-top: 30px;
  border-top: 1px solid var(--border-color);
}

.project-status {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.status-badge {
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-badge.completed {
  background: rgba(255,215,0,0.15);
  color: var(--accent-color);
  border: 1px solid rgba(255,215,0,0.3);
}

.status-badge.legacy {
  background: rgba(255,255,255,0.05);
  color: var(--muted-text);
  border: 1px solid var(--border-color);
}

.btn-next-project {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 12px 30px;
  background: linear-gradient(145deg, rgba(255,215,0,0.1), rgba(255,215,0,0.05));
  border: 1px solid var(--accent-color);
  border-radius: 40px;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-next-project:hover {
  background: rgba(255,215,0,0.2);
  transform: translateX(-5px);
  gap: 20px;
}

/* RTL Support */
[dir="rtl"] .project-badge {
  right: auto;
  left: 30px;
}

[dir="rtl"] .image-caption {
  right: auto;
  left: 20px;
}

[dir="rtl"] .team-photo-caption {
  left: auto;
  right: 20px;
}

[dir="rtl"] .timeline-item {
  padding-right: 0;
  padding-left: 30px;
  border-right: none;
  border-left: 2px solid var(--border-color);
}

[dir="rtl"] .timeline-item::before {
  right: auto;
  left: -9px;
}

[dir="rtl"] .btn-next-project:hover {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .projects-page {
    padding: 100px 15px 60px;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .page-header p {
    font-size: 1.1rem;
  }

  .project-card {
    padding: 30px;
  }

  .project-badge {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    margin-bottom: 20px;
    display: inline-block;
  }

  .project-header {
    flex-direction: column;
    text-align: center;
  }

  .project-title-wrapper h2 {
    font-size: 2rem;
  }

  .project-image-container {
    height: 250px;
  }

  .team-photo-container {
    height: 280px; /* مكبرة في الموبايل برضه */
  }

  .achievement-card {
    flex-direction: column;
    text-align: center;
  }

  .team-card {
    flex-direction: column;
    text-align: center;
  }

  .team-members {
    justify-content: center;
  }

  .project-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-next-project {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .project-card {
    padding: 20px;
  }

  .project-icon-wrapper {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .project-title-wrapper h2 {
    font-size: 1.8rem;
  }

  .project-image-container {
    height: 200px;
  }

  .team-photo-container {
    height: 240px; /* مكبرة في الموبايل الصغير */
  }

  .image-caption,
  .team-photo-caption {
    bottom: 10px;
    right: 10px;
    left: 10px;
    font-size: 0.8rem;
    padding: 8px 15px;
  }
  
  .team-photo-section {
    padding: 20px;
  }
  
  .team-photo-note {
    font-size: 0.85rem;
    padding: 8px;
  }
}
</style>