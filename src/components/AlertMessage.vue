<!-- src/components/AlertMessage.vue -->
<template>
  <Transition name="alert">
    <div v-if="visible" class="alert-overlay" @click.self="close">
      <div class="alert-container" :class="type">
        <div class="alert-icon">
          <i :class="iconClass"></i>
        </div>
        
        <div class="alert-content">
          <h3 class="alert-title">{{ title }}</h3>
          <p class="alert-message">{{ message }}</p>
        </div>

        <button class="alert-close" @click="close">
          <i class="fas fa-times"></i>
        </button>

        <!-- Progress bar للعد التنازلي -->
        <div v-if="showProgress" class="alert-progress" :style="{ animationDuration: duration + 'ms' }"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info', 'confirm'].includes(value)
  },
  title: {
    type: String,
    default: 'تنبيه'
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 5000 // 5 ثواني
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: 'تأكيد'
  },
  cancelText: {
    type: String,
    default: 'إلغاء'
  }
})

const emit = defineEmits(['close', 'confirm', 'cancel'])

const visible = ref(true)

const iconClass = computed(() => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle',
    confirm: 'fas fa-question-circle'
  }
  return icons[props.type] || icons.info
})

const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // نفس مدة الـ transition
}

const confirm = () => {
  visible.value = false
  emit('confirm')
}

const cancel = () => {
  visible.value = false
  emit('cancel')
}

// Auto close بعد المدة المحددة (لغير نوع confirm)
onMounted(() => {
  if (props.type !== 'confirm' && props.duration > 0) {
    setTimeout(close, props.duration)
  }
})
</script>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  direction: rtl;
}

.alert-container {
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  border: 1px solid;
  border-radius: 25px;
  width: 90%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease;
  display: flex;
  align-items: flex-start;
  padding: 25px;
  gap: 15px;
}

/* ألوان حسب النوع */
.alert-container.success {
  border-color: #10b981;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
}

.alert-container.error {
  border-color: #ef4444;
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
}

.alert-container.warning {
  border-color: #f59e0b;
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
}

.alert-container.info {
  border-color: #3b82f6;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
}

.alert-container.confirm {
  border-color: #FFD700;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

.alert-icon {
  width: 50px;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.success .alert-icon {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid #10b981;
}

.error .alert-icon {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid #ef4444;
}

.warning .alert-icon {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.info .alert-icon {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.confirm .alert-icon {
  background: rgba(255, 215, 0, 0.15);
  color: #FFD700;
  border: 1px solid #FFD700;
}

.alert-content {
  flex: 1;
}

.alert-title {
  color: #fff;
  font-size: 1.2rem;
  margin: 0 0 5px 0;
  font-weight: 700;
}

.alert-message {
  color: #b0b0b0;
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.6;
}

.alert-close {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #b0b0b0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.alert-close:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: scale(1.1);
}

.alert-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  animation: progress linear forwards;
}

.success .alert-progress {
  color: #10b981;
}

.error .alert-progress {
  color: #ef4444;
}

.warning .alert-progress {
  color: #f59e0b;
}

.info .alert-progress {
  color: #3b82f6;
}

.confirm .alert-progress {
  color: #FFD700;
}

/* أزرار التأكيد */
.alert-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.btn-confirm {
  flex: 2;
  padding: 12px;
  background: linear-gradient(145deg, #FFD700, #FFA500);
  border: none;
  border-radius: 12px;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cancel:hover {
  border-color: #FFD700;
  color: #FFD700;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 480px) {
  .alert-container {
    padding: 20px;
  }
  
  .alert-icon {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .alert-title {
    font-size: 1.1rem;
  }
  
  .alert-message {
    font-size: 0.9rem;
  }
}
</style>