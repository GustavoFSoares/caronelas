import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Motorista } from "../../domain/usuario/motorista";
@IonicPage()
@Component({
    selector: 'page-detalhe-carona',
    templateUrl: 'detalhe-carona.html',
})
export class DetalheCaronaPage {

    public motorista: Motorista;
    constructor(public navCtrl: NavController, public navParams: NavParams) { 
        this.motorista = this.navParams.get('motorista')
    }

}
