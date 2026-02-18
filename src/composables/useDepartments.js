// src/composables/useDepartments.js
import { ref, computed } from 'vue'
import axios from 'axios'

export function useDepartments() {
  const departments = ref([])
  const loading = ref(false)
  const error = ref(null)

  // جلب كل الأقسام
  const fetchDepartments = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('http://localhost:8000/api/show-sections')
      if (response.data.success) {
        departments.value = response.data.data || []
      }
    } catch (err) {
      console.error('Error fetching departments:', err)
      error.value = 'حدث خطأ في جلب الأقسام'
    } finally {
      loading.value = false
    }
  }

  // جلب قسم معين
  const fetchDepartment = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`http://localhost:8000/api/sections/${id}`)
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Error fetching department:', err)
      error.value = 'حدث خطأ في جلب القسم'
    } finally {
      loading.value = false
    }
  }

  // إنشاء قسم جديد
  const createDepartment = async (departmentData) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post('http://localhost:8000/api/sections', departmentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        await fetchDepartments() // تحديث القائمة
        return { success: true, data: response.data.data }
      }
    } catch (err) {
      console.error('Error creating department:', err)
      error.value = 'حدث خطأ في إنشاء القسم'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // تحديث قسم
  const updateDepartment = async (id, departmentData) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.put(`http://localhost:8000/api/sections/${id}`, departmentData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        await fetchDepartments() // تحديث القائمة
        return { success: true, data: response.data.data }
      }
    } catch (err) {
      console.error('Error updating department:', err)
      error.value = 'حدث خطأ في تحديث القسم'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // حذف قسم
  const deleteDepartment = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.delete(`http://localhost:8000/api/sections/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        await fetchDepartments() // تحديث القائمة
        return { success: true }
      }
    } catch (err) {
      console.error('Error deleting department:', err)
      error.value = 'حدث خطأ في حذف القسم'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // تعيين رئيس لقسم
  const assignLeader = async (sectionId, userId) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(`http://localhost:8000/api/sections/${sectionId}/assign-leader`, {
        user_id: userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        await fetchDepartments() // تحديث القائمة
        return { success: true, data: response.data.data }
      }
    } catch (err) {
      console.error('Error assigning leader:', err)
      error.value = 'حدث خطأ في تعيين رئيس القسم'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // جلب الأعضاء المتاحين لرئاسة قسم
  const fetchAvailableLeaders = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('http://localhost:8000/api/sections/available-leaders')
      if (response.data.success) {
        return response.data.data || []
      }
    } catch (err) {
      console.error('Error fetching available leaders:', err)
      error.value = 'حدث خطأ في جلب رؤساء الأقسام المتاحين'
      return []
    } finally {
      loading.value = false
    }
  }

  // جلب إحصائيات القسم
  const fetchDepartmentStats = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get(`http://localhost:8000/api/sections/${id}/statistics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        return response.data.data
      }
    } catch (err) {
      console.error('Error fetching department stats:', err)
      error.value = 'حدث خطأ في جلب إحصائيات القسم'
    } finally {
      loading.value = false
    }
  }

  // جلب أعضاء القسم
  const fetchDepartmentMembers = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`http://localhost:8000/api/sections/${id}/members`)
      if (response.data.success) {
        return response.data.data || []
      }
    } catch (err) {
      console.error('Error fetching department members:', err)
      error.value = 'حدث خطأ في جلب أعضاء القسم'
      return []
    } finally {
      loading.value = false
    }
  }

  // تحديث الأقسام الفرعية
  const updateSubSections = async (id, subSections) => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.put(`http://localhost:8000/api/sections/${id}/sub-sections`, {
        sub_sections: subSections
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        await fetchDepartments() // تحديث القائمة
        return { success: true, data: response.data.data }
      }
    } catch (err) {
      console.error('Error updating sub-sections:', err)
      error.value = 'حدث خطأ في تحديث الأقسام الفرعية'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    departments,
    loading,
    error,

    // Methods
    fetchDepartments,
    fetchDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    assignLeader,
    fetchAvailableLeaders,
    fetchDepartmentStats,
    fetchDepartmentMembers,
    updateSubSections,

    // Computed
    departmentsCount: computed(() => departments.value.length),
    activeDepartments: computed(() => departments.value.filter(d => d.status !== 'inactive')),
  }
}