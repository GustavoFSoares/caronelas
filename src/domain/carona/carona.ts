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
        public horario_origem: string = new Date().toISOString(),
        public horario_destino: string = new Date().toISOString(),
        public tolerancia: string = new Date().toISOString(),
    ){ }
}