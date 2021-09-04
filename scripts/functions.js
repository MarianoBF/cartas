async function getFullDeck() {
  let auxDeck;
  try {
    let data = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    auxDeck = await data.json();
  } catch {
    alert("No se puedo traer el mazo. Reiniciando partida y reintentando");
    window.location.reload();
  }
  return auxDeck;
}

async function auxGetCards(number) {
  let id = deck.getId();
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=${number}`
    );
    cards = await data.json();
    deck.availableCards = deck.availableCards - number;
  } catch {
    if (match.errors >= 5) {
      alert(
        "El servidor está dando demasiados errores. Reiniciando la partida..."
      );
      window.location.reload();
    }
    alert(
      "No se pudieron traer las cartas, hubo un problema en el servidor. Reintentando..."
    );
    match.errors++;
    auxGetCards();
  }
  return cards.cards;
}

function drawCards(cartas, container) {
  cartas.forEach((carta) => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    container.append(img);
  });
}

function addScore(hand) {
  let sum = 0;
  hand.forEach((element) => {
    element.value === "JACK" ||
    element.value === "QUEEN" ||
    element.value === "KING"
      ? (element.value = 10)
      : null;
    element.value === "ACE" ? (element.value = 15) : null;
    sum += +element.value;
  });
  return sum;
}

function showRules() {
  alert(
    "Se suman los puntajes de cada carta numérica, las figuras (J,Q,K) suman 10 puntos y el As 15 puntos.\n" +
      "Podés cambiar algunas cartas en la ronda intermedia. \n" +
      "El mejor de 3 manos, gana. \n" +
      "Al terminar cada ronda podés grabar. \n" +
      "Para avanzar los pasos, vas apretando cada botón"
  );
}

function saverLoader() {
  if (save_load.innerText === "Guardar") {
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
      };
      console.log(gameState);
      localStorage.setItem("cartas", JSON.stringify(gameState));
      save_load.innerText = "Cargar";
    } catch {
      alert("No se pudo guardar la partida");
    }
  } else {
    try {
      const gameState = JSON.parse(localStorage.getItem("cartas"));
      save_load.innerText = "Guardar";
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
    } catch {
      alert("No se pudo cargar la partida");
    }
  }
}

function openModal() {
  let modal = document.getElementById("modal");
  let closeModal = document.getElementById("modalClose");
  let modalError = document.getElementById("modalError");
  let cardsToChange = 0;
  let error = false;

  modal.classList.add("openModal");

  closeModal.addEventListener("click", () => {
    if (InputCardsToChange.value >= 0 && InputCardsToChange.value <= 5) {
      modal.classList.remove("openModal");
      if (error) {
        modalError.classlist.remove("visible");
        error = false;
      }
    } else {
      modalError.classlist.add("visible");
      error = true;
    }
  });
}
