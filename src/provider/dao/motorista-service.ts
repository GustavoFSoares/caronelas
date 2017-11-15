import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

import { Usuario } from "../../domain/usuario/usuario";

@Injectable()
export class MotoristaFormService {
    public usuario: AngularFireList<any>;
    public motorista: Usuario = new Usuario();

    constructor(
        private _db: AngularFireDatabase,
        private _angularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.usuario = this._db.list("/usuaria/motorista");
        return this.usuario;
    }

    save(motorista) {
        if (motorista.key == "") {
            this._insert(motorista);
        } else {
            this._update(motorista);
        }
    }

    private _insert(motorista: Usuario) {
        this.usuario.push({
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
            carro:{
                ano: motorista.carro.ano,
                cor: motorista.carro.cor,
                placa: motorista.carro.placa,
                renavan: motorista.carro.renavan,
                marca: motorista.carro.marca,
                modelo: motorista.carro.modelo,
            }
        });
    }

    private _update(motorista: Usuario) {
        this.usuario.update(motorista.key, {
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
            carro: {
                ano: motorista.carro.ano,
                cor: motorista.carro.cor,
                placa: motorista.carro.placa,
                renavan: motorista.carro.renavan,
                marca: motorista.carro.marca,
                modelo: motorista.carro.modelo,
            }
        })
    }

    remove(key: string) {
        this.usuario.remove(key);
    }
}