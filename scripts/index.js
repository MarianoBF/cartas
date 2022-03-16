/* global
Player
Match
Deck
saverLoader
showRules
*/

/* exported
Human
AI
pcContainer
humanContainer
gameStatus
humanRoundCounter,
pcRoundCounter
tiedRoundCounter
humanMatchCounter
pcMatchCounter
tiedMatchCounter
inputCardsToChange
cardsBack
*/

const Human = new Player("Humano", true);
const AI = new Player("PC", false);
const match = new Match();
const deck = new Deck();
deck.startMatch();

// Referencias
const pcContainer = document.getElementById("pcContainer");
const humanContainer = document.getElementById("humanContainer");
const start = document.getElementById("start");
const change = document.getElementById("change");
const show = document.getElementById("show");
const score = document.getElementById("score");
const endRound = document.getElementById("endRound");
const rules = document.getElementById("rules");
const saveLoad = document.getElementById("saveLoad");
const gameStatus = document.getElementById("status");
const humanRoundCounter = document.getElementById("humanRoundCounter");
const pcRoundCounter = document.getElementById("pcRoundCounter");
const tiedRoundCounter = document.getElementById("tiedRoundCounter");
const humanMatchCounter = document.getElementById("humanMatchCounter");
const pcMatchCounter = document.getElementById("pcMatchCounter");
const tiedMatchCounter = document.getElementById("tiedMatchCounter");
const inputCardsToChange = document.getElementById("cardsToChange");

const cardsBack = [
    {
        image: "./images/back.png"
    },
    {
        image: "./images/back.png"
    },
    {
        image: "./images/back.png"
    },
    {
        image: "./images/back.png"
    },
    {
        image: "./images/back.png"
    }
];

// Event listeners
saveLoad.addEventListener("click", () => saverLoader());
rules.addEventListener("click", showRules);
start.addEventListener("click", () => match.startRound());
show.addEventListener("click", () => match.showChangedCards());
change.addEventListener("click", () => match.changecards());
score.addEventListener("click", () => match.compareCards());
endRound.addEventListener("click", () => {
    if (match.roundsPlayed > 1) {
        // 1 porque suma al final de la mano
        match.endMatch();
        match.startMatch();
    } else {
        match.endRound();
        setTimeout(match.startRound, 1000);
    }
});
