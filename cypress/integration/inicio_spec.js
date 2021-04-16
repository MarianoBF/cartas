describe('Inicio', () => {

  beforeEach(() => {
    cy.visit('localhost:5500')
  })
  
    it('Encuentra botonera e inicia', () => {
      cy.get('.botonera').should('be.visible')
        cy.get('.botonera').contains('Iniciar partido').click().wait(1000)
        cy.get('#repartir').should('not.be.disabled').click()
    })

  })