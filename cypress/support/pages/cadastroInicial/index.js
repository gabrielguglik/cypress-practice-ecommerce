const elements = require('./elements').ELEMENTS;

class CadastroInicial {
    acessarCadastroInicial() {
        cy.visit('https://www.automationexercise.com/login');
    }

    preencherNome(user_name) {
        cy.get(elements.nameInput).type(user_name);
    };

    preencherEmail(user_email) {
        cy.get(elements.emailInput).type(user_email);
    };

    enviarCadastroInicial() {
        cy.get(elements.signupButton).click();
    };

};

export default new CadastroInicial();