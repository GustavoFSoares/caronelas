import { Injectable } from "@angular/core";

@Injectable()
export class  Usuario 
{

    constructor(
        public key: string = "",
        public nome: string = "",
        public telefone: string = "",
        public cpf: string = "",
        public email: string = "",
        public sexo: string = "",
        public nascimento: string = new Date().toISOString(),
    ){ }
}