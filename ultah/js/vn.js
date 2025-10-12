// ====== ANIMASI UNIVERSE ======
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 180; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.6 + 0.2,
    alpha: Math.random(),
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "white";
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function updateStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    star.alpha += (Math.random() - 0.5) * 0.05;
    if (star.alpha < 0.2) star.alpha = 0.2;
    if (star.alpha > 1) star.alpha = 1;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// ====== AUDIO PLAYER CUSTOM ======
let currentAudio = null;
const buttons = document.querySelectorAll(".play-btn");

buttons.forEach((btn) => {
  const audio = new Audio(btn.dataset.audio);
  const bars = btn.parentElement.querySelectorAll(".bar");

  btn.addEventListener("click", () => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      document
        .querySelectorAll(".bar")
        .forEach((b) => (b.style.animationPlayState = "paused"));
      document
        .querySelectorAll(".play-btn")
        .forEach((b) => (b.textContent = "▶"));
    }

    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸";
      bars.forEach((b) => (b.style.animationPlayState = "running"));
      currentAudio = audio;
    } else {
      audio.pause();
      btn.textContent = "▶";
      bars.forEach((b) => (b.style.animationPlayState = "paused"));
    }
  });

  audio.addEventListener("ended", () => {
    btn.textContent = "▶";
    bars.forEach((b) => (b.style.animationPlayState = "paused"));
  });
});

// ====== BALON INTERAKTIF ======
document.querySelectorAll(".balloon").forEach((bal) => {
  bal.addEventListener("click", () => {
    bal.classList.add("pop");
    setTimeout(() => bal.remove(), 400);
  });
});

// ====== CONFETTI ======
const confettiCanvas = document.getElementById("confetti");
const ctx2 = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confetti = [];
for (let i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 0.5 + 0.5,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  });
}

function drawConfetti() {
  ctx2.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c) => {
    ctx2.beginPath();
    ctx2.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx2.fillStyle = c.color;
    ctx2.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach((c) => {
    c.y += c.d * 3;
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  });
}

setInterval(drawConfetti, 20);
