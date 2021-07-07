class Deck {
    constructor(deck) {
      this.id = deck.deck_id;
      this.availableCards = deck.remaining;
    }
  
    getId() {
      return this.id;
    }
  }
  
  