import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useAuthStore } from '../src/store/authStore'

interface Analysis {
  id: string
  student_name: string
  subject: string
  score: number
  date: string
}

const MOCK_ANALYSES: Analysis[] = [
  { id: '1', student_name: 'Ali Veli', subject: 'Matematik', score: 85, date: '2026-05-08' },
  { id: '2', student_name: 'Ayşe Kaya', subject: 'Türkçe', score: 92, date: '2026-05-07' },
  { id: '3', student_name: 'Mehmet Demir', subject: 'Fen Bilimleri', score: 68, date: '2026-05-06' },
]

export default function Dashboard() {
  const router = useRouter()
  const { user, hydrate, hydrated, isAuthenticated } = useAuthStore()
  const [analyses] = useState<Analysis[]>(MOCK_ANALYSES)

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrate, hydrated])

  useEffect(() => {
    if (hydrated && !isAuthenticated()) router.replace('/login')
  }, [hydrated, isAuthenticated, router])

  if (!hydrated) return null

  const avgScore = analyses.length
    ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Merhaba, {user?.full_name || user?.email} 👋
          </h1>
          <p className="text-gray-500 mt-1">Bugün kaç sınav analiz edeceksiniz?</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Toplam Analiz</p>
            <p className="text-3xl font-bold text-gray-900">{analyses.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Ortalama Puan</p>
            <p className="text-3xl font-bold text-indigo-600">{avgScore}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Bu Ay Kalan Hak</p>
            <p className="text-3xl font-bold text-green-600">{10 - analyses.length}</p>
          </div>
        </div>

        {/* Quick action */}
        <div className="bg-indigo-600 rounded-2xl p-6 flex items-center justify-between mb-10">
          <div>
            <h2 className="text-white font-bold text-lg">Yeni Sınav Analizi Başlat</h2>
            <p className="text-indigo-200 text-sm mt-1">Fotoğraf yükle, AI saniyeler içinde değerlendirsin</p>
          </div>
          <Link
            href="/analyze"
            className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition whitespace-nowrap"
          >
            + Analiz Et
          </Link>
        </div>

        {/* Recent analyses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Son Analizler</h2>
            <span className="text-sm text-gray-400">{analyses.length} kayıt</span>
          </div>

          {analyses.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p>Henüz analiz yok. İlk analizinizi başlatın!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {analyses.map((a) => (
                <div key={a.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {a.student_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{a.student_name}</p>
                      <p className="text-sm text-gray-400">{a.subject} · {a.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-bold ${
                        a.score >= 85 ? 'text-green-600' : a.score >= 60 ? 'text-yellow-600' : 'text-red-500'
                      }`}
                    >
                      {a.score}
                    </span>
                    <span className="text-gray-300">/ 100</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
