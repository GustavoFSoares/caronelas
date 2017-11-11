import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Usuario } from "../../../domain/usuario/usuario";
import { CaroneiraFormService } from "../../../provider/dao/caroneira-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-caroneira',
    templateUrl: 'caroneira.html',
})
export class FormCaroneira 
{
    // public caroneiro: AngularFireList<Usuario>
    private _alert: Alert;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private _caroneiraService: CaroneiraFormService,
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

        this._caroneiraService.caroneira.tipo = "caroneira";
    }

    ngOnInit(){
        let x = this._caroneiraService.getData();
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
        
        let caroneira = {         
            "key": form.value.key,
            "nome": form.value.nome,
            "telefone": form.value.telefone,
            "cpf": form.value.cpf,
            "email": form.value.email,
            "nascimento": form.value.nascimento,
            "tipo": form.value.tipo,
        }
        
        this._caroneiraService.save(caroneira);
        this.navCtrl.setRoot(ListagemCaronasPage, {caroneira: caroneira});
    }

}
