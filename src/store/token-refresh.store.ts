import { authService } from "@/services"
import { apiClient } from "@/services/api.client"
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { create } from "zustand"

/**
 * 토큰 갱신 중에 들어온 요청을 저장할 큐 아이템 타입
 * @property resolve - 요청 성공 시 호출될 Promise resolver
 * @property reject - 요청 실패 시 호출될 Promise rejecter
 * @property config - 원래 요청의 설정 정보
 */
type QueueItem = {
  resolve: (value: AxiosResponse) => void
  reject: (error: Error) => void
  config: InternalAxiosRequestConfig
}

/**
 * 토큰 갱신 관련 상태
 * @property isRefreshing - 현재 토큰 갱신 중인지 여부
 * @property failedQueue - 갱신 중에 들어온 요청들의 큐
 */
type TokenRefreshState = {
  isRefreshing: boolean
  failedQueue: QueueItem[]
  handleRefresh: (config: InternalAxiosRequestConfig) => Promise<AxiosResponse>
}

/**
 * 토큰 갱신 관련 상태를 관리하는 Zustand store
 *
 * 주요 기능:
 * 1. 토큰 갱신 중 중복 요청 방지
 * 2. 갱신 중 들어온 요청 큐잉
 * 3. 갱신 성공 시 큐에 있는 요청들 자동 재시도
 * 4. 갱신 실패 시 적절한 에러 처리
 */
export const useTokenRefreshStore = create<TokenRefreshState>((set, get) => ({
  isRefreshing: false,
  failedQueue: [],

  handleRefresh: async (config: InternalAxiosRequestConfig) => {
    const currentState = get()

    // 이미 갱신 중이면 큐에 추가하고 대기
    if (currentState.isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        set({
          failedQueue: [...currentState.failedQueue, { resolve, reject, config }],
        })
      })
    }

    set({ isRefreshing: true })

    try {
      // 토큰 갱신
      await authService.refresh()

      // 현재 요청 먼저 실행
      const currentResponse = await apiClient(config)

      // 그 다음 큐에 있는 요청들 순차적으로 재시도
      const { failedQueue } = get()
      for (const { resolve, config } of failedQueue) {
        const response = await apiClient(config)
        resolve(response)
      }

      return currentResponse
    } catch (error) {
      const refreshError = error instanceof Error ? error : new Error("Failed to refresh token")

      // 큐에 있는 모든 요청에 대해 실패 처리
      const { failedQueue } = get()
      for (const { reject } of failedQueue) {
        reject(refreshError)
      }
      await authService.signout()
      throw refreshError
    } finally {
      set({ isRefreshing: false, failedQueue: [] })
    }
  },
}))
