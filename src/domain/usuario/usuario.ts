import { Injectable } from "@angular/core";
import { Condutor, Carro } from "./condutor";
@Injectable()
export class  Usuario extends Condutor
{
    constructor(
        public key: any = "",
        public nome: string = "",
        public telefone: string = "",
        public cpf: string = "",
        public email: string = "",
        public nascimento: string = new Date().toISOString(),
        public idade: number = Number(),
        public tipo: string = "",
        public status: string = "",
        public foto: any = "",
        public condutor: Condutor = new Condutor(),
    ){
        super();
     }
}