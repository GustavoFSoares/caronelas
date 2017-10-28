import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

@Injectable()
export class AuthService {
    
    constructor(private facebook: Facebook, private angularFireAuth: AngularFireAuth){ }

    signInFacebook(){
        return this.facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                //this.facebook.api() paga pegar mais dados
                return this.angularFireAuth.auth.signInWithCredential(
                    firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
                )
            }, err => {
                console.log(err);
                return err;
            });
    }

    signOut(){
        if (this.angularFireAuth.auth.currentUser.providerData.length){
            for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++){
                var provider = this.angularFireAuth.auth.currentUser.providerData[i];
                
                //Se for facebook
                if(provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID){
                    //Limpa o auth token e limpa sessão com a conta logada
                    return this.facebook.logout()
                        .then(() =>  {
                            return this.signOutFirebase();
                        });

                }
            }

        }
        return this.signOutFirebase();
    }

    private signOutFirebase(){
        return this.angularFireAuth.auth.signOut();
    }

}