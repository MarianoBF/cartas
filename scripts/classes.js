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
        this.esHumano ? dibujarCartas(this.mano) : contenedorCartasPC.classList.toggle("oculto");
    }

    calcularPuntos() {
         this.puntaje_mano = sumarPuntos(this.mano)
         this.puntos += this.puntaje_mano;
         console.log(this.puntaje_mano)
    }
}

class Partido {
    constructor() {
        this.id = new Date()
    }

    iniciarPartida() {
        jugadores.forEach(jugador => {
            jugador.recibirCartas()
            statusJuego.value = "Se entregaron las cartas"
        })
    }

    compararValores() {
        jugador.mostrarCartas()
        jugadores.forEach(jugador => {
            jugador.calcularPuntos()
            alert("El puntaje del jugador " + jugador.nombre +  "es: " + jugador.puntaje_mano )
        })
    }

}