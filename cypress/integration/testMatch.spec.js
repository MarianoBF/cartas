/* global
cy
describe
before
it
context
expect
 */

export function testMatch() {

  const inputCardsToChange = {}
  inputCardsToChange.value = 3;

  describe("Match", () => {
    before(() => {
      cy.visit("localhost:5500");
    });

    it("Plays a three round match", () => {
      cy.get(".buttons").should("be.visible");
      cy.get(".buttons").contains("Iniciar nuevo partido").wait(150).click();
      cy.get("#change").should("not.be.disabled").wait(150).click();
      cy.get("#cardsToChange").clear().wait(50);
      cy.get("#cardsToChange").type('3').wait(50);
      cy.get("#modalClose").should("not.be.disabled").wait(50).click();
      cy.get("#show").should("not.be.disabled").wait(50).click();
      cy.get("#score").should("not.be.disabled").wait(50).click();
      cy.get("#endRound").should("not.be.disabled").wait(150).click();

      cy.get("#change").should("not.be.disabled").wait(150).click();
      cy.get("#cardsToChange").clear().wait(50);
      cy.get("#cardsToChange").type('0').wait(50);
      cy.get("#modalClose").should("not.be.disabled").wait(50).click();
      cy.get("#show").should("not.be.disabled").wait(50).click();
      cy.get("#score").should("not.be.disabled").wait(50).click();
      cy.get("#endRound").should("not.be.disabled").wait(150).click();

      cy.get("#change").should("not.be.disabled").wait(150).click();
      cy.get("#cardsToChange").clear().wait(50);
      cy.get("#cardsToChange").type('1').wait(50);
      cy.get("#modalClose").should("not.be.disabled").wait(50).click();
      cy.get("#show").should("not.be.disabled").wait(50).click();
      cy.get("#score").should("not.be.disabled").wait(50).click();
      cy.get("#endRound").should("not.be.disabled").wait(150).click();
    });
  });
}

testMatch()