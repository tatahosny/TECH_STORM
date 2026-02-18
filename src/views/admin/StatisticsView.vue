<!-- src/views/admin/StatisticsView.vue -->
<template>
  <div class="statistics-view">
    <div class="page-header">
      <h1>الإحصائيات</h1>
      <p>نظرة عامة على أداء الفريق</p>
    </div>

    <!-- إحصائيات سريعة -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-details">
          <h3>إجمالي الأعضاء</h3>
          <p class="stat-number">0</p>
          <span class="stat-label">عضو نشط</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="fas fa-tasks"></i>
        </div>
        <div class="stat-details">
          <h3>إجمالي المهام</h3>
          <p class="stat-number">0</p>
          <span class="stat-label">مهمة</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-details">
          <h3>المهام المكتملة</h3>
          <p class="stat-number">0</p>
          <span class="stat-label">بنسبة 0%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-details">
          <h3>مهام قيد التنفيذ</h3>
          <p class="stat-number">0</p>
          <span class="stat-label">مهمة</span>
        </div>
      </div>
    </div>

    <!-- قسم الأعضاء النشطين -->
    <div class="charts-grid">
      <div class="chart-card">
        <div class="card-header">
          <h2>أكثر الأعضاء تفاعلاً</h2>
          <router-link to="/admin/members" class="view-link">
            عرض الكل
            <i class="fas fa-arrow-left"></i>
          </router-link>
        </div>
        <div class="top-members">
          <div class="empty-state">
            <i class="fas fa-trophy"></i>
            <p>لا توجد بيانات كافية</p>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="card-header">
          <h2>توزيع المهام بالأقسام</h2>
        </div>
        <div class="department-stats">
          <div class="department-item">
            <div class="dept-info">
              <span class="dept-name">هاردوير</span>
              <span class="dept-count">0</span>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 0%"></div>
            </div>
          </div>
          <div class="department-item">
            <div class="dept-info">
              <span class="dept-name">سوفتوير</span>
              <span class="dept-count">0</span>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// هانضف الداتا بعدين من Firebase
</script>

<style scoped>
.statistics-view {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 28px;
  color: #0f172a;
  margin-bottom: 8px;
}

.page-header p {
  color: #64748b;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

.stat-icon.blue {
  background: #3b82f620;
  color: #3b82f6;
}

.stat-icon.green {
  background: #10b98120;
  color: #10b981;
}

.stat-icon.orange {
  background: #f9731620;
  color: #f97316;
}

.stat-icon.purple {
  background: #8b5cf620;
  color: #8b5cf6;
}

.stat-details h3 {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 500;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  line-height: 1;
}

.stat-label {
  color: #94a3b8;
  font-size: 12px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 18px;
  color: #0f172a;
  margin: 0;
}

.view-link {
  color: #3b82f6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #94a3b8;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 12px;
}

.department-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.department-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dept-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dept-name {
  color: #0f172a;
  font-weight: 500;
  font-size: 14px;
}

.dept-count {
  color: #64748b;
  font-size: 14px;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>