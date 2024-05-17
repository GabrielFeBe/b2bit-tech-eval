import loginJson from "../fixtures/login.json";
import wrongInfo from "../fixtures/wrongInfo.json";

const url = "http://localhost:3000/"

describe("This check the functions of the login page", () => {

  it("Check if there is the email input and if the fields are being validated", () => {
    cy.visit(url);
    const emaiInput = cy.get('[data-testid="email"]');
    emaiInput.should("exist");
    emaiInput.type("teste");

    const passwordInput = cy.get('[data-testid="password"]');
    passwordInput.should("exist");
    passwordInput.type("123");

    const button = cy.get('[data-testid="submit-button"]');

    button.should("exist"); 

    button.click();

    const emailError = cy.get('[data-testid="email-error"]');
    emailError.should("exist");
    emailError.should("have.text", "Invalid email address");

    const passwordError = cy.get('[data-testid="password-error"]');

    passwordError.should("exist");

    passwordError.should("have.text", "Password must be at least 6 characters");
  });


  it("Check if when trying to login with wrongs credentials an alert is triggered", () => {
    cy.intercept('POST', 'https://api.homologation.cliqdrive.com.br/auth/login', { statusCode: 401, body: wrongInfo  } );
    cy.intercept('GET', 'https://api.homologation.cliqdrive.com.br/auth/profile', { statusCode: 401, body: wrongInfo } )
    cy.visit(url);
    const emaiInput = cy.get('[data-testid="email"]');
    emaiInput.type("texte@gmail.com");

    const passwordInput = cy.get('[data-testid="password"]');
    passwordInput.type("senha_errada");

    const button = cy.get('[data-testid="submit-button"]');
    button.click();

    // Checa se o alerta de erro apareceu
    cy.on('window:alert', (str) => {
      expect(str).to.equal(wrongInfo.detail);
    });
  }
  );




  it("Check if is possible to login and you're redirected to the profile page, with the token sotored at your local storage", () => {
    cy.intercept('POST', 'https://api.homologation.cliqdrive.com.br/auth/login', { statusCode: 200, body: loginJson } )
    cy.intercept('GET', 'https://api.homologation.cliqdrive.com.br/auth/profile', { statusCode: 200, body: "any" } )
    cy.visit(url);

    const emaiInput = cy.get('[data-testid="email"]');
    emaiInput.type("emailvalido@gmail.com");

    const passwordInput = cy.get('[data-testid="password"]');
    passwordInput.type("senha_valida");

    const button = cy.get('[data-testid="submit-button"]');
    button.click();

    // Look if we're in login page
    cy.url().should('eq', url.concat('profile'));

    // Look for the token in the local storage
    cy.window().its('localStorage').invoke('getItem', 'token').should('exist').should('eq', loginJson.tokens.access);

  });


  it("Check if when you're already with a token in your localsorage u're redirected", () => {
   localStorage.setItem("token", "mocked_token");
    cy.visit(url);
    cy.url().should('eq', url.concat('profile'));
  });

  
});
