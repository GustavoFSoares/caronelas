import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthService } from '../../app/provider/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
})
export class PerfilPage {
    displayName: string;
    imgUrl: string;

    public info: object = {};
    constructor(
        public navCtrl: NavController,
        private _authService: AuthService,
        private _afAuth: AngularFireAuth
    ) {

        const authObserver = this._afAuth.authState.subscribe(user => {
            this.displayName = '';
            this.imgUrl = '';
            
            if (user) {
                this.displayName = user.displayName;
                this.imgUrl = user.photoURL;
                authObserver.unsubscribe();
            }
        });
    }

    signOut() {       
        return this._authService.signOut()
            .then(() => {
                this.navCtrl.setRoot(LoginPage)
            });
    }

    capturarDados(){
        return this._authService.dadosFacebook()
            .then((res) => {
                this.info = res;
            });
        
    }
}