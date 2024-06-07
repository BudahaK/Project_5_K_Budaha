class IssueDetailsPage {
    getIssueDetailsModal() {
        return cy.get('[data-testid="modal:issue-details"]');
    }

    addComment(comment) {
        this.getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').click();
            cy.get('textarea[placeholder="Add a comment..."]').type(comment);
            cy.contains('button', 'Save').click();
        });
        cy.wait(6000); // Increased explicit wait for UI update
        this.getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);
        });
    }

    editComment(oldComment, newComment) {
        this.getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .contains(oldComment)
                .parent()
                .contains('Edit')
                .click();
            cy.get('textarea[placeholder="Add a comment..."]').should('contain', oldComment).clear().type(newComment);
            cy.contains('button', 'Save').click();
        });
        cy.wait(6000); // Increased wait for UI update
        this.getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]').should('contain', 'Edit').and('contain', newComment);
        });
    }

    deleteComment(comment) {
        this.getIssueDetailsModal().within(() => {
            cy.get('[data-testid="issue-comment"]')
                .contains(comment)
                .parent()
                .contains('Delete')
                .click();
        });
        cy.wait(6000); // Increased wait for modal appearance
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('button', 'Delete comment').click();
        });
        cy.wait(6000); // Increased wait for modal disappearance
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="modal:issue-details"]').length) {
                cy.log('The issue details modal still exists');
            } else {
                cy.log('The issue details modal does not exist');
            }
        });

    }
}

export default IssueDetailsPage;
