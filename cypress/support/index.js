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