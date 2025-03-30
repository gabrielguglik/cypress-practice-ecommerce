import { API_URLs } from '../../support/api_urls.js';

describe('Products List Endpoint' , () => {
    const url = API_URLs.PRODUCTS_LIST;

    it('Obter Lista de Todos os Produtos Com Sucesso', () => {
        cy.request('GET', `${url}`).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('products');
        });
    });

    it('Cadastrar Produto na Lista de Todos os Produtos', () => {
        cy.request({
            method: 'POST',
            url: `${url}`,
            failOnStatusCode: false, 
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(405);
            expect(responseBody.message).to.eq('This request method is not supported.');
        });
    });

});