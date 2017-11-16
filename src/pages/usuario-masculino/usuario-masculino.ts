import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-usuario-masculino',
    templateUrl: 'usuario-masculino.html',
})
export class UsuarioMasculinoPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsuarioMasculinoPage');
    }

}
