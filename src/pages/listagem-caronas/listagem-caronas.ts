import { Component } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { Carona } from "../../domain/carona/carona";
import { Motorista, Carro } from "../../domain/usuario/motorista";

import { FormService } from "../../domain/form/form-service";
import { CaronaService } from "../../provider/dao/caronas-service";
import { MotoristaFormService } from "../../provider/dao/motorista-service";

import { CadastroCaronaPage } from "../form/cadastro-carona/cadastro-carona";
import { DetalheCaronaPage } from "../detalhe-carona/detalhe-carona";
@IonicPage()
@Component({
    selector: 'page-listagem-caronas',
    templateUrl: 'listagem-caronas.html',
})
export class ListagemCaronasPage 
{
    public motoristas: Motorista[] = [];
    // public carro: Carro;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caronaService: CaronaService,
        private _motoristaService: MotoristaFormService,
        public formService: FormService,
    ) { }

    ngOnInit() 
    {
        // let x = this._caronaService.getData();
        // x.snapshotChanges().subscribe(user => {
        //     let carona = [];
        //     user.forEach(element => {
        //         let y = element.payload.toJSON();
        //         y['key'] = element.key;
        //         carona.push(y as Carona);
        //     });
            // console.log(carona);
        // });

        this._motoristaService.getData().
            snapshotChanges().subscribe(response => {
                let motorista = [];
                response.forEach(element => {
                    let y = element.payload.toJSON();
                    y['key'] = element.key;
                    y['idade'] = this.formService.getIdade(y['nascimento']);

                    motorista.push(y as Motorista);
                });
                this.motoristas = motorista;
            });
    }

    adicionarCarona()
    {
        this.navCtrl.push(CadastroCaronaPage);
    }

    detalharCarona(motorista: Motorista)
    {
        this.navCtrl.push(DetalheCaronaPage, { "motorista": motorista });
    }

    abrir(){
        alert(JSON.stringify(this.motoristas));
    }
}
