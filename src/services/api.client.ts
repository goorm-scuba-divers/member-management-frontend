import { useAuthStore } from "@/store/auth.store"
import { useTokenRefreshStore } from "@/store/token-refresh.store"
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"

// API 클라이언트 설정
export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    contentType: "application/json",
  },
  withCredentials: true,
  timeout: 5000, // 모든 요청에 5초 타임아웃 적용
})

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { status } = error.response || {}
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401: 인증 실패시 로그아웃
    if (status === 401) {
      console.error("[API CLIENT]: Unauthorized access")
      useAuthStore.getState().signout()
      return Promise.reject(error)
    }

    // 403: 토큰 만료시 갱신 시도
    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      return useTokenRefreshStore.getState().handleRefresh(originalRequest)
    }

    // 기타 에러 로깅
    console.error("[API CLIENT ERROR]:", {
      status,
      message: error.message,
      url: originalRequest.url,
      method: originalRequest.method,
    })
    return Promise.reject(error)
  }
)
