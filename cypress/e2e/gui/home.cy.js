import { faker } from '@faker-js/faker';
import Home from '../../support/pages/home';

describe('Home', () => {
    it('Adicionar Produto ao Carrinho com Sucesso', () => {
        Home.acessarHome();
        Home.localizarProduto();
        Home.clicarBotaoAddToCart();

        cy.contains('Your product has been added to cart.').should('be.visible');
    });

    it('Visualizar Produto com Sucesso', () => {
        Home.acessarHome();
        Home.clicarBotaoViewProduct();

        cy.url().should('equal', 'https://www.automationexercise.com/product_details/1');
    });

    it('Filtrar Por Categoria com Sucesso', () => {
        Home.acessarHome();
        Home.clicarBotaoCategoria();
        Home.clicarBotaoSubcategoria();

        cy.url().should('equal', 'https://www.automationexercise.com/category_products/1');
    });

    it('Filtrar Por Marca com Sucesso', () => {
        Home.acessarHome();
        Home.clicarBotaoMarca();

        cy.url().should('equal', 'https://www.automationexercise.com/brand_products/Polo');
        cy.contains('Brand - Polo Products').should('be.visible');
    });

    it('Exibir Carrossel de Itens Recomendados Automaticamente com Sucesso', () => {
        Home.acessarHome();
        Home.verificarItensRecomendados().then((firstItemText) => {
            cy.wait(6000);
            Home.verificarItensRecomendados().then((newItemText) => {
                expect(firstItemText).not.to.eq(newItemText);
            });
        });
    });

    it('Exibir Carrossel de Itens Recomendados Manualmente com Sucesso', () => {
        Home.acessarHome();
        Home.verificarItensRecomendados().then((firstItemText) => {
            Home.clicarBotaoProximosItensRecomendados();
            cy.wait(2000);
            Home.verificarItensRecomendados().then((newItemText) => {
                expect(firstItemText).not.to.eq(newItemText);
            });
        });
    });

    it('Permanecer na Seção Home Após Adicionar um Produto ao Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_ao_carrinho();
        Home.clicarBotaoContinueShopping();

        cy.url().should('equal', 'https://www.automationexercise.com/');
    });

    it('Redirecionar para Seção Cart Após Adicionar um Produto ao Carrinho com Sucesso', () => {
        cy.gui_adicionar_produto_ao_carrinho();
        Home.clicarBotaoViewCart();

        cy.url().should('equal', 'https://www.automationexercise.com/view_cart');
    });

    it('Inscrever Email com Sucesso', () => {
        const email = faker.internet.email();
        
        Home.acessarHome();
        Home.preencherSubscriptionEmail(email);
        Home.clicarBotaoSubscribe();

        cy.contains('You have been successfully subscribed!').should('be.visible');
    });

    it('Inscrever Email sem Email', () => {
        Home.acessarHome();
        Home.clicarBotaoSubscribe();

        cy.contains('You have been successfully subscribed!').should('not.be.visible');
    });

    it('Logout com Sucesso', () => {
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
        Home.clicarBotaoLogout();

        cy.url().should('equal', 'https://www.automationexercise.com/login');
    });

    it.only('Deletar Conta com Sucesso', () => {
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
        Home.clicarBotaoDeleteAccount();

        cy.url().should('equal', 'https://www.automationexercise.com/delete_account');
        cy.contains('Account Deleted!').should('be.visible');
    });

});