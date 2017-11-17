import { Component } from '@angular/core';
import { NavController, Modal, ModalController } from 'ionic-angular';

import { AuthService } from "../../provider/auth/auth.service";

import { FormCaroneira } from "../form/caroneira/caroneira";
import { FormMotorista } from "../form/motorista/motorista";
import { UsuarioMasculinoPage } from "../usuario-masculino/usuario-masculino";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public informacoesPreCarregadas: any;

    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        private _authService: AuthService,
    ) {
        this.informacoesPreCarregadas = this._authService.informacoesUsuario;
        this.informacoesPreCarregadas = {
            gender: "male",
            name: "Gustavo Soares",
            email: "gustavo10.fsoares@gmail.com",
        };
        
        // if (this._authService.sexo == "male"){
        if (this.informacoesPreCarregadas.gender == "male"){
            let profileModal: Modal = this.modalCtrl.create(UsuarioMasculinoPage);
            profileModal.present();
        }
        
     }

    selecionarTipo(tipo) {
        let novoLogin = this.isNovoLogin();
        if (novoLogin) {
            switch (tipo) {
                case "caroneira":
                    this.navCtrl.push(FormCaroneira, { informacoesUsuario: this.informacoesPreCarregadas });
                    break;

                case "motorista":
                    this.navCtrl.push(FormMotorista, { informacoesUsuario: this.informacoesPreCarregadas });
                    break;
            }
        } else {
            //outras paginas
        }
    }

    isNovoLogin() {
        return true;
    }
}