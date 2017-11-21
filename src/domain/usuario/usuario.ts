import { Injectable } from "@angular/core";
import { Motorista, Carro } from "./condutor";
@Injectable()
export class  Usuario
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
    ){ }
}