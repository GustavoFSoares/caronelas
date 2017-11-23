import { Component } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { Carona } from "../../domain/carona/carona";
import { Carro, Motorista } from "../../domain/usuario/condutor";
import { Usuario } from "../../domain/usuario/usuario";

import { FormService } from "../../domain/form/form-service";
import { CaronaService } from "../../provider/dao/caronas-service";

import { CadastroCaronaPage } from "../form/cadastro-carona/cadastro-carona";
import { DetalheCaronaPage } from "../detalhe-carona/detalhe-carona";
@IonicPage()
@Component({
    selector: 'page-listagem-caronas',
    templateUrl: 'listagem-caronas.html',
})
export class ListagemCaronasPage 
{
    public caronas: Carona[] = [];
    public usuario;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caronaService: CaronaService,
        public formService: FormService,
    ) {

        if (this.usuario == undefined) {
            this.usuario = this.navParams.get('usuario');
        }        

    }

    ngOnInit() 
    {
        this._caronaService.getData().
            snapshotChanges().subscribe(response => {
                let carona = [];
                response.forEach(element => {
                    let y = element.payload.toJSON();
                    y['key'] = element.key;
                    carona.push(y as Carona);
                });
                this.caronas = carona;
                // console.log(this.caronas);
                
            });
    }

    cadastrarCarona()
    {
        this.navCtrl.push(CadastroCaronaPage, { usuario: this.usuario });
    }

    detalharCarona(carona: Carona)
    {
        this.navCtrl.push(DetalheCaronaPage, { carona: carona, usuario: this.usuario });
    }

    abrir(){
        alert(JSON.stringify(this.caronas));
    }

}

