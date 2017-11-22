import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from "../provider/auth/auth.service";

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";
import { ListagemCaronasPage } from "../pages/listagem-caronas/listagem-caronas";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    // rootPage:any = TabsPage;
    // rootPage:any = LoginPage;
    rootPage: any = ListagemCaronasPage;


    @ViewChild(Nav)
    public nav: Nav;

    public paginas = [
        { titulo: "Login", componente: LoginPage },
        { titulo: "HomePage", componente: HomePage }
    ];
    
    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private _authService: AuthService
    ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    abrePagina(pagina) {
        this.nav.push(pagina.componente)
    }

    sair(){
        this._authService.signOut();
        this.nav.setRoot(LoginPage);
    }
}
