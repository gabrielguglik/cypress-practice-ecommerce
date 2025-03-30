import { faker } from '@faker-js/faker';
import { API_URLs } from '../../support/api_urls.js';

describe('Create Account Endpoint' , () => {
    const url = API_URLs.DELETE_ACCOUNT;

    it('Deletar Conta de Usuário Com Sucesso', () => {
        const user_infos = generateUser();
        cy.gui_fazer_cadastro_completo(user_infos);

        cy.request({
            method: 'DELETE',
            url: `${url}`,
            form: true,
            body: {
                email: user_infos.email,
                password: user_infos.password
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody.message).to.eq('Account deleted!');
        });
    });

    it.only('Deletar Conta de Usuário Inexistente', () => {
        cy.request({
            method: 'DELETE',
            url: `${url}`,
            form: true,
            body: {
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(404);
            expect(responseBody.message).to.eq('Account not found!');
        });
    });

});