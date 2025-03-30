import { faker } from '@faker-js/faker';
import { generateUser } from '../../support/generate_user.js';
import { GUI_URLs } from '../../support/gui_urls.js';
import Cart from "../../support/pages/cart";

describe('Cart', () => {
    it('Redirecionar Para a Visualização do Produto a Partir do Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_e_visualizar_carrinho();

        Cart.visualizarProduto();

        cy.url().should('equal', GUI_URLs.PRODUCT_DETAILS + '/1');
    });

    it('Deletar Produto do Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_e_visualizar_carrinho();

        Cart.clicarBotaoDeletarProduto();

        cy.contains('Cart is empty!').should('be.visible');
    });

    it('Redirecionar Para a Seção Products Quando o Carrinho Estiver Vazio com Sucesso', () => {
        Cart.acessarCarrinho();

        Cart.clicarEmComprarProdutos();

        cy.url().should('equal', GUI_URLs.PRODUCTS);
    });

    it('Finalizar Compra com Sucesso', () => {
        const user_infos = generateUser();
        
        cy.gui_fazer_cadastro_completo(user_infos);
        cy.gui_adicionar_produto_e_visualizar_carrinho();
        const payment_infos = {
            name_on_card: faker.finance.accountName(),
            card_number: faker.finance.creditCardNumber(),
            cvc: faker.finance.creditCardCVV(),
            expiry_month: '12',
            expiry_year: faker.number.int({ min: 1950, max: 2005 })
        };

        cy.gui_finalizar_compra(payment_infos);

        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    });

    it('Redirecionar Para a Seção Home Após Finalizar Compra com Sucesso', () => {
        const user_infos = generateUser();

        cy.gui_fazer_cadastro_completo(user_infos);
        cy.gui_adicionar_produto_e_visualizar_carrinho();
        const payment_infos = {
            name_on_card: faker.finance.accountName(),
            card_number: faker.finance.creditCardNumber(),
            cvc: faker.finance.creditCardCVV(),
            expiry_month: '12',
            expiry_year: faker.number.int({ min: 1950, max: 2005 })
        };
        cy.gui_finalizar_compra(payment_infos);

        Cart.clicarBotaoContinue();

        cy.url().should('equal', GUI_URLs.HOME);
    });

    it('Baixar o Recibo Após Finalizar Compra com Sucesso', () => {
        const user_infos = generateUser();

        cy.gui_fazer_cadastro_completo(user_infos);
        cy.gui_adicionar_produto_e_visualizar_carrinho();
        const payment_infos = {
            name_on_card: faker.finance.accountName(),
            card_number: faker.finance.creditCardNumber(),
            cvc: faker.finance.creditCardCVV(),
            expiry_month: '12',
            expiry_year: faker.number.int({ min: 1950, max: 2005 })
        };
        cy.gui_finalizar_compra(payment_infos);

        Cart.clicarBotaoDownloadInvoice();

        cy.readFile('cypress/downloads/invoice.txt').should('exist');
    });

    it('Navegar pelas Breadcrumbs com Sucesso', () => {
        Cart.acessarCarrinho();

        Cart.navegarBreadcrumb();

        cy.url().should('equal', GUI_URLs.HOME);
    });

});