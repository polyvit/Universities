describe("Form", () => {
  it("When visiting the home page, the form is visible", () => {
    cy.visit("http://localhost:9000");
    cy.get("[data-hook=mainForm]").should("be.visible");
  });
  it("When typing a value in country autocomplete, this autocomplete is visible and has typed value", () => {
    cy.visit("http://localhost:9000");
    cy.get("[data-hook=autocompleteCountry]").as("autocompleteCountry");
    cy.get("@autocompleteCountry").should("be.visible");
    cy.get("@autocompleteCountry").type("Spain");
    cy.get("@autocompleteCountry").should("have.value", "Spain");
  });
});

describe("Test search requests", () => {
  before(() => {
    cy.intercept("GET", "https://restcountries.com/v3.1/all", {
      fixture: "countries.json",
    }).as("getCountries");
    cy.visit("http://localhost:9000");
    cy.wait("@getCountries");
  });
  beforeEach(() => {
    cy.get("[data-hook=autocompleteCountry]").as("autocompleteCountry");
    cy.get("[data-hook=submitButton]").as("submitButton");
    cy.get("[data-hook=resetButton]").as("resetButton");
    cy.get("@resetButton").click();
    cy.get("@autocompleteCountry").type("Ireland");
    cy.get(".autocomplete-content li:first").contains("Ireland").click();
  });
  it("Form submit with correct query param", () => {
    cy.intercept(
      "GET",
      "http://universities.hipolabs.com/search?name=university&limit=25",
      {
        query: { country: "ireland" },
      }
    );
    cy.get("@submitButton").click();
  });
  // it("Universities display correctly", () => {
  //   cy.intercept(
  //     "GET",
  //     "http://universities.hipolabs.com/search?name=university&limit=25&country=ireland",
  //     {
  //       fixture: "universities.json",
  //     }
  //   );
  //   cy.get("@submitButton").click();
  //   cy.get("[data-hook=uniContainer]").as("uniContainer");
  //   cy.get("@uniContainer")
  //     .find("[data-hook=uniCard]")
  //     .should("have.length", 2);
  // });
});
