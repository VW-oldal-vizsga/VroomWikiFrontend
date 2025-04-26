describe('Angular app', () => {
    it('should load the homepage', () => {
      cy.visit('/')
      cy.contains('Welcome')
    })
  })