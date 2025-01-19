import { faker } from '@faker-js/faker';
import ProductDetails from "../../support/pages/productDetails";

describe('Product Details', () => {
    it('Escrever Avaliação do Produto com Sucesso', () => {
        const review_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            review: faker.lorem.paragraph()
        };

        ProductDetails.acessarVisualizacaoProduto();
        ProductDetails.preencherNome(review_infos.name);
        ProductDetails.preencherEmail(review_infos.email);
        ProductDetails.preencherReview(review_infos.review);
        ProductDetails.enviarReview();

        cy.contains('Thank you for your review.').should('be.visible');
    });

    it('Escrever Avaliação do Produto Sem o Campo Nome', () => {
        const review_infos = {
            email: faker.internet.email(),
            review: faker.lorem.paragraph()
        };

        ProductDetails.acessarVisualizacaoProduto();
        ProductDetails.preencherEmail(review_infos.email);
        ProductDetails.preencherReview(review_infos.review);
        ProductDetails.enviarReview();

        cy.contains('Thank you for your review.').should('not.be.visible');
    });

    it('Escrever Avaliação do Produto Sem o Campo Email', () => {
        const review_infos = {
            name: faker.person.fullName(),
            review: faker.lorem.paragraph()
        };

        ProductDetails.acessarVisualizacaoProduto();
        ProductDetails.preencherNome(review_infos.name);
        ProductDetails.preencherReview(review_infos.review);
        ProductDetails.enviarReview();

        cy.contains('Thank you for your review.').should('not.be.visible');
    });

    it('Escrever Avaliação do Produto Sem o Campo Review', () => {
        const review_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        };

        ProductDetails.acessarVisualizacaoProduto();
        ProductDetails.preencherNome(review_infos.name);
        ProductDetails.preencherEmail(review_infos.email);
        ProductDetails.enviarReview();

        cy.contains('Thank you for your review.').should('not.be.visible');
    });

    it('Adicionar Produto ao Carrinho a Partir da Visualização com Sucesso', () => {
        cy.gui_visualizacao_adicionar_produto_ao_carrinho();

        cy.contains('Your product has been added to cart.').should('be.visible');
    });

    it('Permanecer na Visualização Após Adicionar um Produto ao Carrinho com Sucesso', () => {
        cy.gui_visualizacao_adicionar_produto_ao_carrinho();
        ProductDetails.clicarBotaoContinueShopping();

        cy.url().should('equal', 'https://www.automationexercise.com/product_details/1');
    });

    it('Redirecionar para Seção Cart Após Adicionar um Produto ao Carrinho a Partir da Visualização com Sucesso', () => {
        cy.gui_visualizacao_adicionar_produto_ao_carrinho();
        ProductDetails.clicarBotaoViewCart();

        cy.url().should('equal', 'https://www.automationexercise.com/view_cart');
    });

    it.only('Adicionar Certa Quantidade de um Produto ao Carrinho a Partir da Visualização com Sucesso', () => {
        
        ProductDetails.acessarVisualizacaoProduto();
        ProductDetails.preencherQuantidadeProduto(2);
        ProductDetails.clicarBotaoAddToCart();
        ProductDetails.clicarBotaoViewCart();

        cy.url().should('equal', 'https://www.automationexercise.com/view_cart');
        ProductDetails.verificarQuantidadeProduto().contains(2);
    });

});