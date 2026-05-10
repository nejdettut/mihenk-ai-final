import { create } from 'zustand'

interface User {
  email: string
  full_name: string
  school_name?: string
}

interface AuthState {
  user: User | null
  token: string | null
  hydrated: boolean
  hydrate: () => void
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  hydrated: false,

  hydrate: () => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('mihenk_token')
    const userStr = localStorage.getItem('mihenk_user')
    const user = userStr ? JSON.parse(userStr) : null
    set({ user, token, hydrated: true })
  },

  login: (user, token) => {
    localStorage.setItem('mihenk_token', token)
    localStorage.setItem('mihenk_user', JSON.stringify(user))
    set({ user, token, hydrated: true })
  },

  logout: () => {
    localStorage.removeItem('mihenk_token')
    localStorage.removeItem('mihenk_user')
    set({ user: null, token: null })
  },

  isAuthenticated: () => !!get().token,
}))
