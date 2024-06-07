import IssueDetailsPage from "../pages/issueComment";

describe("Issue comments creating, editing and deleting", () => {
  const initialComment = "TEST_COMMENT";
  const editedComment = "TEST_COMMENT_EDITED";
  const issueDetailsPage = new IssueDetailsPage();

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should perform comments functionality: add, edit, and delete a comment", () => {
    //add a comment
    issueDetailsPage.addComment(initialComment);

    // Edit the added comment
    issueDetailsPage.editComment(initialComment, editedComment);

    // Delete the edited comment
    issueDetailsPage.deleteComment(editedComment);
  });
});
