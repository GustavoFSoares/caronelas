import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Carro } from "../../domain/usuario/condutor";
import { Usuario } from "../../domain/usuario/usuario";

@Injectable()
export class MotoristaFormService {
    public usuario: AngularFireList<any>;
    public motorista: Usuario = new Usuario();
    public carro: Carro = new Carro();

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.usuario = this._db.list("/usuaria/motorista");
        return this.usuario;
    }

    save(motorista, carro) {
        if (motorista.key == "") {
            this._insert(motorista, carro);
        } else {
            this._update(motorista, carro);
        }
    }

    private _insert(motorista: Usuario, carro: Carro) {
        this.usuario.push({
            nome: motorista.nome,
            telefone: motorista.telefone,
            cpf: motorista.cpf,
            email: motorista.email,
            nascimento: motorista.nascimento,
            tipo: motorista.tipo,
            cnh: motorista.cnh,
            tem_cnh: motorista.tem_cnh,
            carro:{
                ano: carro.ano,
                cor: carro.cor,
                placa: carro.placa,
                renavan: carro.renavan,
                marca: carro.marca,
                modelo: carro.modelo,
            }
        });
    }

    private _update(motorista: Usuario, carro: Carro) {
        this.usuario.update(motorista.key, {
            nome: motorista.nome,
            email: motorista.email,
            sexo: motorista.sexo,
            nascimento: motorista.nascimento,
            telefone: motorista.telefone,
            cpf: motorista.cpf
        })
    }

    remove(key: string) {
        this.usuario.remove(key);
    }
}