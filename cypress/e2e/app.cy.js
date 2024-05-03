/* global cy describe it beforeEach */
describe("app", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it("should render the app", () => { //* OK
        cy.get('a').contains('Login').click()
        cy.get('input').first().type('ManoLo')
        cy.get('input').last().type('laclavequequieres!')
        cy.get('button').contains('Login').click()

        cy.get('a').contains('Citas').click()

        cy.get('h1').contains('Citas')
        cy.get('a').contains('Detalle').first().click()

        cy.get('.textdiagn').first().type('Gripe')
        cy.get('.textdiagn').last().type('descanso y medicamentos')
        cy.get('.bt-primary').click() //* Fixed. 403 unauthorized

        cy.get('h1').contains('Citas')
        cy.get('a').contains('Detalle').first().click()

        cy.get('.textdiagn').first().should('have.value', 'Gripe')
        cy.get('.textdiagn').last().should('have.value', 'descanso y medicamentos')
        
    });

    it("do login and logout", () => { //* OK
        
        cy.get('a').contains('Login').click()
        cy.get('input').first().type('ManoLo')
        cy.get('input').last().type('laclavequequieres!')
        cy.get('button').contains('Login').click()
        cy.get('h3').contains('26 de abril de 2024, 17:00')

        cy.get('button').contains('Logout').click()
        
    })

})