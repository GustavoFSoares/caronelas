import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

import { Carona, Trajeto } from "../../domain/carona/carona";
import { Usuario } from "../../domain/usuario/usuario";

@Injectable()
export class CaronaService {
    public caronas: AngularFireList<any>;
    public carona: Carona = new Carona();
    
    public usuario: Usuario;
    // public caroneira: Carona = new Carona('', [''],'', this.trajeto);

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.carona = this._db.list("/caronas");
        return this.carona;
    }

    // save(caroneira) {
    //     if (caroneira.key == "") {
    //         this._insert(caroneira);
    //     } else {
    //         this._update(caroneira);
    //     }
    // }

    // private _insert(caroneira: Caroneira) {  
    //     this.carona.push({
    //         nome: caroneira.nome,
    //         email: caroneira.email,
    //         sexo: caroneira.sexo,
    //         nascimento: caroneira.nascimento,
    //         telefone: caroneira.telefone,
    //         cpf: caroneira.cpf
    //     });
    // }

    // private _update(caroneira: Caroneira) {
    //     this.carona.update(caroneira.key, {
    //         nome: caroneira.nome,
    //         email: caroneira.email,
    //         sexo: caroneira.sexo,
    //         nascimento: caroneira.nascimento,
    //         telefone: caroneira.telefone,
    //         cpf: caroneira.cpf
    //     })
    // }

    // remove(key: string) {
    //     this.carona.remove(key);
    // }
}