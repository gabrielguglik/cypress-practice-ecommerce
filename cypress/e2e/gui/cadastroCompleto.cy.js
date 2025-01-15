import { faker } from '@faker-js/faker';

describe('Cadastro Completo', () => {
    beforeEach(() => {
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        };

        cy.gui_fazer_cadastro_inicial(user_infos);
    });

    it('Cadastro Completo de Novo Usuário com Sucesso', () => {
        cy.get('[data-qa="password"]');
    });

});