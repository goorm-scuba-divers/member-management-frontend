import axios from "axios"

export const api = axios.create({
  baseURL: "/api",
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
})
