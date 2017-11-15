import { Injectable } from "@angular/core";
import { Condutor, Carro } from "./condutor";
@Injectable()
export class  Usuario extends Condutor
{
    constructor(
        public key: string = "",
        public nome: string = "",
        public telefone: string = "",
        public cpf: string = "",
        public email: string = "",
        public nascimento: string = new Date().toISOString(),
        public idade: string = "",
        public tipo: string = "",
        public condutor: Condutor = new Condutor(),
    ){
        super();
     }
}