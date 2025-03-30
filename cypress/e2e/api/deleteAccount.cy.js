import { faker } from '@faker-js/faker';
import { API_URLs } from '../../support/api_urls.js';

describe('Create Account Endpoint' , () => {
    const url = API_URLs.DELETE_ACCOUNT;

    it('Deletar Conta de Usuário Com Sucesso', () => {
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