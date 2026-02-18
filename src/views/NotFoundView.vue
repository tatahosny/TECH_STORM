<!-- src/views/NotFoundView.vue -->
<template>
  <div class="not-found" dir="rtl">
    <div class="container">
      <div class="error-code">404</div>
      <h1>الصفحة غير موجودة</h1>
      <p>عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
      
      <div class="actions">
        <!-- ✅ للداشبورد - يستخدم router.back() مش push -->
        <button v-if="isDashboardRoute" @click="goBack" class="btn-primary">
          <i class="fas fa-arrow-right"></i>
          العودة للصفحة السابقة
        </button>
        
        <!-- ✅ للموقع العام -->
        <router-link v-else to="/" class="btn-primary">
          <i class="fas fa-home"></i>
          العودة للرئيسية
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// هل المستخدم داخل الداشبورد؟
const isDashboardRoute = computed(() => {
  return route.path.startsWith('/dashboard') || 
         route.path.startsWith('/admin')
})

// الرجوع للصفحة السابقة
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--dashboard-bg, #0a0a0a);
  color: var(--text-primary, #ffffff);
  text-align: center;
  padding: 20px;
}

.container {
  max-width: 600px;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: var(--accent, #3b82f6);
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
}

h1 {
  font-size: 32px;
  margin-bottom: 16px;
  color: #fff;
}

p {
  color: #b0b0b0;
  font-size: 18px;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: #1a1a1a;
  color: #fff;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #2a2a2a;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  p {
    font-size: 16px;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>