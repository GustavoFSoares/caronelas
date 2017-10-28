import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Alert } from 'ionic-angular';

import { Usuario, Carro } from "../../../domain/usuario/usuario";
// import { FormService } from "../../../domain/form/form-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-motorista',
    templateUrl: 'motorista.html',
})
export class FormMotorista 
{
    public usuario: Usuario;
    public carro: Carro;

    private _alert: Alert;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
    ) {
        this.usuario = new Usuario();
        this.carro = new Carro();

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

    cadastrar() {
        if (this.usuario.sexo == "homem") {
            this._alert.present();
        }

        console.log(this.carro);
        console.log(this.usuario);
        this.navCtrl.push(ListagemCaronasPage);
    }
}
