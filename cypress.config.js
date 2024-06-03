const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://abudhabi.alike.host/',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: "cypress/results",
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
      overwrite: false,
      html: true,
      json: true
    },
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',  // Corrected placement
  },
  component: {
    supportFile: "support/screenshot.js",
  },
});