// Ganti dengan URL gambar yang valid atau gunakan placeholder
const memories = [
  { img: "img/anomali.jpg", caption: "Ini adalah anomali(mikael) dia adalah manusia yang suka melihat BL dan orang yang sering masuk ke RSJ🗿" },
  { img: "img/shiro.jpg", caption: "Ini adalah Shiro(sasa) dia adalah manusia yang paling pendek di antara semua temen online ya tinggi ya sekitar 148cm dan juga sering masuk RSJ bareng Mikael🤫 " },
  { img: "img/zuu.jpg", caption: "Ini adalah Zuu(Dani) dia adalah manusia yang baik dan sangat soft spoken serta dia adalah Suami kurokawa akane 💙" },
];

const gallery = document.getElementById("gallery");
const emptyState = document.getElementById("empty-state");
const clearBtn = document.getElementById("clear-all");
const restoreBtn = document.getElementById("restore-all");
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const laughSound = document.getElementById("laugh-sound");

let autoRedirectTimer;

function renderMemories() {
  gallery.innerHTML = "";
  memories.forEach((mem) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `<img src="${mem.img}" alt="Aib"><p>${mem.caption}</p>`;
    gallery.appendChild(card);
  });
  emptyState.style.display = "none";
  clearBtn.style.display = "inline-block";
  restoreBtn.style.display = "none";
  // Hentikan timer jika aib dipulihkan
  if (autoRedirectTimer) {
    clearTimeout(autoRedirectTimer);
    autoRedirectTimer = null;
  }
}

clearBtn.addEventListener("click", () => {
  const cards = gallery.querySelectorAll(".photo-card");
  if (cards.length === 0) return;

  laughSound.currentTime = 0;
  laughSound.play().catch((e) => console.log("Gagal mainkan suara ketawa"));

  cards.forEach((card) => {
    card.classList.add("removing");
    setTimeout(() => card.remove(), 500);
  });

  setTimeout(() => {
    if (gallery.children.length === 0) {
      emptyState.style.display = "block";
      clearBtn.style.display = "none";
      restoreBtn.style.display = "inline-block";

      // Mulai timer untuk membuka WhatsApp setelah 10 detik
      autoRedirectTimer = setTimeout(() => {
        const phoneNumber = "6289507720402"; 
        const message = encodeURIComponent("makan tuh suruh siapa hapus aib dasar shiro pedo");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
      }, 5000); // 10 detik
    }
  }, 550);
});

restoreBtn.addEventListener("click", () => {
  renderMemories();
});

musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch((e) => console.log("Gagal memutar musik"));
    musicBtn.classList.add("playing");
    musicBtn.innerHTML = "<span>🔇 Matikan</span>";
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
    musicBtn.innerHTML = "<span>🔊 Musik</span>";
  }
});

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

function createConfetti(count = 150) {
  confettiParticles = [];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 0.5 + 0.5,
      color: `hsl(${Math.random() * 360}, 90%, 65%)`,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiParticles.forEach((c) => {
    c.y += c.d * 3;
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

let confettiInterval = setInterval(drawConfetti, 20);
createConfetti();

document.getElementById("celebrate").addEventListener("click", () => {
  clearInterval(confettiInterval);
  createConfetti(200);
  confettiInterval = setInterval(drawConfetti, 15);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createConfetti();
});

renderMemories();