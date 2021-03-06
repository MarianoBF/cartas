let mazo;
let preMazo = traerMazoEntero().then(data => mazo = new Mazo (data));

let jugador = new Jugador("Humano", true)
let jugador2 = new Jugador("PC", false)
let jugadores = [jugador, jugador2]

let partido = new Partido()

//Referencias
let contenedorReverso = document.getElementById("contenedorReverso")
let contenedorCartasHumano = document.getElementById("contenedorCartasHumano")
let contenedorCartasPC = document.getElementById("contenedorCartasPC")
let iniciar = document.getElementById("iniciar")
let repartir = document.getElementById("repartir")
let puntuar = document.getElementById("puntuar")
let cerrar = document.getElementById("cerrar")
let reglas = document.getElementById("reglas")
let statusJuego = document.getElementById("status")

//Event listeners
reglas.addEventListener("click", mostrarReglas)
iniciar.addEventListener("click", () => partido.iniciarPartida())
repartir.addEventListener("click", () => partido.mostrarCartas())
puntuar.addEventListener("click", () => partido.compararValores())
cerrar.addEventListener("click", () => {
    if (partido.manosJugadas > 2) { //2 porque suma al final de la mano
        partido.terminarPartida()
    } else {
        partido.cerrarMano();
        setTimeout(partido.iniciarPartida,3000)}
})
