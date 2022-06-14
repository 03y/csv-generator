// Tests for csv generator by kyle

describe('Kyle\'s Tests', function () {
    before (function() {
        cy.visit('/index.html');
    });

    // Ensure page loads properly
    it ('Page loads', function () {
        cy.get('#name').should('be.visible');
        cy.get('#seed-input').should('be.visible');
        cy.get('#btn-add').should('be.visible');
        cy.get('#btn-generate').should('be.visible');
    });

    // Add data
    it ('Add data', function () {
        cy.get('#seed-input').type('mrtest');
        cy.get('#btn-add').click();
    });
    
    // Check table generates
    it ('Check table generates', function () {
        cy.get('#dataTable').should('be.visible');
    });

    // Check data is generated and displayed
    it ('Check data is generated as expected', function () {
        cy.get('#dataTable').contains('mrtest');
        cy.get('#dataTable').contains('mrtest@example.com');
        cy.get('#dataTable').contains(' Example St.');
        cy.get('#dataTable').contains('07');
    });

    // Ensure csv can be generated and downloaded
    it ('Check csv can be generated', function () {
        cy.get('#btn-generate').click();
        cy.verifyDownload('users.csv');
    });

    // Ensure seed field cannot be empty
    it ('Check seed field cannot be empty', function () {
        cy.get('#seed-input').type('{selectAll}');
        cy.get('#btn-add').click();
        cy.get('#seed-input').should('have.value', '');
    });

    // Ensure seed field can only have alphanumeric characters
    it ('Check seed field can only have alphanumeric characters', function () {
        cy.get('#seed-input').type('$');
        cy.get('#btn-add').click();
        cy.get('#seed-input').should('have.value', '');
    });
});
