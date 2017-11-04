import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Caroneira } from "../../../domain/usuario/caroneira";
import { UsuarioService } from "../../../provider/dao/usuario-service";
// import { FormService } from "../../../domain/form/form-service";
import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";

@IonicPage()
@Component({
    selector: 'page-caroneira',
    templateUrl: 'caroneira.html',
})
export class FormCaroneira 
{
    public caroneira: AngularFireList<Caroneira>
    private _alert: Alert;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        private _caroneiraService: UsuarioService,
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

    ngOnInit(){
        let x = this._caroneiraService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                usuario.push(y as Caroneira);
            });
            // console.log(usuario);
            
        })
    }

    cadastrar(form: NgForm) {
        if (form.value.sexo == "homem") {
            this._alert.present();
        }
        this._caroneiraService.save(form.value);   
        // this.navCtrl.push(ListagemCaronasPage);
    }

}
