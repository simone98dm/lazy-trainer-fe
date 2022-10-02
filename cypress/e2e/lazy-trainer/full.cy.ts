import cypress from "cypress";

describe("Login", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/auth/sign").as("login");
    cy.visit("http://localhost:3000");
  });

  it("should not login", () => {
    cy.get("input[name='username']").type("testUser");
    cy.get("input[name='password']").type("testPassword");
    cy.get("button").click();
    cy.wait("@login").then((response) => {
      const { statusCode } = response.response;
      if (statusCode) {
        expect(statusCode).to.equal(404);
      }
    });
  });

  it("should login", () => {
    const fakeUser = Cypress.env("fakeUser");
    const fakePassword = Cypress.env("fakePassword");
    cy.get("input[name='username']").type(fakeUser);
    cy.get("input[name='password']").type(fakePassword);
    cy.get("button").click();
    cy.wait("@login").then((response) => {
      const { statusCode } = response.response;
      if (statusCode) {
        expect(statusCode).to.equal(200);
      }
    });
  });
});

describe("Dashboard normal user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    const fakeUser = Cypress.env("fakeUser");
    const fakePassword = Cypress.env("fakePassword");
    cy.get("input[name='username']").type(fakeUser);
    cy.get("input[name='password']").type(fakePassword);
    cy.get("button").click();
    cy.wait(5000);
  });

  it("render list of sessions", () => {
    cy.get("#sessions").children().should("have.length.greaterThan", 0);
  });

  it("allow click on session", () => {
    cy.get("#sessions").children().first().click();
    cy.get("#warmup-activities")
      .children()
      .should("have.length.greaterThan", 0);

    cy.get("#list-activities").children().should("have.length.greaterThan", 0);
  });

  it("should run the timer", () => {
    cy.get("#sessions").children().first().click();
    cy.get("#run-timer").click();
    cy.get(".back__button").click();
    cy.get("#warmup-activities")
      .children()
      .should("have.length.greaterThan", 0);

    cy.get("#list-activities").children().should("have.length.greaterThan", 0);
  });
});

describe("Dashboard trainer user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");

    const fakeTrainerUser = Cypress.env("fakeTrainerUser");
    const fakeTrainerPassword = Cypress.env("fakeTrainerPassword");

    cy.get("input[name='username']").type(fakeTrainerUser);
    cy.get("input[name='password']").type(fakeTrainerPassword);
    cy.get("button").click();
    cy.get("a[href='/group']").click();
    cy.get("#list-groups").children().should("have.length.greaterThan", 0);
    cy.get("#list-groups").children().first().click();
    cy.wait(5000);
    cy.get("#sessions").children().should("have.length.greaterThan", 0);
    cy.get("#sessions").children().first().click();
  });

  it("render list of groups", () => {
    cy.get("#edit-session").click();
    cy.get(".back__button").click();
  });

  it("create a warmup activity to user", () => {
    cy.get("#add-activity").click();
    cy.get("input[name='activityName']").type("Foo");
    cy.get("input[name='activityDescription']").type("Bar");
    cy.get("#time-based-activity").click();
    cy.get("#time-based-activity").should("have.class", "bg-purple-600");
    cy.get("#reps-based-activity").should("not.have.class", "bg-purple-600");
    cy.get("input[name='activityType']").type("1");
    cy.get("#toggle").click();
    cy.get("#save-activity").click();

    cy.get("#warmup-activities")
      .children()
      .contains("Foo")
      .should("have.length", 1);
    cy.get("#warmup-activities").children().contains("Foo").click();
    cy.get("#delete-activity").click();
  });

  it("create a normal activity to user", () => {
    cy.get("#add-activity").click();
    cy.get("input[name='activityName']").type("Demo");
    cy.get("input[name='activityDescription']").type("random");
    cy.get("#time-based-activity").click();
    cy.get("#time-based-activity").should("have.class", "bg-purple-600");
    cy.get("#reps-based-activity").should("not.have.class", "bg-purple-600");
    cy.get("input[name='activityType']").type("3");
    cy.get("#save-activity").click();

    cy.get("#list-activities")
      .children()
      .contains("Demo")
      .should("have.length", 1);
    cy.get("#list-activities").children().contains("Demo").click();
    cy.get("#delete-activity").click();
  });
});
