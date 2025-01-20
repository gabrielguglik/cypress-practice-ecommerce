describe('Brands List Endpoint' , () => {
    const url = 'https://automationexercise.com/api/brandsList';

    it('Obter Lista de Todas as Marcas Com Sucesso', () => {
        cy.request('GET', `${url}`).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(response.status).to.eq(200);
            expect(responseBody).to.have.property('brands');
        });
    });

    it('Atualizar Lista de Todas as Marcas', () => {
        cy.request({
            method: 'PUT',
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