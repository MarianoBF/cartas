let Human = new Player("Humano", true);
let AI = new Player("PC", false);
let match = new Match();
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
const gameStatus = document.getElementById("status");
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
start.addEventListener("click", () => match.startRound());
deal.addEventListener("click", () => match.showCards());
score.addEventListener("click", () => match.compareCards());
close.addEventListener("click", () => {
  if (match.roundsPlayed > 1) {
    //1 porque suma al final de la mano
    match.endMatch();
    startMatch();
  } else {
    match.endRound();
    setTimeout(match.startRound, 1000);
  }
});
