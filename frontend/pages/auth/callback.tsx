import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../src/lib/supabase'
import { useAuthStore } from '../../src/store/authStore'

export default function AuthCallback() {
  const router = useRouter()
  const { login } = useAuthStore()

  useEffect(() => {
    const handle = async () => {
      // PKCE flow: exchange code for session
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        login(
          {
            email: session.user.email || '',
            full_name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email ||
              '',
            school_name: '',
          },
          session.access_token
        )
        router.replace('/dashboard')
        return
      }

      // Implicit flow fallback: parse hash fragment
      const hash = window.location.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1))
        const token = params.get('access_token')
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            login(
              {
                email: payload.email || '',
                full_name: payload.user_metadata?.full_name || payload.user_metadata?.name || payload.email || '',
              },
              token
            )
            router.replace('/dashboard')
            return
          } catch {}
        }
      }

      router.replace('/login?error=google_failed')
    }

    handle()
  }, [login, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Google ile giriş yapılıyor...</p>
      </div>
    </div>
  )
}
