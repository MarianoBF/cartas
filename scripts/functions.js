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
        contenedorCartasHumano.append(img)
    });
}

function dibujarCartasPC(cartas) {
    cartas.forEach(carta => {
        let img = document.createElement("IMG");
        img.src = carta.image;
        contenedorCartasPC.append(img)
    });
    }

function sumarPuntos(mano) {
    let suma = 0;
    mano.forEach(element => {
        (element.value === "JACK" || element.value === "QUEEN" || element.value === "KING") ? element.value = 10 : null;
        element.value === "ACE" ? element.value = 15 : null;
        suma += +element.value
    })
    return suma
}

function mostrarReglas() {
    alert("Se suman los puntajes de cada carta numérica, las figuras (J,Q,K) suman 10 puntos y el As 15 puntos.\n"
    +"El mayor puntaje gana la mano, y el que suma más puntos totales en cuatro manos gana el partido.")
}