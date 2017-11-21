import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { SolicitacaoCarona } from "../../domain/carona/solicitacao-carona";
import { Usuario } from "../../domain/usuario/usuario";

@Injectable()
export class SolicitarCaronaService {
    public caronas: AngularFireList<any>;
    public carona: SolicitacaoCarona = new SolicitacaoCarona();

    constructor(
        private _db: AngularFireDatabase,
        private _aungularFireAuth: AngularFireAuth,
    ) { }

    getData() {
        this.caronas = this._db.list("/caronas-solicitadas");
        return this.caronas;
    }

    save(carona) {
        this.carona = carona;

        if (this.carona.key == "") {
            this._insert();
        } else {
            this._update();
        }
    }

    private _insert() {
        this.caronas.push(this.getColunas(this.carona));
    }

    private _update() {
        this.caronas.update(this.carona.key, this.getColunas(this.carona));
    }

    remove(key: string) {
        this.caronas.remove(key);
    }

    getColunas(carona) {
        let colunas = {
            caroneira: carona.caroneira,
            trajeto: carona.trajeto,
        }
        return colunas;
    }
}