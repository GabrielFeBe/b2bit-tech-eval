import profile from "../fixtures/profile.json";

const url = "http://localhost:3000/";

describe("This tests the functions of the profile page", () => {
  it("Check if the information is on the screen and if the logout button works properlly", () => {
    cy.visit(url.concat("profile"));

    // set the localsotrage token

    localStorage.setItem("token", "mocked_token");

    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .should("exist")
      .should("eq", "mocked_token");

    cy.intercept(
      "GET",
      "https://api.homologation.cliqdrive.com.br/auth/profile",
      { statusCode: 200, body: profile }
    );

    cy.get('[data-testid="name"]').should("have.text", profile.name);
    cy.get('[data-testid="email"]').should("have.text", profile.email);
    cy.get('[data-testid="avatar"]').should("exist");

    cy.get('[data-testid="logout-button"]').click();

    cy.url().should("eq", url);

    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .should("not.exist");
  });


  it("Check if when trying to access the profile page without a token you're redirected to the login page", () => {
    cy.intercept(
      "GET",
      "https://api.homologation.cliqdrive.com.br/auth/profile",
      { statusCode: 401, body: 'anything' }
    );
    cy.visit(url.concat("profile"));

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Session expired, please login again.");
    });

    cy.url().should("eq", url);
  });

});
