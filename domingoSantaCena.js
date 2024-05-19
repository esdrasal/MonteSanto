function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Verifica si es 9:55 AM
    if (hours === '09' && minutes === '54' && seconds === '59') {
        startCountdown(5 * 60, "Iniciamos en:", startSecondCountdown); //5 minutos para iniciar
    }
}

function startCountdown(duration, message, callback) {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = message;
    messageElement.style.display = 'block'; // Muestra el mensaje en bloque para forzar el salto de línea
    timerElement.style.color = 'black'; // Asegura que el texto comience en negro
    timerElement.style.display = 'block'; // Muestra el temporizador en bloque para forzar el salto de línea

    let timer = duration, minutes, seconds;

    const interval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        if (timer <= 10 * 60 && timer > 2 * 60) { // Cambia el color a azul cuando faltan 10 minutos
            timerElement.style.color = 'blue';
        } else if (timer <= 2 * 60) { // Cambia el color a rojo cuando faltan 2 minutos
            timerElement.style.color = 'red';
        } else {
            timerElement.style.color = 'black';
        }

        timerElement.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            if (callback) {
                callback();
            } else {
                messageElement.textContent = 'El servicio ha concluido';
                timerElement.textContent = '';
            }
        }
    }, 1000);
}

function startSecondCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Apertura:";
    startCountdown(5 * 60, "Apertura:", startAlabanzaCountdown); //5 mimnutos de apertura
}

function startAlabanzaCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Alabanza:";
    startCountdown(35 * 60, "Alabanza:", startAnunciosCountdown); //35 min de alabanza
}

function startAnunciosCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Anuncios y transición:";
    startCountdown(5 * 60, "Anuncios y transición:", startEstudioCountdown); //5 minutos de anuncios y transición
}

function startEstudioCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Estudio Bíblico:";
    startCountdown(30 * 60, "Estudio Bíblico:", startMinistracionCountdown); //30 mintuos de Estudio Bíblico
}

function startMinistracionCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Ministración y Santa Cena";
    startCountdown(20 * 60, "Ministración y Santa Cena:", startOfrendaCountdown); //20 min de ministración
}

function startOfrendaCountdown() {
    const messageElement = document.getElementById('countdown-message');
    const timerElement = document.getElementById('countdown-timer');

    messageElement.textContent = "Ofrenda y anuncios:";
    startCountdown(10 * 60, "Ofrenda y anuncios:"); //10 min de ofrenda
}
// Solicitar modo de pantalla completa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const container = document.documentElement; // Selecciona el elemento raíz del documento (todo el documento)
    if (container.requestFullscreen) { // Verifica si el navegador soporta el modo de pantalla completa
        container.requestFullscreen(); // Solicita el modo de pantalla completa
    } else if (container.webkitRequestFullscreen) { // Para navegadores WebKit (como Safari)
        container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) { // Para Internet Explorer
        container.msRequestFullscreen();
    }
});

// Cambiar al modo de pantalla completa cuando se hace clic en la página
document.addEventListener('click', () => {
    const container = document.getElementById('container');
    container.requestFullscreen(); // Solicita el modo de pantalla completa al hacer clic en la página
});
// Actualiza el reloj inmediatamente al cargar la página
updateClock();

// Actualiza el reloj cada segundo
setInterval(updateClock, 1000);