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
        jugador1.mostrarCartas()
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

        jugador1.consultarPuntajeMano()> jugador2.consultarPuntajeMano() ? jugador1.manosGanadas++ : jugador2.consultarPuntajeMano()> jugador1.consultarPuntajeMano() ? jugador2.manosGanadas++ : jugador1.manosEmpatadas++ && jugador2.manosEmpatadas++

        setTimeout(() => {
            if (jugador1.consultarPuntajeMano() > jugador2.consultarPuntajeMano()) 
                {alert("Esta mano la ganó " + jugador1.nombre)
            } else if ((jugador2.consultarPuntajeMano() > jugador1.consultarPuntajeMano())) {
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
        jugador1.limpiar()
        cerrar.disabled = true;
        this.manosJugadas++;
    }

    terminarPartida() {
        contenedorReverso.classList.toggle("oculto")
        jugadores.forEach(jugador => {
            jugador.mostrarCartasPC()
        })
        statusJuego.innerText += "Partido finalizado"


        let jugadorGanador = jugador1.manosGanadas > jugador2.manosGanadas ? jugador1.nombre : jugador2.manosGanadas > jugador1.manosGanadas ? jugador2.nombre : "Empate"


        let mensaje = `El jugador Humano ganó ${jugador1.manosGanadas}, y el jugador PC ${jugador2.manosGanadas}. `
        if (jugador1.manosEmpatadas>=0) {mensaje = mensaje + `Además, empataron ${jugador1.manosEmpatadas} manos. `
    } else { mensaje = mensaje + "No hubo manos empatadas. "}

        jugadorGanador === "Empate" ? mensaje = mensaje + "No ganó nadie, perdieron los dos" : mensaje = mensaje + `El jugador ganador fue ${jugadorGanador}`

        alert(mensaje)
 
    
    }
}
