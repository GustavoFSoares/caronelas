import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormMotorista } from './motorista';

@NgModule({
    declarations: [
        FormMotorista,
    ],
    imports: [
        IonicPageModule.forChild(FormMotorista),
    ],
})
export class MotoristaPageModule {}
