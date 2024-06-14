class IssueTimeTrackingPage {
  getIssueDetailsModal() {
    return cy.get('[data-testid="modal:issue-details"]', { timeout: 60000 });
  }

  typeEstimation(hours) {
    cy.get('input[placeholder="Number"]', { timeout: 60000 }).clear().type(hours);
  }

  waitForEstimation(estimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().should("contain", estimation);
    });
  }

  waitForLog(logHours) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Time Tracking", { timeout: 60000 }).parent().should("contain", logHours);
    });
  }

  waitForNoEstimation() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().should("not.contain", /\d/);
    });
  }

  waitForNoLog() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Time Tracking", { timeout: 60000 }).parent().should("not.contain", /\d/);
    });
  }

  addEstimation(estimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      this.typeEstimation(estimation);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForEstimation(estimation);
  }

  editEstimation(newEstimation) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      this.typeEstimation(newEstimation);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForEstimation(newEstimation);
  }

  removeEstimation() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Original Estimate (hours)", { timeout: 60000 }).parent().click();
      cy.get('input[placeholder="Number"]', { timeout: 60000 }).clear();
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForNoEstimation();
  }

  addLog(logHours) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Time Tracking", { timeout: 60000 }).parent().click();
      this.typeEstimation(logHours);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForLog(logHours);
  }

  editLog(newLogHours) {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Time Tracking", { timeout: 60000 }).parent().click();
      this.typeEstimation(newLogHours);
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForLog(newLogHours);
  }

  removeLog() {
    this.getIssueDetailsModal().within(() => {
      cy.contains("Time Tracking", { timeout: 60000 }).parent().click();
      cy.get('input[placeholder="Number"]', { timeout: 60000 }).clear();
      cy.get('[data-testid="modal:issue-details"]').click(); // Click outside the modal to save
    });

    this.waitForNoLog();
  }
}

export default IssueTimeTrackingPage;
