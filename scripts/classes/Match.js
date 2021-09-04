class Match {
  id;
  roundsPlayed;
  errors;

  constructor() {
    this.id = new Date();
    this.roundsPlayed = 0;
    this.errors = 0;
  }

  startRound() {
    humanRoundCounter.value = 0;
    pcRoundCounter.value = 0;
    tiedRoundCounter.value = 0;
    pcContainer.innerHTML = "";
    humanContainer.innerHTML = "";
    Human.getCards();
    AI.getCards();
    save_load.disabled = true;
    save_load.innerText = "Guardar";
    setTimeout(()=>{
      this.showCards()
      start.disabled = true;
      change.disabled = false;
    },1000)
  }

  showCards() {
    Human.showHumanCards();
    AI.showBackOfCards();
    gameStatus.innerText = "Cartas en la mesa, restan en el mazo " + deck.availableCards + " cartas.";
  }

  changecards() {
    gameStatus.innerText = "¿Cambio de cartas?";
    openModal();
    change.disabled = true;
    show.disabled = false;
    gameStatus.innerText = "";
  }

  showChangedCards() {
    if (InputCardsToChange.value > 0) {
      Human.updateCards(InputCardsToChange.value);
      humanContainer.innerHTML = "";
      gameStatus.innerText = "¿Y? ¿Valió la pena?";
    } else {
      gameStatus.innerText = "Va con las cartas originales";
    }
    show.disabled = true;
    score.disabled = false;

  }

  compareCards() {
    let result = "";
    let winner = "";
    Human.calcPoints();
    AI.calcPoints();
    if (Human.getRoundPoints() > AI.getRoundPoints()) {
      winner = Human.getName();
      Human.roundsWon++;
    } else if (AI.getRoundPoints() > Human.getRoundPoints()) {
      AI.roundsWon++;
      winner = AI.getName();
    } else {
      Human.roundsTied++;
      AI.roundsTied++;
      winner = "Empate";
    }
    winner === "Empate"
      ? (winner = "\n Nadie gana.")
      : (winner = "\n El ganador es " + winner);
    result =
      " El puntaje del jugador Humano es " +
      Human.getRoundPoints() +
      " y el del jugador PC es " +
      AI.getRoundPoints() +
      winner;
    gameStatus.innerText = result;
    humanRoundCounter.value = Human.roundsWon;
    pcRoundCounter.value = AI.roundsWon;
    tiedRoundCounter.value = Human.roundsTied;
    score.disabled = true;
    close.disabled = false;
    pcContainer.innerHTML = "";
    AI.showPCCards();
    save_load.disabled = false;
  }

  endRound() {
    gameStatus.innerText = "Preparando siguiente mano...";
    Human.cleanUp();
    AI.cleanUp();
    close.disabled = true;
    this.roundsPlayed++;
    save_load.disabled = true;
  }

  endMatch() {
    save_load.disabled = true;
    pcContainer.innerHTML = "";
    AI.showPCCards();
    gameStatus.innerText += "Partido finalizado";

    let winner;

    if (Human.roundsWon > AI.roundsWon) {
      winner = {
        name: Human.name,
        rounds: Human.roundsWon,
      };
      Human.matchesWon++;
    } else if (AI.roundsWon > Human.roundsWon) {
      winner = {
        name: AI.name,
        rounds: AI.roundsWon,
      };
      AI.matchesWon++;
    } else {
      winner = "Empate";
      Human.matchesTied++;
    }

    let message =
      "El ganador del partido fue " +
      winner.name +
      " con " +
      winner.rounds +
      " manos ganadas. ";

    if (Human.roundsTied > 0) {
      message = message + `\n Además, empataron ${Human.roundsTied} mano(s). `;
    } else {
      message = message + "\n No hubo manos empatadas. ";
    }

    if (winner === "Empate") {
      message = message + "No ganó nadie, perdieron los dos";
    }

    gameStatus.innerText = message;

    console.log(Human.matchesWon, Human.matchesTied, AI.matchesWon)

    humanMatchCounter.value = Human.matchesWon;
    pcMatchCounter.value = AI.matchesWon;
    tiedMatchCounter.value = Human.matchesTied;

    gameStatus.innertext = message;
    close.disabled = true;
    start.disabled = false;
    AI.roundsWon = 0;
    Human.roundsWon = 0;
    AI.roundsTied = 0;
    Human.roundsTied = 0;
    match.roundsPlayed = 0;
  }
}
