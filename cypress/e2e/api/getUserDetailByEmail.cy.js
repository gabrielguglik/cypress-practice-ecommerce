import { faker } from '@faker-js/faker';

describe('Get User Detail By Email Endpoint' , () => {
    const url = 'https://automationexercise.com/api/getUserDetailByEmail';

    it('Obter Detalhes da Conta do Usuário por Email Com Sucesso', () => {
        const user_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            birth_day: faker.number.int({ min: 1, max: 30 }),
            birth_month: 'January',
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
            method: 'GET',
            url: `${url}`,
            qs: {
                email: user_infos.email
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.user.name).to.eq(user_infos.name);
            expect(responseBody.user.email).to.eq(user_infos.email);
            expect(responseBody.user.birth_day).to.eq(user_infos.birth_day.toString());
            expect(responseBody.user.birth_month).to.eq('1');
            expect(responseBody.user.birth_year).to.eq(user_infos.birth_year.toString());
            expect(responseBody.user.first_name).to.eq(user_infos.first_name);
            expect(responseBody.user.last_name).to.eq(user_infos.last_name);
            expect(responseBody.user.address1).to.eq(user_infos.address);
            expect(responseBody.user.zipcode).to.eq(user_infos.zipcode);
            expect(responseBody.user.state).to.eq(user_infos.state);
            expect(responseBody.user.city).to.eq(user_infos.city);
        });
    });
    

});