describe('General (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('Create content and read it', () => {
    cy.visit('http://localhost:3000');

    cy.intercept('POST', '/api/content-create').as('createContent');
    cy.intercept('POST', '/api/content-get').as('getContent');

    cy.fixture('seed.json').then((data) => {
      // Creation
      cy.get(`[data-cy="editor"] .ql-editor`)
        .should('have.prop', 'contenteditable', 'true')
        .and('have.attr', 'data-placeholder', data.editorPlaceholder)
        .and('have.text', '')
        .type(data.content)
        .should('have.text', data.content);

      cy.get(`[data-cy="button-encrypt"]`).should('be.visible').and('be.enabled').click();
      cy.get(`[data-cy="editor"]`).should('not.exist');

      // Progress
      cy.get(`[data-cy="progress"]`).should('be.visible');
      const texts = [
        'Generating encryption keys',
        'Your content is being encrypted',
        'Encrypting your data for transmission using RSA keys',
        'Generating a hash link',
      ];

      for (const [index, text] of texts.entries()) {
        cy.get('[data-cy="progress"] [data-cy="progress-item"]')
          .eq(index)
          .should('be.visible')
          .and('have.text', text);
      }

      cy.wait('@createContent').its('response.statusCode').should('eq', 200);
      cy.get(`[data-cy="progress"]`).should('not.exist');

      // Done and read
      cy.get(`[data-cy="progress-done"]`).should('be.visible');
      cy.get(`[data-cy="progress-done"] [data-cy="button-copy-link"]`)
        .should('be.visible')
        .and('be.enabled')
        .invoke('attr', 'data-link')
        .as('link');

      cy.get('@link').then((link) => {
        cy.visit(link as unknown as string);

        cy.wait('@getContent').its('response.statusCode').should('eq', 200);

        cy.get(`[data-cy="editor"] .ql-editor`)
          .should('have.prop', 'contenteditable', 'false')
          .and('have.text', data.content);

        cy.get(`[data-cy="expire-in"]`).should('have.text', 'in 3 days');
      });
    });
  });
});

// describe('General (mobile)', () => {
//   beforeEach(() => {
//     cy.viewport(360, 800);
//   });
//
//   it('Create content and read it', () => {
//     cy.visit('http://localhost:3000');
//   });
// });
