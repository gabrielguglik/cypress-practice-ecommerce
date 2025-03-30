import { GUI_URLs } from '../../gui_urls.js';

const elements = require('./elements').ELEMENTS;

class Cart {
    acessarCarrinho() {
        cy.visit(GUI_URLs.VIEW_CART);
    };

    visualizarProduto() {
        cy.get(elements.viewProductDetailsLink).click();
    };

    clicarBotaoDeletarProduto() {
        cy.get(elements.deleteProductFromCartButton).click();
    };

    clicarEmComprarProdutos() {
        cy.get(elements.buyProductsLink).click();
    };

    clicarBotaoProceedToCheckout() {
        cy.get(elements.checkoutButton)
            .contains('Proceed To Checkout')
            .should('be.visible')
            .click();
    };

    clicarBotaoPlaceOrder() {
        cy.get(elements.paymentLink)
            .contains('Place Order')
            .should('be.visible')
            .click();
    };

    preencherNomeNoCartao(nome) {
        cy.get(elements.nameOnCardInput).type(nome);
    };

    preencherCardNumber(numero) {
        cy.get(elements.cardNumberInput).type(numero);
    };

    preencherCVC(cvc) {
        cy.get(elements.cvcInput).type(cvc);
    };

    preencherExpiration(mes, ano) {
        cy.get(elements.expiryMonthInput).type(mes);
        cy.get(elements.expiryYearInput).type(ano);
    };

    clicarBotaoPayAndConfirmOrder() {
        cy.get(elements.payButton)
            .contains('Pay and Confirm Order')
            .should('be.visible')
            .click();
    };

    clicarBotaoContinue() {
        cy.get(elements.continueButton)
            .contains('Continue')
            .should('be.visible')
            .click();
    };

    clicarBotaoDownloadInvoice() {
        cy.get(elements.downloadInvoiceButton)
            .contains('Download Invoice')
            .should('be.visible')
            .click();
    };

    navegarBreadcrumb() {
        cy.get(elements.breadcrumbNav)
            .contains('Home')
            .should('be.visible')
            .click()
    };

};

export default new Cart();