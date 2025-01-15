const elements = require('./elements').ELEMENTS;

class CadastroCompleto {
    preencherTitulo() {
        cy.get(elements.titleRadio).first().click();
    };

    preencherSenha(password) {
        cy.get(elements.passwordInput).type(password);
    };

    preencharDataNascimento(birth_day, birth_month, birth_year) {
        cy.get(elements.birthDaySelect).select(birth_day).should('have.value', birth_day);
        cy.get(elements.birthMonthSelect).select(birth_month).contains(birth_month);
        cy.get(elements.birthYearSelect).select(birth_year.toString()).should('have.value', birth_year);
    };

    preencherCheckbox() {
        cy.get(elements.newsLetterCheckbox).check();
    };

    preencherPrimeiroNome(first_name) {
        cy.get(elements.firstNameInput).type(first_name);
    };

    preencherUltimoNome(last_name) {
        cy.get(elements.lastNameInput).type(last_name);
    };

    preencherEndereço(address) {
        cy.get(elements.addressInput).type(address);
    };

    preencherEstado(state) {
        cy.get(elements.stateInput).type(state);
    };

    preencherCidade(city) {
        cy.get(elements.cityInput).type(city);
    };

    preencherCodigoPostal(zipcode) {
        cy.get(elements.zipcodeInput).type(zipcode);
    };

    preencherNumeroCelular(mobile_number) {
        cy.get(elements.mobileNumberInput).type(mobile_number);
    };

    enviarCadastroCompleto() {
        cy.get(elements.createAccountButton).click();
    };

};

export default new CadastroCompleto();