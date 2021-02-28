//let mazo = new Mazo(traerMazoEntero()) //; ------> Esto se puede?

let mazo;

let preMazo = traerMazoEntero().then(data => mazo = new Mazo (data));

let jugador = new Jugador("Jug1", true)

let jugador2 = new Jugador("PC", false)

let partido = new Partido()

let jugadores = [jugador, jugador2]

let contenedorCartasPC = document.getElementById("contenedorCartasPC")

document.getElementById("repartir").addEventListener("click", () => {partido.iniciarPartida()})

document.getElementById("puntuar").addEventListener("click", () => {partido.compararValores()})

//document.getElementById("cerrar")

document.getElementById("reglas").addEventListener("click", mostrarReglas)

statusJuego = document.getElementById("status")
