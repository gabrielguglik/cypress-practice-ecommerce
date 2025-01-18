import { faker } from '@faker-js/faker';
import Products from "../../support/pages/products";

describe('Products', () => {
    it('Buscar Produto com Sucesso', () => {
        const busca = 'Blue Top';
        
        Products.acessarProducts();
        Products.preencherBusca(busca);
        Products.clicarBotaoBuscar();

        cy.contains('Searched Products').should('be.visible');
        Products.verificarResultadoBusca()
            .should('have.length', 1) 
            .and('contain.text', busca);
    });

    it('Buscar Produto Inexistente', () => {
        const busca = faker.lorem.words(2);
        
        Products.acessarProducts();
        Products.preencherBusca(busca);
        Products.clicarBotaoBuscar();

        cy.contains('Searched Products').should('be.visible');
        Products.verificarResultadoBusca().should('not.exist');
    });

});