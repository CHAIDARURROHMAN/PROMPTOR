// script.js
function kirimPesanSimulasi() {
    const inputElement = document.getElementById('userInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const sendButton = document.getElementById('sendButton');
    
    const pertanyaan = inputElement.value.trim();
    const pertanyaanLower = pertanyaan.toLowerCase();

    if (!pertanyaan) return;

    // 1. Tampilkan pesan user
    chatDisplay.innerHTML += `<div class="pesan-user">${pertanyaan}</div>`;
    
    // 2. Siapkan tampilan input saat menunggu jawaban
    inputElement.value = '';
    sendButton.disabled = true; 
    inputElement.placeholder = 'Promptor sedang berpikir...';
    chatDisplay.scrollTop = chatDisplay.scrollHeight; 

    // ------------------- LOGIKA RESPON (SIMULASI AI) -------------------
    let jawaban = '';

    // A. Logic Pertanyaan di Luar Topik (Off-Topic Guardrail)
    if (pertanyaanLower.includes('motor') || pertanyaanLower.includes('masak') || pertanyaanLower.includes('cuaca') || pertanyaanLower.includes('berita')) {
        jawaban = '🚫 **Mohon maaf, fokus Promptor adalah pada Digitalisasi Pembelajaran.** Saya tidak memiliki data tentang hal di luar pendidikan. Silakan ajukan pertanyaan yang relevan.';
    } 
    // B. Logic Pertanyaan Pendidikan Spesifik (Rule-Based)
    else if (pertanyaanLower.includes('rpp') && pertanyaanLower.includes('ai')) {
        jawaban = 'Ide *prompt* untuk RPP: Tentukan tujuan pembelajaran, lalu minta AI membuat skenario *ice breaking* dan 3 soal HOTS formatif.';
    } else if (pertanyaanLower.includes('kurikulum merdeka') || pertanyaanLower.includes('p5')) {
        jawaban = 'Kurikulum Merdeka menekankan pada **Pembelajaran Mendalam** dan **Projek P5**. Untuk panduan, silakan kunjungi [Portal Guru Kemendikbud].';
    } else if (pertanyaanLower.includes('coding') || pertanyaanLower.includes('pemrograman')) {
        jawaban = 'Memperkenalkan *coding* ke siswa bisa dimulai dengan *tool* visual seperti **Scratch** atau **Code.org**. Ini melatih pemikiran logis.';
    } 
    // C. Logic Fallback (Jawaban Default)
    else {
        jawaban = 'Maaf, saya belum diprogram untuk menjawab pertanyaan tersebut secara spesifik. Silakan coba ajukan pertanyaan yang lebih fokus pada **AI atau Digitalisasi Pembelajaran**.';
    }
    // ------------------------------------------------------------------

    // 3. Tampilkan jawaban bot setelah jeda (simulasi loading)
    setTimeout(() => {
        chatDisplay.innerHTML += `<div class="pesan-bot">${jawaban}</div>`;
        
        // 4. Aktifkan kembali input
        sendButton.disabled = false;
        inputElement.placeholder = 'Ketik pertanyaan Anda...';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 800); 
}
