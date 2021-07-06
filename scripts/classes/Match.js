class Match {
  id;
  roundsPlayed;
  errors;

  constructor() {
    this.id = new Date();
    this.roundsPlayed = 0;
    this.errors = 0;
  }

  startRound() {
    humanRoundCounter.value = 0;
    pcRoundCounter.value = 0;
    tiedRoundCounter.value = 0;
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    jugadorHumano.recibirCartas();
    jugadorPC.recibirCartas();
    gameStatus.innerText = "Listo para repartir";
    start.disabled = true;
    deal.disabled = false;
    save_load.disabled = true;
    save_load.innerText = "Guardar";
  }

  showCards() {
    jugadorHumano.mostrarCartas();
    jugadorPC.mostrarCartasPCTapadas();
    gameStatus.innerText = "Cartas en la mesa";
    deal.disabled = true;
    score.disabled = false;
  }

  compareCards() {
    let resultado = "";
    let ganador = "";
    jugadorHumano.calcularPuntos();
    jugadorPC.calcularPuntos();
    if (
      jugadorHumano.consultarPuntajeMano() > jugadorPC.consultarPuntajeMano()
    ) {
      ganador = jugadorHumano.consultarNombre();
      jugadorHumano.manosGanadas++;
    } else if (
      jugadorPC.consultarPuntajeMano() > jugadorHumano.consultarPuntajeMano()
    ) {
      jugadorPC.manosGanadas++;
      ganador = jugadorPC.consultarNombre();
    } else {
      jugadorHumano.manosEmpatadas++;
      jugadorPC.manosEmpatadas++;
      ganador = "Empate";
    }
    ganador === "Empate"
      ? (ganador = "\n Nadie gana.")
      : (ganador = "\n El ganador es " + ganador);
    resultado =
      " El puntaje del jugador Humano es " +
      jugadorHumano.consultarPuntajeMano() +
      " y el del jugador PC es " +
      jugadorPC.consultarPuntajeMano() +
      ganador;
    gameStatus.innerText = resultado;
    humanRoundCounter.value = jugadorHumano.manosGanadas;
    pcRoundCounter.value = jugadorPC.manosGanadas;
    tiedRoundCounter.value = jugadorHumano.manosEmpatadas;
    score.disabled = true;
    close.disabled = false;
    console.log("Mano " + (+this.roundsPlayed + 1) + " " + resultado);
    pcContainer.innerHTML = "";
    jugadorPC.mostrarCartasPC();
    save_load.disabled = false;
  }

  endRound() {
    gameStatus.innerText = "Preparando siguiente mano...";
    jugadorHumano.limpiar();
    jugadorPC.limpiar();
    close.disabled = true;
    this.roundsPlayed++;
    save_load.disabled = true;
  }

  endMatch() {
    save_load.disabled = true;
    pcContainer.innerHTML = "";
    jugadorPC.mostrarCartasPC();
    gameStatus.innerText += "Partido finalizado";

    let jugadorGanador;

    if (jugadorHumano.manosGanadas > jugadorPC.manosGanadas) {
      jugadorGanador = {
        nombre: jugadorHumano.nombre,
        manos: jugadorHumano.manosGanadas,
      };
      jugadorHumano.partidosGanados++;
    } else if (jugadorPC.manosGanadas > jugadorHumano.manosGanadas) {
      jugadorGanador = {
        nombre: jugadorPC.nombre,
        manos: jugadorPC.manosGanadas,
      };
      jugadorPC.partidosGanados++;
    } else {
      jugadorGanador = "Empate";
      jugadorHumano.partidosEmpatados++;
    }

    let mensaje =
      "El ganador del partido fue " +
      jugadorGanador.nombre +
      " con " +
      jugadorGanador.manos +
      " manos ganadas. ";

    if (jugadorHumano.manosEmpatadas > 0) {
      mensaje =
        mensaje + `\n Además, empataron ${jugadorHumano.manosEmpatadas} mano(s). `;
    } else {
      mensaje = mensaje + "\n No hubo manos empatadas. ";
    }

    if (jugadorGanador === "Empate") {
      mensaje = mensaje + "No ganó nadie, perdieron los dos";
    }

    gameStatus.innerText = mensaje;

    humanMatchCounter.value = jugadorHumano.partidosGanados;
    pcMatchCounter.value = jugadorPC.partidosGanados;
    tiedMatchCounter.value = jugadorHumano.partidosEmpatados;

    gameStatus.innertext = mensaje;
    close.disabled = true;
    start.disabled = false;
    jugadorPC.manosGanadas = 0;
    jugadorHumano.manosGanadas = 0;
    jugadorPC.manosEmpatadas = 0;
    jugadorHumano.manosEmpatadas = 0;
    partido.roundsPlayed = 0;
  }
}
