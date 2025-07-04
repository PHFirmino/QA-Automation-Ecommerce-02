import { expect } from '@playwright/test';

export class Global{
    constructor(page){

        // Atribui a página atual
        this.page = page;
    }

    // Método para verificar o título da página
    async verificarPagina(titulo){
        
        // Verifica se o título da página corresponde ao esperado
        await expect(this.page).toHaveTitle(titulo);
    }
}