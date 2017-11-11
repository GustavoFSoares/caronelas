import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from "../../domain/usuario/usuario";
@IonicPage()
@Component({
    selector: 'page-detalhe-carona',
    templateUrl: 'detalhe-carona.html',
})
export class DetalheCaronaPage {

    public usuario: Usuario;
    constructor(public navCtrl: NavController, public navParams: NavParams) { 
        this.usuario = this.navParams.get('usuario')
    }

}
