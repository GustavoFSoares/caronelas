import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';

import { CaronaService } from "../../provider/dao/caronas-service";
import { FormService } from "../../domain/form/form-service";

import { Usuario } from "../../domain/usuario/usuario";
import { Carona } from "../../domain/carona/carona";

import { ListagemCaronasPage } from '../listagem-caronas/listagem-caronas';
@IonicPage()
@Component({
    selector: 'page-detalhe-carona',
    templateUrl: 'detalhe-carona.html',
})
export class DetalheCaronaPage {

    public usuario;
    public carona: Carona;
    public caroneiras;

    public quantidade;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caronaService: CaronaService,
        public formService: FormService,
        private _alertCtrl: AlertController,
    ) { 
        this.usuario = this.navParams.get('usuario');
        this.carona = this.navParams.get('carona');
        this.caroneiras = this.formService.conversorObjetoParaArray(this.carona.caroneiras);
        
        if (this.carona.ocupacao){
            this.quantidade = this.carona.ocupacao;
        } else {
            this.quantidade = 0;
        }
        
        this.verificaLotacao();        
        
    }

    ngOnInit(){
        this._caronaService.getData().
            snapshotChanges().subscribe(response => {
                let carona = [];
                response.forEach(element => {
                    let y = element.payload.toJSON();
                    y['key'] = element.key;
                    carona.push(y as Carona);
                });
                // console.log(carona);
            });
    }

    solicitarCarona(){
        let carona = this.inserirCaroneira(this.carona, this.usuario, "esperando");
        this._caronaService.save(carona);
    }

    inserirCaroneira(carona: Carona, usuario: Usuario, status = this.carona.status){
        
        let listaCaroneiras = [];
        let caroneiras = this.formService.conversorObjetoParaArray(carona.caroneiras);
        
        caroneiras.forEach(caroneira => {
            listaCaroneiras.push(caroneira);
        });
        
        listaCaroneiras.push(usuario);
        
        return {
            key: carona.key,
            motorista: carona.motorista,
            status: status,
            trajeto: carona.trajeto,
            caroneiras: listaCaroneiras,
            ocupacao: listaCaroneiras.length,
        }
    }

    verificaLotacao(){
        if (this.carona.ocupacao >= 4) {
            let alert: Alert = this._alertCtrl.create({
                title: "Carona Lotada",
                subTitle: "Sentimos muito mas esta carona está lotada",
                message: "Você poderá entrar em outra carona próxima a você!",
                buttons: ["OK"],
            });
            alert.present();
            this.navCtrl.setRoot(ListagemCaronasPage);
        }
    }
}
