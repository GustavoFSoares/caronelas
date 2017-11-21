import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from "../../../domain/usuario/usuario";
import { CaroneiraFormService } from "../../../provider/dao/caroneira-service";
import { FormService } from "../../../domain/form/form-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-caroneira',
    templateUrl: 'caroneira.html',
})
export class FormCaroneira 
{
    // public caroneiro: AngularFireList<Usuario>
    public informacoesUsuario: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formService: FormService,
        private _angularFireAuth: AngularFireAuth,
        private _caroneiraService: CaroneiraFormService,        
    ) {

        this._caroneiraService.caroneira.tipo = "caroneira";
        this.informacoesUsuario = this.navParams.get('informacoesUsuario');

        this._caroneiraService.caroneira.nome = this.informacoesUsuario.username;
        this._caroneiraService.caroneira.email = this.informacoesUsuario.email;
        this._caroneiraService.caroneira.foto = this.informacoesUsuario.picture;
        this._caroneiraService.caroneira.status = "novo";

        const authObserver = this._angularFireAuth.authState.subscribe(user => {
            if (user) {
                this._caroneiraService.caroneira.key = user.uid;
                this._caroneiraService.caroneira.telefone = user.phoneNumber;
                authObserver.unsubscribe();
            }
        });
    }

    ngOnInit(){
        let x = this._caroneiraService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                // y['key'] = element.key;
                y['idade'] = this.formService.getIdade(y['nascimento']);
                usuario.push(y as Usuario);
            });
            // console.log(usuario);
        });
    }

    cadastrar(form: NgForm) {
        this._caroneiraService.save(this._caroneiraService.caroneira);
        this.navCtrl.setRoot(ListagemCaronasPage, {caroneira: this._caroneiraService.caroneira});
    }

}
