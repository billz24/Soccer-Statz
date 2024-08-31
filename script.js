let attackingHalfTime = 0;
let timerInterval = null;
let firstBallCount = 0;
let secondBallCount = 0;
let shotData = [];
let onFrame = false;

document.getElementById('start-timer').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            attackingHalfTime++;
            displayTime(attackingHalfTime);
        }, 1000);
    }
});

document.getElementById('stop-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('first-ball').addEventListener('click', () => {
    firstBallCount++;
    document.getElementById('first-ball-count').textContent = firstBallCount;
});

document.getElementById('second-ball').addEventListener('click', () => {
    secondBallCount++;
    document.getElementById('second-ball-count').textContent = secondBallCount;
});

document.getElementById('pitch').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    shotData.push({ x, y, onFrame });
    drawShot(x, y);
});

document.getElementById('toggle-shot').addEventListener('click', () => {
    onFrame = !onFrame;
    document.getElementById('shot-status').textContent = onFrame ? 'On Frame' : 'Off Frame';
});

document.getElementById('export-data').addEventListener('click', () => {
    const data = {
        attackingHalfTime,
        firstBallCount,
        secondBallCount,
        shotData
    };
    downloadData(data);
});

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function drawShot(x, y) {
    const shot = document.createElement('div');
    shot.className = onFrame ? 'shot on-frame' : 'shot off-frame';
    shot.style.left = `${x}px`;
    shot.style.top = `${y}px`;
    document.getElementById('pitch').appendChild(shot);
}

function downloadData(data) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "soccer_stats.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
