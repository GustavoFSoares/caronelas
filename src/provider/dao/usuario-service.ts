import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { Caroneira } from "../../domain/usuario/caroneira";

@Injectable()
export class UsuarioService {
    
    public usuario: AngularFireList<any>;
    public caroneira: Caroneira = new Caroneira();

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ){ }

    getData(){
        this.usuario = this._db.list('caroneira');
        return this.usuario;
    }


    save(caroneira: Caroneira){
        if(caroneira.$key == ''){
            this._insert(caroneira);
        } else {
            this._update(caroneira);
        }
    }
    
    private _insert(caroneira: Caroneira){
        this.usuario.push({ caroneira: caroneira });
    }

    private _update(caroneira: Caroneira){
        this.usuario.update(caroneira.$key, { caroneira: caroneira })
    }

    remove(key: string){
        this.usuario.remove(key);
    }
}