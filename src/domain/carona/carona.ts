import { Injectable } from "@angular/core";
import { Usuario } from "../usuario/usuario";
@Injectable()
export class Carona {

    constructor(
        public motorista: Usuario = new Usuario(),
        public caroneiras: Usuario[] = new Usuario()[''],
        public status: string = "",
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
    ){ }
}