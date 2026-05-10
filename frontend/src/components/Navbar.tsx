import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const router = useRouter()
  const { user, logout, hydrate, hydrated } = useAuthStore()

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrate, hydrated])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">Mihenk.ai</span>
        </Link>

        <div className="flex items-center gap-4">
          {hydrated && user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/analyze" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Analiz Et
              </Link>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-500 text-sm">{user.full_name || user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
              >
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold transition"
              >
                Ücretsiz Başla
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
