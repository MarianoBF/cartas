class Mazo {
    constructor(mazo) {
      this.id = mazo.deck_id;
      this.cantidadCartas = mazo.remaining;
    }
  
    consultarId() {
      return this.id;
    }
  }
  
  