import { Input } from "@/app/components/Input";

describe("Input.cy.tsx", () => {
  it("Test you can write in the input clicking on the label", () => {
    cy.mount(
      <Input
        label="E-mail"
        placeholder="@gmail.com"
        type="text"
        name="email"
      />
    );
    cy.get("label").should("have.text", "E-mail").click().type("text");
    cy.get("input").should("have.value", "text");
  });
  it("Test if you can pass a error text as a child", () => {
    cy.mount(
      <Input
        label="E-mail"
        placeholder="@gmail.com"
        type="text"
        name="email"
      >
        <span>Error text</span>
      </Input>
    );
    cy.get("span").should("have.text", "Error text");
  });
});
