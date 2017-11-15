import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

import { Usuario } from "../../domain/usuario/usuario";

@Injectable()
export class CaroneiraFormService {
    public usuario: AngularFireList<any>;
    public caroneira: Usuario = new Usuario();

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ){ }

    getData(){
        this.usuario = this._db.list("/usuaria/caroneira");
        return this.usuario;
    }

    save(caroneira){
        if(caroneira.key == ""){
            this._insert(caroneira);
        } else {
            this._update(caroneira);
        }
    }
    
    private _insert(caroneira: Usuario){
        this.usuario.push({
            nome: caroneira.nome,
            telefone: caroneira.telefone,
            cpf: caroneira.cpf,
            email: caroneira.email,
            idade: caroneira.idade,
            nascimento: caroneira.nascimento,
            tipo: caroneira.tipo,
            status: caroneira.status,
        });
    }

    private _update(caroneira: Usuario){
        this.usuario.update(caroneira.key, { 
            nome: caroneira.nome,
            telefone: caroneira.telefone,
            cpf: caroneira.cpf,
            email: caroneira.email,
            idade: caroneira.idade,
            nascimento: caroneira.nascimento,
            tipo: caroneira.tipo,
            status: caroneira.status,
        })
    }

    remove(key: string){
        this.usuario.remove(key);
    }
}