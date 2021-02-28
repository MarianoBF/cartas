async function traerMazoEntero() {
    let datos = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    let mazoAux = await datos.json()
    return mazoAux    
}

async function traerCartasMano() {
    let id = mazo.consultarId()
    let datos = await fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=5`)
    cartas = await datos.json()
    return cartas.cards 
}

function dibujarCartas(cartas) {
cartas.forEach(carta => {
    let img = document.createElement("IMG");
    img.src = carta.image;
    
    let contenedor = document.getElementById("contenedorCartasJugador")
    contenedor.append(img)
});
}

function sumarPuntos(mano) {
    let suma = 0;
    console.log(mano)
    mano.forEach(element => {
        (element.value === "JACK" || element.value === "QUEEN" || element.value === "KING") ? element.value = 10 : null;
        element.value === "ACE" ? element.value = 15 : null;
        console.log(element.value, suma)
        suma += +element.value
        console.log(suma)
    })
    return suma
}

function mostrarReglas() {
    alert("Se suman los puntajes de cada carta numérica, las figuras (J,Q,K) suman 10 puntos y el As 15 puntos. El mayor puntaje gana la mano, y el mejor de tres manos gana la partida.")
}