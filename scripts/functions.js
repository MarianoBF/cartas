async function traerMazoEntero() {
  let mazoAux;
  try {
    let datos = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    mazoAux = await datos.json();
  } catch {
    alert("No se puedo traer el mazo. Reiniciando partida y reintentando");
    window.location.reload();
  }
  return mazoAux;
}

async function traerCartasMano() {
  let id = mazo.consultarId();
  try {
    let datos = await fetch(
      `https://deckofcardsapi.com/api/deck/${id}/draw/?count=5`
    );
    cartas = await datos.json();
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
    traerCartasMano();
  }
  return cartas.cards;
}

function dibujarCartas(cartas) {
  cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    contenedorCartasHumano.append(img);
  });
}

function dibujarCartasPC(cartas) {
  cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    contenedorReverso.append(img);
  });
}

function sumarPuntos(mano) {
  let suma = 0;
  mano.forEach(element => {
    element.value === "JACK" ||
    element.value === "QUEEN" ||
    element.value === "KING"
      ? (element.value = 10)
      : null;
    element.value === "ACE" ? (element.value = 15) : null;
    suma += +element.value;
  });
  return suma;
}

function mostrarReglas() {
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
      };
      localStorage.setItem("cartas", JSON.stringify(gameState));
      save_load.innerText = "Cargar";
    } catch {
      alert("No se pudo guardar la partida");
    }
  } else {
    try {
      const gameState = JSON.parse(localStorage.getItem("cartas"));
      console.log(gameState);
      save_load.innerText = "Guardar";
      jugadorHumano.manosEmpatadas = gameState.tiedRounds;
      jugadorHumano.manosGanadas = gameState.humanRounds;
      jugadorPC.manosGanadas = gameState.PCRounds;
      jugadorHumano.partidosEmpatados = gameState.tiedMatches;
      jugadorHumano.partidosGanados = gameState.matchWinsHuman;
      jugadorPC.partidosGanados = gameState.matchWinsPC;
    } catch {
      alert("No se pudo cargar la partida");
    }
  }
}
