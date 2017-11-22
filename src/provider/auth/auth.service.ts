import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Http } from '@angular/http';
import { Observable } from 'rxjs'; 

@Injectable()
export class AuthService {
    
    public informacoesUsuario = null;

    private _token;

    constructor(
        private _facebook: Facebook,
        private _angularFireAuth: AngularFireAuth,
        private _http: Http,
        private _db: AngularFireDatabase,
    ){ 
        this._token = this.tokenDeAcesso;
    }

    signInFacebook(){
        return this._facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {

                this._facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
                    this._facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large),gender', ['public_profile', 'email']).then(profile => {
                        this.informacoesUsuario = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'], gender: profile['gender'] }
                    });
                    
                });

                return this._angularFireAuth.auth.signInWithCredential(
                    firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
                ).catch(err => "Erro ao Efetuar Login")});
    }

    signOut(){
        return this._facebook.logout()
            .then( () => this._angularFireAuth.auth.signOut() , err => console.log(err) );
    }

    get tokenDeAcesso(){
        return this._angularFireAuth.authState.subscribe( (res) => {
            res.getToken()
                .then( (token) => token )
        });
    }

    verificaUsuarioExistente(tipoUsuario, udi){
        return this._db.database
            .ref("usuario")
            .child(tipoUsuario)
            .child(udi);
    }

}