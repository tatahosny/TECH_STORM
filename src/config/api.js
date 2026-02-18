import axios from 'axios';

const api = axios.create({
    baseURL: 'https://techstorm.kesug.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 10000, // 10 ثواني timeout
});

// إضافة token للطلبات
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('📤 API Request:', config.method.toUpperCase(), config.url);
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
            console.error('❌ Response Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('❌ No Response:', error.request);
        } else {
            console.error('❌ Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
