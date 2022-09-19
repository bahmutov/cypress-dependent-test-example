// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it('creates item A', () => {
  cy.log('a very long test')
  cy.wait(1000)
  cy.log('that creates project').then(() => {
    const projectName = `my random project ${Cypress._.random(1e4)}`
    Cypress.env('projectName', projectName)
    cy.log(projectName)
  })
})

// this test MUST run only after the previous test runs
// you cannot run it by itself using "it.only"
it('continues working with data created in the previous test', () => {
  const projectName = Cypress.env('projectName')
  cy.wrap(projectName, { timeout: 0 }).should('include', 'project')
})
