import { expect } from "chai";
import { CSSVariableExtractor } from "content/css-variable-extractor";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});

describe('arstechnica', () => {
    it('should render site', () => {
        cy.visit('./cypress/static-test-assets/arstechnica.com/index.html');
    })
})

describe('css-extractor', () => {
    beforeEach(() => {
        cy.visit('./cypress/static-test-assets/arstechnica.com/index.html');
        cy.title().should('eq', 'Arstechnica Test')
        cy.get('#app').should('exist').click({ force: true })
    })

    it('should pull out appropriate css variables', () => {
        cy.document().then((doc) => {
            const css = CSSVariableExtractor.extract(doc.styleSheets);
            expect(css).length.to.be.greaterThan(0);
            console.log(css);
        });
    })
})

