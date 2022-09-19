// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
/// <reference types="cypress-data-session" />

let projectName

it('creates item A', () => {
  cy.log('a very long test')
  cy.wait(1000)
  cy.log('that creates project').then(() => {
    // how do we pass the data created in this test
    // to the next test?
    projectName = `my random project ${Cypress._.random(1e4)}`
    cy.log(projectName)
  })
})

// this test MUST run only after the previous test runs
// you cannot run it by itself using "it.only"
it('continues working with data created in the previous test', () => {
  cy.wrap(projectName, { timeout: 0 }).should('include', 'project')
})
