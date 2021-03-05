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
    manosGanadas;//?
    
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

    get NombrePuntos() {
        return this.nombre + this.puntos
    }

    set NombrePuntos(cambio) {
        [this.nombre, this.puntos] = cambio.split(" ")
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
    manosJugadas;

    constructor() {
        this.id = new Date()
        this.manosJugadas = 0;
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
        console.log("Mano " + (+this.manosJugadas + 1) + " " + resultado)

        setTimeout(() => {
            if (jugador.consultarPuntajeMano() > jugador2.consultarPuntajeMano()) 
                {alert("Esta mano la ganó " + jugador.nombre)
            } else if ((jugador2.consultarPuntajeMano() > jugador.consultarPuntajeMano())) {
                    alert("Esta mano la ganó " + jugador2.nombre)
            } else {alert("Empate")}
        }, 500)
    }

    cerrarMano() {
        contenedorReverso.classList.toggle("oculto")
        jugadores.forEach(jugador => {
            jugador.mostrarCartasPC()
        })
        statusJuego.innerText += "Preparando siguiente mano..."
        jugador.limpiar()
        cerrar.disabled = true;
        this.manosJugadas++;
    }

    terminarPartida() {
        contenedorReverso.classList.toggle("oculto")
        jugadores.forEach(jugador => {
            jugador.mostrarCartasPC()
        })
        statusJuego.innerText += "Partido finalizado"


        let jugadorGanador;
        let jugadorPerdedor;
        let puntosGanador;
        let puntosPerdedor;
        
        jugador.consultarPuntos() > jugador2.consultarPuntos() ? (jugadorGanador = jugador.consultarNombre()) && (puntosGanador = jugador.consultarPuntos()) && (jugadorPerdedor = jugador2.consultarNombre()) && (puntosPerdedor = jugador2.consultarPuntos()) : (jugadorGanador = jugador2.consultarNombre()) && (puntosGanador = jugador2.consultarPuntos()) && (jugadorPerdedor = jugador.consultarNombre()) && (puntosPerdedor = jugador.consultarPuntos());
        setTimeout(()=>{
            alert(`El ganador de la partida es ${jugadorGanador} con ${puntosGanador} contra ${puntosPerdedor} del perdedor ${jugadorPerdedor}`)
            location.reload()}
            ,2000)
 
    
    }
}
