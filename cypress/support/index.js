import 'cypress-xpath';

Cypress.Server.defaults({
    delay:500,
    force404:false,
    force200:false,
    ignore: (xhr) => {
      return false;
    },
  })

  module.exports = (on, config) => {
    // log any uncaught exceptions to the console
    on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught Exception: ', err.message)
      return false
    })
  }

  beforeEach(() => {
    cy.fixture('config').as('config');
  });

  const fs = require('fs-extra');
  const path = require('path');
  
  function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('cypress/config', `${file}.json`);
  
    return fs.readJson(pathToConfigFile);
  }
  
  module.exports = (on, config) => {
    const file = config.env.configFile || 'default';
    return getConfigurationByFile(file);
  };
  