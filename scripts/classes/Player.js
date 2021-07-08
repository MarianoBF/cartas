class Player {
  name;
  hand;
  score;
  roundScore;
  isHuman;
  roundsWon;
  roundsTied;
  matchesWon;
  matchesTied;

  constructor(name, isHuman) {
    this.name = name;
    this.score = 0;
    this.isHuman = isHuman;
    this.roundsWon = 0;
    this.roundsTied = 0;
    this.matchesWon = 0;
    this.matchesTied = 0;
  }

  getCards() {
    auxGetCards(5).then(hand => {
      this.hand = hand;
    });
  }

  updateCards(number) {
    //TODO: Remove current cards
    auxGetCards(number).then(newCards => {
      this.hand = [...this.hand, ...newCards];
      console.log(this.hand, newCards)
    });
  }

  showHumanCards() {
    drawCards(this.hand, humanContainer);
  }

  calcPoints() {
    this.roundScore = addScore(this.hand);
    this.score += this.roundScore;
  }

  showBackOfCards() {
    drawCards(cardsBack, pcContainer);
  }

  showPCCards() {
    drawCards(this.hand, pcContainer);
  }

  cleanUp() {
    this.hand = [];
    this.roundScore = 0;
  }

  getRoundPoints() {
    return this.roundScore;
  }

  getMatchPoints() {
    return this.score;
  }

  getName() {
    return this.name;
  }
}
