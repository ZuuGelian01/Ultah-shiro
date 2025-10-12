const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const togglePassword = document.getElementById("togglePassword");
const eyeOpen = document.getElementById("eye-open");
const eyeClosed = document.getElementById("eye-closed");
let wrongAttempts = 0;

const correctPassword = "akane dan yaoyao";

function login() {
  if (passwordInput.value === correctPassword) {
    errorMsg.style.display = "none";
    window.location.href = "awal.html";
  } else {
    wrongAttempts++;
    if (wrongAttempts >= 5) {
      const message =
        "Weh kok salah mulu sih? Berikan saya passwordnya Zuu yang baik hati dan tidak sombong";
      window.location.href = `https://wa.me/6289507720402?text=${encodeURIComponent(
        message
      )}`;
      return;
    }
    errorMsg.style.display = "block";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 400);
  }
}

loginBtn.addEventListener("click", login);
passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  if (type === "text") {
    eyeOpen.style.display = "none";
    eyeClosed.style.display = "block";
  } else {
    eyeOpen.style.display = "block";
    eyeClosed.style.display = "none";
  }
});
