import { Injectable } from "@angular/core";
import { Usuario } from "../usuario/usuario";
import { Motorista } from "../usuario/condutor";
@Injectable()
export class SolicitacaoCarona {

    constructor(
        public key: string = "",
        public caroneira: Usuario = null,
        public trajeto: Trajeto = new Trajeto(),
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
    ) { }
}