import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MapsPage } from "../../maps/maps";

@IonicPage()
@Component({
    selector: 'page-cadastro-carona',
    templateUrl: 'cadastro-carona.html',
})
export class CadastroCaronaPage {

    // public mapa
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) { }

    abrirMapa() {
        let profileModal = this.modalCtrl.create(MapsPage);
        profileModal.onDidDismiss(data => {
            console.log(data);
        });
        profileModal.present();
    }

}
