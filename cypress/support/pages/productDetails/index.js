const elements = require('./elements').ELEMENTS;

class ProductDetails {
    acessarVisualizacaoProduto() {
        cy.visit('https://www.automationexercise.com/product_details/1');
    };

    preencherNome(name) {
        cy.get(elements.nameInput).type(name);
    };

    preencherEmail(email) {
        cy.get(elements.emailInput).type(email);
    };

    preencherReview(review) {
        cy.get(elements.reviewInput).type(review);
    };

    enviarReview() {
        cy.get(elements.submitReviewButton).click();
    };

    clicarBotaoAddToCart() {
        cy.get(elements.addToCartButton)
            .contains('Add to cart')
            .should('be.visible')
            .click();
    };

    clicarBotaoContinueShopping() {
        cy.get(elements.continueShoppingButton)
            .contains('Continue Shopping')
            .should('be.visible')
            .click();
    };

    clicarBotaoViewCart() {
        cy.get(elements.viewCartLink)
            .contains('View Cart')
            .should('be.visible')
            .click();
    };

    preencherQuantidadeProduto(quantity) {
        cy.get(elements.productQuantityInput).clear().type(quantity);
    };

    verificarQuantidadeProduto() {
        return cy.get(elements.productQuantityButton);
    };

};

export default new ProductDetails();