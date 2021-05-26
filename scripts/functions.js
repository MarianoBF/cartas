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

async function getHand() {
  let id = mazo.consultarId();
  try {
    let data = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=5`
    );
    let cards = await data.json();
  } catch {
    if (partido.errores >= 5) {
      alert(
        "El servidor está dando demasiados errores. Reiniciando la partida..."
      );
      window.location.reload();
    }
    alert(
      "No se pudieron traer las cartas, hubo un problema en el servidor. Reintentando..."
    );
    partido.errores++;
    getHand();
  }
  return cards.cards;
}

function drawCards(cartas, container) {
  cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    contenedorCartasHumano.append(img);
  });
}

// function drawPCCards(cartas) {
//   cartas.forEach(carta => {
//     let img = document.createElement("IMG");
//     img.src = carta.image;
//     contenedorReverso.append(img);
//   });
// }

function addScore(hand) {
  let sum = 0;
  hand.forEach(element => {
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
      "El mejor de 3 manos, gana. \n" +
      "Al terminar cada ronda podés grabar."
  );
}

function saverLoader() {
  if (save_load.innerText === "Guardar") {
    try {
      const gameState = {
        tiedRounds: jugadorHumano.manosEmpatadas,
        humanRounds: jugadorHumano.manosGanadas,
        PCRounds: jugadorPC.manosGanadas,
        tiedMatches: jugadorHumano.partidosEmpatados,
        matchWinsHuman: jugadorHumano.partidosGanados,
        matchWinsPC: jugadorPC.partidosGanados,
        playedRounds: partido.manosJugadas + 1,
      };
      localStorage.setItem("cartas", JSON.stringify(gameState));
      save_load.innerText = "Cargar";
    } catch {
      alert("No se pudo guardar la partida");
    }
  } else {
    try {
      const gameState = JSON.parse(localStorage.getItem("cartas"));
      save_load.innerText = "Guardar";
      jugadorHumano.manosEmpatadas = gameState.tiedRounds;
      tiedRoundCounter.value = gameState.tiedRounds;
      jugadorHumano.manosGanadas = gameState.humanRounds;
      humanRoundCounter.value = gameState.humanRounds;
      jugadorPC.manosGanadas = gameState.PCRounds;
      pcRoundCounter.value = gameState.PCRounds;
      jugadorHumano.partidosEmpatados = gameState.tiedMatches;
      tiedMatchCounter.value = gameState.tiedMatches;
      jugadorHumano.partidosGanados = gameState.matchWinsHuman;
      humanMatchCounter.value = gameState.matchWinsHuman;
      jugadorPC.partidosGanados = gameState.matchWinsPC;
      pcMatchCounter.value = gameState.matchWinsPC
      partido.manosJugadas = gameState.playedRounds;

    } catch {
      alert("No se pudo cargar la partida");
    }
  }
}
