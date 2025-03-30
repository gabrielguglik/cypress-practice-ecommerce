import { API_URLs } from '../../support/api_urls.js';
import { generateUser } from '../../support/generate_user.js';

describe('Get User Detail By Email Endpoint' , () => {
    const url = API_URLs.GET_USER_DETAIL_BY_EMAIL;

    it('Obter Detalhes da Conta do Usuário por Email Com Sucesso', () => {
        const user_infos = generateUser();
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