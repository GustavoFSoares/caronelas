import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

declare var google: any;
@IonicPage()
@Component({
    selector: 'map',
    templateUrl: 'maps.html',
})
export class MapsPage {

    @ViewChild('map') mapRef:ElementRef;

    constructor(public navParams: NavParams, private _viewCtrl: ViewController) {
        console.log(navigator.geolocation);
     }

    ngOnInit() {
        this.mostrarMapa();
    }

    fecharModal(local?, salvo = false){
        this._viewCtrl.dismiss({local, salvo});
    }

    mostrarMapa(){
        const location = new google.maps.LatLng('-29.8355189', '-51.1241391');

        const options = {
            center:location,
            zoom:17,
            streetViewControl:false,
            mapTypeId:'roadmap',
        };

        const map = new google.maps.Map(this.mapRef.nativeElement, options);

        this.adicionarMarcador(location, map);
    }

    adicionarMarcador(position, map){
        return new google.maps.Marker({
            position, 
            map
        });
    }

    salvarLocal(){
        let local = { lat: '-29.8355189', lon: '-51.1241391' };
        this.fecharModal(local, true);
    }

    getPosicao(){
        console.log(navigator.geolocation);
        
    }
}
