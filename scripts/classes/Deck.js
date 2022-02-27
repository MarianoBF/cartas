/* global
getFullDeck
*/

class Deck {
    constructor () {
        this.id = "";
        this.availableCards = 0;
        this.cards = [];
    }

    getId () {
        return this.id;
    }

    setId (id) {
        this.id = id;
    }

    startMatch () {
        getFullDeck()
            .then(data => {
                this.id = data.deck_id;
                this.availableCards = data.remaining;
            })
            .catch(error => console.log(error));
    }
}
