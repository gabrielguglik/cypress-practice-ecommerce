import { faker } from '@faker-js/faker';
import CadastroInicial from "../../support/pages/cadastroInicial";

describe('Cadastro Inicial', () => {
    it('Cadastro Inicial de Novo Usuário com Sucesso', () => {
        const user_name = faker.person.fullName();
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', 'https://www.automationexercise.com/signup');
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Nome', () => {
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', 'https://www.automationexercise.com/login');
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Email', () => {
        const user_name = faker.person.fullName();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', 'https://www.automationexercise.com/login');
    });

    it('Cadastro Inicial de Novo Usuário Com o Campo Email Já Cadastrado', () => {
        const user_name = faker.person.fullName();
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            title: 'Mr',
            birth_date: faker.number.int({ min: 1, max: 30 }),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1950, max: 2005 }),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.streetAddress(),
            country: faker.location.country(),
            zipcode: faker.location.zipCode(),
            state: faker.location.state(),
            city: faker.location.city()
        };
        cy.api_cadastrar_usuario(user_infos);

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.preencherEmail(user_infos.email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', 'https://www.automationexercise.com/login');
        cy.contains('Email Address already exist!', 'be.visible');
    });

});