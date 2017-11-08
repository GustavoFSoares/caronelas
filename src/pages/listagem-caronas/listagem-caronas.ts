import { Component } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { Carona } from "../../domain/carona/carona";
import { CaronaService } from "../../provider/dao/caronas-service";
import { CadastroCaronaPage } from "../form/cadastro-carona/cadastro-carona";
@IonicPage()
@Component({
    selector: 'page-listagem-caronas',
    templateUrl: 'listagem-caronas.html',
})
export class ListagemCaronasPage 
{

    // public 
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caronaService: CaronaService,
    ) { }

    ngOnInit() 
    {
        let x = this._caronaService.getData();
        x.snapshotChanges().subscribe(user => {
            let carona = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                carona.push(y as Carona);
            });
            // console.log(carona);
        });
    }

    adicionarCarona()
    {
        this.navCtrl.push(CadastroCaronaPage);
    }
}
