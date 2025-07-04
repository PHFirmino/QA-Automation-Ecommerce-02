export class MetodosPage {
    constructor(page) {
        this.page = page;
    }

    async preencherCampo(elemento, atributo, valorAtributo, valor) {
        await this.page.locator(`${elemento}[${atributo}="${valorAtributo}"]`).fill(valor);
    }

    async selecionarOpcao(elemento, atributo, valorAtributo, valor) {
        await this.page.locator(`${elemento}[${atributo}="${valorAtributo}"]`).selectOption(valor);
    }

    async checkarCaixa(elemento, atributo, valorAtributo) {
        await this.page.locator(`${elemento}[${atributo}="${valorAtributo}"]`).check();
    }
    async clicarBotao(elemento, atributo, valorAtributo) {
        await this.page.locator(`${elemento}[${atributo}="${valorAtributo}"]`).click();
    }

    async clicarNoMenu(menu){
        await this.page.locator('.navbar-nav').locator('li').nth(menu).click();
    }
}