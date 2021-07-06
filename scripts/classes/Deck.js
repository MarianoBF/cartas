class Deck {
    constructor(deck) {
      this.id = deck.deck_id;
      this.cantidadCartas = deck.remaining;
    }
  
    consultarId() {
      return this.id;
    }
  }
  
  