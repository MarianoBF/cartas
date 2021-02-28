//let mazo = new Mazo(traerMazoEntero()) //; ------> Esto se puede?

let mazo;

let preMazo = traerMazoEntero().then(data => mazo = new Mazo (data));

let jugador = new Jugador("Humano", true)

let jugador2 = new Jugador("PC", false)

let partido = new Partido()

let jugadores = [jugador, jugador2]


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
iniciar.addEventListener("click", () => partido.iniciarPartida())
repartir.addEventListener("click", () => partido.mostrarCartas())
puntuar.addEventListener("click", () => partido.compararValores())
cerrar.addEventListener("click", () => {
    partido.cerrarMano();
    if (partido.manos_jugadas > 2) {
        partido.terminarPartida()
    } else {setTimeout(partido.iniciarPartida,8000)}
    })
reglas.addEventListener("click", mostrarReglas)

