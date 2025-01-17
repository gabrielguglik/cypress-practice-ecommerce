import 'cypress-file-upload';

const elements = require('./elements').ELEMENTS;

class ContactUs {
    acessarContactUs() {
        cy.visit('https://www.automationexercise.com/contact_us');
    };

    preencherNome(name) {
        cy.get(elements.nameInput).type(name);
    };

    preencherEmail(email) {
        cy.get(elements.emailInput).type(email);
    };

    preencherAssunto(subject) {
        cy.get(elements.subjectInput).type(subject);
    };

    preencherMensagem(message) {
        cy.get(elements.messageInput).type(message);
    };

    escolherArquivo(arquivo) {
        cy.get(elements.fileInput).attachFile(arquivo);
    };

    enviarMensagem() {
        cy.get(elements.submitButton).click();
    };

    clicarBotaoHome() {
        cy.get(elements.homeLink)
            .contains('Home')
            .should('be.visible')
            .click();
    };
};

export default new ContactUs();