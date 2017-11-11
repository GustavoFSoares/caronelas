import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Usuario } from "../../../domain/usuario/usuario";
import { MotoristaFormService } from "../../../provider/dao/motorista-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-motorista',
    templateUrl: 'motorista.html',
})
export class FormMotorista 
{
    public motorista: AngularFireList<Usuario>
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

        this._motoristaService.motorista.tipo = "motorista";
        console.log(this._motoristaService.carro);
        
    }

    ngOnInit() {
        let x = this._motoristaService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                usuario.push(y as Usuario);
            });
            // console.log(usuario);
        });
    }

    cadastrar(form: NgForm) {
        if (form.value.sexo == "homem") {
            this._alert.present();
        }
        
        let motorista = {
            "key": form.value.key,
            "nome": form.value.nome,
            "telefone": form.value.telefone,
            "cpf": form.value.cpf,
            "email": form.value.email,
            "nascimento": form.value.nascimento,
            "tipo": form.value.tipo,
            "cnh":form.value.cnh,
            "tem_cnh": form.value.tem_cnh
        } 

        let carro = {
            "ano": form.value.ano,
            "cor": form.value.cor,
            "placa": form.value.placa,
            "renavan": form.value.renavan,
            "marca": form.value.marca,
            "modelo": form.value.modelo,
        }
        
        let condutora = {motorista, carro};
        this._motoristaService.save(motorista, carro);
        this.navCtrl.setRoot(ListagemCaronasPage, {condutora: condutora});
    }
}
