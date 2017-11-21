import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

import { Motorista } from "../../domain/usuario/condutor";

@Injectable()
export class MotoristaFormService {
    public usuario: AngularFireList<any>;
    public motorista: Motorista = new Motorista();

    constructor(
        private _db: AngularFireDatabase,
        private _angularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.usuario = this._db.list("/usuaria/motorista");
        return this.usuario;
    }

    save(motorista) {
        this.motorista = motorista;
        
        if (motorista.key == "") {
            this._insert();
        } else {
            this._update();
        }
    }

    private _insert() {
        this.usuario.push( this.getColunas(this.motorista) );
    }

    private _update() {
        this.usuario.update( this.motorista.key, this.getColunas(this.motorista) )
    }

    remove(key: string) {
        this.usuario.remove(key);
    }

    getColunas(motorista: Motorista){
        let colunas = {
            nome: motorista.nome,
            telefone: motorista.telefone,
            cpf: motorista.cpf,
            email: motorista.email,
            nascimento: motorista.nascimento,
            idade: motorista.idade,
            tipo: motorista.tipo,
            cnh: motorista.cnh,
            tem_cnh: motorista.tem_cnh,
            status: motorista.status,
            foto: motorista.foto,
            key: motorista.key,
            carro: {
                ano: motorista.carro.ano,
                cor: motorista.carro.cor,
                placa: motorista.carro.placa,
                renavan: motorista.carro.renavan,
                marca: motorista.carro.marca,
                modelo: motorista.carro.modelo,
            }
        }
        return colunas;
    }
    
}