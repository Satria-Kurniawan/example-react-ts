import axios, { AxiosError } from "axios"

// simpan di env biar aman
const apiBaseUrl = "https://62a7032797b6156bff84ef49.mockapi.io"

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      setTimeout(() => {
        window.location.href = "/login"
      }, 3000)
    }
    return Promise.reject(error)
  }
)

export default api
