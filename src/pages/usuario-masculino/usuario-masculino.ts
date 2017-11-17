import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from "../login/login";
import { AuthService } from "../../provider/auth/auth.service";
@IonicPage()
@Component({
    selector: 'page-usuario-masculino',
    templateUrl: 'usuario-masculino.html',
})
export class UsuarioMasculinoPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _authService: AuthService,
    ) { }

    click(){
        console.log("clicou porra");
        // this._authService.signOut();
        this.navCtrl.setRoot(LoginPage);
    }

}
