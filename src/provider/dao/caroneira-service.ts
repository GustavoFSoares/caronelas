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
        this.caroneira = caroneira;
        
        if(caroneira.key == ""){
            this._insert();
        } else {
            this._update();
        }
    }
    
    private _insert(){
        this.usuario.push( this.getColunas(this.caroneira) );
    }

    private _update(){
        this.usuario.update(this.caroneira.key, this.getColunas(this.caroneira) );
    }

    remove(key: string){
        this.usuario.remove(key);
    }

    getColunas(caroneira: Usuario) {
        let colunas = {
            nome: caroneira.nome,
            telefone: caroneira.telefone,
            cpf: caroneira.cpf,
            email: caroneira.email,
            idade: caroneira.idade,
            nascimento: caroneira.nascimento,
            tipo: caroneira.tipo,
            status: caroneira.status,
            foto: caroneira.foto,
            key: caroneira.key
        }
        return colunas;
    }
}