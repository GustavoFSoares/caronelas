import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroCaronaPage } from './cadastro-carona';

@NgModule({
    declarations: [
        CadastroCaronaPage,
    ],
    imports: [
        IonicPageModule.forChild(CadastroCaronaPage),
    ],
})
export class CadastroCaronaPageModule { }
