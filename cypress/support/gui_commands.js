import CadastroCompleto from "./pages/cadastroCompleto";
import CadastroInicial from "./pages/cadastroInicial";
import Cart from "./pages/cart";
import ContactUs from "./pages/contactUs";
import Home from "./pages/home";
import Login from "./pages/login";
import ProductDetails from "./pages/productDetails";

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

Cypress.Commands.add('gui_adicionar_produto_ao_carrinho', () => {
    Home.acessarHome();
    Home.localizarProduto();
    Home.clicarBotaoAddToCart();
});

Cypress.Commands.add('gui_fazer_login', (email, password) => {
    Login.acessarLogin();
    Login.preencherEmail(email);
    Login.preencherSenha(password);
    Login.clicarBotaoLogin();
});

Cypress.Commands.add('gui_enviar_mensagem', (message_infos) => {
    ContactUs.acessarContactUs();
    ContactUs.preencherNome(message_infos.name);
    ContactUs.preencherEmail(message_infos.email);
    ContactUs.preencherAssunto(message_infos.subject);
    ContactUs.preencherMensagem(message_infos.message);
    ContactUs.escolherArquivo(message_infos.file);
    ContactUs.enviarMensagem();
});

Cypress.Commands.add('gui_visualizacao_adicionar_produto_ao_carrinho', () => {
    ProductDetails.acessarVisualizacaoProduto();
    ProductDetails.clicarBotaoAddToCart();
});

Cypress.Commands.add('gui_adicionar_produto_e_visualizar_carrinho', () => {
    Home.acessarHome();
    Home.localizarProduto();
    Home.clicarBotaoAddToCart();
    Home.clicarBotaoViewCart();
});

Cypress.Commands.add('gui_finalizar_compra', (payment_infos) => {
    Cart.clicarBotaoProceedToCheckout();
    Cart.clicarBotaoPlaceOrder();
    Cart.preencherNomeNoCartao(payment_infos.name_on_card);
    Cart.preencherCardNumber(payment_infos.card_number);
    Cart.preencherCVC(payment_infos.cvc);
    Cart.preencherExpiration(payment_infos.expiry_month, payment_infos.expiry_year);
    Cart.clicarBotaoPayAndConfirmOrder();
});