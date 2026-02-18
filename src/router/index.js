import { createRouter, createWebHistory } from 'vue-router'

// ========== PUBLIC ROUTES (مكونات عامة) ==========
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ApplyView from '../views/ApplyView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AboutView from '../views/AboutView.vue'
import TeamView from '../views/TeamView.vue'
import SpecializationsView from '../views/SpecializationsView.vue'
import ContactView from '../views/ContactView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  // ========== الصفحات العامة ==========
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { 
      title: 'الرئيسية - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    meta: { 
      title: 'المشاريع - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { 
      title: 'عن الفريق - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView,
    meta: { 
      title: 'أعضاء الفريق - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/specializations',
    name: 'specializations',
    component: SpecializationsView,
    meta: { 
      title: 'التخصصات - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { 
      title: 'تواصل معنا - TECH STORM',
      requiresAuth: false 
    }
  },
  {
    path: '/apply',
    name: 'apply',
    component: ApplyView,
    meta: { 
      title: 'طلب الانضمام - TECH STORM',
      requiresAuth: false,
      requiresGuest: true 
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { 
      title: 'تسجيل الدخول - TECH STORM',
      requiresAuth: false,
      requiresGuest: true 
    }
  },

  // ========== DASHBOARD ROUTES ==========
  {
    path: '/dashboard',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { 
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/dashboard/DashboardHome.vue'),
        meta: { 
          title: 'لوحة التحكم - TECH STORM'
        }
      },
      // ===== TASK ROUTES =====
      {
        path: 'tasks',
        name: 'dashboard-tasks',
        component: () => import('../views/dashboard/TasksView.vue'),
        meta: { 
          title: 'المهام - TECH STORM'
        }
      },
      {
        path: 'tasks/create',
        name: 'dashboard-create-task',
        component: () => import('../views/dashboard/CreateTaskView.vue'),
        meta: { 
          title: 'إنشاء مهمة - TECH STORM',
          requiresTaskCreation: true
        }
      },
      {
        path: 'tasks/:id',
        name: 'dashboard-task-details',
        component: () => import('../views/dashboard/TaskDetailsView.vue'),
        meta: { 
          title: 'تفاصيل المهمة - TECH STORM'
        }
      },
      {
        path: 'tasks/edit/:id',
        name: 'dashboard-task-edit',
        component: () => import('../views/dashboard/EditTaskView.vue'),
        meta: { 
          title: 'تعديل المهمة - TECH STORM',
          requiresTaskCreation: true
        }
      },
      // ===== OTHER DASHBOARD ROUTES =====
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: () => import('../views/dashboard/ProfileView.vue'),
        meta: { 
          title: 'الملف الشخصي - TECH STORM'
        }
      },
      {
        path: 'team',
        name: 'dashboard-team',
        component: () => import('../views/dashboard/TeamView.vue'),
        meta: { 
          title: 'الفريق - TECH STORM'
        }
      },
      {
        path: 'members',
        name: 'dashboard-members',
        component: () => import('../views/dashboard/MembersView.vue'),
        meta: { 
          title: 'الأعضاء - TECH STORM'
        }
      },
      {
        path: 'statistics',
        name: 'dashboard-statistics',
        component: () => import('../views/dashboard/StatisticsView.vue'),
        meta: { 
          title: 'الإحصائيات - TECH STORM'
        }
      }
      // ===== تم إزالة route الإعدادات =====
    ]
  },

  // ========== ADMIN ROUTES (لليدر فقط) ==========
  {
    path: '/admin',
    component: () => import('../layouts/DashboardLayout.vue'),
    meta: { 
      requiresAuth: true,
      requiresLeader: true
    },
    children: [
      {
        path: '',
        redirect: '/admin/applicants'
      },
      // ===== APPLICANT ROUTES =====
      {
        path: 'applicants',
        name: 'admin-applicants',
        component: () => import('../views/AdminApplicantsView.vue'),
        meta: { 
          title: 'طلبات الانضمام - TECH STORM'
        }
      },
      {
        path: 'accepted',
        name: 'admin-accepted',
        component: () => import('../views/admin/AdminAcceptedView.vue'),
        meta: { 
          title: 'الأعضاء المقبولين - TECH STORM'
        }
      },
      {
        path: 'rejected',
        name: 'admin-rejected',
        component: () => import('../views/admin/AdminRejectedView.vue'),
        meta: { 
          title: 'الطلبات المرفوضة - TECH STORM'
        }
      },
      // ===== OTHER ADMIN ROUTES =====
      {
        path: 'departments',
        name: 'admin-departments',
        component: () => import('../views/admin/AdminDepartmentsView.vue'),
        meta: { 
          title: 'إدارة الأقسام - TECH STORM'
        }
      },
      {
        path: 'assign-heads',
        name: 'admin-assign-heads',
        component: () => import('../views/admin/AssignHeadsView.vue'),
        meta: { 
          title: 'تعيين رؤساء الأقسام - TECH STORM'
        }
      },
      {
        path: 'department-tasks',
        name: 'admin-department-tasks',
        component: () => import('../views/admin/DepartmentTasksView.vue'),
        meta: { 
          title: 'مهام الأقسام - TECH STORM'
        }
      }
    ]
  },

  // ========== SIMPLE VIEW ROUTE ==========
  {
    path: '/simple-view',
    name: 'simple-view',
    component: () => import('../views/SimpleView.vue'),
    meta: { 
      title: 'عرض البيانات - TECH STORM',
      requiresAuth: false 
    }
  },

  // ========== 404 PAGE ==========
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { 
      title: 'الصفحة غير موجودة - TECH STORM',
      requiresAuth: false 
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

// ========== ROUTE GUARDS ==========
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'TECH STORM'
  console.log('🔄 Navigating to:', to.path)

  const token = localStorage.getItem('auth_token')
  const userStr = localStorage.getItem('user')
  const isAuthenticated = !!token
  
  let user = null
  let userRole = null
  
  if (userStr) {
    try {
      user = JSON.parse(userStr)
      userRole = user?.role
    } catch (e) {
      console.error('Error parsing user:', e)
    }
  }

  if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      next('/dashboard')
      return
    }
    next()
    return
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login')
      return
    }

    if (to.meta.requiresLeader) {
      if (userRole !== 'team_leader') {
        console.warn('⛔ Access denied: Leader only')
        next('/dashboard')
        return
      }
    }

    if (to.meta.requiresTaskCreation) {
      const canCreate = ['team_leader', 'deputy_leader', 'section_leader'].includes(userRole)
      if (!canCreate) {
        console.warn('⛔ Access denied: Cannot create tasks')
        next('/dashboard')
        return
      }
    }

    next()
    return
  }

  next()
})

export default router
