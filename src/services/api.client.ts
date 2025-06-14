import { useAuthStore } from "@/store/auth.store"
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    contentType: "application/json",
  },
  withCredentials: true,
})

let isRefreshing = false

let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: Error | null) => {
  // 큐에 있는 모든 요청 처리
  for (const request of failedQueue) {
    if (error) {
      request.reject(error)
    } else {
      request.resolve(null)
    }
  }

  failedQueue = []
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { status } = error.response || {}

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // UNAUTHORIZED
    if (status === 401) {
      useAuthStore.getState().signout()
      return Promise.reject(error)
    }

    // FORBIDDEN
    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then(() => apiClient(originalRequest))
          .catch(err => Promise.reject(err))
      }
      try {
        isRefreshing = true
        await apiClient.post("/auth/reissue")
        processQueue(null)
        isRefreshing = false
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as Error)
        useAuthStore.getState().signout()
        isRefreshing = false
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
