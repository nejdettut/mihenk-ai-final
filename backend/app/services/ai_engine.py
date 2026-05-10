import asyncio
import google.generativeai as genai
from groq import Groq
from app.core.config import settings
import json


class MihenkEngine:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.gemini_model = genai.GenerativeModel("gemini-1.5-flash")
        self.groq_client = Groq(api_key=settings.GROQ_API_KEY)

    async def analiz_et(self, image_bytes: bytes, answer_key: dict):
        """
        1. Gemini ile görüntüyü metne çevir ve ham analizi al.
        2. Groq ile analizi rafine et ve JSON'u mükemmelleştir.
        """
        gemini_prompt = f"""
        Sen uzman bir öğretmensin. Sınav kağıdını OCR yaparak oku.
        Cevap Anahtarı: {json.dumps(answer_key)}
        Görseldeki cevapları bu anahtarla kıyasla.
        Her soru için öğrencinin cevabı, doğruluk durumu ve puanı belirle.
        Çıktıyı sadece JSON olarak ver.
        """
        image_part = {"mime_type": "image/jpeg", "data": image_bytes}

        # Sync SDK çağrılarını thread pool'da çalıştır (event loop'u bloke etmez)
        gemini_response = await asyncio.to_thread(
            self.gemini_model.generate_content, [gemini_prompt, image_part]
        )
        raw_text = gemini_response.text

        groq_prompt = f"""
        Aşağıdaki ham sınav verisini al ve öğrenciye özel motive edici,
        pedagojik bir geri bildirim ekle. Puan hesaplamasını kontrol et.

        Veri: {raw_text}

        Format:
        {{
            "toplam_puan": 0,
            "soru_bazli_analiz": [],
            "ogretmen_notu": "Pedagojik not"
        }}
        """

        groq_chat = await asyncio.to_thread(
            self.groq_client.chat.completions.create,
            messages=[{"role": "user", "content": groq_prompt}],
            model="llama3-70b-8192",
            response_format={"type": "json_object"},
        )

        return json.loads(groq_chat.choices[0].message.content)
