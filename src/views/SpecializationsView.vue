<template>
  <div class="specializations-page">
    <div class="container">
      <!-- الهيدر -->
      <div class="page-header">
        <h1>التخصصات <span class="gradient-text">التقنية</span></h1>
        <p class="page-subtitle">TECH STORM - الهيكل التنظيمي للمشروع</p>
      </div>

      <!-- ===== شجرة التوزيع ===== -->
      <div class="project-tree">
        <!-- المشروع الرئيسي -->
        <div class="root-node">
          <div class="root-content">
            <i class="fas fa-project-diagram"></i>
            <h2>المشروع الجديد ٢٠٢٦</h2>
            <span>فريق TECH STORM</span>
          </div>
        </div>

        <!-- خط رأسي -->
        <div class="vertical-line"></div>

        <!-- الفروع الرئيسية (هاردوير - سوفت وير) -->
        <div class="main-branches">
          <!-- فرع الهاردوير -->
          <div class="branch hardware-branch">
            <div class="branch-header">
              <div class="branch-icon">
                <i class="fas fa-microchip"></i>
              </div>
              <h3>هاردوير وإلكترونيات</h3>
              <span class="branch-desc">Hardware & Electronics</span>
            </div>

            <!-- تخصصات الهاردوير -->
            <div class="sub-branches">
              <div class="sub-branch">
                <i class="fas fa-bolt"></i>
                <span>أنظمة الطاقة</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-cogs"></i>
                <span>هياكل وميكانيكا</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-robot"></i>
                <span>تحكم وأتمتة</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-wifi"></i>
                <span>إنترنت الأشياء (IoT)</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-random"></i>
                <span>n8n - أتمتة</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-brain"></i>
                <span>AI Agents</span>
              </div>
            </div>
          </div>

          <!-- فرع السوفت وير -->
          <div class="branch software-branch">
            <div class="branch-header">
              <div class="branch-icon">
                <i class="fas fa-code"></i>
              </div>
              <h3>سوفت وير وبرمجيات</h3>
              <span class="branch-desc">Software & Development</span>
            </div>

            <!-- تخصصات السوفت وير -->
            <div class="sub-branches">
              <div class="sub-branch">
                <i class="fas fa-code"></i>
                <span>فرونت إند (Vue.js)</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-database"></i>
                <span>باك إند - قواعد بيانات</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-brain"></i>
                <span>ذكاء اصطناعي</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-paint-brush"></i>
                <span>تصميم UI/UX</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-mobile-alt"></i>
                <span>تطبيقات موبايل</span>
              </div>
              <div class="sub-branch">
                <i class="fas fa-cloud"></i>
                <span>Cloud & DevOps</span>
              </div>
            </div>
          </div>
        </div>

        <!-- خط أفقي بين الفروع -->
        <div class="horizontal-line"></div>

        <!-- الأقسام الداعمة -->
        <div class="support-branches">
          <!-- قسم القيادة -->
          <div class="support-node">
            <div class="support-header">
              <i class="fas fa-crown"></i>
              <h4>قيادة وإدارة</h4>
            </div>
            <div class="support-items">
              <span class="support-item">قيادة تقنية</span>
              <span class="support-item">إدارة فريق</span>
              <span class="support-item">تخطيط مشاريع</span>
            </div>
          </div>

          <!-- قسم التوثيق -->
          <div class="support-node">
            <div class="support-header">
              <i class="fas fa-file-alt"></i>
              <h4>توثيق وتحليل</h4>
            </div>
            <div class="support-items">
              <span class="support-item">تحليل وتقارير</span>
              <span class="support-item">بحث علمي</span>
              <span class="support-item">حلول مبتكرة</span>
              <span class="support-item">كتابة محتوى</span>
            </div>
          </div>

          <!-- قسم التصميم -->
          <div class="support-node">
            <div class="support-header">
              <i class="fas fa-paint-brush"></i>
              <h4>تصميم وهوية</h4>
            </div>
            <div class="support-items">
              <span class="support-item">جرافيك ديزاين</span>
              <span class="support-item">هوية بصرية</span>
              <span class="support-item">تصميم واجهات</span>
            </div>
          </div>
        </div>
      </div>

      <!-- خريطة التخصصات (كروت) -->
      <div class="specs-grid">
        <!-- 1. هاردوير وإلكترونيات -->
        <div class="spec-card hardware">
          <div class="spec-icon">
            <i class="fas fa-microchip"></i>
          </div>
          <h3>هاردوير وإلكترونيات</h3>
          <div class="spec-list">
            <span class="spec-tag"><i class="fas fa-bolt"></i> أنظمة الطاقة</span>
            <span class="spec-tag"><i class="fas fa-cogs"></i> هياكل وميكانيكا</span>
            <span class="spec-tag"><i class="fas fa-robot"></i> تحكم وأتمتة</span>
            <span class="spec-tag"><i class="fas fa-wifi"></i> IoT</span>
            <span class="spec-tag"><i class="fas fa-random"></i> n8n - أتمتة</span>
            <span class="spec-tag"><i class="fas fa-brain"></i> AI Agents</span>
          </div>
        </div>

        <!-- 2. سوفت وير وبرمجيات -->
        <div class="spec-card software">
          <div class="spec-icon">
            <i class="fas fa-code"></i>
          </div>
          <h3>سوفت وير وبرمجيات</h3>
          <div class="spec-list">
            <span class="spec-tag"><i class="fas fa-code"></i> فرونت إند (Vue.js)</span>
            <span class="spec-tag"><i class="fas fa-database"></i> باك إند</span>
            <span class="spec-tag"><i class="fas fa-brain"></i> ذكاء اصطناعي</span>
            <span class="spec-tag"><i class="fas fa-paint-brush"></i> UI/UX</span>
            <span class="spec-tag"><i class="fas fa-mobile-alt"></i> تطبيقات موبايل</span>
            <span class="spec-tag"><i class="fas fa-cloud"></i> Cloud & DevOps</span>
          </div>
        </div>

        <!-- 3. قيادة وإدارة -->
        <div class="spec-card leadership">
          <div class="spec-icon">
            <i class="fas fa-users-cog"></i>
          </div>
          <h3>قيادة وإدارة</h3>
          <div class="spec-list">
            <span class="spec-tag"><i class="fas fa-crown"></i> قيادة تقنية</span>
            <span class="spec-tag"><i class="fas fa-star"></i> إدارة فريق</span>
            <span class="spec-tag"><i class="fas fa-tasks"></i> تخطيط مشاريع</span>
          </div>
        </div>

        <!-- 4. توثيق وتحليل -->
        <div class="spec-card documentation">
          <div class="spec-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <h3>توثيق وتحليل</h3>
          <div class="spec-list">
            <span class="spec-tag"><i class="fas fa-chart-line"></i> تحليل وتقارير</span>
            <span class="spec-tag"><i class="fas fa-search"></i> بحث علمي</span>
            <span class="spec-tag"><i class="fas fa-lightbulb"></i> حلول مبتكرة</span>
            <span class="spec-tag"><i class="fas fa-pen-fancy"></i> كتابة محتوى</span>
          </div>
        </div>

        <!-- 5. تصميم وهوية بصرية -->
        <div class="spec-card design">
          <div class="spec-icon">
            <i class="fas fa-paint-brush"></i>
          </div>
          <h3>تصميم وهوية بصرية</h3>
          <div class="spec-list">
            <span class="spec-tag"><i class="fas fa-paint-brush"></i> جرافيك ديزاين</span>
            <span class="spec-tag"><i class="fas fa-palette"></i> هوية بصرية</span>
            <span class="spec-tag"><i class="fas fa-mobile-alt"></i> تصميم واجهات</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecializationsView'
}
</script>

<style scoped>
.specializations-page {
  padding: 120px 20px 80px;
  min-height: 100vh;
  background: var(--primary-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== الهيدر ===== */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 3.5rem;
  margin-bottom: 15px;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.page-subtitle {
  font-size: 1.3rem;
  color: var(--muted-text);
}

/* ===== شجرة المشروع ===== */
.project-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  position: relative;
}

/* العقدة الجذرية (المشروع) */
.root-node {
  margin-bottom: 20px;
}

.root-content {
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  padding: 25px 50px;
  border-radius: 60px;
  text-align: center;
  color: var(--primary-color);
  box-shadow: 0 20px 40px rgba(255,215,0,0.3);
  border: 2px solid rgba(255,255,255,0.2);
}

.root-content i {
  font-size: 3rem;
  margin-bottom: 10px;
}

.root-content h2 {
  font-size: 2rem;
  margin-bottom: 5px;
  font-weight: 800;
}

.root-content span {
  font-size: 1rem;
  opacity: 0.9;
}

/* الخطوط */
.vertical-line {
  width: 3px;
  height: 50px;
  background: linear-gradient(to bottom, var(--accent-color), var(--border-color));
  margin-bottom: 20px;
}

.horizontal-line {
  width: 80%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  margin: 40px 0;
}

/* الفروع الرئيسية */
.main-branches {
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
}

.branch {
  flex: 1;
  min-width: 300px;
  background: var(--card-bg);
  border-radius: 30px;
  padding: 30px;
  position: relative;
}

.branch::before {
  content: '';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 30px;
  background: var(--accent-color);
}

.hardware-branch {
  border: 2px solid #64ffda;
  background: linear-gradient(145deg, var(--card-bg), rgba(100,255,218,0.05));
}

.software-branch {
  border: 2px solid var(--accent-color);
  background: linear-gradient(145deg, var(--card-bg), rgba(255,215,0,0.05));
}

.branch-header {
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.branch-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--primary-color);
  margin: 0 auto 15px;
}

.hardware-branch .branch-icon {
  background: linear-gradient(145deg, #64ffda, #00bfa5);
}

.branch-header h3 {
  font-size: 1.6rem;
  margin-bottom: 5px;
}

.branch-desc {
  color: var(--muted-text);
  font-size: 0.9rem;
}

.sub-branches {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.sub-branch {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  transition: all 0.3s;
}

.sub-branch:hover {
  border-color: var(--accent-color);
  background: rgba(255,215,0,0.05);
  transform: translateY(-3px);
}

.sub-branch i {
  color: var(--accent-color);
  font-size: 1.1rem;
  width: 24px;
}

.hardware-branch .sub-branch i {
  color: #64ffda;
}

.sub-branch span {
  font-size: 0.9rem;
  color: var(--text-color);
}

/* الأقسام الداعمة */
.support-branches {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 20px;
}

.support-node {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 25px;
  text-align: center;
}

.support-header {
  margin-bottom: 20px;
}

.support-header i {
  font-size: 2rem;
  color: var(--accent-color);
  margin-bottom: 10px;
}

.support-header h4 {
  font-size: 1.2rem;
  color: var(--text-color);
}

.support-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.support-item {
  padding: 8px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  font-size: 0.85rem;
  color: var(--muted-text);
}

/* ===== كروت التخصصات ===== */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.spec-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 30px;
  transition: all 0.4s;
}

.spec-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-color);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.spec-card.hardware:hover {
  border-color: #64ffda;
}

.spec-card.software:hover {
  border-color: var(--accent-color);
}

.spec-card.leadership:hover {
  border-color: #ffaa00;
}

.spec-card.documentation:hover {
  border-color: #ff6464;
}

.spec-card.design:hover {
  border-color: #ff6b9d;
}

.spec-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,215,0,0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--accent-color);
  margin-bottom: 20px;
}

.spec-card.hardware .spec-icon {
  color: #64ffda;
  background: rgba(100,255,218,0.1);
}

.spec-card.software .spec-icon {
  color: var(--accent-color);
  background: rgba(255,215,0,0.1);
}

.spec-card.leadership .spec-icon {
  color: #ffaa00;
  background: rgba(255,170,0,0.1);
}

.spec-card.documentation .spec-icon {
  color: #ff6464;
  background: rgba(255,100,100,0.1);
}

.spec-card.design .spec-icon {
  color: #ff6b9d;
  background: rgba(255,107,157,0.1);
}

.spec-card h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: var(--text-color);
}

.spec-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  font-size: 0.9rem;
  color: var(--muted-text);
}

.spec-tag i {
  width: 20px;
  color: var(--accent-color);
}

.spec-card.hardware .spec-tag i {
  color: #64ffda;
}

.spec-card.software .spec-tag i {
  color: var(--accent-color);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .root-content {
    padding: 20px 30px;
  }

  .root-content h2 {
    font-size: 1.5rem;
  }

  .main-branches {
    flex-direction: column;
  }

  .branch {
    width: 100%;
  }

  .branch::before {
    display: none;
  }

  .sub-branches {
    grid-template-columns: 1fr;
  }

  .support-branches {
    grid-template-columns: 1fr;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .root-content {
    padding: 15px 20px;
  }

  .root-content i {
    font-size: 2rem;
  }

  .root-content h2 {
    font-size: 1.2rem;
  }

  .branch-header h3 {
    font-size: 1.3rem;
  }
}
</style>