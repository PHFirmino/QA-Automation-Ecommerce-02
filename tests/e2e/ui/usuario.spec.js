import { test, expect } from '@playwright/test';

//Carrega Fixtures
import { rotas } from '../../../fixture/rotas';
import { menus } from '../../../fixture/menus';

//Carrega Metodos
import { Global } from '../../../commands/global';
import { Usuario } from '../../../commands/usuario';
import { Fakes } from '../../../commands/fakes';

// Descreve o teste de usuário
test.describe('Usuario', () => {

    let global;
    let usuario;
    let fakes;

    test.beforeEach(async({ page }) => {

        // Inicializa as classes de comandos
        global = new Global(page);
        usuario = new Usuario(page);
        fakes = new Fakes();

        // Acessa a página inicial
        await page.goto(rotas.inicio.url);
    })

    // Teste para registrar um usuário e excluir a conta
    test('Registrar um usuário e excluir', async({ page }) => {

        // Verifica se a página inicial foi carregada
        await global.verificarPagina(rotas.inicio.titulo);

        // Clica no menu de login/criar conta
        await usuario.clicarNoMenuLoginCriar(menus.loginECriarConta);
        
        // Gera um usuário fake
        await fakes.gerarUsuarioFake().then(async(usuarioFake) => {

            // Preenche a primeira parte do login
            await usuario.preencherPrimeiraParteDoRegistro(usuarioFake);

            // Preenche a segunda parte do login
            await usuario.preencherSegundaParteDoRegistro(usuarioFake);

            // Verifica se a página de criação de conta foi carregada
            await expect(page.getByText('Account Created!')).toBeVisible();

            // Clica no botão de continuar
            await page.locator('a[data-qa="continue-button"]').click();

            // Verifica se o usuário está logado
            await usuario.verificarUsuarioLogado(usuarioFake);
            
            // Clica no menu de excluir conta
            await usuario.excluirUsuario();
        });
    });

    test('Login com email e senha correta', async({ page }) => {

        // Verifica se a página inicial foi carregada
        await global.verificarPagina(rotas.inicio.titulo);

        // Clica no menu de login/criar conta
        await usuario.clicarNoMenuLoginCriar(menus.loginECriarConta);

        // Gera um usuário fake
        await fakes.gerarUsuarioFake().then(async(usuarioFake) => {

            // Cria o usuário via API
            await usuario.criarUsuarioAPI(usuarioFake).then(async () => {
                
                // Preenche a primeira parte do login
                await usuario.preencherPrimeiraParteDoLogin(usuarioFake);

                // Verifica se o usuário está logado
                await usuario.verificarUsuarioLogado(usuarioFake);

                // Clica no menu de excluir conta
                await usuario.excluirUsuario();
            });
        });
    });

    // Teste para login com email e senha incorretos
    test('Login com email e senha incorreta', async({ page }) => {

        // Verifica se a página inicial foi carregada
        await global.verificarPagina(rotas.inicio.titulo);

        // Clica no menu de login/criar conta
        await usuario.clicarNoMenuLoginCriar(menus.loginECriarConta);

        // Gera um usuário fake
        await fakes.gerarUsuarioFake().then(async(usuarioFake) => {

            // Preenche a primeira parte do login com email e senha incorretos
            await usuario.preencherPrimeiraParteDoLogin(usuarioFake);

            // Verifica se a mensagem de erro é exibida
            await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
        });
    });

    test('Logout do usuário', async({ page }) => {

        // Verifica se a página inicial foi carregada
        await global.verificarPagina(rotas.inicio.titulo);

        // Clica no menu de login/criar conta
        await usuario.clicarNoMenuLoginCriar(menus.loginECriarConta);

        // Gera um usuário fake
        await fakes.gerarUsuarioFake().then(async(usuarioFake) => {

            // Cria o usuário via API
            await usuario.criarUsuarioAPI(usuarioFake).then(async () => {
                
                // Preenche a primeira parte do login
                await usuario.preencherPrimeiraParteDoLogin(usuarioFake);

                // Verifica se o usuário está logado
                await usuario.verificarUsuarioLogado(usuarioFake);

                // Clica no menu de Logout
                await usuario.logOutUsuario();

                // Verifica se o usuário foi desconectado
                await global.verificarPagina(rotas.login.titulo);
            });
        });
    });

    test('Registrar email já cadastrado', async({ page }) => {

        // Verifica se a página inicial foi carregada
        await global.verificarPagina(rotas.inicio.titulo);

        // Clica no menu de login/criar conta
        await usuario.clicarNoMenuLoginCriar(menus.loginECriarConta);

        // Gera um usuário fake
        await fakes.gerarUsuarioFake().then(async(usuarioFake) => {

            // Cria o usuário via API
            await usuario.criarUsuarioAPI(usuarioFake).then(async () => {
                
                // Preenche a primeira parte do login
                await usuario.preencherPrimeiraParteDoRegistro(usuarioFake);

                // Tenta registrar novamente com o mesmo email
                await expect(page.getByText('Email Address already exist!')).toBeVisible();
            });
        });
    });
});