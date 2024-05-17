import { LoginCard } from "@/app/components/LoginCard";
import MockRouter from "./mockRouter";
import profile from "../fixtures/profile.json";
import token from "../fixtures/login.json";

// won't look for the image because it's not important for the test;

describe("LoginCard.cy.tsx", () => {
  it("Check if clicking on the button while writing nothing will show the input validations", () => {
    cy.mount(
      <MockRouter>
        <LoginCard />
      </MockRouter>
    );
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="email-error"]')
      .should("exist")
      .should("have.text", "Required");
    cy.get('[data-testid="password-error"]')
      .should("exist")
      .should("have.text", "Required");
  });
  it("Check if clicking on the button with invalid input data will give the proper errors", () => {
    cy.mount(
      <MockRouter>
        <LoginCard />
      </MockRouter>
    );
    cy.get('[data-testid="email"]').type("testa");
    cy.get('[data-testid="password"]').type("123");
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="email-error"]')
      .should("exist")
      .should("have.text", "Invalid email address");
    cy.get('[data-testid="password-error"]')
      .should("exist")
      .should("have.text", "Password must be at least 6 characters");
  });

  it("Check if clicking on the button with valid input data will redirect to the profile page with the stored token", () => {
    cy.intercept(
      "POST",
      "https://api.homologation.cliqdrive.com.br/auth/login",
      { statusCode: 200, body: token }
    );
    cy.intercept(
      "GET",
      "https://api.homologation.cliqdrive.com.br/auth/profile",
      { statusCode: 200, body: profile }
    );
    cy.mount(
      <MockRouter>
        <LoginCard />
      </MockRouter>
    );

    cy.get('[data-testid="email"]').type("validemail@gmail.com");
    cy.get('[data-testid="password"]').type("validpassword");
    cy.get('[data-testid="submit-button"]').click();

    cy.window()
      .its("localStorage")
      .invoke("getItem", "token")
      .should("exist")
      .should("eq", token.tokens.access);

    // look to se if the function to change the page was called
    cy.get("@push").should("have.been.calledWith", "/profile");
  });
});
