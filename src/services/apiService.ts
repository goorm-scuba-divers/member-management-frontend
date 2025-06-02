import axios from "axios"

export const apiService = axios.create({
  baseURL: "/api",
  headers: {
    accept: "*/*",
    contentType: "application/json",
  },
})

apiService.interceptors.response.use(
  response => response,
  error => {
    console.error("[AXIOS INTERCEPTOR ERROR]: ", error.response)
    return Promise.reject(error)
  }
)
