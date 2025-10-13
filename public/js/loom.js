const canvas = document.getElementById('telarCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const addThreadBtn = document.getElementById('addThreadBtn');
const removeThreadBtn = document.getElementById('removeThreadBtn');
const patternSelect = document.getElementById('patternSelect');
const resetBtn = document.getElementById('resetBtn');

let threads = 8;
let threadColors = Array(threads).fill(colorPicker.value);
let pattern = patternSelect.value;

function drawTelar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar bastidor
    ctx.strokeStyle = '#8d5524';
    ctx.lineWidth = 12;
    ctx.strokeRect(60, 40, canvas.width - 120, canvas.height - 80);

    // Dibujar hilos verticales (urdimbre)
    const spacing = (canvas.width - 120) / (threads - 1);
    for (let i = 0; i < threads; i++) {
        ctx.beginPath();
        ctx.moveTo(60 + i * spacing, 40);
        ctx.lineTo(60 + i * spacing, canvas.height - 40);
        ctx.strokeStyle = threadColors[i];
        ctx.lineWidth = 6;
        ctx.stroke();
    }

    // Dibujar patrón de trama
    switch (pattern) {
        case 'rayas':
            drawRayas();
            break;
        case 'zigzag':
            drawZigzag();
            break;
        case 'diamantes':
            drawDiamantes();
            break;
    }
}

function drawRayas() {
    // Rayas horizontales
    for (let y = 70; y < canvas.height - 70; y += 30) {
        ctx.beginPath();
        ctx.moveTo(60, y);
        ctx.lineTo(canvas.width - 60, y);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = 8;
        ctx.stroke();
    }
}

function drawZigzag() {
    // Zigzag entre los hilos
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = 6;
    for (let y = 70; y < canvas.height - 70; y += 40) {
        ctx.beginPath();
        for (let i = 0; i < threads; i++) {
            let x = 60 + i * ((canvas.width - 120) / (threads - 1));
            let offset = (i % 2 === 0) ? -20 : 20;
            ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }
}

function drawDiamantes() {
    // Diamantes entre los hilos
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = 4;
    const spacing = (canvas.width - 120) / (threads - 1);
    for (let y = 90; y < canvas.height - 90; y += 60) {
        for (let i = 0; i < threads - 1; i++) {
            let x1 = 60 + i * spacing;
            let x2 = 60 + (i + 1) * spacing;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo((x1 + x2) / 2, y + 30);
            ctx.lineTo(x2, y);
            ctx.lineTo((x1 + x2) / 2, y - 30);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

colorPicker.addEventListener('input', () => {
    threadColors = threadColors.map(() => colorPicker.value);
    drawTelar();
});

addThreadBtn.addEventListener('click', () => {
    if (threads < 16) {
        threads++;
        threadColors.push(colorPicker.value);
        drawTelar();
    }
});

removeThreadBtn.addEventListener('click', () => {
    if (threads > 4) {
        threads--;
        threadColors.pop();
        drawTelar();
    }
});

patternSelect.addEventListener('change', () => {
    pattern = patternSelect.value;
    drawTelar();
});

resetBtn.addEventListener('click', () => {
    threads = 8;
    threadColors = Array(threads).fill(colorPicker.value);
    pattern = 'zigzag';
    patternSelect.value = pattern;
    drawTelar();
});

drawTelar();