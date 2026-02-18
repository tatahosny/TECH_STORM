import axios from 'axios'
import { getAuth } from 'firebase/auth'

const laravelApi = axios.create({
  baseURL: process.env.VUE_APP_LARAVEL_URL || 'http://localhost:8000/api',
  timeout: 15000
})

// Interceptor: إضافة Firebase ID Token لكل طلب
laravelApi.interceptors.request.use(async (config) => {
  const auth = getAuth()
  const user = auth.currentUser
  
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

export default laravelApi