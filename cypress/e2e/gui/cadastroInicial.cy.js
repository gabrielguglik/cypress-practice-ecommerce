import { faker } from '@faker-js/faker';
import { generateUser } from '../../support/generate_user.js';
import { GUI_URLs } from '../../support/gui_urls.js';
import CadastroInicial from "../../support/pages/cadastroInicial";
import Home from "../../support/pages/home";

describe('Cadastro Inicial', () => {
    it('Cadastro Inicial de Novo Usuário com Sucesso', () => {
        const user_name = faker.person.fullName();
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', GUI_URLs.SIGNUP);
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Nome', () => {
        const user_email = faker.internet.email();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherEmail(user_email);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', GUI_URLs.LOGIN);
    });

    it('Cadastro Inicial de Novo Usuário Sem o Campo Email', () => {
        const user_name = faker.person.fullName();

        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_name);
        CadastroInicial.enviarCadastroInicial();

       cy.url().should('equal', GUI_URLs.LOGIN);
    });

    it('Cadastro Inicial de Novo Usuário Com o Campo Email Já Cadastrado', () => {
        const user_infos = generateUser();
        // para este cenário, o ideal seria utilizar o comando de API cy.api_cadastrar_usuario(user_infos) para realizar as pré-condições do teste,
        // garantindo maior velocidade e eliminando visitas desncessárias às páginas. no entanto, devido a limitações da aplicação,
        // optou-se por realizar as pré-condições utilizando a interface gráfica (GUI).
        cy.gui_fazer_cadastro_completo(user_infos);
        Home.clicarBotaoLogout();
        
        CadastroInicial.acessarCadastroInicial();
        CadastroInicial.preencherNome(user_infos.name);
        CadastroInicial.preencherEmail(user_infos.email);
        CadastroInicial.enviarCadastroInicial();

        cy.url().should('equal', GUI_URLs.SIGNUP);
        cy.contains('Email Address already exist!').should('be.visible');
    });

});