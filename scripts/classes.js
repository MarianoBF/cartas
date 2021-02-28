class Mazo {
    constructor(mazo) {
        this.id = mazo.deck_id,
        this.cantidadCartas = mazo.remaining
    }

    consultarId() {
        return this.id
    }
}

class Jugador {
    nombre;
    mano;
    puntos;
    puntaje_mano;
    esHumano;
    
    constructor(nombre, esHumano) {
        this.nombre = nombre;
        this.puntos = 0;
        this.esHumano = esHumano;
    }

    recibirCartas() {
        traerCartasMano().then(mano => {this.mano = mano})     
    }

    mostrarCartas() {
        this.esHumano ? dibujarCartas(this.mano) : null;
    }

    calcularPuntos() {
         this.puntaje_mano = sumarPuntos(this.mano)
         this.puntos += this.puntaje_mano;
    }

    mostrarCartasPC() {
        !this.esHumano ? dibujarCartasPC(this.mano) : null;
    }

    limpiar() {
        this.mano = [];
        this.puntaje_mano = 0;
    }

    consultarPuntajeMano() {
        return this.puntaje_mano
    }

    consultarPuntos() {
        return this.puntos
    }

    consultarNombre() {
        return this.nombre
    }

}

class Partido {
    id;
    manos_jugadas;
    
    constructor() {
        this.id = new Date()
        this.manos_jugadas = 0;
    }

    iniciarPartida() {
        contenedorCartasPC.innerHTML = "";
        contenedorCartasHumano.innerHTML = "";
            jugadores.forEach(jugador => {
            jugador.recibirCartas()
            statusJuego.innerText = "Listo para repartir"
            iniciar.disabled = true;
            repartir.disabled = false;

        })
    }

    mostrarCartas() {
        //sin el forEach
        jugador.mostrarCartas()
        jugador2.mostrarCartas()
        contenedorReverso.classList.toggle("oculto")
        statusJuego.innerText = "Cartas en la mesa"
        repartir.disabled = true;
        puntuar.disabled = false;

    }

    compararValores() {
        let resultado = ""
        jugadores.forEach(jugador => {
            jugador.calcularPuntos()
            resultado += ("El puntaje del jugador " + jugador.consultarNombre() +  " es: " + jugador.consultarPuntajeMano() + " \n " )
        })
        statusJuego.innerText = resultado;
        puntuar.disabled = true;
        cerrar.disabled = false;

        setTimeout(() => {
            if (jugador.consultarPuntajeMano() > jugador2.consultarPuntajeMano()) 
                {alert("Ganó " + jugador.nombre)
            } else if ((jugador2.consultarPuntajeMano() > jugador.consultarPuntajeMano())) {
                    alert("Ganó " + jugador2.nombre)
            } else {alert("Empate")}
        }, 2000)
    }

    cerrarMano() {
        contenedorReverso.classList.toggle("oculto")
        contenedorCartasPC.classList.toggle("contenedorCartas")
        jugadores.forEach(jugador => {
            jugador.mostrarCartasPC()
            statusJuego.innerText += "Preparando siguiente mano..."
            jugador.limpiar()
        })
        cerrar.disabled = true;
        this.manos_jugadas++;
    }

    terminarPartida() {
        let jugadorGanador;
        let jugadorPerdedor;
        let puntosGanador;
        let puntosPerdedor;
        
        jugador.consultarPuntos() > jugador2.consultarPuntos() ? (jugadorGanador = jugador.consultarNombre()) && (puntosGanador = jugador.consultarPuntos()) && (jugadorPerdedor = jugador2.consultarNombre()) && (puntosPerdedor = jugador2.consultarPuntos()) : (jugadorGanador = jugador2.consultarNombre()) && (puntosGanador = jugador2.consultarPuntos()) && (jugadorPerdedor = jugador.consultarNombre()) && (puntosPerdedor = jugador.consultarPuntos());
        alert(`El ganador de la partida es ${jugadorGanador} con ${puntosGanador} contra ${puntosPerdedor} del perdedor ${jugadorPerdedor}`)
        
    }
}