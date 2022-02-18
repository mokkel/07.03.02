

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
/* her kan man tage fat i alle filterknapperne */
const filtrerKnap = document.querySelectorAll("button");

const options = {
  headers: {
    "x-apikey": key,
  },
};

/* Her lytter man til når hjemmesiden er loadet */
document.addEventListener("DOMContentLoaded", start);

/* når hjemmesiden er loadet, "aktivereres" funktionen "start"*/
/* Herunder sørger man for, at man kan trykke på alle knapper og filtrerer */
function start() {
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

  filtrerKnap.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentdata();
}
/* her trykkes der på filterknapperne */
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
      klon.querySelector("h3").textContent = ret.navn;
      klon.querySelector("p").textContent = ret.oprindelse;
      klon.querySelector("p").textContent = ret.vandbehov;
      klon.querySelector("p").textContent = ret.lysforhold;
      klon.querySelector("p").textContent = ret.placering;
      klon.querySelector("p").textContent = ret.temperatur;
      /* i tvivl med hvordan billederne skal sættes ind*/
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
    modal.querySelector("h3").textContent = kategori.navn;
    modal.querySelector("p").textContent = kategori.oprindelse;
    modal.querySelector("p").textContent = kategori.vandbehov;
    modal.querySelector("p").textContent = kategori.lysforhold;
    modal.querySelector("p").textContent = kategori.placering;
    modal.querySelector("p").textContent = kategori.temperatur;
    modal.style.display = "block";
  }
}
