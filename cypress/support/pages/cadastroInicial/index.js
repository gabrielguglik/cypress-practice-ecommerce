import { GUI_URLs } from '../../gui_urls.js';

const elements = require('./elements').ELEMENTS;

class CadastroInicial {
    acessarCadastroInicial() {
        cy.visit(GUI_URLs.LOGIN);
    };

    preencherNome(name) {
        cy.get(elements.nameInput).type(name);
    };

    preencherEmail(email) {
        cy.get(elements.emailInput).type(email);
    };

    enviarCadastroInicial() {
        cy.get(elements.signupButton).click();
    };

};

export default new CadastroInicial();