const url = "https://planter-5959.restdb.io/rest/planter";
const key = "620f56fb34fd621565858796";
/* herunder definerer vi en variabel som står for alle planter vi har */
let planter;
/* Her har vi et filter som kan filtrere på alle planter
 - så man tager udgangspunkt i alle planter og filtrerer derudfra*/
let filter = "alle";
/* her tager man fat i alle filtersknapperne */
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
  /* vi skaber en filter knap: vi løber alle knapper igennem for at lytte efter,
   hvilken knap der er blevet trykket på og filtrerer */
  filtrerKnap.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
}
/* her trykkes der på filterknapperne: her ændrer vi på filter værdien
 således at det ikke er "alle" man tager fat i, men at this i datasetet
  iblandt alle planter bliver til den knap/kategori af planter man har trykket på.
   Filtereret bliver derfor til det, man har trykket på */
function filtrerKategori() {
  /* this bliver således den specifikke knappe vi har trykket på og henter derfra datasettet
   (data-planter fra planter.html) fra den kateorgi af planter */
  filter = this.dataset.planter;
  console.log("filter", filter);
  /* h1 ændrer sig efter det filter (den katerogi af planter) vi har valgt trykket på*/
  document.querySelector("h1").textContent = this.textContent;

  visPlanter();
}

async function hentData() {
  console.log("her er json");
  const respons = await fetch(url, options);
  planter = await respons.json();
  // planterne = planter.filter((plante) => plante.vand == filter);//her filtrerer jeg de irelevante planter fra
  visPlanter();
}

const container = document.querySelector("#liste");
const temp = document.querySelector("template");

function visPlanter() {
  console.log(planter);
  container.innerHTML = "";
  /* her tager man fat i alle planter og løber igennem hvert enkel plante */
  planter.forEach((plante) => {
    /* filteret her er ikke længere "alle", men den katerogi af planter,
     vi har trykket på og derfor filtreres der i planterne og der vises kun dem,
      der passer til den kategori, man har trykket på*/
    if (filter == plante.size || filter == "alle") {
      /*____klon er altså alt inde i template 'temp'_____*/
      const klon = temp.cloneNode(true).content;
      klon.querySelector("img").src = "plante_billeder/" + plante.billed;
      klon.querySelector("h3").textContent = plante.navn;
      /* nedenstående bruges ikke på plante siden da vi kun vil vise billedet af planterne samt deres navn 
      klon.querySelector(".oprindelse").textContent = plante.oprindelse;
      klon.querySelector(".vandbehov").textContent = plante.vandbehov;
      klon.querySelector(".lysforhold").textContent = plante.lysforhold;
      klon.querySelector(".placering").textContent = plante.placering;
      klon.querySelector(".temperatur").textContent = plante.temperatur;
    
      */

      /* her fortæller vi, at når der klikkes på artiklen
       (det element der indeholder billedet og teksten) føres man videre til en ny side*/
      klon.querySelector("article").addEventListener("click", () => {
        location.href = `single_view.html?id=${plante._id}`;
      });
      /* plante._id står for den specifikke plante, man har trykket på */

      container.appendChild(klon);
    }
  });

  function visDetaljer(plante) {
    console.log(plante);
    modal.querySelector("h3").textContent = plante.navn;
    modal.querySelector("p").textContent = plante.oprindelse;
    modal.querySelector("p").textContent = plante.vandbehov;
    modal.querySelector("p").textContent = plante.lysforhold;
    modal.querySelector("p").textContent = plante.placering;
    modal.querySelector("p").textContent = plante.temperatur;
    modal.querySelector("p").textContent = plante.toxic;
    modal.style.display = "block";
  }
}

hentData();
