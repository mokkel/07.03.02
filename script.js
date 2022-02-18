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
/*
const url = "https://planter-5959.restdb.io/rest/_swagger.json";
const key = "620f56fb34fd621565858796";

const options = {
  headers: {
    "x-apikey": "620f56fb34fd621565858796",
  },
};

*/

const url = "https://planter-5959.restdb.io/rest/_swagger.json";
const key = "620f56fb34fd621565858796";
let menu;
let filter = "alle";
const filtrerKnap = document.querySelectorAll("button");

const options = {
  headers: {
    "x-apikey": key,
  },
};

document.addEventListener("DOMContentLoaded", start);

function start() {
  filtrerKnap.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentdata();
}

function filtrerKategori() {
  filter = this.dataset.menu;
  console.log("filter", filter);
  document.querySelector("h1").textContent = this.textContent;

  vis();
}

async function hentdata() {
  console.log("her er json");
  const respons = await fetch(url, options);
  menu = await respons.json();
  vis();
}

const container = document.querySelector("section");
const temp = document.querySelector("template");

function vis() {
  console.log(menu);
  container.innerHTML = "";
  menu.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      /*____klon er altså alt inde i template 'temp'_____*/
      const klon = temp.cloneNode(true).content;
      klon.querySelector("h2").textContent = ret.navn;
      klon.querySelector("h3").textContent = ret.pris + ".kr";
      klon.querySelector("p").textContent = ret.kortbeskrivelse;
      klon.querySelector("img").src = `medium/${ret.billednavn}-md.jpg`;
      /*___kald til at åbne i ny side_____*/
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `single_view.html?id=${ret._id}`;
      });

      container.appendChild(klon);
    }
  });
  function visDetaljer(kategori) {
    console.log(kategori);
    modal.querySelector("h2").textContent = kategori.navn;
    modal.querySelector("h3").textContent = kategori.pris;
    modal.querySelector("p").textContent = kategori.kortbeskrivelse;
    modal.querySelector("p").textContent = kategori.langbeskrivelse;
    modal.style.display = "block";
  }
}
