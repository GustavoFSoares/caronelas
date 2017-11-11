import { Component } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams} from 'ionic-angular';

import { Carona } from "../../domain/carona/carona";
import { Carro } from "../../domain/usuario/condutor";
import { Usuario } from "../../domain/usuario/usuario";

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
    public motoristas: Usuario[] = [];
    public usuario: Usuario;
    public usuario1;
    // public carro: Carro;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caronaService: CaronaService,
        private _motoristaService: MotoristaFormService,
        public formService: FormService,
    ) {
        if (this.usuario == undefined) {            
            let usuario: Usuario;
            if (this.navParams.get('caroneira') != undefined) {
                usuario = this.navParams.get('caroneira');
            } else {
                usuario = this.navParams.get('condutora');
            }
            this.usuario = usuario;
        }
    }

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

                    motorista.push(y as Usuario);
                });
                this.motoristas = motorista;
            });

        this.usuario1 = {
            carro:{ 
                ano: "2017-11-10T23:10:50.170Z",
                cor : "Marrom",
                marca : "Hyundai",
                modelo : "Galloper 3.0 V6 Super Luxo Aut",
                placa : "LVX-8047",
                renavan : "47103952094",
            },
            cnh: "59636316916",
            cpf : "677.036.700-90",
            email : "ana@gmail.com",
            idade: "19",
            key : "-KycCUAZg9B-KcYYHt56",
            nascimento : "1998-11-07T23:10:50.170Z",
            nome : "Ana",
            telefone : "51999207540",
            tem_cnh : false,
            tipo : "motorista",
        }
    }

    cadastrarCarona()
    {
        this.navCtrl.push(CadastroCaronaPage, { usuario: this.usuario1 });
    }

    detalharCarona(usuario: Usuario)
    {
        this.navCtrl.push(DetalheCaronaPage, { usuario: usuario });
    }

    abrir(){
        alert(JSON.stringify(this.motoristas));
    }

}

