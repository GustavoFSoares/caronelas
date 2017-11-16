import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioMasculinoPage } from './usuario-masculino';

@NgModule({
    declarations: [
       UsuarioMasculinoPage,
    ],
    imports: [
        IonicPageModule.forChild(UsuarioMasculinoPage),
    ],
})
export class UsuarioMasculinoPageModule { }