// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import {
  getPluginConfigValue,
  setPluginConfigValue,
} from 'cypress-plugin-config'

it('creates item A', () => {
  cy.log('a very long test')
  cy.wait(1000)
  cy.log('that creates project').then(() => {
    // how do we pass the data created in this test
    // to the next test?
    const projectName = `my random project ${Cypress._.random(1e4)}`
    cy.log(projectName)
    setPluginConfigValue('project name', projectName)
  })
})

it('continues working with data created in the previous test', () => {
  const projectName = getPluginConfigValue('project name')
  expect(projectName, 'got project name').to.be.a(
    'string',
    'project name created by previous test',
  )
  cy.wrap(projectName, { timeout: 0 }).should('include', 'project')
})
