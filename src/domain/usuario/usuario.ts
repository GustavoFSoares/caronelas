import { Injectable } from "@angular/core";

@Injectable()
export class Usuario 
{

    constructor(
        public $key: string = "",
        public nome: string = "",
        public telefone: string = "",
        public cpf: string = "",
        public email: string = "",
        public sexo: string = "",
        public nascimento: string = new Date().toISOString(),
        public cnh: string = "",
        public tem_cnh: boolean = false,
    ){ }
}

@Injectable()
export class Carro 
{

    constructor(
        public placa: string = "",
        public ano: string = new Date().toISOString(),
        public cor: string = "",
        public renavan: string = "",
    ){ }

}