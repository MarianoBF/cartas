describe("Inicio", () => {
  beforeEach(() => {
    cy.visit("localhost:5500");
  });

  it("Encuentra botonera e inicia", () => {
    
    cy.get(".botonera").should("be.visible");
    cy.get(".botonera").contains("Iniciar partido").wait(1500).click();
    cy.get("#repartir").should("not.be.disabled").wait(1500).click();
    cy.get("#puntuar").should("not.be.disabled").wait(1500).click();
    cy.get("#cerrar").should("not.be.disabled").wait(1500).click();

    cy.get("#repartir").should("not.be.disabled").wait(1500).click();
    cy.get("#puntuar").should("not.be.disabled").wait(1500).click();
    cy.get("#cerrar").should("not.be.disabled").wait(1500).click();

    cy.get("#repartir").should("not.be.disabled").wait(1500).click();
    cy.get("#puntuar").should("not.be.disabled").wait(1500).click();
    cy.get("#cerrar").should("not.be.disabled").wait(1500).click()
    cy.on('window:alert', message => expect(message).to.match(/El jugador/));

  });
});
