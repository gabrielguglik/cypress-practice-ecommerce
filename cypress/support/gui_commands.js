import CadastroInicial from "./pages/cadastroInicial";

Cypress.Commands.add('gui_fazer_cadastro_inicial', user_infos => {
    CadastroInicial.acessarCadastroInicial();
    CadastroInicial.preencherNome(user_infos.name);
    CadastroInicial.preencherEmail(user_infos.email);
    CadastroInicial.enviarCadastroInicial();
});