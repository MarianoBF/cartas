let jugadorHumano = new Jugador("Humano", true);
let jugadorPC = new Jugador("PC", false);
let partido = new Partido();
let mazo;

function startMatch(){
  traerMazoEntero()
    .then(data => (mazo = new Mazo(data)))
    .catch(error => console.log(error));
}

startMatch()

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
const save_load = document.getElementById("save_load");
const statusJuego = document.getElementById("status");
const humanRoundCounter = document.getElementById("humanRoundCounter");
const pcRoundCounter = document.getElementById("pcRoundCounter");
const tiedRoundCounter = document.getElementById("tiedRoundCounter");
const humanMatchCounter = document.getElementById("humanMatchCounter");
const pcMatchCounter = document.getElementById("pcMatchCounter");
const tiedMatchCounter = document.getElementById("tiedMatchCounter");

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
save_load.addEventListener("click", () => saverLoader());
reglas.addEventListener("click", mostrarReglas);
iniciar.addEventListener("click", () => partido.iniciarMano());
repartir.addEventListener("click", () => partido.mostrarCartas());
puntuar.addEventListener("click", () => partido.compararValores());
cerrar.addEventListener("click", () => {
  if (partido.manosJugadas > 1) {
    //1 porque suma al final de la mano
    partido.terminarPartida();
    startMatch();
  } else {
    partido.cerrarMano();
    setTimeout(partido.iniciarMano, 1000);
  }
});
