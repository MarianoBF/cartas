let mazo;
let preMazo = traerMazoEntero()
  .then(data => (mazo = new Mazo(data)))
  .catch(error => console.log(error));

let jugador1 = new Jugador("Humano", true);
let jugador2 = new Jugador("PC", false);

let partido = new Partido();

//Referencias
const contenedorReverso = document.getElementById("contenedorReverso");
const contenedorCartasHumano = document.getElementById(
  "contenedorCartasHumano"
);
const iniciar = document.getElementById("iniciar");
const repartir = document.getElementById("repartir");
const puntuar = document.getElementById("puntuar");
const cerrar = document.getElementById("cerrar");
const reglas = document.getElementById("reglas");
const statusJuego = document.getElementById("status");
const resultadoJuego = document.getElementById("results");
const cartasReverso = [
  {
    image: "../images/reverso.png",
  },
  {
    image: "../images/reverso.png",
  },
  {
    image: "../images/reverso.png",
  },
  {
    image: "../images/reverso.png",
  },
  {
    image: "../images/reverso.png",
  },
];

//Event listeners
reglas.addEventListener("click", mostrarReglas);
iniciar.addEventListener("click", () => partido.iniciarPartida());
repartir.addEventListener("click", () => partido.mostrarCartas());
puntuar.addEventListener("click", () => partido.compararValores());
cerrar.addEventListener("click", () => {
  if (partido.manosJugadas > 1) {
    //1 porque suma al final de la mano
    partido.terminarPartida();
  } else {
    partido.cerrarMano();
    setTimeout(partido.iniciarPartida, 3000);
  }
});
