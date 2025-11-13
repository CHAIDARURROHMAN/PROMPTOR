async function kirimPesan() {
    const inputElement = document.getElementById('userInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const sendButton = document.getElementById('sendButton');
    const pertanyaan = inputElement.value.trim();

    if (!pertanyaan) return;

    // 1. Tampilkan pesan user
    chatDisplay.innerHTML += `<div class="pesan-user">${pertanyaan}</div>`;
    
    // 2. Bersihkan input dan nonaktifkan tombol saat menunggu
    inputElement.value = '';
    sendButton.disabled = true;
    inputElement.placeholder = 'Promptor sedang berpikir...';
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

    try {
        // 3. Panggil API Backend Python di http://127.0.0.1:5000/api/promptor
        const response = await fetch('http://127.000.1:5000/api/promptor', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: pertanyaan })
        });
        
        const data = await response.json();
        let jawaban = data.jawaban || 'Maaf, terjadi kesalahan saat memproses jawaban.';

        // 4. Tampilkan jawaban dari API
        chatDisplay.innerHTML += `<div class="pesan-bot">${jawaban}</div>`;

    } catch (error) {
        // 5. Tangani error koneksi
        console.error('Fetch Error:', error);
        chatDisplay.innerHTML += `<div class="pesan-bot" style="color:red;">Koneksi Gagal. Pastikan server app.py sudah berjalan.</div>`;
    } finally {
        // 6. Aktifkan kembali input
        sendButton.disabled = false;
        inputElement.placeholder = 'Ketik pertanyaan Anda...';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}
