const elements = require('./elements').ELEMENTS;

class Login {
    acessarLogin() {
        cy.visit('https://www.automationexercise.com/login');
    };

    preencherEmail(email) {
        cy.get(elements.emailInput).type(email)
    };

    preencherSenha(password) {
        cy.get(elements.passwordInput).type(password);
    };

    clicarBotaoLogin() {
        cy.get(elements.loginButton).click();
    };
};

export default new Login();