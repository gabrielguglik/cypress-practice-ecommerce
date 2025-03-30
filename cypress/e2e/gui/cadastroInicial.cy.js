import { faker } from '@faker-js/faker';
import { GUI_URLs } from '../../support/gui_urls.js';
import CadastroInicial from "../../support/pages/cadastroInicial";

describe('Cadastro Inicial', () => {
    it('Cadastro Inicial de Novo Usuário com Sucesso', () => {
        const user_name = faker.person.fullName();
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', GUI_URLs.SIGNUP);
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Nome', () => {
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', GUI_URLs.LOGIN);
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Email', () => {
        const user_name = faker.person.fullName();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', GUI_URLs.LOGIN);
    });

    it('Cadastro Inicial de Novo Usuário Com o Campo Email Já Cadastrado', () => {
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
        // para este cenário, o ideal seria utilizar o comando de API cy.api_cadastrar_usuario(user_infos) para realizar as pré-condições do teste,
        // garantindo maior velocidade e eliminando visitas desncessárias às páginas. no entanto, devido a limitações da aplicação,
        // optou-se por realizar as pré-condições utilizando a interface gráfica (GUI).
        cy.gui_fazer_cadastro_completo(user_infos);
        cy.get('a[href="/logout"]').click(); // TODO: importar comando da página de login

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_infos.name);
        CadastroInicial.preencherEmail(user_infos.email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', GUI_URLs.SIGNUP);
        cy.contains('Email Address already exist!').should('be.visible');
    });

});