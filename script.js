// NYT
const url = "https://planter-5959.restdb.io/rest/planter";
const key = "620f56fb34fd621565858796";
let planter;
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
}
/* her trykkes der på filterknapperne */
function filtrerKategori() {
  filter = this.dataset.planter;
  console.log("filter", filter);
  document.querySelector("h1").textContent = this.textContent;

  visPlanter();
}

async function hentData() {
  console.log("her er json");
  const respons = await fetch(url, options);
  planter = await respons.json();
  visPlanter();
}

const container = document.querySelector("section");
const temp = document.querySelector("template");

function visPlanter() {
  console.log(planter);
  container.innerHTML = "";
  planter.forEach((kategori) => {
    if (filter == kategori.specifik || filter == "alle") {
      /*____klon er altså alt inde i template 'temp'_____*/
      const klon = temp.cloneNode(true).content;
      klon.querySelector("h3").textContent = kategori.navn;
      klon.querySelector(".oprindelse").textContent = kategori.oprindelse;
      klon.querySelector(".vandbehov").textContent = kategori.vandbehov;
      klon.querySelector(".lysforhold").textContent = kategori.lysforhold;
      klon.querySelector(".placering").textContent = kategori.placering;
      klon.querySelector(".temperatur").textContent = kategori.temperatur;
      /* i tvivl med hvordan billederne skal sættes ind*/
      klon.querySelector("img").src = "plante_billeder/" + kategori.billed;
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `single_view.html?id=${kategori._id}`;
      });

      container.appendChild(klon);
    }
  });
  function visDetaljer(specifik) {
    console.log(specifik);
    modal.querySelector("h3").textContent = specifik.navn;
    modal.querySelector("p").textContent = specifik.oprindelse;
    modal.querySelector("p").textContent = specifik.vandbehov;
    modal.querySelector("p").textContent = specifik.lysforhold;
    modal.querySelector("p").textContent = specifik.placering;
    modal.querySelector("p").textContent = specifik.temperatur;
    modal.style.display = "block";
  }
}
hentData();
