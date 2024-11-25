const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY < 700) {
    navbar.classList.add("bg-navbar-top");
    navbar.classList.remove("bg-navbar");
    navbar.style.transform = "translateY(0)"; // Asegura que sea visible al inicio
  } else {
    navbar.classList.remove("bg-navbar-top");
    navbar.classList.add("bg-navbar");
  }

  if (window.scrollY > lastScrollY) {
    // Desplazándose hacia abajo
    navbar.style.transform = "translateY(-100%)"; // Oculta el navbar
  } else {
    // Desplazándose hacia arriba
    navbar.style.transform = "translateY(0)"; // Muestra el navbar
  }

  lastScrollY = window.scrollY; // Actualiza la posición de scroll anterior
});
