import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mihenk_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/v1/auth/login', { email, password }),
  register: (email: string, password: string, full_name: string, school_name: string) =>
    api.post('/api/v1/auth/register', { email, password, full_name, school_name }),
  me: () => api.get('/api/v1/auth/me'),
}

export const analyzeAPI = {
  fullAnalysis: (formData: FormData) =>
    api.post('/api/v1/analyze/full-analysis', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export default api
