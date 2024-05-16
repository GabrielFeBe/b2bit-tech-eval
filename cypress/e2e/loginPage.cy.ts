describe("Checking if using invalid format of password and email will give me error texts", () => {
  it("Check if there is the email input", () => {
    cy.visit("http://localhost:3000/");
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
});
