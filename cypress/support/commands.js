// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Post Code Check
Cypress.Commands.add("performWoningcheck", () => {
    cy.get(".p-4 > .rounded-pill").should(($label) => {
        expect($label).to.have.text(" Gratis woningcheck ");
      });
      cy.get(".p-4 > .rounded-pill").click();
      cy.get("#__BVID__19").click().type("1200as");
      cy.get("#__BVID__20").click().type("12");
      cy.get("form > :nth-child(2) > .rounded-pill")
        .should("have.text", " Ophalen woninggegevens")
        .click();
})