import { faker } from '@faker-js/faker';
import { GUI_URLs } from '../../support/gui_urls.js';
import ContactUs from '../../support/pages/contactUs';

describe('Contact Us', () => {
    it('Envio de Mensagem com Sucesso', () => {
        const message_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.words(3),
            message: faker.lorem.paragraph(),
            file: 'contactUsFile.txt'
        };

        cy.gui_enviar_mensagem(message_infos);

        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });

    it('Envio de Mensagem Sem o Campo Email', () => {
        const message_infos = {
            name: faker.person.fullName(),
            subject: faker.lorem.words(3),
            message: faker.lorem.paragraph(),
            file: 'contactUsFile.txt'
        };

        ContactUs.acessarContactUs();
        ContactUs.preencherNome(message_infos.name);
        ContactUs.preencherAssunto(message_infos.subject);
        ContactUs.preencherMensagem(message_infos.message);
        ContactUs.escolherArquivo(message_infos.file);
        ContactUs.enviarMensagem();

        cy.contains('Success! Your details have been submitted successfully.').should('not.exist');
    });

    it('Redirecionar para Seção Home Após Enviar Mensagem com Sucesso', () => {
        const message_infos = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            subject: faker.lorem.words(3),
            message: faker.lorem.paragraph(),
            file: 'contactUsFile.txt'
        };

        cy.gui_enviar_mensagem(message_infos);
        ContactUs.clicarBotaoHome();

        cy.url().should('equal', GUI_URLs.HOME);
    });

});