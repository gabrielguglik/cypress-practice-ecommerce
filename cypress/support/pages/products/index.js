import { GUI_URLs } from '../../gui_urls.js';

const elements = require('./elements').ELEMENTS;

class Products {
    acessarProducts() {
        cy.visit(GUI_URLs.PRODUCTS);
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