/// <reference types="cypress" />

describe('home page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000');
  });

  it('displays two inputs by default', () => {
    // the two inputs for the user to enter the url and slug
    cy.get('input').should('have.length', 2);

    cy.get('input')
      .first()
      .invoke('attr', 'placeholder')
      .should('contain', 'URL');
    // slug should start empty
    cy.get('input').last().should('have.value', '');
  });

  describe('can add new snails', () => {
    it('without provided slug', () => {
      const url = 'https://www.google.com';

      cy.get('input').first().type(url);

      cy.get('button').contains('shorten it').click();

      cy.contains('success');
    });
    it('with provided slug', () => {
      const url = 'https://www.google.com';
      // generate random string of length 20
      const slug = Math.random().toString(36).substring(2, 22);

      cy.get('input').first().type(url);
      cy.get('input').last().type(slug);

      cy.get('button').contains('shorten it').click();

      cy.contains('success');
      cy.contains(slug);
    });
  });
});
