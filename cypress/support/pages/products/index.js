const elements = require('./elements').ELEMENTS;

class Products {
    acessarProducts() {
        cy.visit('https://www.automationexercise.com/products');
    };

    preencherBusca(busca) {
        cy.get(elements.searchInput).type(busca);
    };

    clicarBotaoBuscar() {
        cy.get(elements.submitSearchButton).click();
    };

    verificarResultadoBusca() {
        return cy.get(elements.searchResult);
    };

};

export default new Products();