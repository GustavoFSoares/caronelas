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
        if (this._authService.sexo == "male"){
            let profileModal = this.modalCtrl.create(UsuarioMasculinoPage);
            profileModal.present();
        }

        this.informacoesPreCarregadas = this._authService.informacoesUsuario;
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