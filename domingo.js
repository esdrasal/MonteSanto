let currentTimer = null;
let timerInterval = null;
let startTime = '09:55'; // Hora predeterminada

// Actualiza el reloj cada segundo
setInterval(updateClock, 1000);
modificadores.style.display = 'block';

// Actualiza el reloj inmediatamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    // Cambiar al modo de pantalla completa al cargar la página
    requestFullscreen(document.documentElement);

    const modificadores = document.getElementById('modificadores');
    modificadores.style.display = 'none';
});

// Cambiar al modo de pantalla completa cuando se hace clic en la página
document.addEventListener('click', () => {
    requestFullscreen(document.documentElement);
});

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    if (startTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        if (hours === startHours.toString().padStart(2, '0') && minutes === startMinutes.toString().padStart(2, '0') && seconds === '00') {
            startCountdownSequence();
        }
    }
}

function setStartTime() {
    const timeInput = document.getElementById('start-time').value;
    if (timeInput) {
        startTime = timeInput;
        alert(`Hora de inicio establecida a las ${startTime}`);
    } else {
        alert('Por favor, ingresa una hora válida.');
    }
}

function startCountdownSequence() {
    const sequences = [
        { duration: 5 * 60, message: "Iniciamos en:", next: 1 },
        { duration: 5 * 60, message: "Apertura:", next: 2 },
        { duration: 35 * 60, message: "Alabanza:", next: 3 },
        { duration: 5 * 60, message: "Anuncios y transición:", next: 4 },
        { duration: 30 * 60, message: "Estudio Bíblico:", next: 5 },
        { duration: 5 * 60, message: "Ministración:", next: 6 },
        { duration: 10 * 60, message: "Ofrenda y anuncios:", next: 7 },
        { duration: 0, message: "El servicio ha concluido", next: null }
    ];

    function nextSequence(index) {
        if (index < sequences.length) {
            const { duration, message, next } = sequences[index];
            startCountdown(duration, message, () => nextSequence(next));
        }
    }

    nextSequence(0);
}

function startCountdown(duration, message, callback) {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');
    const modificadores = document.getElementById('modificadores');
    const horaInicio = document.getElementById('controls');


    messageElement.textContent = message;
    messageElement.style.display = 'block';
    timerElement.style.color = 'black';
    timerElement.style.display = 'block';
    modificadores.style.display = 'block';
    modificadores.style.position = 'relative';
    modificadores.style.justifyContent = 'row';
    horaInicio.style.display = 'none';

    currentTimer = duration;
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        updateTimerDisplay();

        if (--currentTimer < 0) {
            clearInterval(timerInterval);
            if (callback) {
                callback();
            } else {
                messageElement.textContent = 'El servicio ha concluido';
                timerElement.textContent = '';
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('countdown-timer');
    const minutes = Math.floor(currentTimer / 60).toString().padStart(2, '0');
    const seconds = (currentTimer % 60).toString().padStart(2, '0');

    if (currentTimer <= 10 * 60 && currentTimer > 2 * 60) {
        timerElement.style.color = 'blue';
    } else if (currentTimer <= 2 * 60) {
        timerElement.style.color = 'red';
    } else {
        timerElement.style.color = 'black';
    }

    timerElement.textContent = `${minutes}:${seconds}`;
}

function adjustTimer(minutes) {
    if (currentTimer !== null) {
        currentTimer += minutes * 60;
        if (currentTimer < 0) currentTimer = 0;
        updateTimerDisplay();
    }
}

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
