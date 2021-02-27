let mazo;

async function traerCartas() {
    let datos = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    mazo = await datos.json()
    return mazo    
}

async function mostrarCartas() {
    let datos = await fetch(`https://deckofcardsapi.com/api/deck/${mazo.deck_id}/draw/?count=2`)
    cartas = await datos.json()
    dibujarCartas(cartas.cards)
    
    return "ok"
}

traerCartas().then(()=>
mostrarCartas()
)

function dibujarCartas(cartas) {
cartas.forEach(carta => {
    console.log(carta)
    let img = document.createElement("IMG");
    img.src = carta.image;
    
    let contenedor = document.getElementsByClassName("contenedorCartas")[0]
    contenedor.append(img)
});
}