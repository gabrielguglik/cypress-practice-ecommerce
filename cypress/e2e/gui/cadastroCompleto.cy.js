import { faker } from '@faker-js/faker';
import { GUI_URLs } from '../../support/gui_urls.js';
import CadastroCompleto from '../../support/pages/cadastroCompleto';

describe('Cadastro Completo', () => {
    beforeEach(() => {
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        };

        cy.gui_fazer_cadastro_inicial(user_infos);
    });

    it('Cadastro Completo de Novo Usuário com Sucesso', () => {
        const user_infos = {
            password: faker.internet.password(),
            birth_day: faker.number.int({ min: 1, max: 30 }),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1950, max: 2005 }),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            address: faker.location.streetAddress(),
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobile_number: faker.phone.number()
        };

        CadastroCompleto.preencherTitulo();
        CadastroCompleto.preencherSenha(user_infos.password);
        CadastroCompleto.preencharDataNascimento(user_infos.birth_day, user_infos.birth_month, user_infos.birth_year);
        CadastroCompleto.preencherCheckbox();
        CadastroCompleto.preencherPrimeiroNome(user_infos.first_name);
        CadastroCompleto.preencherUltimoNome(user_infos.last_name);
        CadastroCompleto.preencherEndereço(user_infos.address);
        CadastroCompleto.preencherEstado(user_infos.state);
        CadastroCompleto.preencherCidade(user_infos.city);
        CadastroCompleto.preencherCodigoPostal(user_infos.zipcode);
        CadastroCompleto.preencherNumeroCelular(user_infos.mobile_number);
        CadastroCompleto.enviarCadastroCompleto();

        cy.url().should('equal', GUI_URLs.ACCOUNT_CREATED);
        cy.contains('Account Created!').should('be.visible');
    });

    it('Cadastro Completo de Novo Usuário Sem os Campos Obrigatórios', () => {
        CadastroCompleto.enviarCadastroCompleto();

        cy.url().should('equal', GUI_URLs.SIGNUP);
    });

});