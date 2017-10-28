import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemCaronasPage } from './listagem-caronas';

@NgModule({
  declarations: [
    ListagemCaronasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemCaronasPage),
  ],
})
export class ListagemCaronasPageModule {}
