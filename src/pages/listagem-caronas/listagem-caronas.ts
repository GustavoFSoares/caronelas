import { Component } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { Carona } from "../../domain/carona/carona";
import { ListagemCaronaService } from "../../provider/dao/listagem-caronas-service";
@IonicPage()
@Component({
    selector: 'page-listagem-caronas',
    templateUrl: 'listagem-caronas.html',
})
export class ListagemCaronasPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _listagemCaronaService: ListagemCaronaService,
    ) { }

    ngOnInit() {
        let x = this._listagemCaronaService.getData();
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
}
