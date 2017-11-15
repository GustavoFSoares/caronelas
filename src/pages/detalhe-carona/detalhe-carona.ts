import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from "../../domain/usuario/usuario";
import { Carona } from "../../domain/carona/carona";
@IonicPage()
@Component({
    selector: 'page-detalhe-carona',
    templateUrl: 'detalhe-carona.html',
})
export class DetalheCaronaPage {

    public usuario: Usuario;
    public carona: Carona;

constructor(public navCtrl: NavController, public navParams: NavParams) { 
        this.usuario = this.navParams.get('usuario');
        this.carona = this.navParams.get('carona');
    }

    ngOnInit(){
        console.log(this.carona);
        console.log(this.usuario);
    }
}
