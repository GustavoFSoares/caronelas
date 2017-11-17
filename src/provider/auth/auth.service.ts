import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Http } from '@angular/http';
import { Observable } from 'rxjs'; 

@Injectable()
export class AuthService {
    
    public informacoesUsuario;

    private _token;

    constructor(
        private _facebook: Facebook,
        private _angularFireAuth: AngularFireAuth,
        private _http: Http,
    ){ 
        this._token = this.tokenDeAcesso;
    }

    signInFacebook(){
        return this._facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {

                // this._facebook.api("me?fields=id,name,email,gender,picture.width(720).height.as(picture_large)", [])
                this._facebook.api("me?fields=id,name,email,gender", [])
                    .then(profile => {
                        this.informacoesUsuario = {
                            email: profile['email'],
                            name: profile['name'],
                            gender: profile['gender'],
                            // picture: profile['picture_large']['data']['url'],
                        }
                    })

                return this._angularFireAuth.auth.signInWithCredential(
                    firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)                  // firebase.auth.FacebookAuthProvider.credential
                )}, err => console.log(err) );
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

    get sexo(){
        return this.informacoesUsuario.gender;
    }
}