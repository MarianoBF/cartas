/// <reference types="cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('localhost:5500')
  })

  describe('Botoneras', () => {
    it('Ajustar', () => {
      cy.get('#iniciar')
      .should('have.text', 'Iniciar partido')
      .should("not.be.disabled")

      cy.get('#repartir')
      .should('have.text', 'Repartir mano')
      .should("be.disabled")

      cy.get('#puntuar')
      .should('have.text', 'Mostrar cartas y comparar puntaje')
      .should("be.disabled")

      cy.get('#cerrar')
      .should('have.text', 'Cerrar mano')
      .should("be.disabled")

      cy.get('#reglas')
      .should('have.text', 'Mostrar Reglas')
      .should("not.be.disabled")
      .click()
      cy.on('window:alert', message => expect(message).to.match(/los puntajes/));    }

    )})

  })
