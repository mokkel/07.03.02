const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// NYT

const url = "https://planter-5959.restdb.io/rest/_swagger.json";
const key = "620f56fb34fd621565858796";

const options = {
  headers: {
    "x-apikey": "620f56fb34fd621565858796",
  },
};
