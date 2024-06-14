import IssueTimeTrackingPage from "../pages/issueTimeTrackingPage";

describe("Time-tracking functionality tests of the issue", () => {
  const issueTimeTrackingPage = new IssueTimeTrackingPage();
  const timeSpent = "2";
  const timeRemaining = "5";
  const issueDescription = "Creating a ticket for time tracking functionality testing";
  const issueTitle = "Time track test";
  const issueCreatedConfirmation = "Issue has been successfully created";
  const backLogList = '[data-testid="board-list:backlog"]';
  const estimatedInputField = 'input[placeholder="Number"]';

  beforeEach(() => {
    // Visit the board page
    cy.visit("/project/board");

    // Intercept the request for creating an issue
    cy.intercept("POST", "**/rest/api/2/issue").as("createIssue");

    // Click on "Create Issue" to trigger modal
    cy.contains("Create Issue").click();

    // Wait for the modal to appear
    cy.get('[data-testid="modal:issue-create"]', { timeout: 60000 }).should("be.visible");

    // Creating new issue to update time
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').click();
      cy.get(".ql-editor").type(issueDescription);
      cy.get('input[name="title"]').type(issueTitle);
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });

    // Check for confirmation message
    cy.contains(issueCreatedConfirmation, { timeout: 60000 }).should("be.visible");

    // Scroll backlog list into view to make sure the new issue is visible
    cy.get(backLogList, { timeout: 60000 }).scrollIntoView().should("be.visible");

    // Click on the newly created issue
    cy.get(backLogList, { timeout: 60000 }).contains(issueTitle).scrollIntoView().click();
  });

  it("Should log time to a newly created issue", () => {
    // Open the time tracking modal
    cy.contains("Time Tracking").click();
  
    // Log time using page object methods
    issueTimeTrackingPage.addLog(timeSpent, timeRemaining);
  
    // Assertions using page object methods
    issueTimeTrackingPage.waitForLog(timeSpent, timeRemaining);
  
    // Check that the "No Time Logged" label is no longer visible
    cy.contains("No Time Logged").should("not.exist");
  
    // Verify time remaining is updated
    cy.contains("Time Tracking").parent().should("contain", timeRemaining);
  });
  
  it("Should remove logged time from a newly created issue", () => {
    // Open the time tracking modal
    cy.contains("Time Tracking").click();
  
    // Log time first to set up the test case
    issueTimeTrackingPage.addLog(timeSpent, timeRemaining);
  
    // Remove the logged time
    issueTimeTrackingPage.removeLog();
  
    // Verify that the spent time number is removed
    cy.contains("Time Tracking").parent().should("not.contain", timeSpent);
    cy.contains("Time Tracking").parent().should("not.contain", timeRemaining);
  
    // Verify that the original estimation is visible again
    cy.contains("Time Tracking").parent().should("contain", estimatedInputField);
  });
}); 
  
