import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { VrstaTransporta } from "../models/vrstatransporta";

@Injectable({
    providedIn: 'root'
})
export class VrstaTransportaService {

    private readonly vrstaTransportaUrl = 'http://localhost:8083/vrsta-transporta/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllVrsteTransporta(): Observable<VrstaTransporta[]> {
        return this.httpClient.get<VrstaTransporta[]>(this.vrstaTransportaUrl);
    }

    public addVrstuTransporta(data: any) {
        return this.httpClient.post<any>(this.vrstaTransportaUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateVrstuTransporta(data: any) {
        return this.httpClient.put(this.vrstaTransportaUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteVrstuTransporta(vrstatransportaid: number) {
        return this.httpClient.delete(this.vrstaTransportaUrl + vrstatransportaid)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $sastojciid: new FormControl(null),
        nazivs: new FormControl('')
    });
}