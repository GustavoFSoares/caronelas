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
    public posicao: object;

    constructor(public navParams: NavParams, private _viewCtrl: ViewController) {
        // console.log(navigator.geolocation);

     }

    ngOnInit() {
        this.mostrarMapa();
    }

    fecharModal(local?, salvo = false){
        this._viewCtrl.dismiss({local, salvo});
    }

    mostrarMapa(){
        // const location = new google.maps.LatLng('-29.8355189', '-51.1241391');

        const options = {
            zoom:17,
            streetViewControl:false,
            mapTypeId:'roadmap',
        };

        const map = new google.maps.Map(this.mapRef.nativeElement, options);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Hello World!'
                });
                
                google.maps.event.addListener(map, 'click', event => {
                    placeMarker(event.latLng);
                    pos.lat = event.latLng.lat();
                    pos.lng = event.latLng.lng();
                    
                    this.posicao = pos;
                 });
                
                 function placeMarker(location) {
                    marker.setPosition(location);
                 }
                map.setCenter(pos);
            });
        }
        this.adicionarMarcador(location, map);
        
    }

    adicionarMarcador(position, map){
        return new google.maps.Marker({
            position, 
            map
        });
        
    }

    salvarLocal(){
        this.fecharModal(this.posicao, true);
    }

    getPosicao(){
        console.log(navigator.geolocation);
        
    }
}
