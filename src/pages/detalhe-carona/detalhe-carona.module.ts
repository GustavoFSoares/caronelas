import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheCaronaPage } from './detalhe-carona';

@NgModule({
    declarations: [
        DetalheCaronaPage,
    ],
    imports: [
        IonicPageModule.forChild(DetalheCaronaPage),
    ],
})
export class DetalheCaronaPageModule {}
