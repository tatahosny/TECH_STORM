// src/services/api.js  (أو أي مسار انت مستخدمه)
import axios from "axios";

// ✅ اقرا الـ API URL من Vercel ENV لو موجودة، وإلا fallback
const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 ثانية
  // ❌ مهم: طالما Bearer Token لا تستخدم cookies
  withCredentials: false,
});

// ✅ Request Interceptor: يضيف Bearer Token تلقائيًا
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");

    // لو فيه token ضيفه
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // تأكد إن الهيدر مش موجود بالغلط
      if (config.headers.Authorization) delete config.headers.Authorization;
    }

    // ✅ لو انت بتبعت FormData، سيب Content-Type للمتصفح يحدده
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    // ✅ Log مفيد للتشخيص
    const method = (config.method || "GET").toUpperCase();
    const fullUrl = `${config.baseURL || ""}${config.url || ""}`;
    console.log("📤 API Request:", method, fullUrl);

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor: لوج + معالجة أخطاء شائعة
api.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    // لو السيرفر رد
    if (error.response) {
      const { status, data } = error.response;

      console.error("❌ Response Error:", status, data);

      // مثال: لو توكن انتهت
      if (status === 401) {
        // اختياري: امسح التوكن
        // localStorage.removeItem("auth_token");
      }
    }
    // لو الطلب اتبعت ومفيش رد (شبكة/CORS/SSL/timeout)
    else if (error.request) {
      console.error("❌ No Response (Network/CORS/SSL/Timeout):", error.message);
    }
    // أي خطأ تاني
    else {
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

/* =========================
   ✅ Helper functions (اختياري)
   ========================= */

// مثال استخدام جاهز:
// import api, { setAuthToken, clearAuthToken } from "@/services/api";

export const setAuthToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("auth_token");
};

