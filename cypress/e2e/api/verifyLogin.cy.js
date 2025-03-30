import { faker } from '@faker-js/faker';
import { API_URLs } from '../../support/api_urls.js';

describe('Verify Login Endpoint' , () => {
    const url = API_URLs.VERIFY_LOGIN;

    it('Fazer Login Com Credenciais Válidas Com Sucesso', () => {
        // para este cenário, o ideal seria utilizar o comando de API cy.api_cadastrar_usuario(user_infos) para realizar as pré-condições do teste,
        // garantindo maior velocidade e eliminando visitas desncessárias às páginas. no entanto, devido a limitações da aplicação,
        // optou-se por realizar as pré-condições utilizando a interface gráfica (GUI).
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
            method: 'POST',
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
            expect(responseBody.message).to.eq('User exists!');
        });
    });

    it('Verificar Login sem o parâmetro email', () => {
        cy.request({
            method: 'POST',
            url: `${url}`,
            form: true,
            body: {
                password: faker.internet.password()
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(400);
            expect(responseBody.message).to.eq('Bad request, email or password parameter is missing in POST request.');
        });
    });

    it('Método Delete Para Fazer Login', () => {
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
            expect(responseBody.responseCode).to.eq(405);
            expect(responseBody.message).to.eq('This request method is not supported.');
        });
    });

    it.only('Verificar Login Com Detalhes Inválidos', () => {
        cy.request({
            method: 'POST',
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
            expect(responseBody.message).to.eq('User not found!');
        });
    });

});