// src/composables/useAlert.js
import { ref } from 'vue'

const alertState = ref({
  visible: false,
  type: 'info',
  title: '',
  message: '',
  duration: 5000,
  showProgress: true,
  resolve: null
})

export function useAlert() {
  const showAlert = (options) => {
    return new Promise((resolve) => {
      alertState.value = {
        visible: true,
        type: options.type || 'info',
        title: options.title || getDefaultTitle(options.type),
        message: options.message,
        duration: options.duration || 5000,
        showProgress: options.showProgress !== false,
        resolve
      }
    })
  }

  const getDefaultTitle = (type) => {
    const titles = {
      success: 'تم بنجاح',
      error: 'خطأ',
      warning: 'تحذير',
      info: 'معلومة',
      confirm: 'تأكيد'
    }
    return titles[type] || 'تنبيه'
  }

  const closeAlert = () => {
    if (alertState.value.resolve) {
      alertState.value.resolve(false)
    }
    alertState.value.visible = false
  }

  const confirmAlert = () => {
    if (alertState.value.resolve) {
      alertState.value.resolve(true)
    }
    alertState.value.visible = false
  }

  return {
    alertState,
    showAlert,
    closeAlert,
    confirmAlert
  }
}