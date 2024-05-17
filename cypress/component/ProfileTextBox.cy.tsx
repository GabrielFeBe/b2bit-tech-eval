import { ProfileTextBox } from "@/app/components/ProfileTextBox"

describe('ProfileTextBox.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<ProfileTextBox 
      text="Your"
      boldText="E-mail"
      contentText={"gabrielferdev@gmail.com"}
      divPosition="mt-5"
      data_testid="email"
    />)
    cy.get('strong').should('have.text', 'E-mail');
    // get array of spans
    cy.get('span').should('have.length', 2);
    // get the first span
    cy.get('span').first().should('have.text', 'Your ');
    // get the second span
    cy.get('span').last().should('have.text', 'gabrielferdev@gmail.com');


  })
})