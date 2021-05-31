let time = 0;
let wave = [];
let circles;

function setup() {
    cnv = document.querySelector("#canvas");
    cnv.width = 1200;
    cnv.height = 600;
    cnv.style.backgroundColor = "black";
    ctx = cnv.getContext("2d");
}

function draw() {
    if (circles != document.querySelector("#circles").value) {
        circles = document.querySelector("#circles").value;
        if (circles > 100) circles = 100;
        if (circles < 0) circles = 0;
        time = 0;
        wave = [];
        setup();
    }

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    setBackground();

    ctx.beginPath();

    ctx.moveTo(0, (cnv.height * 3) / 6);
    ctx.lineTo(cnv.width, (cnv.height * 3) / 6);
    ctx.moveTo((cnv.width * 3) / 6, 0);
    ctx.lineTo((cnv.width * 3) / 6, cnv.height);

    ctx.strokeStyle = "rgb(10, 90, 60)";
    ctx.stroke();

    let x = 300;
    let y = 300;

    for (let i = 0; i < circles; i++) {
        let prevx = x;
        let prevy = y;
        let n = 2 * i + 1;
        let radius = (4 / (n * Math.PI)) * 100;

        x += radius * Math.cos(n * time);
        y += radius * Math.sin(n * time);

        ctx.beginPath();
        ctx.arc(prevx, prevy, radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = "rgb(20, 90, 90)";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "lime";
        ctx.stroke();
    }

    wave.unshift(y);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(600, wave[0]);
    ctx.strokeStyle = "rgb(20, 90, 90)";
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "lime";
    for (let i = 0; i < wave.length; i++) {
        if (i == 0) ctx.moveTo(600 + 4 * i, wave[i]);
        else ctx.moveTo(600 + 4 * (i - 1), wave[i - 1]);
        ctx.lineTo(600 + 4 * i, wave[i] + 1);
        ctx.stroke();
    }

    if (wave.length > 100) {
        wave.pop();
    }

    time += -0.1;
    requestAnimationFrame(draw);
}

function setBackground() {
    ctx.beginPath();

    ctx.moveTo(0, (cnv.height * 1) / 6);
    ctx.lineTo(cnv.width, (cnv.height * 1) / 6);
    ctx.moveTo(0, (cnv.height * 2) / 6);
    ctx.lineTo(cnv.width, (cnv.height * 2) / 6);
    ctx.moveTo(0, (cnv.height * 4) / 6);
    ctx.lineTo(cnv.width, (cnv.height * 4) / 6);
    ctx.moveTo(0, (cnv.height * 5) / 6);
    ctx.lineTo(cnv.width, (cnv.height * 5) / 6);

    ctx.moveTo((cnv.width * 1) / 6, 0);
    ctx.lineTo((cnv.width * 1) / 6, cnv.height);
    ctx.moveTo((cnv.width * 2) / 6, 0);
    ctx.lineTo((cnv.width * 2) / 6, cnv.height);
    ctx.moveTo((cnv.width * 4) / 6, 0);
    ctx.lineTo((cnv.width * 4) / 6, cnv.height);
    ctx.moveTo((cnv.width * 5) / 6, 0);
    ctx.lineTo((cnv.width * 5) / 6, cnv.height);

    ctx.strokeStyle = "rgb(10, 60, 60)";
    ctx.stroke();
}

setup();
requestAnimationFrame(draw);