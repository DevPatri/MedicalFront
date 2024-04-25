/* global cy describe it */
describe("app", () => {
    
    it("should render the app", () => {
        cy.visit('http://localhost:3000/')
        cy.get('h1').contains('Health dates')

        cy.get('a').contains('Citas').click()

        cy.get('h1').contains('Citas')
        cy.get('a').contains('Detalle').first().click()

        cy.get('.textdiagn').first().type('Gripe')
        cy.get('.textdiagn').last().type('descanso y medicamentos')
        cy.get('.bt-primary').click()

        cy.get('h1').contains('Citas')
        cy.get('a').contains('Detalle').first().click()

        cy.get('.textdiagn').first().should('have.value', 'Gripe')
        cy.get('.textdiagn').last().should('have.value', 'descanso y medicamentos')
        
    });
})