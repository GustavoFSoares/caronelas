//---------------Angular----------------------------
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

//---------------PAGES------------------------------
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from "../pages/perfil/perfil";
import { ListagemCaronasPage } from "../pages/listagem-caronas/listagem-caronas";
import { FormCaroneira } from "../pages/form/caroneira/caroneira";
import { FormMotorista } from "../pages/form/motorista/motorista";
import { MapsPage } from "../pages/maps/maps";
import { DetalheCaronaPage } from "../pages/detalhe-carona/detalhe-carona";
import { AvaliacaoCaronaPage } from "../pages/avaliacao-carona/avaliacao-carona";

//---------------Ionic------------------------------
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Ionic2RatingModule } from 'ionic2-rating';

// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//-----------Firebase Modules-----------------------
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//-----------Services-------------------------------
import { AuthService } from "../provider/auth/auth.service";
import { CaroneiraFormService } from "../provider/dao/caroneira-service";
import { MotoristaFormService } from "../provider/dao/motorista-service";
import { FormService } from "../domain/form/form-service";

var firebaseConfig = {
    apiKey: "AIzaSyDuwkiVgKO9GbVW3ouX2qKI77mneHmdeHM",
    authDomain: "caronelas-1351b.firebaseapp.com",
    databaseURL: "https://caronelas-1351b.firebaseio.com",
    projectId: "caronelas-1351b",
    storageBucket: "",
    messagingSenderId: "228514860880"
};

// ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="1892966300921138" --variable APP_NAME="Caronelas"

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage,
        ListagemCaronasPage,
        PerfilPage, 
        FormCaroneira,
        FormMotorista,
        MapsPage,
        DetalheCaronaPage,
        AvaliacaoCaronaPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        HttpModule,
        Ionic2RatingModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        LoginPage,
        ListagemCaronasPage,
        PerfilPage,
        FormCaroneira,
        FormMotorista,
        MapsPage,
        DetalheCaronaPage,
        AvaliacaoCaronaPage,
    ],
    providers: [
        StatusBar, 
        SplashScreen, 
        { provide: ErrorHandler, useClass: IonicErrorHandler }, 
        AuthService, 
        Facebook, 
        FormService,
        CaroneiraFormService,
        MotoristaFormService,
    ]
})
export class AppModule {}
