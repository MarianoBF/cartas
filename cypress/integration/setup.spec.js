/// <reference types="cypress" />
/* global
cy
describe
before
it
context
expect
 */

context("Assertions", () => {
    before(() => {
        cy.visit("localhost:5500");
    });

    describe("buttonss", () => {
        it("Ajustar", () => {
            cy.get("#start")
                .should("have.text", "Iniciar nuevo partido")
                .should("not.be.disabled");

            cy.get("#change")
                .should("have.text", "¿Cambiar cartas?")
                .should("be.disabled");

            cy.get("#show")
                .should("have.text", "Mostrar cartas")
                .should("be.disabled");

            cy.get("#score")
                .should("have.text", "Puntuar")
                .should("be.disabled");

            cy.get("#endRound")
                .should("have.text", "Cerrar mano")
                .should("be.disabled");

            cy.get("#rules")
                .should("have.text", "Mostrar Reglas")
                .should("not.be.disabled")
                .click();
            cy.on("window:alert", message => expect(message).to.match(/los puntajes/));        }

        );});

});
