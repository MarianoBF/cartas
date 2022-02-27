// const { match } = require("cypress/types/sinon");

/* global
Human
AI
humanRoundCounter,
pcRoundCounter
tiedRoundCounter
humanMatchCounter
pcMatchCounter
tiedMatchCounter
inputCardsToChange
match
deck
saveLoad
*/

/* exported
getFullDeck
auxGetCards
drawCards
addScore
showRules
saverLoader
openModal
*/

async function getFullDeck () {
    let auxDeck;
    try {
        const data = await fetch(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        auxDeck = await data.json();
    } catch {
        alert("No se pudo traer el mazo. Vuelva a intentar en unos minutos");
    }
    return auxDeck;
}

async function auxGetCards (number) {
    let cards;
    if (match.errors < 1) {
        const id = deck.getId();
        try {
            const data = await fetch(
                `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
            );
            // if (data?.error === "Deck ID does not exist.") {
            //   throw new Error();
            // }
            cards = await data.json();
            deck.availableCards = deck.availableCards - number;
        } catch {
            match.errors++;
            const reload = confirm(
                "El servidor está dando errores, ¿reiniciar la partida?"
            );
            if (reload) {
                window.location.reload();
            } else {
                match.errors--;
            }
        }
        return cards.cards;
    }
}

function drawCards (cartas, container) {
    cartas.forEach(carta => {
        const img = document.createElement("IMG");
        img.src = carta.image;
        container.append(img);
    });
}

function addScore (hand) {
    let sum = 0;
    hand.forEach(element => {
        element.value =
            element.value === "JACK" ||
            element.value === "QUEEN" ||
            element.value === "KING"
                ? 10
                : element.value;
        element.value = element.value === "ACE" ? 15 : element.value;
        sum += +element.value;
    });
    return sum;
}

function showRules () {
    alert(
        "Se suman los puntajes de cada carta numérica, las figuras (J,Q,K) suman 10 puntos y el As 15 puntos.\n" +
            "Podés cambiar algunas cartas en la ronda intermedia. \n" +
            "El mejor de 3 manos, gana. \n" +
            "Al terminar cada ronda podés grabar. \n" +
            "Para avanzar los pasos, vas apretando cada botón"
    );
}

function saverLoader () {
    if (saveLoad.innerText === "Guardar") {
        try {
            const gameState = {
                tiedRounds: Human.roundsTied,
                humanRounds: Human.roundsWon,
                PCRounds: AI.roundsWon,
                tiedMatches: Human.matchesTied,
                matchWinsHuman: Human.matchesWon,
                matchWinsPC: AI.matchesWon,
                playedRounds: match.roundsPlayed + 1,
                deckId: deck.getId(),
                availableCards: deck.availableCards,
                date: new Date()
            };
            localStorage.setItem("cartas", JSON.stringify(gameState));
            // saveLoad.innerText = "Cargar";
            alert("Partida guardada exitosamente");
        } catch {
            alert("No se pudo guardar la partida");
        }
    } else {
        try {
            const gameState = JSON.parse(localStorage.getItem("cartas"));
            // saveLoad.innerText = "Guardar";
            Human.roundsTied = gameState.tiedRounds;
            tiedRoundCounter.value = gameState.tiedRounds;
            Human.roundsWon = gameState.humanRounds;
            humanRoundCounter.value = gameState.humanRounds;
            AI.roundsWon = gameState.PCRounds;
            pcRoundCounter.value = gameState.PCRounds;
            Human.matchesTied = gameState.tiedMatches;
            tiedMatchCounter.value = gameState.tiedMatches;
            Human.matchesWon = gameState.matchWinsHuman;
            humanMatchCounter.value = gameState.matchWinsHuman;
            AI.matchesWon = gameState.matchWinsPC;
            pcMatchCounter.value = gameState.matchWinsPC;
            match.roundsPlayed = gameState.playedRounds;
            deck.setId(gameState.deckId);
            deck.availableCards = gameState.availableCards;
            const date = new Date(gameState.date).toLocaleDateString();
            console.log(date);
            checkDeck(gameState.deckId).then(res => {
                if (res.status === 200) {
                    alert(
                        "Partida de la fecha " + date + " cargada exitosamente."
                    );
                    match.startRound();
                } else {
                    alert(
                        "Hubo un problema al traer el mazo, probablemente se venció su vigencia. Deberás reiniciar la partida"
                    );
                }
            });
        } catch {
            alert("No se pudo cargar la partida.");
        }
    }
}

function checkDeck (id) {
    return fetch("https://deckofcardsapi.com/api/deck/" + id + "/shuffle/");
}

function openModal () {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("modalClose");
    const modalError = document.getElementById("modalError");
    let error = false;

    modal.classList.add("openModal");

    setTimeout(() => inputCardsToChange.focus(), 100);

    closeModal.addEventListener("click", () => {
        if (
            inputCardsToChange.value.match(/\d/) &&
            inputCardsToChange.value >= 0 &&
            inputCardsToChange.value <= 5
        ) {
            modal.classList.remove("openModal");
            if (error) {
                modalError.classList.remove("visible");
                error = false;
            }
        } else {
            modalError.classList.add("visible");
            error = true;
        }
    });
}
