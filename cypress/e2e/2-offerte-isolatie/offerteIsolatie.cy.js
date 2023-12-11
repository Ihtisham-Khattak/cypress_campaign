describe("Offerte Isolatie", () => {
  // For viewport
  const devices = [
    { name: "iPhone 6", width: 375, height: 667, wait: 3000 },
    { name: "iPhone 7", width: 375, height: 667, wait: 3000 },
    { name: "iPhone 8", width: 375, height: 667, wait: 3000 },
    { name: "iPhone X", width: 375, height: 812, wait: 3000 },
  ];

  // Will reload the link all the time
  beforeEach(() => {
    const t0 = performance.now();
    cy.visit("offerte-verjelijker.web.app/isolatie");
    cy.wrap(t0).then((t1) => {
      cy.log(`Page load took ${t1 - t0} ms`);
    });
  });

  //   Check content properly loaded on the Screen
  it("Offerte Isolatie Home Page", () => {
    cy.get(".p-4 > :nth-child(1)").should(
      "have.text",
      " Extra subsidie voor woningisolatie! "
    );
    cy.get(".title-color.text-size").should(($label) => {
      expect($label).to.have.css("font-weight", "700");
    });

    cy.get(".p-4 > :nth-child(4) > .fw--700").should(($label) => {
      expect($label).to.have.css(
        "text-decoration",
        "underline solid rgb(33, 37, 41)"
      );
    });
  });

  // Check the Landing page on different ViewPort
  devices.forEach((device) => {
    it("Landing Page Viewport", () => {
      cy.viewport(device.width, device.height);
      cy.wait(device.wait);
    });
  });

  //Click the button carefully.
  //   Click on the Button
  it("Gratis Woningcheck", () => {
    cy.get(".p-4 > .rounded-pill").should(($label) => {
      expect($label).to.have.text(" Gratis woningcheck ");
    });
    cy.get(".p-4 > .rounded-pill").click();
  });

  //   Post code
  it("Post Code Checker", () => {
    cy.get(".p-4 > .rounded-pill").should(($label) => {
      expect($label).to.have.text(" Gratis woningcheck ");
    });
    cy.get(".p-4 > .rounded-pill").click();
    cy.get("#__BVID__21").click().type("1200as");
    cy.get("#__BVID__22").click().type("12");
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Ophalen woninggegevens")
      .click();
  });

  //   Incorrect Post Code
  it("Post Code Checker", () => {
    // Check if the label has the expected text
    cy.get(".p-4 > .rounded-pill").should(($label) => {
      expect($label).to.have.text(" Gratis woningcheck ");
    });
    cy.get(".p-4 > .rounded-pill").click();

    cy.get("#__BVID__19").type("1200as");
    // cy.get("#__BVID__19").type("120as");
    cy.get("#__BVID__20").click().type("12");

    // Check the conditions for the input values
    cy.get("#__BVID__19")
      .invoke("val")
      .then((inputValue) => {
        // Check if the first input value satisfies the condition
        if (!/^\d{4}[a-zA-Z]{2}$/.test(inputValue)) {
          // If not satisfied, display an error message
          cy.log(
            "Error: Moet minimaal 4 numerieke tekens en 2 tekens bevatten."
          );
        }
      });

    cy.get("#__BVID__20")
      .invoke("val")
      .then((inputValue) => {
        // Check if the second input value satisfies the condition
        if (inputValue.length < 4 || !/\d{2}/.test(inputValue)) {
          // If not satisfied, display an error message
          cy.log(
            "Error: Moet minimaal 4 numerieke tekens en 2 tekens bevatten."
          );
        }
      });

    // Click the form submission button
    cy.get("#__BVID__19")
      .invoke("val")
      .then((inputValue) => {
        // Check if the first input value satisfies the condition
        if (!/^\d{4}[a-zA-Z]{2}$/.test(inputValue)) {
          // If not satisfied, display an error message
          cy.log(
            "Error: Moet minimaal 4 numerieke tekens en 2 tekens bevatten."
          );
        } else {
          cy.get("form > :nth-child(2) > .rounded-pill")
            .should("have.text", " Ophalen woninggegevens")
            .click();
        }
      });
  });

  //Map Flow
  it("Map Flow", () => {
    cy.performWoningcheck();
    cy.get(".title").should(($label) => {
      expect($label).to.have.text("Jouw adresgegevens:");
    });
    cy.get(".main-cont > :nth-child(1) > .rounded-pill").click();
  });

  // Ja/Nee Flow
  it("Ja/Nee Flow", () => {
    cy.performWoningcheck();
    cy.get(".title").should(($label) => {
      expect($label).to.have.text("Jouw adresgegevens:");
    });
    cy.get(".main-cont > :nth-child(1) > .rounded-pill").click();
    cy.get(".title").should("have.text", "Ben jij eigenaar van de woning?");
    cy.get(":nth-child(1) > .my-3").click();
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Volgende ")
      .click();

    //This is for testing commants
    // Wanneer wordt u eigenaar Flow
    cy.get(".title").should("have.text", "Wanneer wordt u eigenaar?");
    cy.get(":nth-child(1) > .custom-control-label")
      .should("have.text", " Nooit, ik huur de woning ")
      .click();
  });

  // Wanneer wordt u eigenaar? Question Flow
  it("Ja/Nee Flow", () => {
    cy.performWoningcheck();
    cy.get(".title").should(($label) => {
      expect($label).to.have.text("Jouw adresgegevens:");
    });

    cy.get(".main-cont > :nth-child(1) > .rounded-pill").click();
    cy.get(".title").should("have.text", "Ben jij eigenaar van de woning?");
    cy.get(":nth-child(1) > .my-3").click();
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Volgende ")
      .click();

    cy.get(".title").should("have.text", "Wanneer wordt u eigenaar?");
    cy.get(":nth-child(1) > .custom-control-label")
      .should("have.text", " Nooit, ik huur de woning ")
      .click();
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Volgende ")
      .click();
  });

  // In welke vormen van isolatie ben jij geïnteresseerd? Question Flow
  it.only("In welke vormen van isolatie ben jij geïnteresseerd", () => {
    cy.performWoningcheck();
    cy.get(".title").should(($label) => {
      expect($label).to.have.text("Jouw adresgegevens:");
    });

    cy.get(".main-cont > :nth-child(1) > .rounded-pill").click();
    cy.get(".title").should("have.text", "Ben jij eigenaar van de woning?");
    cy.get(":nth-child(1) > .my-3").click();
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Volgende ")
      .click();

    cy.get(".title").should("have.text", "Wanneer wordt u eigenaar?");
    cy.get(":nth-child(1) > .custom-control-label")
      .should("have.text", " Nooit, ik huur de woning ")
      .click();
    cy.get("form > :nth-child(2) > .rounded-pill")
      .should("have.text", " Volgende ")
      .click();
    for (let i = 1; i <= 4; i++) {
      cy.get(`:nth-child(${i}) > .custom-control-label`).click();
    }

    cy.get('.mt-4 > .rounded-pill')
    .should("have.text", " Volgende ")
    .click();
  });

  
});
