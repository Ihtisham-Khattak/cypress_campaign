const mobileWidth = [
  { width: 375, height: 667, name: "iPhone 6/7/8", stay: 2000 },
  { width: 414, height: 736, name: "iPhone 6/7/8 Plus", stay: 2000 },

  { width: 360, height: 640, name: "Samsung Galaxy S5", stay: 2000 },
  { width: 390, height: 844, name: "Samsung Galaxy S5", stay: 2000 },

  {
    width: 375,
    height: 812,
    name: "Portrait orientation iPhone11 Pro",
    stay: 2000,
  },
  {
    width: 812,
    height: 375,
    name: "Landscape orientation iPhone11 Pro",
    stay: 2000,
  },

  {
    width: 414,
    height: 896,
    name: "Portrait orientation iPhone11 Pro Max",
    stay: 2000,
  },
  {
    width: 896,
    height: 414,
    name: "Landscape orientation iPhone11 Pro Max",
    stay: 2000,
  },

  {
    width: 320,
    height: 568,
    name: "Portrait orientation iPhone 5",
    stay: 2000,
  },
  {
    width: 568,
    height: 320,
    name: "Landscape orientation iPhone 5",
    stay: 2000,
  },
];

describe("voorleesonderzoek UI Testing", () => {
  before(() => {
    cy.visit("https://voorleesonderzoek.web.app/");
  });

  it("Home Page UI", () => {
    cy.visit("https://voorleesonderzoek.web.app/");
    cy.url().should("include", "/"),
      cy
        .get(".header__text")
        .should(
          "have.text",
          "Lisa: “Stijn vind het heerlijk om iedere avond een boekje te lezen”"
        ),
      mobileWidth.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height);
        cy.wait(viewport.stay);
      });
  });

  it.only("Click On JAA", () => {
    cy.visit("https://voorleesonderzoek.web.app/");
    cy.url().should("include", "/"),
      cy.get(".mx-5 > :nth-child(1)").should("have.text", "jaa").click();
    cy.get(":nth-child(1) > .mx-2").click();
    cy.get(".mx-5 > :nth-child(1)").click();
    cy.get(".mx-5 > :nth-child(1)").click();
    cy.get(":nth-child(1) > :nth-child(1) > .form-control")
      .click()
      .type("Haroon");
    cy.get(":nth-child(1) > :nth-child(2) > .form-control")
      .click()
      .type(1234)
      .should("have.text", "Voer een geldige achternaam in");
    cy.get(":nth-child(2) > :nth-child(1) > .form-control")
      .click()
      .type("uer@gmail.com");
    cy.get(":nth-child(2) > :nth-child(2) > .form-control")
      .click()
      .type("0712345679");
  });
});
