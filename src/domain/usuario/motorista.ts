import { Injectable } from "@angular/core";
import { Usuario } from "./usuario";

@Injectable()
export class Motorista extends Usuario {
    
    constructor(
        public cnh: string = "",
        public tem_cnh: boolean = false, 
        public carro = new Carro()
    ){
        super();
    }
}

@Injectable()
export class Carro {

    constructor(
        public placa: string = "",
        public ano: string = new Date().toISOString(),
        public cor: string = "",
        public renavan: string = "",
    ) { }

}