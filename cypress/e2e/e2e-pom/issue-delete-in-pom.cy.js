import IssueModal from "../../pages/IssueModal";

describe("Issue Deletion", () => {
  beforeEach(() => {
    cy.visit("/board");
    cy.get('[data-testid="board-list:backlog"]').should("be.visible");
    cy.get('[data-testid="list-issue"]').first().click();
    IssueModal.getIssueDetailModal().should("be.visible");
  });

  it("Assignment 4: Test Case 1: Issue Deletion_POM", () => {
    // Use the Page Object Model method to delete an issue
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    // Verify the issue is deleted
    cy.get('[data-testid="list-issue"]')
      .first()
      .should("not.contain", "This is an issue of type: Task.");
  });

  it("Assignment 4: Test Case 2: Cancel Issue Deletion_POM", () => {
    // Use the Page Object Model method to cancel issue deletion
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();

    // Verify the issue is still present
    cy.get('[data-testid="list-issue"]')
      .first()
      .should("contain", "This is an issue of type: Task.");
  });
});
