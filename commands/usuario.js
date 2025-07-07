import { expect } from "@playwright/test";

// Importa a página de métodos
import { MetodosPage } from "../pages/metodos-page";

// Importa as rotas do fixture
import { rotas } from "../fixture/rotas";

// Importa o axios para requisições HTTP
import axios from "axios";
import qs from 'qs';


export class Usuario{

    constructor(page){

        // Inicializa a página de métodos
        this. metodosPage = new MetodosPage(page);

        // Atribui as rotas
        this.rotas = rotas;

        // Atribui a página atual
        this.page = page
    }

    // Método para preencher a primeira parte do login
    async preencherPrimeiraParteDoRegistro(usuario){

        // Verifica se a página de registro foi carregada
        await expect(this.page.getByText('New User Signup!')).toBeVisible();

        // Preenche os campos de nome e email
        await this.metodosPage.preencherCampo('input', 'data-qa', 'signup-name', usuario.nome);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'signup-email', usuario.email);

        // Clica no botão de cadastro
        await this.metodosPage.clicarBotao('button', 'data-qa', 'signup-button');
    }

    // Método para preencher a primeira parte do login
    async preencherPrimeiraParteDoLogin(usuario){

        // Verifica se a página de login foi carregada
        await expect(this.page.getByText('Login to your account')).toBeVisible();

        // Preenche os campos de nome e email
        await this.metodosPage.preencherCampo('input', 'data-qa', 'login-email', usuario.email);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'login-password', usuario.senha);

        // Clica no botão de cadastro
        await this.metodosPage.clicarBotao('button', 'data-qa', 'login-button');
    }

    // Método para preencher a segunda parte do login
    async preencherSegundaParteDoRegistro(usuario){

        // Verifica se a página de informações da conta foi carregada
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();

        // Preenche os campos de informações da conta
        await this.metodosPage.checkarCaixa('input', 'id', 'id_gender1');
        await expect(this.page.locator('input[data-qa="name"]')).toHaveValue(usuario.nome);
        await expect(this.page.locator('input[data-qa="email"]')).toHaveValue(usuario.email);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'password', usuario.senha);
        await this.metodosPage.selecionarOpcao('select', 'data-qa', 'days', usuario.nascimento.dia);
        await this.metodosPage.selecionarOpcao('select', 'data-qa', 'months', usuario.nascimento.mes);
        await this.metodosPage.selecionarOpcao('select', 'data-qa', 'years', usuario.nascimento.ano);
        await this.metodosPage.checkarCaixa('input', 'id', 'newsletter');
        await this.metodosPage.checkarCaixa('input', 'id', 'optin');
        await this.metodosPage.preencherCampo('input', 'data-qa', 'first_name', usuario.primeiroNome);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'last_name', usuario.ultimoNome);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'company', usuario.empresa);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'address', usuario.enderecoUm);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'address2', usuario.enderecoDois);
        await this.metodosPage.selecionarOpcao('select', 'data-qa', 'country', usuario.pais);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'state', usuario.estado);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'city', usuario.cidade);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'zipcode', usuario.cep);
        await this.metodosPage.preencherCampo('input', 'data-qa', 'mobile_number', usuario.telefone);

        // Clica no botão de criar conta
        await this.metodosPage.clicarBotao('button', 'data-qa', 'create-account');
    }

    // Método para clicar no menu de login/criar conta
    async clicarNoMenuLoginCriar(menu){
        // Clica no menu de login/criar conta
        await this.metodosPage.clicarNoMenu(menu.index);
    }

    // Método para verificar se o usuário está logado
    async verificarUsuarioLogado(usuario){

        // Verifica se o texto de usuário logado está visível
        await expect(this.page.locator('.navbar-nav').locator('li').nth(9)).toHaveText(`Logged in as ${usuario.nome}`);
    }

    // Método para excluir o usuário
    async excluirUsuario(){

        // Clica no menu de excluir conta
        await this.metodosPage.clicarNoMenu(4);

        // Verifica se a página de exclusão de conta foi carregada
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();

        // Clica no botão de continuar
        await this.metodosPage.clicarBotao('a', 'data-qa', 'continue-button');
    }

    async criarUsuarioAPI(usuario) {
        await axios({
            method: 'post',
            url: this.rotas.apiCriarUsuario.url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                name: usuario.nome,
                email: usuario.email,
                password: usuario.senha,
                title: usuario.sexo,
                birth_date: usuario.nascimento.dia,
                birth_month: usuario.nascimento.mes,
                birth_year: usuario.nascimento.ano,
                firstname: usuario.primeiroNome,
                lastname: usuario.ultimoNome,
                company: usuario.empresa,
                address1: usuario.enderecoUm,
                address2: usuario.enderecoDois,
                country: usuario.pais,
                zipcode: usuario.cep,
                state: usuario.estado,
                city: usuario.cidade,
                mobile_number: usuario.telefone
            })
        })
        .then(async (response) => {
            expect(await response.data).toEqual({
                responseCode: 201,
                message: 'User created!'
            });
        })
    }

    async logOutUsuario(){

        // Clica no menu de excluir conta
        await this.metodosPage.clicarNoMenu(3);
    }
}