class Mazo {
  constructor(mazo) {
    this.id = mazo.deck_id;
    this.cantidadCartas = mazo.remaining;
  }

  consultarId() {
    return this.id;
  }
}

class Jugador {
  nombre;
  mano;
  puntos;
  puntaje_mano;
  esHumano;
  manosGanadas;
  manosEmpatadas;
  partidosGanados;
  partidosEmpatados;

  constructor(nombre, esHumano) {
    this.nombre = nombre;
    this.puntos = 0;
    this.esHumano = esHumano;
    this.manosGanadas = 0;
    this.manosEmpatadas = 0;
    this.partidosGanados = 0;
    this.partidosEmpatados = 0;
  }

  recibirCartas() {
    traerCartasMano().then(mano => {
      this.mano = mano;
    });
  }

  mostrarCartas() {
    this.esHumano ? dibujarCartas(this.mano) : null;
  }

  get NombrePuntos() {
    return this.nombre + this.puntos;
  }

  set NombrePuntos(cambio) {
    [this.nombre, this.puntos] = cambio.split(" ");
  }

  calcularPuntos() {
    this.puntaje_mano = sumarPuntos(this.mano);
    this.puntos += this.puntaje_mano;
  }

  mostrarCartasPCTapadas() {
    dibujarCartasPC(cartasReverso);
  }

  mostrarCartasPC() {
    dibujarCartasPC(this.mano);
  }

  limpiar() {
    this.mano = [];
    this.puntaje_mano = 0;
  }

  consultarPuntajeMano() {
    return this.puntaje_mano;
  }

  consultarPuntos() {
    return this.puntos;
  }

  consultarNombre() {
    return this.nombre;
  }
}

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

    contenedorReverso.innerHTML = "";
    contenedorCartasHumano.innerHTML = "";
    jugadorHumano.recibirCartas();
    jugadorPC.recibirCartas();
    statusJuego.innerText = "Listo para repartir";
    iniciar.disabled = true;
    repartir.disabled = false;
    humanRoundCounter.value = 0;
    pcRoundCounter.value = 0;
    tiedRoundCounter.value = 0;
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
    if (jugadorHumano.consultarPuntajeMano() > jugadorPC.consultarPuntajeMano()) {
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
  }

  cerrarMano() {
    statusJuego.innerText += "Preparando siguiente mano...";
    jugadorHumano.limpiar();
    jugadorPC.limpiar();
    cerrar.disabled = true;
    this.manosJugadas++;
  }

  terminarPartida() {
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

    let mensaje = `El jugador Humano ganó ${jugadorHumano.manosGanadas}, y el jugador PC ${jugadorPC.manosGanadas}. `;

    statusJuego.innerText =
      "El ganador del partido fue " +
      jugadorGanador.nombre +
      " con " +
      jugadorGanador.manos +
      " manos ganadas";

    humanMatchCounter.value = jugadorHumano.partidosGanados;
    pcMatchCounter.value = jugadorPC.partidosGanados;
    tiedMatchCounter.value = jugadorHumano.partidosEmpatados;

    if (jugadorHumano.manosEmpatadas > 0) {
      mensaje =
        mensaje + `Además, empataron ${jugadorHumano.manosEmpatadas} manos. `;
    } else {
      mensaje = mensaje + "No hubo manos empatadas. ";
    }

    jugadorGanador === "Empate"
      ? (mensaje = mensaje + "No ganó nadie, perdieron los dos")
      : (mensaje = mensaje + `El jugador ganador fue ${jugadorGanador.nombre}`);

    statusJuego.innertext = mensaje;
  }
}
