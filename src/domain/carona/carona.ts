import { Injectable } from "@angular/core";
import { Usuario } from "../usuario/usuario";
import { Motorista } from "../usuario/condutor";
@Injectable()
export class Carona {

    constructor(
        public key: string = "",
        public motorista: Motorista = null,
        public caroneiras: Usuario[] = null,
        public status: string = "",
        public trajeto: Trajeto = new Trajeto(),
        public ocupacao: number = null,
    ) { }
}

@Injectable()
export class Trajeto {

    constructor(
        public local_origem: string = "",
        public local_destino: string = "",
        public dia_saida: Date = new Date(),
        public hora_saida: Date = new Date(),
        public tolerancia: Date = new Date(),
    ){ }
}