let jugadorHumano = new Jugador("Humano", true);
let jugadorPC = new Jugador("PC", false);
let partido = new Partido();
let deck;

function startMatch(){
  getFullDeck()
    .then(data => (deck = new Deck(data)))
    .catch(error => console.log(error));
}

startMatch()

//Referencias
const pcContainer = document.getElementById("pcContainer");
const humanContainer = document.getElementById(
  "humanContainer"
);
const start = document.getElementById("start");
const deal = document.getElementById("deal");
const score = document.getElementById("score");
const close = document.getElementById("close");
const rules = document.getElementById("rules");
const save_load = document.getElementById("save_load");
const statusJuego = document.getElementById("status");
const humanRoundCounter = document.getElementById("humanRoundCounter");
const pcRoundCounter = document.getElementById("pcRoundCounter");
const tiedRoundCounter = document.getElementById("tiedRoundCounter");
const humanMatchCounter = document.getElementById("humanMatchCounter");
const pcMatchCounter = document.getElementById("pcMatchCounter");
const tiedMatchCounter = document.getElementById("tiedMatchCounter");

const cardsBack = [
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
  {
    image: "./images/back.png",
  },
];

//Event listeners
save_load.addEventListener("click", () => saverLoader());
rules.addEventListener("click", showRules);
start.addEventListener("click", () => partido.iniciarMano());
deal.addEventListener("click", () => partido.mostrarCartas());
score.addEventListener("click", () => partido.compararValores());
close.addEventListener("click", () => {
  if (partido.manosJugadas > 1) {
    //1 porque suma al final de la mano
    partido.terminarPartida();
    startMatch();
  } else {
    partido.cerrarMano();
    setTimeout(partido.iniciarMano, 1000);
  }
});
