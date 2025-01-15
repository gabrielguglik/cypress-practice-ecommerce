Cypress.Commands.add('api_cadastrar_usuario', user_infos => {
    cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/createAccount',
        body: {
            name: user_infos.name,
            email: user_infos.email,
            password: user_infos.password,
            title: user_infos.title,
            birth_date: user_infos.birth_date,
            birth_month: user_infos.birth_month,
            birth_year: user_infos.birth_year,
            firstname: user_infos.firstname,
            lastname: user_infos.lastname,
            company: user_infos.company,
            address1: user_infos.address1,
            address2: user_infos.address2,
            country: user_infos.country,
            zipcode: user_infos.zipcode,
            state: user_infos.state,
            city: user_infos.city,
            mobile_number: user_infos.mobile_number
        }
    }).then(response => {
        expect(response.status).to.eq(200);
        cy.log('User created!');
    });
});
