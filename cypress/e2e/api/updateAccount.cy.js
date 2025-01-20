import { faker } from '@faker-js/faker';

describe('Create Account Endpoint' , () => {
    const url = 'https://automationexercise.com/api/updateAccount';

    it('Atualizar Conta de Usuário Com Sucesso', () => {
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
        const updated_user_infos = {
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
    
        cy.request({
            method: 'PUT',
            url: `${url}`,
            form: true,
            body: {
                name: updated_user_infos.name,
                email: user_infos.email,
                password: user_infos.password,
                title: 'Mr',
                birth_date: updated_user_infos.birth_day,
                birth_month: updated_user_infos.birth_month,
                birth_year: updated_user_infos.birth_year,
                firstname: updated_user_infos.first_name,
                lastname: updated_user_infos.last_name,
                company: updated_user_infos.company,
                address1: updated_user_infos.address,
                address2: faker.location.streetAddress(),
                country: updated_user_infos.country,
                zipcode: updated_user_infos.zipcode,
                state: updated_user_infos.state,
                city: updated_user_infos.city,
                mobile_number: updated_user_infos.mobile_number
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody.message).to.eq('User updated!');
        });
    });
    

});