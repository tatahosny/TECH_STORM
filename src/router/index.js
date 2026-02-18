import { createRouter, createWebHistory } from 'vue-router'

// ========== PUBLIC ROUTES ==========
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ApplyView from '../views/ApplyView.vue'
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/dashboard/DashboardHome.vue'),
        meta: { title: 'لوحة التحكم - TECH STORM' }
      },
      {
        path: 'profile',
        name: 'dashboard-profile',
        component: () => import('../views/dashboard/ProfileView.vue'),
        meta: { title: 'الملف الشخصي - TECH STORM' }
      },
      {
        path: 'tasks',
        name: 'dashboard-tasks',
        component: () => import('../views/dashboard/TasksView.vue'),
        meta: { title: 'المهام - TECH STORM' }
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
        meta: { title: 'تفاصيل المهمة - TECH STORM' }
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
      {
        path: 'team',
        name: 'dashboard-team',
        component: () => import('../views/dashboard/TeamView.vue'),
        meta: { title: 'الفريق - TECH STORM' }
      }
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
      {
        path: 'applicants',
        name: 'admin-applicants',
        component: () => import('../views/AdminApplicantsView.vue'),
        meta: { title: 'طلبات الانضمام - TECH STORM' }
      },
      {
        path: 'accepted',
        name: 'admin-accepted',
        component: () => import('../views/admin/AdminAcceptedView.vue'),
        meta: { title: 'الأعضاء المقبولين - TECH STORM' }
      },
      {
        path: 'assign-heads',
        name: 'admin-assign-heads',
        component: () => import('../views/admin/AssignHeadsView.vue'),
        meta: { title: 'تعيين الرؤساء - TECH STORM' }
      }
    ]
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
    if (savedPosition) return savedPosition
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

  // صفحات الضيوف (login, apply)
  if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      next('/dashboard')
      return
    }
    next()
    return
  }

  // الصفحات اللي محتاجة تسجيل دخول
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next('/login')
      return
    }

    // الصفحات اللي لليدر فقط
    if (to.meta.requiresLeader && userRole !== 'team_leader') {
      next('/dashboard')
      return
    }

    // صفحات إنشاء المهام
    if (to.meta.requiresTaskCreation) {
      const canCreate = ['team_leader', 'deputy_leader', 'section_leader'].includes(userRole)
      if (!canCreate) {
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
