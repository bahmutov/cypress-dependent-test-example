const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    supportFile: false,
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // https://github.com/bahmutov/cypress-data-session
      require('cypress-data-session/src/plugin')(on, config)
    },
  },
})
