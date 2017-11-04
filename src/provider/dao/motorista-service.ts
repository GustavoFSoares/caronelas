import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Motorista, Carro } from "../../domain/usuario/motorista";

@Injectable()
export class MotoristaFormService {
    public usuario: AngularFireList<any>;
    public motorista: Motorista = new Motorista();
    public carro: Carro = new Carro();

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.usuario = this._db.list("/motorista");
        return this.usuario;
    }

    save(motorista, carro) {
        if (motorista.key == "") {
            this._insert(motorista, carro);
        } else {
            this._update(motorista, carro);
        }
    }

    private _insert(motorista: Motorista, carro: Carro) {
        this.usuario.push({
            nome: motorista.nome,
            email: motorista.email,
            sexo: motorista.sexo,
            nascimento: motorista.nascimento,
            telefone: motorista.telefone,
            cpf: motorista.cpf,
            cnh: motorista.cnh,
            tem_cnh: motorista.tem_cnh,
            carro:{
                placa: carro.placa,
                cor: carro.cor,
                renavan: carro.renavan,
                ano: carro.ano,
            }
        });
    }

    private _update(motorista: Motorista, carro: Carro) {
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