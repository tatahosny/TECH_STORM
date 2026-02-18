import axios from 'axios';

// تحديد الـ baseURL حسب البيئة
const getBaseURL = () => {
    // لو في production (Vercel)
    if (import.meta.env.PROD) {
        // استخدم مسار relative عشان الـ rewrites تشتغل
        return '/api';
    }
    // لو في development (local)
    return 'http://TECHSTORM.kesug.com/api';
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 30000, // زودنا الوقت شوية عشان الإنترنت البطئ
});

// إضافة token للطلبات
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // للـ development بنظهر الرابط كامل
        if (!import.meta.env.PROD) {
            console.log('📤 API Request:', config.method.toUpperCase(), config.baseURL + config.url);
        } else {
            console.log('📤 API Request:', config.method.toUpperCase(), config.url);
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// معالجة الردود
api.interceptors.response.use(
    (response) => {
        console.log('📥 API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            // مشكلة من السيرفر
            console.error('❌ Response Error:', error.response.status, error.response.data);
            
            // لو الـ token منتهي صلاحيته (401)
            if (error.response.status === 401) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // مشكلة في الشبكة
            console.error('❌ No Response from server. Check if server is running:', error.request);
            
            // عرض رسالة للمستخدم
            if (import.meta.env.PROD) {
                alert('❌ مشكلة في الاتصال بالسيرفر. تأكد من تشغيل السيرفر.');
            }
        } else {
            // مشكلة تانية
            console.error('❌ Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
