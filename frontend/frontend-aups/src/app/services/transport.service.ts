import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Transport } from "../models/transport";

@Injectable({
    providedIn: 'root'
})
export class TransportService {

    private readonly transportUrl = 'http://localhost:8083/transport/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllTransporte(): Observable<Transport[]> {
        return this.httpClient.get<Transport[]>(this.transportUrl);
    }

    public addTransport(data: any) {
        return this.httpClient.post<any>(this.transportUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateTransport(data: any) {
        return this.httpClient.put(this.transportUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteTransport(transportid: number) {
        return this.httpClient.delete(this.transportUrl + transportid)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    /*public addTransport(data : Transport) {
        return this.httpClient.post(this.transportUrl, data);
    }

    public updateTransport(data : Transport) {
        return this.httpClient.put(this.transportUrl, data);
    }

    public deleteTransport(transportid: number) {
        return this.httpClient.delete(this.transportUrl + transportid);;
    }*/

    form: FormGroup = new FormGroup({
        $transportid: new FormControl(null),
        datumt: new FormControl(''),
        lokacija: new FormControl(''),
        vrstatransporta: new FormControl('')
    });
}