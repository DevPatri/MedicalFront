/* global cy describe it beforeEach */
describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    
    it('front page can be opened', () => {
        cy.contains('Health dates')
    })

    it('can be create a new health date', () => {
        cy.contains('Crear cita').click()
        cy.get('#paciente').select('Patricio 23412-35213')
        cy.get('#medico').select('Antonio 24656')
        cy.get('#fecha').type('2024-04-30 15:00:00')
        cy.get('#motivo').type('Dolor de cabeza')
        cy.contains('Crear cita').click()

        cy.get('h3').should('contain', '30 de abril de 2024, 15:00')
        cy.get('p').should('contain', 'Paciente NSS: 23412-35213')
        cy.get('p').should('contain', 'Motivo cita: Dolor de cabeza')
    })
})