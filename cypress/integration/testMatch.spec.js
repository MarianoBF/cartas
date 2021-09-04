export function testMatch() {

  const inputCardsToChange = {}
  inputCardsToChange.value = 3;

  describe("Match", () => {
    before(() => {
      cy.visit("localhost:5500");
    });

    it("Plays a three round match", () => {
      cy.get(".buttons").should("be.visible");
      cy.get(".buttons").contains("Iniciar nuevo partido").wait(1500).click();
      cy.get("#change").should("not.be.disabled").wait(1500).click();
      cy.get("#cardsToChange").clear().wait(500);
      cy.get("#cardsToChange").type('3').wait(500);
      cy.get("#modalClose").should("not.be.disabled").wait(500).click();
      cy.get("#show").should("not.be.disabled").wait(500).click();
      cy.get("#score").should("not.be.disabled").wait(500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();

      cy.get("#change").should("not.be.disabled").wait(1500).click();
      cy.get("#cardsToChange").clear().wait(500);
      cy.get("#cardsToChange").type('0').wait(500);
      cy.get("#modalClose").should("not.be.disabled").wait(500).click();
      cy.get("#show").should("not.be.disabled").wait(500).click();
      cy.get("#score").should("not.be.disabled").wait(500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();

      cy.get("#change").should("not.be.disabled").wait(1500).click();
      cy.get("#cardsToChange").clear().wait(500);
      cy.get("#cardsToChange").type('1').wait(500);
      cy.get("#modalClose").should("not.be.disabled").wait(500).click();
      cy.get("#show").should("not.be.disabled").wait(500).click();
      cy.get("#score").should("not.be.disabled").wait(500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();
    });
  });
}

testMatch()