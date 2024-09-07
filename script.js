document.addEventListener('DOMContentLoaded', () => {
    let timer;
    let totalSeconds = 0;
    let remainingSeconds = 0;
    let isPaused = false;

    const timerDisplay = document.getElementById('timerDisplay');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const setTimerButton = document.getElementById('setTimer');
    const startTimerButton = document.getElementById('startTimer');
    const pauseTimerButton = document.getElementById('pauseTimer');
    const resetTimerButton = document.getElementById('resetTimer');

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(remainingSeconds);
    }

    function startCountdown() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (remainingSeconds <= 0) {
                clearInterval(timer);
                timer = null;
                alert('Time\'s up!');
            } else {
                remainingSeconds--;
                updateDisplay();
            }
        }, 1000);
    }

    setTimerButton.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        remainingSeconds = totalSeconds;
        updateDisplay();
        startTimerButton.disabled = false;
        resetTimerButton.disabled = false;
    });

    startTimerButton.addEventListener('click', () => {
        if (!isPaused) {
            startCountdown();
        } else {
            isPaused = false;
            startCountdown();
        }
        startTimerButton.disabled = true;
        pauseTimerButton.disabled = false;
    });

    pauseTimerButton.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            isPaused = true;
        }
        startTimerButton.disabled = false;
        pauseTimerButton.disabled = true;
    });

    resetTimerButton.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        totalSeconds = 0;
        remainingSeconds = 0;
        updateDisplay();
        startTimerButton.disabled = true;
        pauseTimerButton.disabled = true;
        resetTimerButton.disabled = true;
    });
});
