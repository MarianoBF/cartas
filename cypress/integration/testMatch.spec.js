export function testMatch() {
  describe("Match", () => {
    before(() => {
      cy.visit("localhost:5500");
    });

    it("Plays a three round match", () => {
      cy.get(".buttons").should("be.visible");
      cy.get(".buttons").contains("Iniciar partido").wait(1500).click();
      cy.get("#deal").should("not.be.disabled").wait(1500).click();
      cy.get("#score").should("not.be.disabled").wait(1500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();

      cy.get("#repartir").should("not.be.disabled").wait(1500).click();
      cy.get("#score").should("not.be.disabled").wait(1500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();

      cy.get("#repartir").should("not.be.disabled").wait(1500).click();
      cy.get("#score").should("not.be.disabled").wait(1500).click();
      cy.get("#close").should("not.be.disabled").wait(1500).click();
    });
  });
}

testMatch()