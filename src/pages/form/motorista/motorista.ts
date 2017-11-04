import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Motorista, Carro } from "../../../domain/usuario/motorista";
import { MotoristaFormService } from "../../../provider/dao/motorista-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-motorista',
    templateUrl: 'motorista.html',
})
export class FormMotorista 
{
    public motorista: AngularFireList<Motorista>
    private _alert: Alert;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private _motoristaService: MotoristaFormService,
    ) {
        this._alert = this.alertCtrl.create({
            title: "Aviso!",
            subTitle: "Tem certeza que deseja fazer isso?",
            message: "Esse aplicativo é voltado para o público feminino.",
            buttons: [
                { text: "Sair", handler: () => console.log("Saindo da plataforma") },
                { text: "Desejo estragar a plataforma", handler: () => console.log("Sendo PNC") }
            ]
        });
    }

    ngOnInit() {
        let x = this._motoristaService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                usuario.push(y as Motorista);
            });
            // console.log(usuario);
        });
    }

    cadastrar(form: NgForm) {
        if (form.value.sexo == "homem") {
            this._alert.present();
        }
        
        let motorista = {
            "cpf": form.value.cpf,
            "cnh": form.value.cnh,
            "email": form.value.email,
            "key": form.value.key,
            "nascimento": form.value.nascimento,
            "nome": form.value.nome,
            "sexo": form.value.sexo,
            "telefone": form.value.telefone,
            "tem_cnh": form.value.tem_cnh
        } 

        let carro = {
            "ano": form.value.ano,
            "cor": form.value.cor,
            "placa": form.value.placa,
            "renavan": form.value.renavan,
        }
        
        this._motoristaService.save(motorista, carro);
        this.navCtrl.setRoot(ListagemCaronasPage);
    }
}
