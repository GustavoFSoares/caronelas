import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

@Injectable()
export class AuthService {
    
    constructor(private _facebook: Facebook, private _angularFireAuth: AngularFireAuth){ }

    signInFacebook(){
        return this._facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                //this.facebook.api() paga pegar mais dados
                return this._angularFireAuth.auth.signInWithCredential(
                    firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
                )}, err => {
                    console.log(err);
            });
    }

    signOut(){
        return this._facebook.logout()
            .then( () => { 
                return this._angularFireAuth.auth.signOut();
            }, err => {
                console.log(err);
            });
    }

    dadosFacebook(){
        return this._facebook.api('/me', ["user_about_me"])
            .then((res: any) => {
                console.log(res);
                return res;
            }, err => {
                console.log(err); 
            });   
    }
}