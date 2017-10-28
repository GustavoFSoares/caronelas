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

    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private afAuth: AngularFireAuth
    ) {

        const authObserver = afAuth.authState.subscribe(user => {
            this.displayName = '';
            this.imgUrl = '';
            
            if (user) {
                this.displayName = user.displayName;
                this.imgUrl = user.photoURL;
                authObserver.unsubscribe();
            }
        });
    }

    public signOut() {
        this.authService.signOut()
            .then(() => {
                this.navCtrl.parent.parent.setRoot(LoginPage);
            }).catch((error) => {
                console.error(error);
            });
    }
}