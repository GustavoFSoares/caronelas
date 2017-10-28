import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormCaroneira } from "../form/caroneira/caroneira";
import { FormMotorista } from "../form/motorista/motorista";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) { }

    selecionarTipo(tipo) {
        let novoLogin = this.isNovoLogin();
        novoLogin = true;
        if (novoLogin) {
            switch (tipo) {
                case "caroneira":
                    this.navCtrl.push(FormCaroneira, { novoLogin: novoLogin });
                    break;

                case "motorista":
                    this.navCtrl.push(FormMotorista, { novoLogin: novoLogin });
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