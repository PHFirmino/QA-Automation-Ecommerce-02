import { faker } from '@faker-js/faker';


export class Fakes{
    constructor(){}

    async gerarUsuarioFake(){
        return {
            nome: faker.person.fullName(),
            primeiroNome: faker.person.firstName(),
            ultimoNome: faker.person.lastName(),
            email: faker.internet.email(),
            sexo: "Mr",
            senha: faker.internet.password(),
            nascimento: {
                dia: "1",
                mes: "January",
                ano: "1990"
            },
            empresa : faker.company.name(),
            enderecoUm: faker.location.streetAddress(),
            enderecoDois: faker.location.secondaryAddress(),
            pais: "Canada",
            estado: faker.location.state(),
            cidade: faker.location.city(),
            cep: faker.location.zipCode(),
            telefone: faker.phone.number(),
        }
    }
}