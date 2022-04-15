let time = 0;
let wave = [];
let circles;
function setup() {
  cnv = document.querySelector("#canvas");
  cnv.width = window.innerWidth;
  cnv.height = (window.innerHeight * 3) / 5;
  if (window.innerWidth < 500) {
    cnv.height = window.innerWidth;
  }
  //   cnv.style.backgroundColor = "transparent";
  ctx = cnv.getContext("2d");
  document.getElementById("canvas-bg").width = window.innerWidth;
  document.getElementById("canvas-bg").height = (window.innerHeight * 3) / 5;
  setBackground(document.getElementById("canvas-bg"));
}

function draw() {
  if (circles != document.querySelector("#circles").value) {
    circles = document.querySelector("#circles").value;
    if (circles > 30) circles = 30;
    if (circles < 0) circles = 0;
    time = 0;
    wave = [];
  }

  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.beginPath();

  ctx.moveTo(0, (cnv.height * 3) / 6);
  ctx.lineTo(cnv.width, (cnv.height * 3) / 6);
  ctx.moveTo((cnv.width * 3) / 6, 0);
  ctx.lineTo((cnv.width * 3) / 6, cnv.height);

  ctx.strokeStyle = "rgb(10, 90, 60)";
  ctx.stroke();

  let x = cnv.width / 3;
  let y = cnv.height / 2;

  for (let i = 0; i < circles; i++) {
    let prevx = x;
    let prevy = y;
    let n = 2 * i + 1;
    let radius = (4 / (n * Math.PI)) * (window.innerWidth > 500 ? 100 : 50);

    x += radius * Math.cos(n * time);
    y += radius * Math.sin(n * time);

    ctx.beginPath();
    ctx.arc(prevx, prevy, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = `hsl(${180 + n * 3}, 78%, 35%)`;

    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(prevx, prevy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = `hsl(${180 + n * 10}, 78%, 35%)`;
    ctx.stroke();
  }
  wave.unshift(y);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(cnv.width / 2, wave[0]);
  ctx.strokeStyle = "rgb(20, 90, 90)";
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 0.1;
  let spread = window.innerWidth > 500 ? 2 : 0.8;
  for (let i = 0; i < wave.length; i++) {
    if (i == 0) ctx.moveTo(cnv.width / 2 + spread * i, wave[i]);
    else ctx.moveTo(cnv.width / 2 + spread * (i - 1), wave[i - 1]);
    ctx.lineTo(cnv.width / 2 + spread * i, wave[i] + 1);
    ctx.stroke();
  }
  ctx.lineWidth = 1;

  if (wave.length > 200) {
    wave.pop();
  }

  time += -0.02;
  requestAnimationFrame(draw);
}

function setBackground(cnv) {
  let ctx = cnv.getContext("2d");

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
