describe("Issue Deletion", () => {
    before(() => {
      // Set a global timeout of 60 seconds for all commands
      Cypress.config("defaultCommandTimeout", 60000);
    });
  
    beforeEach(() => {
      // Navigate to the board
      cy.visit("/board");
  
      // Ensure the board is fully loaded by checking for the backlog element
      cy.get('[data-testid="board-list:backlog"]').should("be.visible");
  
      // Open the first issue from the backlog and make sure it is visible
      cy.get('[data-testid="list-issue"]').first().click();
      cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    });
  
    it("Test Case 1: Issue Deletion", () => {
      // Click the delete button and confirm deletion
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should("be.visible");
      cy.get('[data-testid="modal:confirm"]').contains("Delete issue").click();
  
      // Assert that the deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should("not.exist");
  
      // Assert that the issue is deleted and no longer displayed in the backlog
      cy.get('[data-testid="list-issue"]')
        .first()
        .should("not.contain", "This is an issue of type: Task."); // Adjust the text as needed
    });
  
    it("Test Case 2: Cancel Issue Deletion", () => {
      // Click the delete button
      cy.get('[data-testid="icon:trash"]').click();
  
      // Cancel the deletion in the confirmation pop-up
      cy.get('[data-testid="modal:confirm"]').should("be.visible");
      cy.get('[data-testid="modal:confirm"]').contains("Cancel").click();
  
      // Assert that the deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should("not.exist");
  
      // Assert that the issue is still displayed in the backlog
      cy.get('[data-testid="list-issue"]')
        .first()
        .should("contain", "This is an issue of type: Task."); // Adjust the text as needed
    });
  });
  