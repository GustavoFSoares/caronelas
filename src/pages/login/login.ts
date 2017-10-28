import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavController, ToastController } from 'ionic-angular';

import { HomePage } from "../home/home";
import { PerfilPage } from "../perfil/perfil";
import { AuthService } from "../../app/provider/auth/auth.service";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild('form') form: NgForm;
    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private toastCtrl: ToastController
    ) { }

    // ionic plugin add cordova-plugin-facebook4 --variable APP_ID="1892966300921138" --variable APP_NAME="Caronelas"
    loginWithFacebook() {
        this.authService.signInFacebook()
            .then(() => {
                console.log(this);
                this.navCtrl.setRoot(PerfilPage);
                // this.navCtrl.setRoot(HomePage);
            })
            .catch((error) => {
                this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
                    .present();
            });

    }


}
