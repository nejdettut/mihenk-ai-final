import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../src/components/Navbar'
import { useAuthStore } from '../src/store/authStore'
import { analyzeAPI } from '../src/lib/api'

interface AnalysisResult {
  score: number
  message: string
  report_url?: string
  analysis?: {
    toplam_puan: number
    ogretmen_notu: string
    soru_bazli_analiz: any[]
  }
}

export default function Analyze() {
  const router = useRouter()
  const { hydrate, hydrated, isAuthenticated } = useAuthStore()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [studentName, setStudentName] = useState('')
  const [subject, setSubject] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrate, hydrated])

  useEffect(() => {
    if (hydrated && !isAuthenticated()) router.replace('/login')
  }, [hydrated, isAuthenticated, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setFile(f)
    setResult(null)
    setError('')
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('exam_id', 'test-exam-id')
    formData.append('student_id', 'test-student-id')
    if (studentName) formData.append('student_name', studentName)
    if (subject) formData.append('subject', subject)
    if (gradeLevel) formData.append('grade_level', gradeLevel)

    try {
      const res = await analyzeAPI.fullAnalysis(formData)
      setResult(res.data)
    } catch (err: any) {
      setError(err?.response?.data?.detail || err?.message || 'Analiz başarısız. Tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sınav Analizi</h1>
          <p className="text-gray-500 mt-1">Sınav fotoğrafını yükle, AI saniyeler içinde değerlendirsin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sınav Fotoğrafı *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition cursor-pointer"
                onClick={() => document.getElementById('fileInput')?.click()}>
                {preview ? (
                  <img src={preview} alt="Önizleme" className="max-h-48 mx-auto rounded-lg object-contain" />
                ) : (
                  <div>
                    <p className="text-4xl mb-3">📸</p>
                    <p className="text-gray-500">Fotoğraf seçmek için tıklayın</p>
                    <p className="text-sm text-gray-400 mt-1">JPG, PNG · Maks 10MB</p>
                  </div>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              {file && <p className="text-sm text-gray-500 mt-2">Seçilen: {file.name}</p>}
            </div>

            {/* Student info */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Öğrenci Adı</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Ali Veli"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ders</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="Matematik"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sınıf</label>
                <input
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  placeholder="9"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Yapay Zeka Analiz Ediyor...
                </>
              ) : (
                '🤖 Sınavı Analiz Et'
              )}
            </button>
          </form>

          {/* Result */}
          {result && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h3 className="text-green-800 font-bold text-lg">Analiz Tamamlandı!</h3>
                  <p className="text-green-600 text-sm">{result.message}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 mb-4">
                <p className="text-gray-500 text-sm mb-1">Toplam Puan</p>
                <p className="text-5xl font-extrabold text-indigo-600">{result.score}</p>
                <p className="text-gray-400 text-sm">/ 100</p>
              </div>

              {result.analysis?.ogretmen_notu && (
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Öğretmen Notu</p>
                  <p className="text-gray-600 text-sm">{result.analysis.ogretmen_notu}</p>
                </div>
              )}

              {result.report_url && (
                <a
                  href={`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}${result.report_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition text-sm"
                >
                  📄 PDF Raporu İndir
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
