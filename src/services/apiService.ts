import axios from "axios"

export const apiService = axios.create({
  baseURL: "/api",
  headers: {
    accept: "*/*",
    contentType: "application/json",
  },
  withCredentials: true,
})

apiService.interceptors.response.use(
  response => response,
  error => {
    console.error("[API ERROR]: ", error.response?.data || error.message)
    return Promise.reject(error)
  }
)
