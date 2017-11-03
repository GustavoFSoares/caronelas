import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Http } from '@angular/http';
import { Observable } from 'rxjs'; 

@Injectable()
export class AuthService {
    
    public informacoesUsuario;
    public url: string = "https://graph.facebook.com/me?";

    private _token;

    constructor(
        private _facebook: Facebook,
        private _angularFireAuth: AngularFireAuth,
        private _http: Http,
    ){ 
        this._token = this.tokenDeAcesso;
        this.informacoesUsuario = this.buscarDadosUsuario()
    }

    signInFacebook(){
        return this._facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                return this._angularFireAuth.auth.signInWithCredential(
                    firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)                  // firebase.auth.FacebookAuthProvider.credential
                )}, err => console.log(err) );
    }

    signOut(){
        return this._facebook.logout()
            .then( () => this._angularFireAuth.auth.signOut() , err => console.log(err) );
    }

    buscarDadosUsuario(): Observable<FacebookLoginResponse> {
        let uri = `http://${this.url}access_token=${this._token}`/*fields=gender,name*/;
        // let uri = "http://graph.facebook.com/me?access_token=EAAa5pIZCwLTIBAInQ59i1RjMtoeF1ks0fZA1vVcnvn95OZAqgSoT2iFRHeNbvwgcNxZCeBqgL2o8Wq3FnSYl4UT7YuZAu7D1h26JK4BaFR4bDLAnNGSzqwFmR7FemMskGni4vMVU5OZCu0p2xZBvPGRQDzy2Q9mKSZBUuoGpDWZAGdRrweutdBDRZAJzZCntZCGH8kJeGCvJteSf2gZDZD";
        return this._http.get(uri)
            .map( res => res.json(), err => console.log(err) )
            // .subscribe(res => res, erro => console.log(erro));
            
    }

    get tokenDeAcesso(){
        return this._angularFireAuth.authState.subscribe( (res) => {
            res.getToken()
                .then( (token) => token )
        });
    }

    get informacoesUsuarioLogado() {
        return this.informacoesUsuario;
    }
}