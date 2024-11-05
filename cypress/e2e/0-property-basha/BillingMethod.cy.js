import BillingLogin from "../../POS/login";
const login = new BillingLogin();

describe("Property Basha Login and Card Module", () => {

  it("Login the Page", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.getAllSessionStorage();
    cy.visit(
      "https://property-basha-react.web.app/login?limit=12&offset=0&images=true&state="
    );
    login.loginFunctionality();
  });
});
