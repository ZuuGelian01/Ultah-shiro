// Teks pertama
const text1 = `Kangen kamu...\n\nWaktu berlalu, tapi kenangan tetap terasa seperti dulu.\n\nAku harap suatu hari nanti kita bisa seperti dulu lagi,\nbercanda, tertawa, dan bercerita seperti dulu. \n\nAku harap kita bisa seperti lagu di bawah ini`;
const typewriter1 = document.getElementById("typewriter-1");
let i = 0;

// Fungsi typing pertama
function typeWriter1() {
  if (i < text1.length) {
    typewriter1.innerHTML += text1.charAt(i);
    i++;
    setTimeout(typeWriter1, 70);
  } else {
    // Setelah selesai, tampilkan tombol musik
    setTimeout(() => {
      document.getElementById("play-music").style.display = "inline-block";
      // Lalu mulai typing teks kedua
      setTimeout(() => {
        document.getElementById("typewriter-2").style.display = "block";
        typeWriter2();
      }, 1000);
    }, 1000);
  }
}

// Teks kedua
const text2 = "Jangan lupa, kamu selalu ada di hati aku, dan aku akan selalu menunggu kamu sampai kapanpun, aku akan mulai melupakan kamu saat kamu sudah mempuyai pacar, aku akan menghapu semua kenangan kita dan juga aku akan kembali seperti dahulu, aku akan menjadi teman biasa kamu.";
const typewriter2 = document.getElementById("typewriter-2");
let j = 0;

// Fungsi typing kedua
function typeWriter2() {
  if (j < text2.length) {
    typewriter2.innerHTML += text2.charAt(j);
    j++;
    setTimeout(typeWriter2, 150);
  }
}

// Mulai efek typing pertama
window.onload = typeWriter1;

// Musik
const bgMusic = document.getElementById("bg-music");
const playBtn = document.getElementById("play-music");
playBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    playBtn.innerHTML = "🔇 Matikan Musik";
  } else {
    bgMusic.pause();
    playBtn.innerHTML = "🔊 Putar Musik";
  }
});

// Bintang
function createStars() {
  const starsContainer = document.getElementById("stars");
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    starsContainer.appendChild(star);
  }
}

createStars();
