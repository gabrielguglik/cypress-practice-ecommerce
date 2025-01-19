import { faker } from '@faker-js/faker';
import Cart from "../../support/pages/cart";

describe('Cart', () => {
    it('Redirecionar Para a Visualização do Produto a Partir do Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_e_visualizar_carrinho();

        Cart.visualizarProduto();

        cy.url().should('equal', 'https://www.automationexercise.com/product_details/1');
    });

    it('Deletar Produto do Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_e_visualizar_carrinho();

        Cart.clicarBotaoDeletarProduto();

        cy.contains('Cart is empty!').should('be.visible');
    });

    it('Redirecionar Para a Seção Products Quando o Carrinho Estiver Vazio com Sucesso', () => {
        Cart.acessarCarrinho();

        Cart.clicarEmComprarProdutos();

        cy.url().should('equal', 'https://www.automationexercise.com/products');
    });

    it('Finalizar Compra com Sucesso', () => {
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            birth_day: faker.number.int({ min: 1, max: 30 }),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1950, max: 2005 }),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            company: faker.company.name(),
            address: faker.location.streetAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number()
        };
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
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            birth_day: faker.number.int({ min: 1, max: 30 }),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1950, max: 2005 }),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            company: faker.company.name(),
            address: faker.location.streetAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number()
        };
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

        cy.url().should('equal', 'https://www.automationexercise.com/');
    });

    it('Baixar o Recibo Após Finalizar Compra com Sucesso', () => {
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            birth_day: faker.number.int({ min: 1, max: 30 }),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1950, max: 2005 }),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            company: faker.company.name(),
            address: faker.location.streetAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city(),
            mobile_number: faker.phone.number()
        };
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

        cy.url().should('equal', 'https://www.automationexercise.com/');
    });

});