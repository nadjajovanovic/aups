import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { RadnoMesto } from "../models/radnomesto";
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

    form: FormGroup = new FormGroup({
        $transportid: new FormControl(null),
        datumt: new FormControl(new Date()),
        lokacija: new FormControl(''),
        vrstatransporta: new FormControl('')
    });
}