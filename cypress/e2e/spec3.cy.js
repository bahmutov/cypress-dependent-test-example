// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
/// <reference types="cypress-data-session" />

import 'cypress-data-session'

it('creates item A', () => {
  cy.log('a very long test')
  cy.wait(1000)
  cy.log('that creates project').then(() => {
    // how do we pass the data created in this test
    // to the next test?
    const projectName = `my random project ${Cypress._.random(1e4)}`
    cy.log(projectName)
    cy.dataSession({
      name: 'project name',
      setup() {
        return projectName
      },
      shareAcrossSpecs: true,
    })
  })
})

it('continues working with data created in the previous test', () => {
  // cy.dataSession('project name').then((projectName) => {
  cy.dataSession({
    name: 'project name',
    setup: Cypress._.identity,
    shareAcrossSpecs: true,
  }).then((projectName) => {
    expect(projectName, 'got project name').to.be.a(
      'string',
      'project name created by previous test',
    )
    cy.wrap(projectName, { timeout: 0 }).should('include', 'project')
  })
})
