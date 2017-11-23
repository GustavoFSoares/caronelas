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
        this.carona = carona;
        if (this.carona.caroneiras == undefined){
            this.carona.caroneiras = null;
        }
        
        if (this.carona.motorista == undefined){
            this.carona.motorista = null;
        }

        if (this.carona.key == "") {
            this._insert();
        } else {
            this._update();
        }
    }

    private _insert() {  
        this.caronas.push( this.getColunas(this.carona) );
    }

    private _update() {
        this.caronas.update( this.carona.key, this.getColunas(this.carona) );
    }

    remove(key: string) {
        this.caronas.remove(key);
    }

    getColunas(carona){
        let colunas = {
            caroneiras: carona.caroneiras,
            motorista: carona.motorista,
            status: carona.status,
            trajeto: carona.trajeto,
            ocupacao: carona.ocupacao,
        }
        return colunas;
    }
}