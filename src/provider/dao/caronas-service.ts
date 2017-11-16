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
    
    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.caronas = this._db.list("/carona");
        return this.caronas;
    }

    save(carona) {
        if(carona.caroneiras == undefined){
            carona.caroneiras = null;
        }
        
        if(carona.motorista == undefined){
            carona.motorista = null;
        }

        if (carona.key == "") {
            this._insert(carona);
        } else {
            this._update(carona);
        }
    }

    private _insert(carona: Carona) {  
        this.caronas.push({
            caroneiras: carona.caroneiras,
            motorista: carona.motorista,
            status: carona.status,
            trajeto: carona.trajeto,
            ocupacao: carona.ocupacao,
        });
    }

    private _update(carona: Carona) {
        this.caronas.update(carona.key, {
            caroneiras: carona.caroneiras,
            motorista: carona.motorista,
            status: carona.status,
            trajeto: carona.trajeto,
            ocupacao: carona.ocupacao,            
        });
    }

    remove(key: string) {
        this.caronas.remove(key);
    }
}