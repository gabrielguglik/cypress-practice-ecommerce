import { faker } from '@faker-js/faker';
import { GUI_URLs } from '../../support/gui_urls.js';
import Home from '../../support/pages/home';
import Login from '../../support/pages/login';

describe('Login', () => {
    let user_infos;

    beforeEach(() => {
        user_infos = {
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

        // para este cenário, o ideal seria utilizar o comando de API cy.api_cadastrar_usuario(user_infos) para realizar as pré-condições do teste,
        // garantindo maior velocidade e eliminando visitas desncessárias às páginas. no entanto, devido a limitações da aplicação,
        // optou-se por realizar as pré-condições utilizando a interface gráfica (GUI).
        cy.gui_fazer_cadastro_completo(user_infos);
        Home.clicarBotaoLogout();
    });

    it('Login de Usuário Existente com Sucesso', () => {
        Login.acessarLogin();
        Login.preencherEmail(user_infos.email);
        Login.preencherSenha(user_infos.password);
        Login.clicarBotaoLogin();

        cy.url().should('equal', GUI_URLs.HOME);
        cy.contains('Logged in as ' + user_infos.name).should('be.visible');
    });

    it('Login de Usuário Existente com Email Incorreto', () => {
        const wrongEmail = faker.internet.email();

        Login.acessarLogin();
        Login.preencherEmail(wrongEmail);
        Login.preencherSenha(user_infos.password);
        Login.clicarBotaoLogin();

        cy.url().should('equal', GUI_URLs.LOGIN);
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Login de Usuário Existente com Senha Incorreto', () => {
        const wrongPassword = faker.internet.password();

        Login.acessarLogin();
        Login.preencherEmail(user_infos.email);
        Login.preencherSenha(wrongPassword);
        Login.clicarBotaoLogin();

        cy.url().should('equal', GUI_URLs.LOGIN);
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Login de Usuário Existente Sem o Campo Email', () => {
        Login.acessarLogin();
        Login.preencherSenha(user_infos.password);
        Login.clicarBotaoLogin();

        cy.url().should('equal', GUI_URLs.LOGIN);
    });

    it('Login de Usuário Existente Sem o Campo Senha', () => {
        Login.acessarLogin();
        Login.preencherEmail(user_infos.email);
        Login.clicarBotaoLogin();

        cy.url().should('equal', GUI_URLs.LOGIN);
    });

});