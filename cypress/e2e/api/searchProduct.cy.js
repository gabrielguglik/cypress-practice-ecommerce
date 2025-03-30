import { API_URLs } from '../../support/api_urls.js';

describe('Search Product Endpoint' , () => {
    const url = API_URLs.SEARCH_PRODUCT;

    it('Pesquisar Produto Com Sucesso', () => {
        cy.request({
            method: 'POST',
            url: `${url}`,
            form: true,
            body: {
                search_product: 'Blue Top' 
            }
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            const firstProduct = responseBody.products[0];
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody).to.have.property('products').that.is.an('array').and.not.empty;
            expect(firstProduct).to.have.property('name', 'Blue Top');
        });
    });

    it('Pesquisar Produto sem o parâmetro search_product', () => {
        cy.request({
            method: 'POST',
            url: `${url}`,
            form: true
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody.responseCode).to.eq(400);
            expect(responseBody.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        });
    });

});