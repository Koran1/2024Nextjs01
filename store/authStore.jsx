import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user: null,                 // 사용자 정보
    token: null,                // JWT 정보
    isAuthenticated: false,    // 로그인 여부

    // 처리
    login: (user, token) => set(({ user, token, isAuthenticated: true })),
    logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false
    })
}))

export default useAuthStore;
