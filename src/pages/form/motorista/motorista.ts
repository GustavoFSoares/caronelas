import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Usuario } from "../../../domain/usuario/usuario";
import { MotoristaFormService } from "../../../provider/dao/motorista-service";
import { FormService } from "../../../domain/form/form-service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-motorista',
    templateUrl: 'motorista.html',
})
export class FormMotorista 
{
    public motorista: AngularFireList<Usuario>

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _motoristaService: MotoristaFormService,
        public formService: FormService,
    ) {
        this._motoristaService.motorista.tipo = "motorista";        
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
        });
    }

    cadastrar(form: NgForm) {
        let motorista = {
            "key": form.value.key,
            "nome": form.value.nome,
            "telefone": form.value.telefone,
            "cpf": form.value.cpf,
            "email": form.value.email,
            "nascimento": form.value.nascimento,
            "idade": this.formService.getIdade(form.value.nascimento),
            "tipo": form.value.tipo,
            "cnh":form.value.cnh,
            "tem_cnh": form.value.tem_cnh,
            "carro": {
                "ano": form.value.ano,
                "cor": form.value.cor,
                "placa": form.value.placa,
                "renavan": form.value.renavan,
                "marca": form.value.marca,
                "modelo": form.value.modelo,
            }
        }

        this._motoristaService.save(motorista);
        this.navCtrl.setRoot(ListagemCaronasPage, { condutora: motorista});
    }
}
