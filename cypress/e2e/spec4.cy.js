// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
/// <reference types="cypress-data-session" />

import 'cypress-data-session'

function createProjectIfNeeded() {
  // how do we pass the data created in this test
  // to the next test?
  const projectName = `my random project ${Cypress._.random(1e4)}`

  return cy.dataSession({
    name: 'project name',
    setup() {
      return projectName
    },
    shareAcrossSpecs: true,
  })
}

it('creates item A', () => {
  cy.log('a very long test')
  cy.wait(1000)
  cy.log('that creates project')
  createProjectIfNeeded().then((projectName) => {
    cy.log(projectName)
  })
})

// this test after the previous test runs just once
// can run by itself using "it.only"
it('continues working with data created in the previous test', () => {
  createProjectIfNeeded().then((projectName) => {
    expect(projectName, 'got project name').to.be.a(
      'string',
      'project name created by previous test',
    )
    cy.wrap(projectName, { timeout: 0 }).should('include', 'project')
  })
})
