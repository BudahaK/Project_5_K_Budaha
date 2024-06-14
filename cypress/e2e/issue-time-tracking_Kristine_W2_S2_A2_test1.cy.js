import IssueTimeTrackingPage from "../pages/issueTimeTrackingPage";

describe("Time-tracking functionality tests of the issue", () => {
  const issueTimeTrackingPage = new IssueTimeTrackingPage();
  const estimation = "10";
  const newEstimation = "20";
  const logHours = "2";
  const newLogHours = "3";
  const issueDescription =
    "Creating a ticket for time tracking functionality testing";
  const issueTitle = "Time track test";
  const issueCreatedConfirmation = "Issue has been successfully created";
  const backLogList = '[data-testid="board-list:backlog"]';
  const estimatedInputField = 'input[placeholder="Number"]';

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");

        // Intercept the request for creating an issue
        cy.intercept("POST", "**/rest/api/2/issue").as("createIssue");

        // Creating new issue to update time
        cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).within(
          () => {
            cy.get('[data-testid="select:type"]').click();
            cy.get('[data-testid="select-option:Bug"]').click();
            cy.get(".ql-editor").type(issueDescription);
            cy.get('input[name="title"]').type(issueTitle);
            cy.get('[data-testid="select:userIds"]').click();
            cy.get('[data-testid="select-option:Lord Gaben"]').click();
            cy.get('button[type="submit"]').click();
          }
        );

        // Check for confirmation message
        cy.contains(issueCreatedConfirmation, { timeout: 60000 }).should(
          "be.visible"
        );

        // Scroll backlog list into view to make sure the new issue is visible
        cy.get(backLogList, { timeout: 60000 })
          .scrollIntoView()
          .should("be.visible");

        // Click on the newly created issue
        cy.get(backLogList, { timeout: 60000 })
          .contains(issueTitle)
          .scrollIntoView()
          .click();
      });
  });

  it("Should perform time estimation functionality: add, edit, and remove estimation", () => {
    // Ensure the estimation field is visible before interacting
    cy.contains("Original Estimate (hours)", { timeout: 60000 })
      .parent()
      .should("be.visible")
      .click();

    // Add estimation
    cy.get(estimatedInputField).type(estimation);
    cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save

    // Ensure the estimation is added
    cy.contains("Original Estimate (hours)")
      .parent()
      .should("contain", estimation);

    // Edit the estimation
    cy.contains("Original Estimate (hours)").parent().click();
    cy.get(estimatedInputField).clear().type(newEstimation);
    cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save

    // Ensure the estimation is edited
    cy.contains("Original Estimate (hours)")
      .parent()
      .should("contain", newEstimation);

    // Remove the estimation
    cy.contains("Original Estimate (hours)").parent().click();
    cy.get(estimatedInputField).clear();
    cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save

    // Ensure the estimation is removed
    cy.contains("Original Estimate (hours)")
      .parent()
      .should("not.contain", /\d/);
  });
});
