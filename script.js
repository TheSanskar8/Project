window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Your browser does not support Speech Recognition API");
} else {
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const saveBtn = document.getElementById('saveBtn');
    const speechText = document.getElementById('speechText');
    const notesList = document.getElementById('notesList');

    recognition.addEventListener('result', (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        speechText.value = transcript;
    });

    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    saveBtn.addEventListener('click', () => {
        const note = speechText.value.trim();
        if (note) {
            const li = document.createElement('li');
            li.textContent = note;
            notesList.appendChild(li);
            speechText.value = '';
        }
    });
}
