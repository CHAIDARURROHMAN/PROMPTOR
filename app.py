# app.py (Backend Python menggunakan Flask)

# Import library yang diperlukan
import os
from flask import Flask, request, jsonify
from flask_cors import CORS # Penting untuk mengizinkan akses dari Frontend
from google import genai 

# --- KONFIGURASI APLIKASI ---
# Menginisialisasi aplikasi Flask
app = Flask(__name__)
# Mengizinkan akses dari frontend (penting saat development)
CORS(app) 

# Mengatur Kunci API Gemini
# Catatan: Kunci API Anda harus disimpan sebagai variabel lingkungan (GEMINI_API_KEY)
# agar tidak terlihat di kode.
try:
    gemini_client = genai.Client() # Klien akan otomatis mencari kunci dari env
    print("Koneksi Gemini API berhasil diinisialisasi.")
except Exception as e:
    print(f"ERROR: Gagal inisialisasi Gemini Client: {e}")
    print("Pastikan Anda sudah mengatur variabel lingkungan GEMINI_API_KEY.")

# --- INSTRUKSI SISTEM UNTUK SPESIALISASI ---
# Ini adalah instruksi yang membuat bot Anda spesifik untuk guru
SYSTEM_INSTRUCTION = (
    "Anda adalah Promptor, Asisten AI Khusus Guru di Indonesia. "
    "Fokus Anda adalah Digitalisasi Pembelajaran, AI, dan Kurikulum Merdeka. "
    "Jawablah dengan sopan dan edukatif. "
    "Tolak semua pertanyaan yang jelas di luar topik (misalnya teknis kendaraan, gosip, atau keuangan) dengan mengarahkan kembali ke topik pendidikan."
)

# --- ENDPOINT API ---
@app.route('/api/promptor', methods=['POST'])
def handle_prompt():
    """Menangani permintaan POST dari frontend (script.js)"""
    
    # 1. Ambil data prompt dari JSON
    data = request.get_json()
    user_prompt = data.get('prompt', '').strip()

    if not user_prompt:
        return jsonify({'jawaban': 'Mohon masukkan pertanyaan.'}), 400

    try:
        # 2. Kirim Prompt ke Model Gemini
        model_name = "gemini-2.5-flash" # Model cepat dan efisien
        
        response = gemini_client.models.generate_content(
            model=model_name,
            contents=[user_prompt],
            config={
                "system_instruction": SYSTEM_INSTRUCTION
            }
        )
        
        # 3. Ambil teks jawaban dan kirim kembali ke frontend
        return jsonify({'jawaban': response.text})
    
    except Exception as e:
        # 4. Tangani jika ada masalah komunikasi dengan server Gemini
        print(f"Gemini API Error: {e}")
        return jsonify({'jawaban': 'Maaf, terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi.'}), 500

if __name__ == '__main__':
    # Menjalankan server Flask
    # Catatan: Pada produksi, gunakan WSGI server (Gunicorn/uWSGI)
    app.run(debug=True, port=5000)
