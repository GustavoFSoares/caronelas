import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-detalhe-carona',
    templateUrl: 'detalhe-carona.html',
})
export class DetalheCaronaPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetalheCaronaPage');
    }

}
