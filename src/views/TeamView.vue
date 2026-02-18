<template>
  <div class="team-page">
    <div class="container">
      <!-- الهيدر -->
      <div class="page-header">
        <h1>فريق <span class="gradient-text">TECH STORM</span></h1>
        <p class="page-subtitle">14 طالب .. روح واحدة .. هدف واحد</p>
        <div class="header-badge">
          <span class="team-badge">👥 الموسم الجديد ٢٠٢٦</span>
        </div>
      </div>

      <!-- إحصائيات سريعة -->
      <div class="team-stats">
        <div class="stat-item">
          <span class="stat-number">13</span>
          <span class="stat-label">عضو</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">6</span>
          <span class="stat-label">أقسام</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">5</span>
          <span class="stat-label">شهور</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">1</span>
          <span class="stat-label">فريق</span>
        </div>
      </div>
      
      <!-- شبكة الأعضاء -->
      <div class="team-grid">
        <!-- 1- مصطفى حسنى - قائد الفريق -->
        <div class="member-card leader">
          <div class="member-badge">
            <i class="fas fa-crown"></i>
            <span>قائد الفريق</span>
          </div>
          <div class="member-avatar">
            <i class="fas fa-microchip"></i>
          </div>
          <div class="member-info">
            <h3>مصطفى حسنى</h3>
            <p class="role-leader">⚡ قائد الفريق</p>
            <p class="specialization">FULL STACK - ادارة الهارد وير كامل</p>
            <div class="member-tags">
              <span>قيادة</span>
              <span>تطوير</span>
              <span>تكامل</span>
            </div>
            <p class="member-desc">مسؤول عن الرؤية التقنية وتكامل المشروع</p>
          </div>
        </div>

        <!-- 2- مرام محمد عباس - نائب القائد -->
        <div class="member-card vice-leader">
          <div class="member-badge vice">
            <i class="fas fa-star"></i>
            <span>نائب القائد</span>
          </div>
          <div class="member-avatar">
            <i class="fas fa-users-cog"></i>
          </div>
          <div class="member-info">
            <h3>مرام محمد عباس</h3>
            <p class="role-vice">⭐ نائب القائد</p>
            <p class="specialization">إدارة المشاريع - تنسيق</p>
            <div class="member-tags">
              <span>إدارة</span>
              <span>تنسيق</span>
              <span>قيادة</span>
            </div>
            <p class="member-desc">مسؤولة عن إدارة الفريق وتنسيق المهام</p>
          </div>
        </div>

        <!-- 3- عبد المجيد صابر - مسؤول السوفت وير -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-database"></i>
          </div>
          <div class="member-info">
            <h3>عبد المجيد صابر</h3>
            <p class="role">🖥️ مسؤول السوفت وير</p>
            <p class="specialization">Backend - ذكاء اصطناعي</p>
            <div class="member-tags">
              <span>Backend</span>
              <span>AI</span>
              <span>Database</span>
            </div>
            <p class="member-desc">تطوير أنظمة الذكاء الاصطناعي ومعالجة البيانات</p>
          </div>
        </div>

       <!-- 4- عادل محمد - هارد وير كهرباء -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="member-info">
            <h3>عادل محمد</h3>
            <p class="role">⚡ أتمتة وهاردوير</p>
            <p class="specialization">Automation - AI Agents - n8n</p>
            <div class="member-tags">
              <span>Automation</span>
              <span>AI Agents</span>
              <span>n8n</span>
              <span>IoT</span>
            </div>
            <p class="member-desc">متخصص في أتمتة سير العمل، تصميم أنظمة الطاقة، وربط الذكاء الاصطناعي مع n8n</p>
          </div>
        </div>

        <!-- 5- محمود يوسف - هارد وير هيكل وكهرباء -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-cogs"></i>
          </div>
          <div class="member-info">
            <h3>محمود يوسف</h3>
            <p class="role">🔧 هاردوير ميكانيكا</p>
            <p class="specialization">هياكل - تصميم ميكانيكي</p>
            <div class="member-tags">
              <span>Structure</span>
              <span>Mechanics</span>
              <span>Design</span>
            </div>
            <p class="member-desc">تصميم الهياكل الميكانيكية والأنظمة الحركية</p>
          </div>
        </div>

        <!-- 6- محمد مجدى - هارد وير -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-microchip"></i>
          </div>
          <div class="member-info">
            <h3>محمد مجدى</h3>
            <p class="role">🔌 هاردوير</p>
            <p class="specialization">إلكترونيات - استشعار</p>
            <div class="member-tags">
              <span>Sensors</span>
              <span>Circuits</span>
              <span>IoT</span>
            </div>
            <p class="member-desc">تطوير الدوائر الإلكترونية وأنظمة الاستشعار</p>
          </div>
        </div>

        <!-- 7- شهاب محمد - هارد وير -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="member-info">
            <h3>شهاب محمد</h3>
            <p class="role">🤖 هاردوير</p>
            <p class="specialization">تحكم - أتمتة</p>
            <div class="member-tags">
              <span>Control</span>
              <span>Automation</span>
              <span>Motors</span>
            </div>
            <p class="member-desc">أنظمة التحكم والأتمتة والمحركات</p>
          </div>
        </div>

        <!-- 8- عبد الرحمن طلعت - فرونت إند -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-code"></i>
          </div>
          <div class="member-info">
            <h3>عبد الرحمن طلعت</h3>
            <p class="role">🎨 فرونت إند</p>
            <p class="specialization">Vue.js - UI/UX</p>
            <div class="member-tags">
              <span>Vue.js</span>
              <span>CSS</span>
              <span>UI/UX</span>
            </div>
            <p class="member-desc">تطوير واجهات المستخدم وتجربة المستخدم</p>
          </div>
        </div>

        <!-- 9- سما ولاء ثروت - تقارير وحلول مبتكرة -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="member-info">
            <h3>سما ولاء ثروت</h3>
            <p class="role">📊 تقارير وحلول مبتكرة</p>
            <p class="specialization">تحليل - توثيق</p>
            <div class="member-tags">
              <span>Reports</span>
              <span>Analysis</span>
              <span>Innovation</span>
            </div>
            <p class="member-desc">إعداد التقارير واقتراح الحلول المبتكرة</p>
          </div>
        </div>

        <!-- 10- روان محمود - تصميمات -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-paint-brush"></i>
          </div>
          <div class="member-info">
            <h3>روان محمود</h3>
            <p class="role">🎨 تصميمات</p>
            <p class="specialization">UI/UX - جرافيك</p>
            <div class="member-tags">
              <span>Graphic</span>
              <span>UI Design</span>
              <span>Branding</span>
            </div>
            <p class="member-desc">تصميم الهوية البصرية وواجهات المستخدم</p>
          </div>
        </div>

        <!-- 11- تسنيم - تقارير وحلول مبتكرة -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="member-info">
            <h3>تسنيم</h3>
            <p class="role">📋 تقارير وحلول مبتكرة</p>
            <p class="specialization">توثيق - بحث</p>
            <div class="member-tags">
              <span>Documentation</span>
              <span>Research</span>
              <span>Solutions</span>
            </div>
            <p class="member-desc">توثيق المشروع والبحث العلمي</p>
          </div>
        </div>

        <!-- 12- هنا - تقارير وكتابة -->
        <div class="member-card">
          <div class="member-avatar">
            <i class="fas fa-pen-fancy"></i>
          </div>
          <div class="member-info">
            <h3>هنا</h3>
            <p class="role">✍️ تقارير وكتابة</p>
            <p class="specialization">محتوى - توثيق</p>
            <div class="member-tags">
              <span>Content</span>
              <span>Writing</span>
              <span>Reports</span>
            </div>
            <p class="member-desc">كتابة المحتوى والتقارير التوثيقية</p>
          </div>
        </div>

        <!-- 13- عبدلله مدحت - هارد وير (تحت التدريب) -->
        <div class="member-card trainee">
          <div class="member-badge trainee-badge">
            <i class="fas fa-graduation-cap"></i>
            <span>تحت التدريب</span>
          </div>
          <div class="member-avatar">
            <i class="fas fa-microchip"></i>
          </div>
          <div class="member-info">
            <h3>عبدلله مدحت</h3>
            <p class="role-trainee">📘 هاردوير - متدرب</p>
            <p class="specialization">إلكترونيات - تعلم</p>
            <div class="member-tags">
              <span>Hardware</span>
              <span>Training</span>
              <span>Junior</span>
            </div>
            <p class="member-desc">يتدرب على أنظمة الهاردوير والإلكترونيات</p>
          </div>
        </div>
      </div>

      <!-- دعوة للانضمام -->
      <div class="join-section">
        <div class="join-card">
          <div class="join-icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="join-text">
            <h3>عاوز تبقى جزء من الفريق؟</h3>
            <p>بنستقبل أعضاء جدد في بداية كل فصل دراسي</p>
          </div>
          <router-link to="/apply" class="btn-join">
            قدم دلوقتي <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamView'
}
</script>

<style scoped>
.team-page {
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
  margin-bottom: 40px;
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
  margin-bottom: 20px;
}

.header-badge {
  display: inline-block;
  padding: 8px 25px;
  background: rgba(255,215,0,0.1);
  border-radius: 40px;
  border: 1px solid rgba(255,215,0,0.3);
}

.team-badge {
  color: var(--accent-color);
  font-weight: 600;
  font-size: 1rem;
}

/* ===== إحصائيات سريعة ===== */
.team-stats {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 60px;
  padding: 30px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 40px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent-color);
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  color: var(--muted-text);
}

/* ===== شبكة الأعضاء ===== */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.member-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 30px;
  position: relative;
  transition: all 0.4s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.member-card:hover {
  transform: translateY(-10px);
  border-color: var(--accent-color);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* بطاقة القائد */
.member-card.leader {
  border: 2px solid var(--accent-color);
  background: linear-gradient(145deg, var(--card-bg), rgba(255,215,0,0.05));
}

/* بطاقة نائب القائد */
.member-card.vice-leader {
  border: 2px solid #ffaa00;
  background: linear-gradient(145deg, var(--card-bg), rgba(255,170,0,0.05));
}

/* بطاقة المتدرب */
.member-card.trainee {
  border: 2px dashed #64ffda;
  opacity: 0.9;
}

.member-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 15px rgba(255,215,0,0.3);
}

.member-badge.vice {
  background: linear-gradient(145deg, #ffaa00, #ff8800);
}

.trainee-badge {
  background: linear-gradient(145deg, #64ffda, #00bfa5);
  color: #000;
}

.member-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(145deg, rgba(255,215,0,0.2), rgba(255,215,0,0.05));
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--accent-color);
  margin: 20px auto 20px;
  border: 1px solid rgba(255,215,0,0.3);
}

.member-info h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.role {
  color: var(--accent-color);
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 0.95rem;
}

.role-leader {
  color: var(--accent-color);
  font-weight: 800;
  margin-bottom: 5px;
  font-size: 1rem;
  text-shadow: 0 0 10px rgba(255,215,0,0.3);
}

.role-vice {
  color: #ffaa00;
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 0.95rem;
}

.role-trainee {
  color: #64ffda;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 0.95rem;
}

.specialization {
  color: var(--muted-text);
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 15px;
}

.member-tags span {
  padding: 4px 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  font-size: 0.75rem;
  color: var(--muted-text);
}

.member-desc {
  font-size: 0.9rem;
  color: var(--muted-text);
  line-height: 1.6;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-color);
}

/* ===== دعوة للانضمام ===== */
.join-section {
  margin-top: 40px;
}

.join-card {
  background: linear-gradient(145deg, rgba(255,215,0,0.1), rgba(0,0,0,0.3));
  border: 1px solid var(--accent-color);
  border-radius: 40px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

@media (max-width: 768px) {
  .join-card {
    flex-direction: column;
    text-align: center;
  }
}

.join-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--primary-color);
}

.join-text {
  flex: 1;
}

.join-text h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: var(--text-color);
}

.join-text p {
  font-size: 1.1rem;
  color: var(--muted-text);
}

.btn-join {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 14px 32px;
  background: linear-gradient(145deg, var(--accent-color), #ffaa00);
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50px;
  transition: all 0.3s;
  border: none;
  box-shadow: 0 8px 20px rgba(255,215,0,0.3);
}

.btn-join:hover {
  transform: translateY(-3px) translateX(-5px);
  box-shadow: 0 15px 30px rgba(255,215,0,0.4);
  gap: 20px;
}

/* ===== RTL ===== */
[dir="rtl"] .member-badge {
  right: auto;
  left: 20px;
}

[dir="rtl"] .btn-join:hover {
  transform: translateY(-3px) translateX(5px);
}

[dir="rtl"] .btn-join i {
  transform: rotate(180deg);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .team-page {
    padding: 100px 15px 60px;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .team-stats {
    gap: 20px;
    padding: 20px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .join-card {
    padding: 30px;
  }

  .join-text h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .team-stats {
    flex-direction: column;
    gap: 15px;
  }

  .member-card {
    padding: 25px;
  }

  .member-avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .btn-join {
    width: 100%;
    justify-content: center;
  }
}
</style>