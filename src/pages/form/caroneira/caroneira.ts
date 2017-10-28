import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Usuario } from "../../../domain/usuario/usuario";
import { FormService } from "../../../domain/form/form-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
  selector: 'page-caroneira',
  templateUrl: 'caroneira.html',
})
export class FormCaroneira 
{
    public usuario: Usuario;
    private _alert: Alert;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
    ) {
        this.usuario = new Usuario();

        this._alert = this.alertCtrl.create({
            title: "Aviso!",
            subTitle: "Tem certeza que deseja fazer isso?",
            message: "Esse aplicativo é voltado para o público feminino.",
            buttons: [
                { text: "Sair", handler: () => console.log("Saindo da plataforma") },
                { text: "Desejo estragar a plataforma", handler: () => console.log("Sendo PNC") }
            ]
        });
    }

    cadastra() {
        if (this.usuario.sexo == "homem") {
            this._alert.present();
        }
        this.navCtrl.push(ListagemCaronasPage);
        console.log(this.usuario);
    }

}
