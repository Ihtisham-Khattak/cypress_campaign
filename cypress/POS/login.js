class PropertyBashaLogin{

    constructor(){
        this.username = () => cy.get('input[type="email"]')
        this.password = () => cy.get('input[type="password"]')
        this.continueBtn = () => cy.get('button[type="submit"]') 
    }

    loginFunctionality() {
        this.username().type("nicejibran32+chisfis@gmail.com").click()
        this.password().type("12345678").click()
        this.continueBtn().should("have.text", "Continue").click()
    }
}

export default PropertyBashaLogin