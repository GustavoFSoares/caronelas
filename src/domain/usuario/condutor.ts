import { Injectable } from "@angular/core";

@Injectable()
export class Condutor{
    
    constructor(
        public cnh: string = "",
        public tem_cnh: boolean = false, 
        public carro = new Carro(),
    ){ }
}

@Injectable()
export class Carro {

    constructor(
        public placa: string = "",
        public ano: string = new Date().toISOString(),
        public cor: string = "",
        public renavan: string = "",
        public marca: string = "",
        public modelo: string = "",
    ) { }

}