import { defineStore } from 'pinia';
import api from '@/config/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        loading: false,
        error: null,
        permissions: {}
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.user?.role || null,
        userDepartment: (state) => state.user?.section?.name || null,
        userSubSections: (state) => state.user?.sub_sections || [],
        
        // صلاحيات المستخدم
        canManageUsers: (state) => state.permissions?.can_manage_users || false,
        canManageTasks: (state) => state.permissions?.can_manage_tasks || false,
        canViewAllTasks: (state) => state.permissions?.can_view_all_tasks || false,
        canViewStatistics: (state) => state.permissions?.can_view_statistics || false,
        isTeamLeader: (state) => state.permissions?.is_team_leader || false,
        isDeputyLeader: (state) => state.permissions?.is_deputy_leader || false,
        isSectionLeader: (state) => state.permissions?.is_section_leader || false,
        
        // للتحقق من صلاحية إنشاء المهام
        canCreateTasks: (state) => {
            return state.permissions?.can_manage_tasks || 
                   state.permissions?.is_team_leader || 
                   state.permissions?.is_deputy_leader ||
                   state.permissions?.is_section_leader;
        }
    },

    actions: {
        async login(email, password) {
            this.loading = true;
            this.error = null;
            
            try {
                const response = await api.post('/login', { email, password });
                
                if (response.data.success) {
                    this.token = response.data.token;
                    this.user = response.data.user;
                    this.permissions = response.data.permissions;
                    
                    localStorage.setItem('auth_token', this.token);
                    localStorage.setItem('user', JSON.stringify(this.user));
                    
                    return { success: true };
                }
            } catch (error) {
                this.error = error.response?.data?.error || 'حدث خطأ في تسجيل الدخول';
                return { success: false, error: this.error };
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                await api.post('/logout');
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                this.token = null;
                this.user = null;
                this.permissions = {};
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                router.push('/login');
            }
        },

        async fetchUser() {
            this.loading = true;
            try {
                const response = await api.get('/me');
                if (response.data.success) {
                    this.user = response.data.user;
                    this.permissions = response.data.permissions;
                }
            } catch (error) {
                console.error('Fetch user error:', error);
                await this.logout();
            } finally {
                this.loading = false;
            }
        },

        loadFromStorage() {
            const token = localStorage.getItem('auth_token');
            const user = localStorage.getItem('user');
            
            if (token && user) {
                this.token = token;
                this.user = JSON.parse(user);
                this.fetchUser(); // تحديث بيانات المستخدم من السيرفر
            }
        }
    }
});