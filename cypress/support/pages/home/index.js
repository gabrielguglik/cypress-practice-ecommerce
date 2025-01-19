const elements = require('./elements').ELEMENTS;

class Home {
    acessarHome() {
        cy.visit('https://www.automationexercise.com/');
    };

    localizarProduto() {
        return cy.get(elements.product1Id).first().trigger('mouseover');
    };

    clicarBotaoAddToCart() {
        this.localizarProduto().within(() => {
                cy.contains('Add to cart')
                    .should('be.visible')
                    .click();
            });
    };

    clicarBotaoViewProduct() {
        cy.get(elements.product1DetailsLink)
            .contains('View Product')
            .should('be.visible')
            .click();
    };

    clicarBotaoCategoria() {
        cy.get(elements.womenCategoryLink)
            .contains('Women')
            .should('be.visible')
            .click();
    };

    clicarBotaoSubcategoria() {
        cy.get(elements.subcategory1Link).click();
    };

    clicarBotaoMarca() {
        cy.get(elements.poloBrandLink)
            .contains('Polo')
            .should('be.visible')
            .click();
    };

    verificarItensRecomendados() {
        return cy.get(elements.recommendedProductsCarousel)
            .invoke('text')
            .then((text) => text.trim().replace(/\s+/g, ' '));
    };

    clicarBotaoProximosItensRecomendados() {
        cy.get(elements.nextRecommendedItemButton)
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

    preencherSubscriptionEmail(email) {
        cy.get(elements.subscriptionEmailInput).type(email);
    };

    clicarBotaoSubscribe() {
        cy.get(elements.subscribeButton).click();
    };

    clicarBotaoLogout() {
        cy.get(elements.logoutButton)
            .contains('Logout')
            .should('be.visible')
            .click();
    };

    clicarBotaoDeleteAccount() {
        cy.get(elements.deleteAccountButton)
            .contains('Delete Account')
            .should('be.visible')
            .click();
    };

    clicarBotaoContinue() {
        cy.get(elements.continueButton)
            .contains('Continue')
            .should('be.visible')
            .click();
    }

};

export default new Home();