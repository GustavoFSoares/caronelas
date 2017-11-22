import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Motorista } from "../../../domain/usuario/condutor";
import { MotoristaFormService } from "../../../provider/dao/motorista-service";
import { FormService } from "../../../domain/form/form-service";
import { AuthService } from "../../../provider/auth/auth.service";

import { ListagemCaronasPage } from "../../listagem-caronas/listagem-caronas";
@IonicPage()
@Component({
    selector: 'page-motorista',
    templateUrl: 'motorista.html',
})
export class FormMotorista 
{
    // public motorista: AngularFireList<Motorista>;
    public informacoesUsuario: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formService: FormService,
        private _angularFireAuth: AngularFireAuth,
        private _motoristaService: MotoristaFormService,
        private _authService: AuthService,
    ) {
        this._motoristaService.motorista.tipo = "motorista";
        this.informacoesUsuario = this.navParams.get('informacoesUsuario');
        
        this._motoristaService.motorista.nome = this.informacoesUsuario.username;
        this._motoristaService.motorista.email = this.informacoesUsuario.email;
        this._motoristaService.motorista.foto = this.informacoesUsuario.picture;
        
        const authObserver = this._angularFireAuth.authState.subscribe(user => {
            if (user) {
                this._motoristaService.motorista.key = user.uid;
                this._motoristaService.motorista.telefone = user.phoneNumber;
                authObserver.unsubscribe();
            }
        });
        
        alert(this.usuarioExistente());
    }

    ngOnInit() {
        let x = this._motoristaService.getData();
        x.snapshotChanges().subscribe(user => {
            let usuario = [];
            user.forEach(element => {
                let y = element.payload.toJSON();
                // y['key'] = element.key;
                y['idade'] = this.formService.getIdade(y['nascimento']);
                usuario.push(y as Motorista);
            });
        });
    }

    cadastrar(form: NgForm) {
        this._motoristaService.motorista.idade = this.formService.getIdade(this._motoristaService.motorista.nascimento);
        this._motoristaService.motorista.status = "novo";
    
        this._motoristaService.save(this._motoristaService.motorista);
        this.navCtrl.setRoot(ListagemCaronasPage, { usuario: this._motoristaService.motorista});
    }

    usuarioExistente(){
        let logado = this._authService.verificaUsuarioExistente("motorista", this._motoristaService.motorista.key);
        return JSON.stringify(logado);
    }
}
