import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { authAPI } from '../src/lib/api'
import { useAuthStore } from '../src/store/authStore'

export default function Register() {
  const router = useRouter()
  const { login, hydrate, hydrated, isAuthenticated } = useAuthStore()
  const [fullName, setFullName] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrate, hydrated])

  useEffect(() => {
    if (hydrated && isAuthenticated()) router.replace('/dashboard')
  }, [hydrated, isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await authAPI.register(email, password, fullName, schoolName)
      login(res.data.user, res.data.access_token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Kayıt başarısız. Tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Ücretsiz Hesap Oluştur</h1>
            <p className="text-gray-500 mt-1">İlk 10 analiz tamamen ücretsiz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ahmet Yılmaz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Okul Adı <span className="text-gray-400">(opsiyonel)</span></label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Atatürk Anadolu Lisesi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="ornek@okul.edu.tr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="En az 6 karakter"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? 'Hesap oluşturuluyor...' : 'Ücretsiz Başla'}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Zaten hesabın var mı?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline font-semibold">
              Giriş Yap
            </Link>
          </p>
          <p className="text-center text-gray-400 text-xs mt-3">
            Kayıt olarak kullanım koşullarını kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  )
}
