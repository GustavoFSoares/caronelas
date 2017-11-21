import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireList } from "angularfire2/database";

import { Usuario } from "../../../domain/usuario/usuario";
import { Carona, Trajeto } from "../../../domain/carona/carona";
import { CaronaService } from "../../../provider/dao/caronas-service";

import { MapsPage } from "../../maps/maps";
import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
import { Motorista } from '../../../domain/usuario/condutor';
@IonicPage()
@Component({
    selector: 'page-cadastro-carona',
    templateUrl: 'cadastro-carona.html',
})
export class CadastroCaronaPage {

    public usuario: Motorista;
    public carona: Carona = new Carona();
    public trajeto: Trajeto = new Trajeto();

    public retorno_origem: boolean = false;
    public retorno_destino: boolean = false;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private _caronaService: CaronaService,
    ) {
        this.usuario = this.navParams.get('usuario');
        console.log(this.usuario);

        if (this.usuario.tipo == "caroneira"){
            let caroneiras = [];
            caroneiras.push(this.usuario, this._caronaService.carona.caroneiras);
            this._caronaService.carona.caroneiras = caroneiras;
        } else if (this.usuario.tipo == "motorista"){
            this._caronaService.carona.motorista = this.usuario;
        }
    }

    ngOnInit() {
        let x = this._caronaService.getData();
        x.snapshotChanges().subscribe(carona => {
            let caronas = [];
            console.log(carona);
            
            carona.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                caronas.push(y as Carona);
            });
            // console.log(usuario);
        });
    }

    abrirMapa(forma) {
        let profileModal = this.modalCtrl.create(MapsPage);
        profileModal.onDidDismiss((data) => {
            
            if(forma == 'origem'){
                this._caronaService.carona.trajeto.local_origem = data.local;
                this.retorno_origem = data.salvo;
            } else if(forma == 'destino'){
                this._caronaService.carona.trajeto.local_destino = data.local;
                this.retorno_destino = data.salvo;
            }

        });
        profileModal.present();
    }

    cadastrarCarona(){
        this._caronaService.save(this._caronaService.carona);
        // this.navCtrl.setRoot(ListagemCaronasPage, { caroneira: this.usuario });
    }

}
