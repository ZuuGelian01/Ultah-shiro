// === Fitur Easter Egg (baru ditambah) ===
let secretCode = "";
const secretWord = "akane";
const title = document.getElementById("mainTitle");
let clickCount = 0;
let clickTimer;

// Ketik "akane" di keyboard
document.addEventListener("keydown", (e) => {
  secretCode += e.key.toLowerCase();
  if (secretCode.includes(secretWord)) {
    window.location.href = "bonus.html";
  }
  if (secretCode.length > secretWord.length) {
    secretCode = secretCode.slice(-secretWord.length);
  }
});

// Klik judul 5x cepat
title.addEventListener("click", () => {
  clickCount++;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    clickCount = 0;
  }, 800);
  if (clickCount >= 5) {
    window.location.href = "bonus.html";
  }
});

const eggs = document.querySelectorAll(".photo-section img, #giftEmoji");
const trackableEggs = document.querySelectorAll(".trackable-egg, #giftEmoji");
const music = document.getElementById("music");
const loader = document.getElementById("loader");
const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("photoModal");
const tutorText = document.getElementById("tutorB5");
const closeModalBtn = document.getElementById("closeModalBtn");
let isPlaying = false;
let clickedCount = 0;
const progressText = document.getElementById("progressText");
const totalImages = trackableEggs.length;

progressText.textContent = `${clickedCount}/${totalImages} ditemukan`;

function checkSections() {
  const trigger = window.innerHeight * 0.85;
  document.querySelectorAll(".photo-section").forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add("show");
    }
  });
}
window.addEventListener("scroll", checkSections);
window.addEventListener("load", checkSections);

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}

eggs.forEach((el) => {
  const playEgg = () => {
    if (isPlaying) return;
    if (el.dataset.played === "true") return;
    const sound = el.getAttribute("data-sound");
    if (!sound) return;
    loader.style.display = "flex";
    setTimeout(() => {
      music.src = sound;
      music
        .play()
        .then(() => {
          isPlaying = true;
          el.dataset.played = "true";
          el.classList.add("played");

          if (el.classList.contains("trackable-egg") || el.id === "giftEmoji") {
            clickedCount++;
            progressText.textContent = `${clickedCount}/${totalImages} ditemukan`;
          }

          if (clickedCount === totalImages) {
            progressText.textContent = ``;
            nextBtn.classList.add("show");
            nextBtn.setAttribute("aria-hidden", "false");
          } else {
            nextBtn.classList.remove("show");
            nextBtn.setAttribute("aria-hidden", "true");
          }
          for (let i = 0; i < 20; i++) createConfetti();
        })
        .catch((err) => console.log("Gagal memutar:", err));
      loader.style.display = "none";
    }, 3000);
  };

  el.addEventListener("click", playEgg);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      playEgg();
    }
  });
});

music.addEventListener("ended", () => {
  isPlaying = false;
});

tutorText.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
