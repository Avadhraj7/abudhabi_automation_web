import nanoPass from "../selectors/nano-pass.css";
import accountDetails from "../selectors/account-details.css";

describe('Abu Dhabi all passes order Test Scenarios', () => {

  beforeEach(() => {
    cy.visit('/passes')
  });

  it.only('Nano Pass', () => {


    //Select Nano pass ticket 
    // Step 1: Scroll the element into view and wait for it to be visible and fully opaque
    cy.xpath(nanoPass.nanoPassSelect)
      .scrollIntoView()
      .should('be.visible')
      .should(($el) => {
        expect($el).to.have.css('opacity', '1');
      })
    cy.get(nanoPass.nanoPassSelect1).click(); // Additional wait to ensure the element is fully interactable

    cy.then(() => {
      // Add a debugger statement to pause the test
      debugger;
      // Click on the review selection button
      cy.xpath(nanoPass.reveiwSelectionButton)
        .should('be.visible')
        .as('reviewSelectionButton');

      cy.get('@reviewSelectionButton').click();
    });


    //Select Date
    // Open the date picker
    cy.xpath(nanoPass.selectDate).click({ force: true });

    // Wait for the date picker to be visible
    cy.wait(2000);

    // Get the current date details
    const currentDate = new Date();
    const day = currentDate.getDate().toString();  // Get the current day as a string

    // Construct the XPath dynamically using the current day
    const dateXPath = `//div[contains(@class, 'vc-pane-layout')]//div[contains(@class, 'vc-weeks')]//div/div[contains(@class, 'vc-day-content') and normalize-space(text()) = '${day}' and not(ancestor::*[contains(@style, 'opacity')])]`;

    // Log the XPath for debugging purposes
    cy.log(`XPath: ${dateXPath}`);

    // Select the current date using the constructed XPath
    cy.xpath(dateXPath, { timeout: 10000 })
      .should('be.visible')
      .click({ multiple: true, force: true });

    //Click on the add to cart button
    cy.get(nanoPass.addToCart).click()
      .then(() => {

        //Click on the continue Checkout
        cy.get(nanoPass.continueCheckout, { timeout: 10000 }).click()

      });

    //Fill Account Details
    cy.fixture('config').then(config => {
      const fName = config.cred.firstName;
      const lName = config.cred.lastName;
      const email = config.cred.email;
      const pNumber = config.cred.phoneNumber;


      cy.xpath(accountDetails.firstNameField).type(fName);
      cy.xpath(accountDetails.lastNameField).type(lName);
      cy.xpath(accountDetails.emailField).type(email);
      cy.xpath(accountDetails.phoneNumberField).type(pNumber);

      cy.xpath(accountDetails.nationalityDropdown).select(accountDetails.nationalityCountry)
      cy.xpath(accountDetails.ageDropdown).select(accountDetails.ageSelect)

      cy.xpath(accountDetails.continueButton).click()
    });

    //Apply Promo Code
    cy.fixture('config').then(config => {

      cy.xpath(accountDetails.promoCode, { timeout: 10000 }).click()

      const cCode = config.cred.couponCode;
      cy.xpath(accountDetails.promoCodeField).type(cCode)
      cy.xpath(accountDetails.applyButton).click();

      // Wait for the loading indicator to disappear
      cy.xpath(accountDetails.applyButtonLoader).should('be.visible')

      cy.xpath(accountDetails.applyButtonLoader, {timeout: 5000}).should('be.disabled')
        .then(() => {
          cy.wait(5000)
          cy.xpath(accountDetails.continueButton).click()
        });
    });


  })

  it('Build your Own Passe', () => {

  })

  it('Individual Pass', () => {

  })


})