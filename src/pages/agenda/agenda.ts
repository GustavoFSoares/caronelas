import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-agenda',
    templateUrl: 'agenda.html',
})
export class AgendaPage {

    public contatosRoot = "ContatosPage";
    public PerfilRoot = "PerfilPage";

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

}
