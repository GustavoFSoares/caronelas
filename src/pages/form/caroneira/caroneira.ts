import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _caroneiraService: CaroneiraFormService,
        public formService: FormService,
    ) {
        this._caroneiraService.caroneira.tipo = "caroneira";
    }

    ngOnInit(){
        let x = this._caroneiraService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                y['key'] = element.key;
                y['idade'] = this.formService.getIdade(y['nascimento']);
                usuario.push(y as Usuario);
            });
            // console.log(usuario);
        });
    }

    cadastrar(form: NgForm) {
        
        let caroneira = {         
            "key": form.value.key,
            "nome": form.value.nome,
            "telefone": form.value.telefone,
            "cpf": form.value.cpf,
            "email": form.value.email,
            "nascimento": form.value.nascimento,
            "idade": this.formService.getIdade(form.value.nascimento),
            "tipo": form.value.tipo,
        }
        
        this._caroneiraService.save(caroneira);
        this.navCtrl.setRoot(ListagemCaronasPage, {caroneira: caroneira});
    }

}
