class Partido {
  id;
  manosJugadas;
  errores;

  constructor() {
    this.id = new Date();
    this.manosJugadas = 0;
    this.errores = 0;
  }

  iniciarMano() {
    humanRoundCounter.value = 0;
    pcRoundCounter.value = 0;
    tiedRoundCounter.value = 0;
    contenedorReverso.innerHTML = "";
    contenedorCartasHumano.innerHTML = "";
    jugadorHumano.recibirCartas();
    jugadorPC.recibirCartas();
    statusJuego.innerText = "Listo para repartir";
    iniciar.disabled = true;
    repartir.disabled = false;
    save_load.disabled = true;
    save_load.innerText = "Guardar";
  }

  mostrarCartas() {
    jugadorHumano.mostrarCartas();
    jugadorPC.mostrarCartasPCTapadas();
    statusJuego.innerText = " \n Cartas en la mesa";
    repartir.disabled = true;
    puntuar.disabled = false;
  }

  compararValores() {
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
      " \n El puntaje del jugador Humano es " +
      jugadorHumano.consultarPuntajeMano() +
      " y el del jugador PC es " +
      jugadorPC.consultarPuntajeMano() +
      ganador;
    statusJuego.innerText = resultado;
    humanRoundCounter.value = jugadorHumano.manosGanadas;
    pcRoundCounter.value = jugadorPC.manosGanadas;
    tiedRoundCounter.value = jugadorHumano.manosEmpatadas;
    puntuar.disabled = true;
    cerrar.disabled = false;
    console.log("Mano " + (+this.manosJugadas + 1) + " " + resultado);
    contenedorReverso.innerHTML = "";
    jugadorPC.mostrarCartasPC();
    save_load.disabled = false;
  }

  cerrarMano() {
    statusJuego.innerText += "Preparando siguiente mano...";
    jugadorHumano.limpiar();
    jugadorPC.limpiar();
    cerrar.disabled = true;
    this.manosJugadas++;
    save_load.disabled = true;
  }

  terminarPartida() {
    save_load.disabled = true;
    contenedorReverso.innerHTML = "";
    jugadorPC.mostrarCartasPC();
    statusJuego.innerText += "Partido finalizado";

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
        mensaje + `Además, empataron ${jugadorHumano.manosEmpatadas} mano(s). `;
    } else {
      mensaje = mensaje + "No hubo manos empatadas. ";
    }

    if (jugadorGanador === "Empate") {
      mensaje = mensaje + "No ganó nadie, perdieron los dos";
    }

    statusJuego.innerText = mensaje;

    humanMatchCounter.value = jugadorHumano.partidosGanados;
    pcMatchCounter.value = jugadorPC.partidosGanados;
    tiedMatchCounter.value = jugadorHumano.partidosEmpatados;

    statusJuego.innertext = mensaje;
    cerrar.disabled = true;
    iniciar.disabled = false;
    jugadorPC.manosGanadas = 0;
    jugadorHumano.manosGanadas = 0;
    jugadorPC.manosEmpatadas = 0;
    jugadorHumano.manosEmpatadas = 0;
    partido.manosJugadas = 0;
  }
}
