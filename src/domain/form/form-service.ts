import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs'; 

@Injectable()
export class FormService {

    headers: Headers;
    url: "";

    constructor(private _http: Http){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    public timestampToDate(timestamp = 1508201805){
        let date = new Date(timestamp*1000);
        return date.toLocaleDateString("pt-BR");
    }

    public dateToTimestamp(date = new Date(2017, 10, 16)){
        let timestamp = date;
        return timestamp.getTime();
    }

}