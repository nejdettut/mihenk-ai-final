import Link from 'next/link'
import Navbar from '../src/components/Navbar'

const features = [
  {
    icon: '🤖',
    title: 'Yapay Zeka Analizi',
    desc: 'Gemini AI ile sınav kağıdını saniyeler içinde okur, her soruyu değerlendirir.',
  },
  {
    icon: '📊',
    title: 'Detaylı Rapor',
    desc: 'PDF rapor ile öğrenci bazlı puan, doğru/yanlış dağılımı ve öneriler.',
  },
  {
    icon: '🏫',
    title: 'Sınıf Yönetimi',
    desc: 'Birden fazla sınıf ve öğrenci ekle, tüm analizleri tek panelden takip et.',
  },
]

const plans = [
  {
    name: 'Ücretsiz',
    price: '₺0',
    period: '/ay',
    features: ['10 analiz/ay', '1 sınıf', 'PDF rapor', 'Email destek'],
    cta: 'Başla',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Standart',
    price: '₺99',
    period: '/ay',
    features: ['100 analiz/ay', '5 sınıf', 'PDF + DOCX rapor', 'Öncelikli destek'],
    cta: 'Şimdi Başla',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Kurumsal',
    price: '₺999',
    period: '/ay',
    features: ['Sınırsız analiz', 'Sınırsız sınıf', 'Toplu analiz', 'Özel entegrasyon'],
    cta: 'İletişime Geç',
    href: '/register',
    highlight: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🚀 Türkiye'nin ilk AI tabanlı sınav analiz platformu
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Sınavları Yapay Zeka ile<br />
            <span className="text-yellow-300">Saniyeler İçinde</span> Değerlendir
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Sınav fotoğrafını yükle, Mihenk.ai anında puan hesaplar, detaylı pedagojik geri bildirim ve PDF rapor oluşturur.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
            >
              Ücretsiz Başla
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition"
            >
              Demo Gör
            </Link>
          </div>
          <p className="text-indigo-200 text-sm mt-4">Kredi kartı gerekmez · İlk 10 analiz ücretsiz</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Neden Mihenk.ai?</h2>
            <p className="text-gray-500 text-lg">Öğretmenin zamanını geri kazandırıyoruz</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-14">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Fotoğraf Yükle', desc: 'Sınav kağıdını fotoğrafla veya tara' },
              { step: '2', title: 'AI Analiz', desc: 'Gemini AI cevapları otomatik okur' },
              { step: '3', title: 'Puanlama', desc: 'Cevap anahtarıyla kıyasla, puan hesapla' },
              { step: '4', title: 'Rapor Al', desc: 'PDF raporu indir veya paylaş' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Fiyatlandırma</h2>
            <p className="text-gray-500">İhtiyacınıza göre esnek planlar</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 flex flex-col ${
                  plan.highlight
                    ? 'border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-200'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-6">
                  <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-600'}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={plan.highlight ? 'text-yellow-300' : 'text-indigo-500'}>✓</span>
                      <span className={plan.highlight ? 'text-indigo-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`text-center py-3 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? 'bg-white text-indigo-700 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold text-xl">Mihenk.ai</span>
          <p className="text-sm">© 2026 Mihenk.ai — Tüm hakları saklıdır.</p>
          <p className="text-sm">Geliştirici: Nejdet TUT</p>
        </div>
      </footer>
    </div>
  )
}
