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

  constructor(nombre, esHumano) {
    this.nombre = nombre;
    this.puntos = 0;
    this.esHumano = esHumano;
    this.manosGanadas = 0;
    this.manosEmpatadas = 0;
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

  iniciarPartida() {
    contenedorReverso.innerHTML = "";
    contenedorCartasHumano.innerHTML = "";
    jugador1.recibirCartas();
    jugador2.recibirCartas();
    statusJuego.innerText = "Listo para repartir";
    iniciar.disabled = true;
    repartir.disabled = false;
  }

  mostrarCartas() {
    jugador1.mostrarCartas();
    jugador2.mostrarCartasPCTapadas();
    statusJuego.innerText = " \n Cartas en la mesa";
    repartir.disabled = true;
    puntuar.disabled = false;
  }

  compararValores() {
    let resultado = "";
    let ganador = "";
    jugador1.calcularPuntos();
    jugador2.calcularPuntos();
    if (jugador1.consultarPuntajeMano() > jugador2.consultarPuntajeMano()) {
      ganador = jugador1.consultarNombre();
      jugador1.manosGanadas++;
    } else if (
      jugador2.consultarPuntajeMano() > jugador1.consultarPuntajeMano()
    ) {
      jugador2.manosGanadas++;
      ganador = jugador2.consultarNombre();
    } else {
      jugador1.manosEmpatadas++;
      jugador2.manosEmpatadas++;
      ganador = "Empate";
    }
    ganador === "Empate"
      ? (ganador = "\n Nadie gana.")
      : (ganador = "\n El ganador es " + ganador);
    resultado =
      " \n El puntaje del jugador Humano es " +
      jugador1.consultarPuntajeMano() +
      " y el del jugador PC es " +
      jugador2.consultarPuntajeMano() +
      ganador;
    statusJuego.innerText = resultado;
    humanCounter.value = jugador1.manosGanadas;
    pcCounter.value = jugador2.manosGanadas;
    tieCounter.value = jugador1.manosEmpatadas;

    puntuar.disabled = true;
    cerrar.disabled = false;
    console.log("Mano " + (+this.manosJugadas + 1) + " " + resultado);
    contenedorReverso.innerHTML = "";
    jugador2.mostrarCartasPC();
  }

  cerrarMano() {
    statusJuego.innerText += "Preparando siguiente mano...";
    jugador1.limpiar();
    jugador2.limpiar();
    cerrar.disabled = true;
    this.manosJugadas++;
  }

  terminarPartida() {
    contenedorReverso.innerHTML = "";
    jugador2.mostrarCartasPC();
    statusJuego.innerText += "Partido finalizado";

    let jugadorGanador =
      jugador1.manosGanadas > jugador2.manosGanadas
        ? {nombre: jugador1.nombre, manos: jugador1.manosGanadas}
        : jugador2.manosGanadas > jugador1.manosGanadas
        ? {nombre: jugador2.nombre, manos: jugador2.manosGanadas}
        : "Empate";

    let mensaje = `El jugador Humano ganó ${jugador1.manosGanadas}, y el jugador PC ${jugador2.manosGanadas}. `;

    statusJuego.innerText =
      "El ganador del partido fue " +
      jugadorGanador.nombre +
      " con " +
      jugadorGanador.manos +
      " manos ganadas";

    if (jugador1.manosEmpatadas > 0) {
      mensaje =
        mensaje + `Además, empataron ${jugador1.manosEmpatadas} manos. `;
    } else {
      mensaje = mensaje + "No hubo manos empatadas. ";
    }

    jugadorGanador === "Empate"
      ? (mensaje = mensaje + "No ganó nadie, perdieron los dos")
      : (mensaje = mensaje + `El jugador ganador fue ${jugadorGanador.nombre}`);

      statusJuego.innertext = mensaje;

    setTimeout(() => window.location.reload(), 5000);
  }
}
