const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Definisikan kata kunci dan respons
const keywordResponses = {
    "halo": "Halo, Ada yang bisa dibantu?",
    "saya ingin mendaftar": "Anda dapat mendaftar melalui situs web kami atau mengunjungi meja pendaftaran di rumah sakit.",
    "saya ingin menanyakan jadwal": "Jadwal dokter dapat dilihat di halaman jadwal kami.",
    "biayanya berapa?": "Biaya perawatan tergantung pada jenis layanan yang Anda pilih. Silakan hubungi kami untuk informasi lebih lanjut.",
    "saya ingin melaporkan keluhan yang saya alami": "Silakan sampaikan keluhan Anda, dan kami akan segera membantu."
};

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value;
    if (message.trim() === '') return;

    appendMessage(message, 'user');
    userInput.value = '';

    // Cek kata kunci dalam pesan pengguna
    const response = getResponseBasedOnKeyword(message);
    setTimeout(() => {
        appendMessage(response, 'admin');
    }, 1000);
}

function getResponseBasedOnKeyword(message) {
    // Cek setiap kata kunci
    for (const keyword in keywordResponses) {
        if (message.toLowerCase().includes(keyword)) {
            return keywordResponses[keyword];
        }
    }
    return "Maaf, saya tidak mengerti pertanyaan Anda. Silakan coba lagi.";
}

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}