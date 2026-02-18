<template>
  <div class="admin-page">
    <!-- خلفية فضائية ذهبية -->
    <div class="space-bg">
      <div class="stars"></div>
      <div class="twinkling-stars"></div>
      <div class="gradient-sphere sphere-1"></div>
      <div class="gradient-sphere sphere-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Header -->
    <div class="page-header">
      <div class="header-title">
        <h1>
          <i class="fas fa-users-crown"></i>
          أعضاء الفريق
        </h1>
        <p>جميع أعضاء TECH STORM - إدارة متكاملة للبيانات والصلاحيات</p>
      </div>
      
      <div class="header-actions">
        <div class="stats-bundle">
          <div class="stats-badge total">
            <span class="stat-number">{{ memberStats.total }}</span>
            <span>إجمالي الأعضاء</span>
          </div>
          <div class="stats-badge leaders">
            <span class="stat-number">{{ memberStats.leaders }}</span>
            <span>👑 قادة</span>
          </div>
          <div class="stats-badge vice">
            <span class="stat-number">{{ memberStats.viceLeaders }}</span>
            <span>⚡ نواب</span>
          </div>
          <div class="stats-badge members">
            <span class="stat-number">{{ memberStats.members }}</span>
            <span>👤 أعضاء</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="admin-tabs">
      <router-link to="/admin/applicants" class="tab">
        <i class="fas fa-clock"></i>
        <span>⏳ قيد المراجعة</span>
        <span class="tab-badge">{{ pendingCount }}</span>
      </router-link>
      <router-link to="/admin/accepted" class="tab active">
        <i class="fas fa-users"></i>
        <span>👥 أعضاء الفريق</span>
        <span class="tab-badge">{{ memberStats.total }}</span>
      </router-link>
      <router-link to="/admin/rejected" class="tab">
        <i class="fas fa-history"></i>
        <span>📋 الطلبات المرفوضة</span>
        <span class="tab-badge">{{ rejectedCount }}</span>
      </router-link>
    </div>

    <!-- Advanced Filters -->
    <div class="filters-advanced">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="🔍 بحث بالاسم، البريد، الهاتف، الرقم الأكاديمي..."
        />
      </div>
      
      <div class="filter-group">
        <select v-model="departmentFilter" class="filter-select">
          <option value="all">🏢 جميع الأقسام</option>
          <option value="hardware">🖥️ هاردوير</option>
          <option value="software">📱 سوفتوير</option>
          <option value="ui_ux">🎨 UI/UX</option>
          <option value="content">📝 محتوى</option>
        </select>

        <select v-model="roleFilter" class="filter-select">
          <option value="all">👥 جميع الصلاحيات</option>
          <option value="team_leader">👑 قائد فريق</option>
          <option value="deputy_leader">⚡ نائب قائد</option>
          <option value="section_leader">👑 رئيس قسم</option>
          <option value="member">👤 عضو</option>
        </select>

        <select v-model="subDepartmentFilter" class="filter-select">
          <option value="all">📁 جميع الفروع</option>
          <!-- Hardware Branches -->
          <optgroup label="🖥️ هاردوير" v-if="departmentFilter === 'all' || departmentFilter === 'hardware'">
            <option value="electronics">⚡ إلكترونيات</option>
            <option value="components">🔧 مكونات</option>
            <option value="structure">🏗️ هيكل</option>
            <option value="design">🎨 تصميم</option>
          </optgroup>
          <!-- Software Branches -->
          <optgroup label="📱 سوفتوير" v-if="departmentFilter === 'all' || departmentFilter === 'software'">
            <option value="frontend">🌐 فرونت إند</option>
            <option value="backend">⚙️ باك إند</option>
            <option value="mobile">📱 موبايل</option>
            <option value="fullstack">🚀 فول ستاك</option>
          </optgroup>
          <!-- UI/UX Branches -->
          <optgroup label="🎨 UI/UX" v-if="departmentFilter === 'all' || departmentFilter === 'ui_ux'">
            <option value="ui_design">🎨 تصميم واجهات</option>
            <option value="ux_research">🔍 بحث تجربة</option>
            <option value="prototyping">📱 نمذجة</option>
            <option value="graphics">🖼️ رسومات</option>
          </optgroup>
          <!-- Content Branches -->
          <optgroup label="📝 محتوى" v-if="departmentFilter === 'all' || departmentFilter === 'content'">
            <option value="presentation">📊 عروض</option>
            <option value="content_writing">✍️ كتابة</option>
            <option value="documentation">📚 توثيق</option>
            <option value="media">🎥 ميديا</option>
          </optgroup>
        </select>
      </div>
    </div>

    <!-- Department Stats Cards -->
    <div class="department-stats">
      <div class="dept-card hardware">
        <div class="dept-icon">
          <i class="fas fa-microchip"></i>
        </div>
        <div class="dept-info">
          <h3>هاردوير</h3>
          <div class="dept-counts">
            <span class="count">{{ hardwareStats.total }} عضو</span>
            <span class="branch-count">⚡ {{ hardwareStats.electronics }} إلكترونيات</span>
            <span class="branch-count">🔧 {{ hardwareStats.components }} مكونات</span>
            <span class="branch-count">🏗️ {{ hardwareStats.structure }} هيكل</span>
            <span class="branch-count">🎨 {{ hardwareStats.design }} تصميم</span>
          </div>
        </div>
      </div>
      
      <div class="dept-card software">
        <div class="dept-icon">
          <i class="fas fa-code"></i>
        </div>
        <div class="dept-info">
          <h3>سوفتوير</h3>
          <div class="dept-counts">
            <span class="count">{{ softwareStats.total }} عضو</span>
            <span class="branch-count">🌐 {{ softwareStats.frontend }} فرونت إند</span>
            <span class="branch-count">⚙️ {{ softwareStats.backend }} باك إند</span>
            <span class="branch-count">📱 {{ softwareStats.mobile }} موبايل</span>
            <span class="branch-count">🚀 {{ softwareStats.fullstack }} فول ستاك</span>
          </div>
        </div>
      </div>

      <div class="dept-card uiux">
        <div class="dept-icon">
          <i class="fas fa-paint-brush"></i>
        </div>
        <div class="dept-info">
          <h3>UI/UX</h3>
          <div class="dept-counts">
            <span class="count">{{ uiuxStats.total }} عضو</span>
            <span class="branch-count">🎨 {{ uiuxStats.ui_design }} تصميم واجهات</span>
            <span class="branch-count">🔍 {{ uiuxStats.ux_research }} بحث تجربة</span>
            <span class="branch-count">📱 {{ uiuxStats.prototyping }} نمذجة</span>
            <span class="branch-count">🖼️ {{ uiuxStats.graphics }} رسومات</span>
          </div>
        </div>
      </div>

      <div class="dept-card content">
        <div class="dept-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="dept-info">
          <h3>محتوى</h3>
          <div class="dept-counts">
            <span class="count">{{ contentStats.total }} عضو</span>
            <span class="branch-count">📊 {{ contentStats.presentation }} عروض</span>
            <span class="branch-count">✍️ {{ contentStats.content_writing }} كتابة</span>
            <span class="branch-count">📚 {{ contentStats.documentation }} توثيق</span>
            <span class="branch-count">🎥 {{ contentStats.media }} ميديا</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>جاري تحميل بيانات الأعضاء...</p>
    </div>

    <!-- Members Grid -->
    <div v-else-if="filteredMembers.length" class="members-grid">
      <div v-for="member in filteredMembers" :key="member.id" class="member-card">
        <!-- Card Header with Avatar -->
        <div class="member-card-header" :class="member.role">
          <div class="member-avatar-large" :style="{ backgroundColor: getAvatarColor(member.name) }">
            {{ getUserInitials(member.name) }}
          </div>
          <div class="member-title">
            <h3>{{ member.name }}</h3>
            <span :class="['role-badge-large', member.role]">
              {{ getRoleName(member.role) }}
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="member-card-body">
          <!-- Contact Info -->
          <div class="info-section">
            <h4>📞 معلومات الاتصال</h4>
            <div class="info-grid">
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <span>{{ member.email }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <span dir="ltr">{{ member.phone }}</span>
              </div>
              <div class="info-item">
                <i class="fab fa-whatsapp"></i>
                <span dir="ltr">{{ member.whatsapp || 'غير متوفر' }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-id-card"></i>
                <span dir="ltr">{{ member.academic_number }}</span>
              </div>
            </div>
          </div>

          <!-- Department & Role -->
          <div class="info-section">
            <h4>🏢 القسم والفرع</h4>
            <div class="dept-display">
              <div class="dept-badge" :class="member.section?.type || 'unknown'">
                <i :class="getDepartmentIcon(member.section?.type)"></i>
                {{ member.section?.name || 'بدون قسم' }}
              </div>
              <div class="subdept-badge" v-if="getProcessedSubSections(member.sub_sections).length">
                <i :class="getSubDepartmentIcon(getProcessedSubSections(member.sub_sections)[0])"></i>
                {{ getSubName(getProcessedSubSections(member.sub_sections)[0]) }}
                <span v-if="getProcessedSubSections(member.sub_sections).length > 1" class="more-badge">
                  +{{ getProcessedSubSections(member.sub_sections).length - 1 }}
                </span>
              </div>
              <div class="subdept-badge" v-else>
                <i class="fas fa-minus-circle"></i>
                بدون فرع
              </div>
            </div>
          </div>

          <!-- Account Info -->
          <div class="info-section credentials">
            <h4>🔐 بيانات الحساب</h4>
            <div class="credentials-box">
              <div class="cred-row">
                <span class="cred-label">📧 البريد:</span>
                <span class="cred-value">{{ member.email }}</span>
                <button @click="copyToClipboard(member.email)" class="btn-copy-tiny">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
              <div class="cred-row">
                <span class="cred-label">🔑 كلمة المرور:</span>
                <span class="cred-value password-text">••••••••</span>
                <button @click="changePassword(member)" class="btn-copy-tiny">
                  <i class="fas fa-key"></i>
                </button>
              </div>
              <div class="cred-row">
                <span class="cred-label">📅 تاريخ الانضمام:</span>
                <span class="cred-value">{{ formatDate(member.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="info-section">
            <h4>📊 الإحصائيات</h4>
            <div class="stats-mini">
              <div class="stat-mini-item">
                <span class="stat-mini-label">مهام مكتملة</span>
                <span class="stat-mini-value">{{ member.completed_tasks || 0 }}</span>
              </div>
              <div class="stat-mini-item">
                <span class="stat-mini-label">مهام جارية</span>
                <span class="stat-mini-value">{{ member.pending_tasks || 0 }}</span>
              </div>
              <div class="stat-mini-item">
                <span class="stat-mini-label">نقاط</span>
                <span class="stat-mini-value">{{ member.total_points || 0 }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="member-card-footer">
          <button @click="showFullCredentials(member)" class="btn-credentials">
            <i class="fas fa-key"></i>
            عرض بيانات الدخول
          </button>
          <button @click="editMember(member)" class="btn-edit">
            <i class="fas fa-edit"></i>
            تعديل
          </button>
          <button @click="toggleStatus(member)" class="btn-toggle" :class="{ inactive: member.status !== 'active' }">
            <i :class="member.status === 'active' ? 'fas fa-ban' : 'fas fa-check-circle'"></i>
            {{ member.status === 'active' ? 'تعطيل' : 'تفعيل' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <i class="fas fa-users-slash"></i>
      <h3>لا يوجد أعضاء في الفريق</h3>
      <p>لم يتم قبول أي عضو حتى الآن</p>
      <router-link to="/admin/applicants" class="btn-primary">
        عرض طلبات الانضمام
      </router-link>
    </div>

    <!-- ===== Full Credentials Modal ===== -->
    <div v-if="showCredentialsModal" class="modal-overlay" @click.self="closeCredentialsModal">
      <div class="modal-content credentials-modal">
        <div class="modal-header gold">
          <h2>🔐 بيانات تسجيل الدخول الكاملة</h2>
          <button @click="closeCredentialsModal" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="credentials-card-gold" v-if="selectedMember">
            <!-- Member Header -->
            <div class="member-header-premium">
              <div class="member-avatar-premium" :style="{ backgroundColor: getAvatarColor(selectedMember.name) }">
                {{ getUserInitials(selectedMember.name) }}
              </div>
              <div class="member-info-premium">
                <h2>{{ selectedMember.name }}</h2>
                <span :class="['role-badge-premium', selectedMember.role]">
                  {{ getRoleName(selectedMember.role) }}
                </span>
              </div>
            </div>

            <!-- Credentials Grid -->
            <div class="credentials-grid-premium">
              <!-- Personal Info -->
              <div class="cred-section">
                <h3>📋 المعلومات الشخصية</h3>
                <div class="cred-list">
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-user"></i></span>
                    <span class="cred-label">الاسم الكامل</span>
                    <span class="cred-value">{{ selectedMember.name }}</span>
                    <button @click="copyToClipboard(selectedMember.name)" class="btn-copy-gold">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-id-card"></i></span>
                    <span class="cred-label">الرقم الأكاديمي</span>
                    <span class="cred-value" dir="ltr">{{ selectedMember.academic_number }}</span>
                    <button @click="copyToClipboard(selectedMember.academic_number)" class="btn-copy-gold">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-phone"></i></span>
                    <span class="cred-label">رقم الهاتف</span>
                    <span class="cred-value" dir="ltr">{{ selectedMember.phone }}</span>
                    <button @click="copyToClipboard(selectedMember.phone)" class="btn-copy-gold">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fab fa-whatsapp"></i></span>
                    <span class="cred-label">الواتساب</span>
                    <span class="cred-value" dir="ltr">{{ selectedMember.whatsapp || 'غير متوفر' }}</span>
                    <button @click="copyToClipboard(selectedMember.whatsapp)" class="btn-copy-gold">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Account Credentials -->
              <div class="cred-section highlight">
                <h3>🔐 بيانات الحساب</h3>
                <div class="cred-list">
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-envelope"></i></span>
                    <span class="cred-label">البريد الإلكتروني</span>
                    <div class="cred-value-with-copy">
                      <span class="cred-value">{{ selectedMember.email }}</span>
                      <button @click="copyToClipboard(selectedMember.email)" class="btn-copy-gold">
                        <i class="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div class="cred-item password-item">
                    <span class="cred-icon"><i class="fas fa-key"></i></span>
                    <span class="cred-label">كلمة المرور</span>
                    <div class="cred-value-with-copy">
                      <span class="cred-value password-field">••••••••</span>
                      <button @click="changePassword(selectedMember)" class="btn-copy-gold">
                        <i class="fas fa-key"></i>
                      </button>
                    </div>
                  </div>
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-calendar"></i></span>
                    <span class="cred-label">تاريخ الانضمام</span>
                    <span class="cred-value">{{ formatDate(selectedMember.created_at) }}</span>
                  </div>
                </div>
              </div>

              <!-- Department & Role -->
              <div class="cred-section">
                <h3>🏢 القسم والصلاحية</h3>
                <div class="cred-list">
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-crown"></i></span>
                    <span class="cred-label">الصلاحية</span>
                    <span :class="['role-badge-cred', selectedMember.role]">
                      {{ getRoleName(selectedMember.role) }}
                    </span>
                  </div>
                  <div class="cred-item">
                    <span class="cred-icon"><i class="fas fa-sitemap"></i></span>
                    <span class="cred-label">القسم</span>
                    <span class="cred-value">{{ selectedMember.section?.name || 'بدون قسم' }}</span>
                  </div>
                  <div class="cred-item" v-if="getProcessedSubSections(selectedMember.sub_sections).length">
                    <span class="cred-icon"><i :class="getSubDepartmentIcon(getProcessedSubSections(selectedMember.sub_sections)[0])"></i></span>
                    <span class="cred-label">الفروع</span>
                    <span class="cred-value">{{ getSubSectionsText(selectedMember.sub_sections) }}</span>
                  </div>
                </div>
              </div>

              <!-- Statistics -->
              <div class="cred-section">
                <h3>📊 الإحصائيات</h3>
                <div class="stats-grid-mini">
                  <div class="stat-box">
                    <span class="stat-number">{{ selectedMember.completed_tasks || 0 }}</span>
                    <span class="stat-label">مهام مكتملة</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ selectedMember.pending_tasks || 0 }}</span>
                    <span class="stat-label">مهام جارية</span>
                  </div>
                  <div class="stat-box">
                    <span class="stat-number">{{ selectedMember.total_points || 0 }}</span>
                    <span class="stat-label">نقاط</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Warning & Actions -->
            <div class="credentials-footer">
              <div class="warning-premium">
                <i class="fas fa-shield-alt"></i>
                <p>هذه بيانات سرية للغاية - يمنع مشاركتها مع أي شخص</p>
              </div>
              
              <div class="action-buttons">
                <button @click="copyAllCredentials(selectedMember)" class="btn-copy-all">
                  <i class="fas fa-copy"></i>
                  نسخ جميع البيانات
                </button>
                <button @click="closeCredentialsModal" class="btn-close-gold">
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
      <div class="modal-content edit-modal">
        <div class="modal-header gold">
          <h2><i class="fas fa-edit"></i> تعديل بيانات العضو</h2>
          <button @click="closeEditModal" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body" v-if="selectedMember">
          <form @submit.prevent="saveMember">
            <div class="form-section">
              <h3>المعلومات الأساسية</h3>
              <div class="form-group">
                <label>الاسم</label>
                <input type="text" v-model="editForm.name" required>
              </div>
              <div class="form-group">
                <label>البريد الإلكتروني</label>
                <input type="email" v-model="editForm.email" required>
              </div>
              <div class="form-group">
                <label>الرقم الأكاديمي</label>
                <input type="text" v-model="editForm.academic_number" required>
              </div>
            </div>

            <div class="form-section">
              <h3>معلومات التواصل</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input type="text" v-model="editForm.phone" required dir="ltr">
                </div>
                <div class="form-group">
                  <label>رقم الواتساب</label>
                  <input type="text" v-model="editForm.whatsapp" required dir="ltr">
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>القسم والدور</h3>
              <div class="form-group">
                <label>القسم الرئيسي</label>
                <select v-model="editForm.section_id" required @change="onSectionChange">
                  <option value="">-- اختر القسم --</option>
                  <option v-for="section in sections" :key="section.id" :value="section.id">
                    {{ section.name }}
                  </option>
                </select>
              </div>

              <div class="form-group" v-if="editForm.section_id">
                <label>الأقسام الفرعية</label>
                <div class="sub-sections-grid">
                  <div v-for="sub in availableEditSubSections" :key="sub" class="sub-item">
                    <label>
                      <input type="checkbox" :value="sub" v-model="editForm.sub_sections">
                      <span>{{ getSubName(sub) }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>الدور</label>
                <select v-model="editForm.role" required :disabled="isLeader(selectedMember)">
                  <option value="member">👤 عضو</option>
                  <option value="section_leader">👑 رئيس قسم</option>
                  <option value="deputy_leader">⚡ نائب قائد</option>
                  <option value="team_leader" :disabled="true">👑 قائد فريق (لا يمكن التعديل)</option>
                </select>
                <small v-if="isLeader(selectedMember)" class="hint-text warning-text">
                  ⚠️ لا يمكن تغيير صلاحية قائد الفريق
                </small>
              </div>

              <div class="form-group">
                <label>الحالة</label>
                <select v-model="editForm.status" required :disabled="isLeader(selectedMember)">
                  <option value="active">🟢 نشط</option>
                  <option value="inactive">🔴 غير نشط</option>
                </select>
                <small v-if="isLeader(selectedMember)" class="hint-text warning-text">
                  ⚠️ لا يمكن تغيير حالة قائد الفريق
                </small>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn-save" :disabled="saving || isLeader(selectedMember)">
                <i v-if="saving" class="fas fa-spinner fa-spin"></i>
                <span v-else>حفظ التعديلات</span>
              </button>
              <button type="button" @click="closeEditModal" class="btn-cancel">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Password Modal -->
    <div v-if="showPasswordModal" class="modal-overlay" @click.self="closePasswordModal">
      <div class="modal-content password-modal">
        <div class="modal-header gold">
          <h2><i class="fas fa-key"></i> تغيير كلمة المرور</h2>
          <button @click="closePasswordModal" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-body" v-if="selectedMember">
          <p>تغيير كلمة المرور لـ <strong>{{ selectedMember.name }}</strong></p>
          
          <div class="form-group">
            <label>كلمة المرور الجديدة</label>
            <div class="password-input-wrapper">
              <input 
                :type="showNewPassword ? 'text' : 'password'" 
                v-model="passwordForm.new_password"
                placeholder="أدخل كلمة المرور الجديدة"
                required
              />
              <button type="button" @click="showNewPassword = !showNewPassword" class="toggle-password-btn">
                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>تأكيد كلمة المرور</label>
            <div class="password-input-wrapper">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="passwordForm.confirm_password"
                placeholder="أعد إدخال كلمة المرور"
                required
              />
              <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="toggle-password-btn">
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div v-if="isLeader(selectedMember)" class="warning-box">
            <i class="fas fa-shield-alt"></i>
            <p>أنت على وشك تغيير كلمة مرور قائد الفريق. هذا إجراء حساس.</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="savePassword" class="btn-save" :disabled="passwordSaving">
            <i v-if="passwordSaving" class="fas fa-spinner fa-spin"></i>
            <span v-else>تغيير كلمة المرور</span>
          </button>
          <button @click="closePasswordModal" class="btn-cancel">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-header success">
          <i class="fas fa-check-circle success-icon"></i>
          <h2>✅ تم بنجاح</h2>
        </div>
        <div class="modal-body">
          <p>{{ successMessage }}</p>
        </div>
        <div class="modal-footer">
          <button @click="closeSuccessModal" class="btn-save">تم</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'

// ========== البيانات ==========
const loading = ref(false)
const saving = ref(false)
const passwordSaving = ref(false)
const allMembers = ref([])
const sections = ref([])
const selectedMember = ref(null)

// ========== حالة المودالات ==========
const showEditModal = ref(false)
const showPasswordModal = ref(false)
const showCredentialsModal = ref(false)
const showSuccessModal = ref(false)

// ========== رسالة النجاح ==========
const successMessage = ref('')

// ========== إظهار/إخفاء كلمة المرور ==========
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// ========== الفلاتر ==========
const searchQuery = ref('')
const departmentFilter = ref('all')
const roleFilter = ref('all')
const subDepartmentFilter = ref('all')

// ========== Counts ==========
const pendingCount = ref(0)
const rejectedCount = ref(0)

// ========== المستخدم الحالي (الليدر) ==========
const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// ========== نموذج التعديل ==========
const editForm = reactive({
  name: '',
  email: '',
  academic_number: '',
  phone: '',
  whatsapp: '',
  section_id: '',
  sub_sections: [],
  role: '',
  status: ''
})

// ========== نموذج كلمة المرور ==========
const passwordForm = reactive({
  new_password: '',
  confirm_password: ''
})

// ========== الأقسام الفرعية المتاحة للتعديل ==========
const availableEditSubSections = computed(() => {
  const section = sections.value.find(s => s.id === editForm.section_id)
  return section?.sub_sections || []
})

// ========== معالجة الأقسام الفرعية ==========
const getProcessedSubSections = (subSections) => {
  if (!subSections) return []
  
  if (typeof subSections === 'string') {
    try {
      return JSON.parse(subSections)
    } catch {
      return []
    }
  }
  
  if (Array.isArray(subSections)) {
    return subSections
  }
  
  return []
}

// ========== التحقق من أن المستخدم هو الليدر ==========
const isLeader = (member) => {
  return member?.role === 'team_leader'
}

// ========== التحقق من أن المستخدم الحالي يمكنه تعديل هذا العضو ==========
const canEditMember = (member) => {
  // الليدر يمكنه تعديل أي شخص ما عدا نفسه (لا يمكنه تغيير صلاحيته)
  if (currentUser.value?.role === 'team_leader') {
    return member.id !== currentUser.value?.id
  }
  return false
}

// ========== Member Stats ==========
const memberStats = computed(() => {
  const members = allMembers.value
  return {
    total: members.length,
    leaders: members.filter(m => m.role === 'team_leader').length,
    viceLeaders: members.filter(m => m.role === 'deputy_leader').length,
    sectionLeaders: members.filter(m => m.role === 'section_leader').length,
    members: members.filter(m => m.role === 'member').length
  }
})

// ========== Hardware Stats ==========
const hardwareStats = computed(() => {
  const hardwareMembers = allMembers.value.filter(m => m.section?.type === 'hardware')
  
  const stats = {
    total: hardwareMembers.length,
    electronics: 0,
    components: 0,
    structure: 0,
    design: 0
  }
  
  hardwareMembers.forEach(member => {
    const subSections = getProcessedSubSections(member.sub_sections)
    subSections.forEach(sub => {
      if (stats.hasOwnProperty(sub)) {
        stats[sub]++
      }
    })
  })
  
  return stats
})

// ========== Software Stats ==========
const softwareStats = computed(() => {
  const softwareMembers = allMembers.value.filter(m => m.section?.type === 'software')
  
  const stats = {
    total: softwareMembers.length,
    frontend: 0,
    backend: 0,
    mobile: 0,
    fullstack: 0
  }
  
  softwareMembers.forEach(member => {
    const subSections = getProcessedSubSections(member.sub_sections)
    subSections.forEach(sub => {
      if (stats.hasOwnProperty(sub)) {
        stats[sub]++
      }
    })
  })
  
  return stats
})

// ========== UI/UX Stats ==========
const uiuxStats = computed(() => {
  const uiuxMembers = allMembers.value.filter(m => m.section?.type === 'ui_ux')
  
  const stats = {
    total: uiuxMembers.length,
    ui_design: 0,
    ux_research: 0,
    prototyping: 0,
    graphics: 0
  }
  
  uiuxMembers.forEach(member => {
    const subSections = getProcessedSubSections(member.sub_sections)
    subSections.forEach(sub => {
      if (stats.hasOwnProperty(sub)) {
        stats[sub]++
      }
    })
  })
  
  return stats
})

// ========== Content Stats ==========
const contentStats = computed(() => {
  const contentMembers = allMembers.value.filter(m => m.section?.type === 'content')
  
  const stats = {
    total: contentMembers.length,
    presentation: 0,
    content_writing: 0,
    documentation: 0,
    media: 0
  }
  
  contentMembers.forEach(member => {
    const subSections = getProcessedSubSections(member.sub_sections)
    subSections.forEach(sub => {
      if (stats.hasOwnProperty(sub)) {
        stats[sub]++
      }
    })
  })
  
  return stats
})

// ========== Filtered Members ==========
const filteredMembers = computed(() => {
  return allMembers.value.filter(member => {
    // Search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const name = member.name?.toLowerCase() || ''
      const email = member.email?.toLowerCase() || ''
      const phone = member.phone || ''
      const academic = member.academic_number || ''
      
      if (!name.includes(query) && !email.includes(query) && 
          !phone.includes(query) && !academic.includes(query)) {
        return false
      }
    }
    
    // Department filter
    if (departmentFilter.value !== 'all') {
      if (member.section?.type !== departmentFilter.value) return false
    }
    
    // Role filter
    if (roleFilter.value !== 'all') {
      if (member.role !== roleFilter.value) return false
    }
    
    // SubDepartment filter
    if (subDepartmentFilter.value !== 'all') {
      const subSections = getProcessedSubSections(member.sub_sections)
      if (!subSections.includes(subDepartmentFilter.value)) {
        return false
      }
    }
    
    return true
  })
})

// ========== Helper Functions ==========
const getRoleName = (role) => {
  const map = {
    'team_leader': '👑 قائد الفريق',
    'deputy_leader': '⚡ نائب القائد',
    'section_leader': '👑 رئيس قسم',
    'member': '👤 عضو'
  }
  return map[role] || role
}

const getSubName = (sub) => {
  const map = {
    // Hardware
    'electronics': 'إلكترونيات',
    'components': 'مكونات',
    'structure': 'هيكل',
    'design': 'تصميم',
    // Software
    'frontend': 'فرونت إند',
    'backend': 'باك إند',
    'mobile': 'موبايل',
    'fullstack': 'فول ستاك',
    // UI/UX
    'ui_design': 'تصميم واجهات',
    'ux_research': 'بحث تجربة المستخدم',
    'prototyping': 'نموذج أولي',
    'graphics': 'رسومات',
    // Content
    'presentation': 'عروض تقديمية',
    'content_writing': 'كتابة محتوى',
    'documentation': 'توثيق',
    'media': 'ميديا'
  }
  return map[sub] || sub
}

const getDepartmentIcon = (type) => {
  const icons = {
    'hardware': 'fas fa-microchip',
    'software': 'fas fa-code',
    'ui_ux': 'fas fa-paint-brush',
    'content': 'fas fa-file-alt'
  }
  return icons[type] || 'fas fa-folder'
}

const getSubDepartmentIcon = (sub) => {
  const icons = {
    // Hardware
    'electronics': 'fas fa-bolt',
    'components': 'fas fa-microchip',
    'structure': 'fas fa-cube',
    'design': 'fas fa-pencil-ruler',
    // Software
    'frontend': 'fas fa-globe',
    'backend': 'fas fa-server',
    'mobile': 'fas fa-mobile-alt',
    'fullstack': 'fas fa-layer-group',
    // UI/UX
    'ui_design': 'fas fa-paint-brush',
    'ux_research': 'fas fa-search',
    'prototyping': 'fas fa-cube',
    'graphics': 'fas fa-image',
    // Content
    'presentation': 'fas fa-chart-bar',
    'content_writing': 'fas fa-pen',
    'documentation': 'fas fa-book',
    'media': 'fas fa-video'
  }
  return icons[sub] || 'fas fa-circle'
}

const getSubDepartmentName = (sub) => {
  return getSubName(sub)
}

const getSubSectionsText = (subs) => {
  const subSections = getProcessedSubSections(subs)
  if (subSections.length === 0) return 'لا يوجد'
  return subSections.map(sub => getSubName(sub)).join('، ')
}

const getSectionName = (sectionId) => {
  const section = sections.value.find(s => s.id === sectionId)
  return section ? section.name : 'غير محدد'
}

const getUserInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getAvatarColor = (name) => {
  if (!name) return '#FFD700'
  const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6B6B', '#10b981', '#3b82f6', '#8b5cf6']
  return colors[name.length % colors.length]
}

const formatDate = (date) => {
  if (!date) return '-'
  try {
    return new Date(date).toLocaleDateString('ar-EG')
  } catch {
    return '-'
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    successMessage.value = '✅ تم النسخ'
    showSuccessModal.value = true
  }).catch(() => {
    alert('❌ فشل النسخ')
  })
}

const copyAllCredentials = (member) => {
  const text = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TECH STORM - بيانات العضو
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 المعلومات الشخصية:
   • الاسم: ${member.name}
   • الرقم الأكاديمي: ${member.academic_number}
   • الهاتف: ${member.phone}
   • الواتساب: ${member.whatsapp || 'غير متوفر'}

🔐 بيانات الحساب:
   • البريد: ${member.email}

🏢 الصلاحية والقسم:
   • الصلاحية: ${getRoleName(member.role)}
   • القسم: ${member.section?.name || 'بدون قسم'}
   • الفروع: ${getSubSectionsText(member.sub_sections)}

📊 الإحصائيات:
   • مهام مكتملة: ${member.completed_tasks || 0}
   • مهام جارية: ${member.pending_tasks || 0}
   • نقاط: ${member.total_points || 0}

📅 تاريخ الانضمام: ${formatDate(member.created_at)}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `
  copyToClipboard(text)
}

// ========== Load Data ==========
const loadMembers = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:8000/api/users-public')
    if (response.data.success) {
      allMembers.value = response.data.data || []
    }
  } catch (error) {
    console.error('Error loading members:', error)
  } finally {
    loading.value = false
  }
}

const loadSections = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/show-sections')
    if (response.data.success) {
      sections.value = response.data.data || []
    }
  } catch (error) {
    console.error('Error loading sections:', error)
  }
}

const loadCounts = async () => {
  try {
    const applicantsRes = await axios.get('http://localhost:8000/api/show-applicants')
    if (applicantsRes.data.success) {
      const applicants = applicantsRes.data.data || []
      pendingCount.value = applicants.filter(a => a.status === 'pending').length
      rejectedCount.value = applicants.filter(a => a.status === 'rejected').length
    }
  } catch (error) {
    console.error('Error loading counts:', error)
  }
}

// ========== Member Actions ==========
const showFullCredentials = (member) => {
  selectedMember.value = member
  showCredentialsModal.value = true
}

const closeCredentialsModal = () => {
  showCredentialsModal.value = false
  selectedMember.value = null
}

const editMember = (member) => {
  selectedMember.value = member
  
  let subSections = getProcessedSubSections(member.sub_sections)
  
  editForm.name = member.name || ''
  editForm.email = member.email || ''
  editForm.academic_number = member.academic_number || ''
  editForm.phone = member.phone || ''
  editForm.whatsapp = member.whatsapp || ''
  editForm.section_id = member.section_id || ''
  editForm.sub_sections = subSections
  editForm.role = member.role || 'member'
  editForm.status = member.status || 'active'
  
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedMember.value = null
}

const onSectionChange = () => {
  editForm.sub_sections = []
}

// ========== حفظ التعديلات ==========
const saveMember = async () => {
  if (!selectedMember.value) return
  
  // منع تعديل الليدر لنفسه
  if (isLeader(selectedMember.value) && selectedMember.value.id === currentUser.value?.id) {
    alert('لا يمكنك تعديل بياناتك كقائد فريق')
    closeEditModal()
    return
  }
  
  saving.value = true
  try {
    const response = await axios.post(
      `http://localhost:8000/api/users-update/${selectedMember.value.id}`,
      editForm
    )
    
    if (response.data.success) {
      successMessage.value = 'تم تحديث بيانات العضو بنجاح'
      showSuccessModal.value = true
      closeEditModal()
      await loadMembers()
    } else {
      alert(response.data.error || 'حدث خطأ في تحديث البيانات')
    }
  } catch (error) {
    console.error('Error updating member:', error)
    alert(error.response?.data?.error || 'حدث خطأ في تحديث البيانات')
  } finally {
    saving.value = false
  }
}

// ========== تغيير كلمة المرور ==========
const changePassword = (member) => {
  selectedMember.value = member
  passwordForm.new_password = ''
  passwordForm.confirm_password = ''
  showPasswordModal.value = true
}

const closePasswordModal = () => {
  showPasswordModal.value = false
  selectedMember.value = null
}

const savePassword = async () => {
  if (!selectedMember.value) return
  
  if (!passwordForm.new_password) {
    alert('أدخل كلمة المرور الجديدة')
    return
  }
  
  if (passwordForm.new_password.length < 6) {
    alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    return
  }
  
  if (passwordForm.new_password !== passwordForm.confirm_password) {
    alert('كلمة المرور غير متطابقة')
    return
  }
  
  passwordSaving.value = true
  try {
    const response = await axios.post(
      `http://localhost:8000/api/users-password/${selectedMember.value.id}`,
      { password: passwordForm.new_password }
    )
    
    if (response.data.success) {
      successMessage.value = 'تم تغيير كلمة المرور بنجاح'
      showSuccessModal.value = true
      closePasswordModal()
    } else {
      alert(response.data.error || 'حدث خطأ في تغيير كلمة المرور')
    }
  } catch (error) {
    console.error('Error changing password:', error)
    alert(error.response?.data?.error || 'حدث خطأ في تغيير كلمة المرور')
  } finally {
    passwordSaving.value = false
  }
}

// ========== تغيير الحالة ==========
const toggleStatus = async (member) => {
  // منع تعطيل الليدر
  if (isLeader(member)) {
    alert('لا يمكن تعطيل حساب قائد الفريق')
    return
  }
  
  const newStatus = member.status === 'active' ? 'inactive' : 'active'
  const action = newStatus === 'active' ? 'تفعيل' : 'تعطيل'
  
  if (!confirm(`هل أنت متأكد من ${action} العضو ${member.name}؟`)) return
  
  try {
    const response = await axios.post(
      `http://localhost:8000/api/users-status/${member.id}`,
      { status: newStatus }
    )
    
    if (response.data.success) {
      successMessage.value = `تم ${action} العضو بنجاح`
      showSuccessModal.value = true
      await loadMembers()
    } else {
      alert(response.data.error || 'حدث خطأ')
    }
  } catch (error) {
    console.error('Error toggling status:', error)
    alert(error.response?.data?.error || 'حدث خطأ')
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  successMessage.value = ''
}

// ========== Lifecycle ==========
onMounted(() => {
  loadMembers()
  loadSections()
  loadCounts()
})
</script>

<style scoped>
/* ===== المتغيرات الذهبية ===== */
:root {
  --gold-primary: #FFD700;
  --gold-dark: #FFA500;
  --gold-gradient: linear-gradient(145deg, #FFD700, #FFA500);
  --bg-deep: #0a0a0a;
  --card-bg: rgba(20, 20, 30, 0.95);
  --border-gold: rgba(255, 215, 0, 0.2);
  --text-gold: #FFD700;
  --text-light: #ffffff;
  --text-muted: #b0b0b0;
  --shadow-gold: 0 10px 30px rgba(255, 215, 0, 0.15);
  
  /* Role Colors */
  --team-leader: #3b82f6;
  --deputy-leader: #8b5cf6;
  --section-leader: #f59e0b;
  --member: #10b981;
  
  /* Department Colors */
  --hardware: #3b82f6;
  --software: #10b981;
  --ui-ux: #f59e0b;
  --content: #ef4444;
  
  /* Warning Color */
  --warning: #f59e0b;
  --danger: #ef4444;
  --success: #10b981;
}

/* ===== الصفحة الرئيسية ===== */
.admin-page {
  padding: 30px;
  max-width: 1600px;
  margin: 0 auto;
  background: var(--bg-deep);
  min-height: 100vh;
  color: var(--text-light);
  font-family: 'Cairo', sans-serif;
  position: relative;
}

/* ===== خلفية فضائية ===== */
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
  background-image: 
    radial-gradient(2px 2px at 20px 30px, var(--gold-primary), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, var(--gold-primary), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 80px 120px, var(--gold-primary), rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 200px 200px;
  opacity: 0.4;
  animation: starsMove 100s linear infinite;
}

@keyframes starsMove {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}

.twinkling-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 120px 330px, var(--gold-primary), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 240px 170px, var(--gold-primary), rgba(0,0,0,0));
  background-repeat: no-repeat;
  background-size: 300px 300px;
  opacity: 0.2;
  animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
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
  opacity: 0.15;
}

/* ===== Header ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.header-title h1 {
  font-size: 36px;
  color: var(--gold-primary);
  margin-bottom: 8px;
  font-weight: 900;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
}

.header-title p {
  color: var(--text-muted);
  font-size: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stats-bundle {
  display: flex;
  gap: 15px;
  background: rgba(255, 215, 0, 0.03);
  padding: 10px;
  border-radius: 60px;
  border: 1px solid var(--border-gold);
  backdrop-filter: blur(10px);
}

.stats-badge {
  padding: 12px 20px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
}

.stats-badge.total .stat-number {
  background: var(--gold-gradient);
  color: #000;
}

.stats-badge.leaders .stat-number {
  background: var(--team-leader);
  color: white;
}

.stats-badge.vice .stat-number {
  background: var(--deputy-leader);
  color: white;
}

.stats-badge.members .stat-number {
  background: var(--member);
  color: white;
}

.stat-number {
  padding: 6px 18px;
  border-radius: 30px;
  font-size: 22px;
  font-weight: 900;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

/* ===== Tabs ===== */
.admin-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.02);
  padding: 8px;
  border-radius: 60px;
  border: 1px solid var(--border-gold);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
}

.tab {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  border-radius: 50px;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s;
  flex: 1;
  justify-content: center;
  font-size: 15px;
}

.tab i {
  font-size: 1.2rem;
}

.tab.active {
  background: var(--gold-gradient);
  color: #000;
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.tab-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
}

.tab.active .tab-badge {
  background: rgba(0, 0, 0, 0.2);
  color: #000;
}

/* ===== Advanced Filters ===== */
.filters-advanced {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
}

.search-box {
  flex: 2;
  position: relative;
  min-width: 300px;
}

.search-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gold-primary);
  font-size: 18px;
}

.search-box input {
  width: 100%;
  padding: 18px 55px 18px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-gold);
  border-radius: 60px;
  color: #fff;
  font-size: 15px;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--gold-primary);
  background: rgba(255, 215, 0, 0.05);
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.1);
}

.filter-group {
  display: flex;
  gap: 15px;
  flex: 3;
}

.filter-select {
  flex: 1;
  padding: 16px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-gold);
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: left 15px center;
  padding-left: 45px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--gold-primary);
  background: rgba(255, 215, 0, 0.05);
}

.filter-select optgroup {
  background: #1a1a1a;
  color: var(--gold-primary);
  font-weight: 700;
  padding: 10px;
}

.filter-select option {
  background: #1a1a1a;
  color: #fff;
  padding: 10px;
}

.filter-select option:hover {
  background: var(--gold-primary);
  color: #000;
}

/* ===== Department Stats Cards ===== */
.department-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
}

.dept-card {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-gold);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.dept-card:hover {
  border-color: var(--gold-primary);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.1);
}

.dept-card.hardware {
  border-right: 4px solid var(--hardware);
}
.dept-card.hardware .dept-icon {
  background: rgba(59, 130, 246, 0.15);
  color: var(--hardware);
}

.dept-card.software {
  border-right: 4px solid var(--software);
}
.dept-card.software .dept-icon {
  background: rgba(16, 185, 129, 0.15);
  color: var(--software);
}

.dept-card.uiux {
  border-right: 4px solid var(--ui-ux);
}
.dept-card.uiux .dept-icon {
  background: rgba(245, 158, 11, 0.15);
  color: var(--ui-ux);
}

.dept-card.content {
  border-right: 4px solid var(--content);
}
.dept-card.content .dept-icon {
  background: rgba(239, 68, 68, 0.15);
  color: var(--content);
}

.dept-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.dept-info {
  flex: 1;
}

.dept-info h3 {
  color: var(--gold-primary);
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 800;
}

.dept-counts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.dept-counts .count {
  background: rgba(255, 215, 0, 0.1);
  color: var(--gold-primary);
  padding: 6px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.branch-count {
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 13px;
  color: var(--text-muted);
}

/* ===== Members Grid ===== */
.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 25px;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.5s ease forwards;
}

.member-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-gold);
  border-radius: 30px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: fadeInUp 0.5s ease forwards;
}

.member-card:nth-child(1) { animation-delay: 0.1s; }
.member-card:nth-child(2) { animation-delay: 0.15s; }
.member-card:nth-child(3) { animation-delay: 0.2s; }
.member-card:nth-child(4) { animation-delay: 0.25s; }
.member-card:nth-child(5) { animation-delay: 0.3s; }
.member-card:nth-child(6) { animation-delay: 0.35s; }
.member-card:nth-child(7) { animation-delay: 0.4s; }
.member-card:nth-child(8) { animation-delay: 0.45s; }
.member-card:nth-child(9) { animation-delay: 0.5s; }
.member-card:nth-child(10) { animation-delay: 0.55s; }

.member-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.member-card:hover::before {
  transform: translateX(100%);
}

.member-card:hover {
  border-color: var(--gold-primary);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.1);
}

.member-card.leader-highlight {
  border: 2px solid var(--team-leader);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.member-card.deputy-highlight {
  border: 2px solid var(--deputy-leader);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.member-card-header {
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.member-card-header.team_leader {
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05));
}
.member-card-header.deputy_leader {
  background: linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05));
}
.member-card-header.section_leader {
  background: linear-gradient(145deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.05));
}
.member-card-header.member {
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
}

.member-avatar-large {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 28px;
  color: #000;
  text-transform: uppercase;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.member-title h3 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 700;
}

.role-badge-large {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
}

.role-badge-large.team_leader {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}
.role-badge-large.deputy_leader {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  border: 1px solid #8b5cf6;
}
.role-badge-large.section_leader {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}
.role-badge-large.member {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid #10b981;
}

.member-card-body {
  padding: 25px;
  flex: 1;
}

.info-section {
  margin-bottom: 25px;
}

.info-section h4 {
  color: var(--gold-primary);
  font-size: 15px;
  margin-bottom: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  font-size: 13px;
}

.info-item i {
  color: var(--gold-primary);
  width: 18px;
}

.dept-display {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dept-badge {
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dept-badge.hardware {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}
.dept-badge.software {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}
.dept-badge.ui_ux {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}
.dept-badge.content {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid #ef4444;
}
.dept-badge.unknown {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1px solid var(--border-gold);
}

.subdept-badge {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.more-badge {
  background: var(--gold-primary);
  color: #000;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.credentials-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 18px;
}

.cred-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

.cred-row:last-child {
  border-bottom: none;
}

.cred-label {
  color: var(--text-muted);
  font-size: 13px;
  min-width: 90px;
}

.cred-value {
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  flex: 1;
  word-break: break-word;
}

.password-text {
  font-family: monospace;
}

.btn-copy-tiny {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  color: var(--gold-primary);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-copy-tiny:hover {
  background: var(--gold-primary);
  color: #000;
  transform: scale(1.1);
}

.stats-mini {
  display: flex;
  gap: 15px;
}

.stat-mini-item {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-mini-label {
  color: var(--text-muted);
  font-size: 11px;
}

.stat-mini-value {
  color: var(--gold-primary);
  font-size: 20px;
  font-weight: 800;
}

.member-card-footer {
  display: flex;
  gap: 12px;
  padding: 20px 25px;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.btn-credentials,
.btn-edit,
.btn-toggle {
  flex: 1;
  padding: 14px;
  border-radius: 30px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}

.btn-credentials {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: var(--gold-primary);
}

.btn-credentials:hover {
  background: var(--gold-primary);
  color: #000;
  transform: translateY(-3px);
}

.btn-edit {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
}

.btn-edit:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.btn-toggle {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #f44336;
}

.btn-toggle.inactive {
  background: rgba(76, 175, 80, 0.1);
  border-color: #4caf50;
  color: #4caf50;
}

.btn-toggle:hover {
  background: #f44336;
  color: white;
  transform: translateY(-3px);
}

.btn-toggle.inactive:hover {
  background: #4caf50;
}

.btn-toggle:disabled,
.btn-edit:disabled,
.btn-credentials:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== تحسينات إضافية للقوائم ===== */
select option {
  padding: 12px;
  font-size: 14px;
}

select optgroup {
  font-weight: 700;
  color: var(--gold-primary);
  background: #1a1a1a;
  padding: 10px 0;
}

select option:hover {
  background: var(--gold-primary);
  color: #000;
}

/* ===== تحسينات للشاشات الصغيرة ===== */
@media (max-width: 768px) {
  .filter-group select {
    font-size: 13px;
    padding: 12px 35px 12px 15px;
    background-position: left 10px center;
  }
  
  .form-group select {
    font-size: 13px;
    padding: 12px 35px 12px 15px;
  }
}

/* ===== رسائل التحذير ===== */
.warning-message {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid #f59e0b;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f59e0b;
}

.warning-message i {
  font-size: 20px;
}

.warning-message p {
  margin: 0;
  font-size: 13px;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
}

.success-message {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  color: #10b981;
}

/* ===== تحسينات الصفحات الفارغة ===== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed var(--border-gold);
  border-radius: 30px;
  margin: 40px 0;
}

.empty-state i {
  font-size: 80px;
  color: var(--text-muted);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--gold-primary);
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 700;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 16px;
  margin-bottom: 30px;
}

/* ===== تحسينات التحميل ===== */
.loading-state {
  text-align: center;
  padding: 80px 20px;
}

.loading-state i {
  font-size: 50px;
  color: var(--gold-primary);
  margin-bottom: 20px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.loading-state p {
  color: var(--text-muted);
  font-size: 16px;
}

/* ===== تحسينات الروابط ===== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 35px;
  background: var(--gold-gradient);
  color: #000;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.btn-primary:active {
  transform: translateY(-1px);
}

/* ===== Credentials Modal Premium ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.4s;
}

.modal-content {
  background: rgba(20, 20, 30, 0.98);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 50px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8);
  animation: slideUp 0.5s;
}

.modal-header {
  padding: 30px 35px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header.gold {
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.05));
}

.modal-header h2 {
  color: var(--gold-primary);
  font-size: 28px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 1px;
}

.modal-header.success {
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
  justify-content: center;
  gap: 15px;
}

.success-icon {
  font-size: 40px;
  color: #4caf50;
}

.btn-close {
  width: 45px;
  height: 45px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  background: transparent;
  color: var(--text-muted);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 18px;
}

.btn-close:hover {
  border-color: #f44336;
  color: #f44336;
  transform: rotate(90deg);
}

.modal-body {
  padding: 35px;
}

/* ===== Edit Modal Styles ===== */
.edit-modal {
  max-width: 700px;
}

.password-modal {
  max-width: 500px;
}

.success-modal {
  max-width: 400px;
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.form-section h3 {
  color: var(--gold-primary);
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 700;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: var(--gold-primary);
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--gold-primary);
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23FFD700' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: left 15px center;
  padding-left: 45px;
}

.form-group select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-group select option:disabled {
  color: var(--text-muted);
  font-style: italic;
}

/* رسائل التحذير */
.warning-text {
  color: var(--warning);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  font-size: 12px;
}

.warning-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid var(--warning);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-box i {
  color: var(--warning);
  font-size: 20px;
}

.warning-box p {
  color: var(--warning);
  font-size: 13px;
  margin: 0;
}

.sub-sections-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 15px;
}

.sub-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.sub-item input[type="checkbox"] {
  accent-color: var(--gold-primary);
  width: 18px;
  height: 18px;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-wrapper input {
  width: 100%;
  padding: 14px 45px 14px 15px;
}

.toggle-password-btn {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--gold-primary);
  cursor: pointer;
  font-size: 1.1rem;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-footer {
  display: flex;
  gap: 15px;
  padding: 20px 35px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  justify-content: flex-end;
}

.btn-save,
.btn-cancel {
  padding: 14px 30px;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  border: none;
}

.btn-save {
  background: var(--gold-gradient);
  color: #000;
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4);
}

.btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #fff;
}

.btn-cancel:hover {
  border-color: var(--gold-primary);
  color: var(--gold-primary);
  transform: translateY(-3px);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Credentials Card ===== */
.credentials-card-gold {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 40px;
  padding: 30px;
}

.member-header-premium {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
}

.member-avatar-premium {
  width: 100px;
  height: 100px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 40px;
  color: #000;
  text-transform: uppercase;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.member-info-premium h2 {
  color: #fff;
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 800;
}

.role-badge-premium {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
}

.role-badge-premium.team_leader {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 2px solid #3b82f6;
}
.role-badge-premium.deputy_leader {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  border: 2px solid #8b5cf6;
}
.role-badge-premium.section_leader {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 2px solid #f59e0b;
}
.role-badge-premium.member {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 2px solid #10b981;
}

.credentials-grid-premium {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 30px;
}

.cred-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 30px;
  padding: 25px;
}

.cred-section.highlight {
  background: rgba(255, 215, 0, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.cred-section h3 {
  color: var(--gold-primary);
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cred-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.cred-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
}

.cred-icon {
  width: 45px;
  height: 45px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-primary);
  font-size: 18px;
}

.cred-label {
  color: var(--text-muted);
  font-size: 14px;
  min-width: 110px;
}

.cred-value {
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  flex: 1;
}

.cred-value-with-copy {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.password-field {
  font-family: monospace;
  direction: ltr;
}

.btn-copy-gold {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  color: var(--gold-primary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-copy-gold:hover {
  background: var(--gold-primary);
  color: #000;
  transform: scale(1.1);
}

.role-badge-cred {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
}

.stats-grid-mini {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-box .stat-number {
  font-size: 28px;
  padding: 8px 20px;
}

.stat-box .stat-label {
  color: var(--text-muted);
  font-size: 12px;
}

.credentials-footer {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
}

.warning-premium {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid #f59e0b;
  border-radius: 20px;
  margin-bottom: 25px;
}

.warning-premium i {
  color: #f59e0b;
  font-size: 24px;
}

.warning-premium p {
  color: #f59e0b;
  font-size: 14px;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.btn-copy-all {
  flex: 2;
  padding: 18px;
  border-radius: 50px;
  border: none;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--gold-gradient);
  color: #000;
  box-shadow: 0 15px 30px rgba(255, 215, 0, 0.2);
}

.btn-copy-all:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 45px rgba(255, 215, 0, 0.4);
}

.btn-close-gold {
  flex: 1;
  padding: 18px;
  border-radius: 50px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  background: transparent;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}

.btn-close-gold:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: var(--gold-primary);
  transform: translateY(-3px);
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Responsive ===== */
@media (max-width: 1200px) {
  .members-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-group {
    flex-wrap: wrap;
  }
}

@media (max-width: 992px) {
  .admin-page {
    padding: 20px;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-bundle {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .filters-advanced {
    flex-direction: column;
  }
  
  .filter-group {
    flex-direction: column;
  }
  
  .credentials-grid-premium {
    grid-template-columns: 1fr;
  }
  
  .member-header-premium {
    flex-direction: column;
    text-align: center;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .admin-tabs {
    flex-direction: column;
    border-radius: 30px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-mini {
    flex-direction: column;
  }
  
  .member-card-footer {
    flex-direction: column;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .sub-sections-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-save,
  .btn-cancel,
  .btn-copy-all,
  .btn-close-gold {
    width: 100%;
  }
}

/* ===== RTL Support ===== */
[dir="rtl"] .search-box i {
  right: 20px;
  left: auto;
}

[dir="rtl"] .search-box input {
  padding: 18px 55px 18px 25px;
}

[dir="rtl"] .cred-item {
  text-align: right;
}

[dir="rtl"] .cred-value-with-copy {
  flex-direction: row-reverse;
}

[dir="rtl"] .dept-card {
  border-right: none;
  border-left: 4px solid;
}

[dir="rtl"] .filter-select {
  background-position: right 15px center;
  padding-right: 45px;
  padding-left: 25px;
}

[dir="rtl"] .form-group select {
  background-position: right 15px center;
  padding-right: 45px;
  padding-left: 25px;
}

[dir="rtl"] .warning-message {
  flex-direction: row-reverse;
}

[dir="rtl"] .btn-primary i {
  transform: rotate(180deg);
}

[dir="rtl"] .toggle-password-btn {
  left: auto;
  right: 10px;
}

[dir="rtl"] .password-input-wrapper input {
  padding: 14px 15px 14px 45px;
}

/* ===== Custom Scrollbar ===== */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.4);
}

::-webkit-scrollbar-corner {
  background: #0a0a0a;
}

/* ===== تحسينات الطباعة ===== */
@media print {
  .space-bg,
  .admin-tabs,
  .filters-advanced,
  .member-card-footer,
  .btn-credentials,
  .btn-edit,
  .btn-toggle {
    display: none !important;
  }
  
  .admin-page {
    background: white;
    color: black;
    padding: 20px;
  }
  
  .member-card {
    break-inside: avoid;
    border: 1px solid #ccc;
    background: white;
    color: black;
    margin-bottom: 20px;
  }
  
  .member-card-header {
    background: #f5f5f5 !important;
  }
  
  .dept-card {
    background: #f5f5f5;
    color: black;
  }
}

/* ===== تحسينات التوافق ===== */
@supports (backdrop-filter: blur(10px)) {
  .space-bg {
    backdrop-filter: none;
  }
}

/* ===== تحسينات الوضع الليلي ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-deep: #0a0a0a;
    --text-light: #ffffff;
    --text-muted: #b0b0b0;
  }
}

/* ===== تحسينات النهايات ===== */
.admin-page {
  position: relative;
}

.admin-page::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  pointer-events: none;
  z-index: 1;
}

/* ===== تحسينات آخر العناصر ===== */
.member-card:last-child {
  margin-bottom: 50px;
}

.dept-card:last-child {
  margin-bottom: 30px;
}

/* ===== تحسينات الشاشات الصغيرة جداً ===== */
@media (max-width: 480px) {
  .member-card-footer {
    flex-direction: column;
    gap: 8px;
  }
  
  .btn-credentials,
  .btn-edit,
  .btn-toggle {
    width: 100%;
    padding: 12px;
    font-size: 13px;
  }
  
  .member-avatar-large {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .member-title h3 {
    font-size: 16px;
  }
  
  .role-badge-large {
    padding: 4px 10px;
    font-size: 11px;
  }
  
  .info-item {
    font-size: 12px;
    padding: 8px;
  }
  
  .stats-mini {
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-mini-item {
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 12px;
  }
  
  .stat-mini-label {
    font-size: 12px;
  }
  
  .stat-mini-value {
    font-size: 16px;
  }
  
  .modal-content {
    width: 95%;
    padding: 15px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .sub-sections-grid {
    grid-template-columns: 1fr;
  }
}

/* ===== تحسينات الأمان ===== */
.btn-leader-only {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid var(--team-leader);
  color: var(--team-leader);
  cursor: pointer;
  transition: all 0.3s;
}

.btn-leader-only:hover:not(:disabled) {
  background: var(--team-leader);
  color: white;
}

.btn-leader-only:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.leader-badge {
  background: var(--team-leader);
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  margin-left: 5px;
}

/* ===== تحسينات الكاش ===== */
.cache-indicator {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0,0,0,0.8);
  border: 1px solid var(--gold-primary);
  border-radius: 30px;
  padding: 8px 15px;
  font-size: 12px;
  color: var(--text-muted);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.cache-indicator i {
  color: var(--gold-primary);
  margin-right: 5px;
}

/* ===== تحسينات النهاية ===== */
.footer-note {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: var(--text-muted);
  font-size: 12px;
  border-top: 1px solid var(--border-gold);
}

.footer-note i {
  color: var(--gold-primary);
  margin: 0 5px;
}

.footer-note a {
  color: var(--gold-primary);
  text-decoration: none;
  transition: all 0.3s;
}

.footer-note a:hover {
  text-decoration: underline;
}

/* ===== النهاية ===== */
/* جميع الحقوق محفوظة لفريق TECH STORM 2026 */
</style>