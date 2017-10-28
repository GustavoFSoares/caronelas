import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormCaroneira } from './caroneira';

@NgModule({
    declarations: [
        FormCaroneira,
    ],
    imports: [
        IonicPageModule.forChild(FormCaroneira),
    ],
})
export class CaroneiraPageModule { }
