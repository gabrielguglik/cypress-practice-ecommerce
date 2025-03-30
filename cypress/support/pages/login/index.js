import { GUI_URLs } from '../../gui_urls.js';

const elements = require('./elements').ELEMENTS;

class Login {
    acessarLogin() {
        cy.visit(GUI_URLs.LOGIN);
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