import CadastroCompleto from "./pages/cadastroCompleto";
import CadastroInicial from "./pages/cadastroInicial";
import Home from "./pages/home";
import Login from "./pages/login";

Cypress.Commands.add('gui_fazer_cadastro_inicial', user_infos => {
    CadastroInicial.acessarCadastroInicial();
    CadastroInicial.preencherNome(user_infos.name);
    CadastroInicial.preencherEmail(user_infos.email);
    CadastroInicial.enviarCadastroInicial();
});

Cypress.Commands.add('gui_fazer_cadastro_completo', user_infos => {
    cy.gui_fazer_cadastro_inicial(user_infos);

    CadastroCompleto.preencherTitulo();
    CadastroCompleto.preencherSenha(user_infos.password);
    CadastroCompleto.preencharDataNascimento(user_infos.birth_day, user_infos.birth_month, user_infos.birth_year);
    CadastroCompleto.preencherCheckbox();
    CadastroCompleto.preencherPrimeiroNome(user_infos.first_name);
    CadastroCompleto.preencherUltimoNome(user_infos.last_name);
    CadastroCompleto.preencherEndereço(user_infos.address);
    CadastroCompleto.preencherEstado(user_infos.state);
    CadastroCompleto.preencherCidade(user_infos.city);
    CadastroCompleto.preencherCodigoPostal(user_infos.zipcode);
    CadastroCompleto.preencherNumeroCelular(user_infos.mobile_number);
    CadastroCompleto.enviarCadastroCompleto();
    CadastroCompleto.clicarBotaoContinuar();
});

Cypress.Commands.add('adicionar_produto_ao_carrinho', () => {
    Home.acessarHome();
    Home.localizarProduto();
    Home.clicarBotaoAddToCart();
});

Cypress.Commands.add('fazer_login', (email, password) => {
    Login.acessarLogin();
    Login.preencherEmail(email);
    Login.preencherSenha(password);
    Login.clicarBotaoLogin();
});