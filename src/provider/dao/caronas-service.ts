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
    
    // public usuario: Usuario;
    // public caroneira: Carona = new Carona('', [''],'', this.trajeto);

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
        console.log(carona);
        
        this.caronas.push({
            caroneiras: carona.caroneiras,
            motorista: carona.motorista,
            status: carona.status,
            trajeto: carona.trajeto,
            // ocupacao: carona.ocupacao,
        });
    }

    private _update(carona: Carona) {
        console.log('321');
        
    //     this.caronas.update(caroneira.key, {
    //         nome: caroneira.nome,
    //         email: caroneira.email,
    //         sexo: caroneira.sexo,
    //         nascimento: caroneira.nascimento,
    //         telefone: caroneira.telefone,
    //         cpf: caroneira.cpf
    //     })
    }

    // remove(key: string) {
    //     this.carona.remove(key);
    // }
}