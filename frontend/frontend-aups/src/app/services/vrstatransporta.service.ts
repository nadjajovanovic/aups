import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { VrstaTransporta } from "../models/vrstatransporta";

@Injectable({
    providedIn: 'root'
})
export class VrstaTransportaService {

    private readonly vrstaTransportaUrl = 'http://localhost:8083/vrsta-transporta/';

    constructor (private httpClient : HttpClient) {}

    getToken() {
        let getToken = JSON.parse(localStorage.getItem('token') as any);
        let token = Object.values(getToken);
        return token;
    }

    getHttpHeaders(token: any) {
        let reqHeaders = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        return reqHeaders;
    }
    
    public getAllVrsteTransporta(): Observable<VrstaTransporta[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<VrstaTransporta[]>(this.vrstaTransportaUrl, {headers: reqHeaders});
    }

    public addVrstuTransporta(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.vrstaTransportaUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateVrstuTransporta(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.vrstaTransportaUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteVrstuTransporta(vrstatransportaid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.vrstaTransportaUrl + vrstatransportaid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $sastojciid: new FormControl(null),
        nazivs: new FormControl('')
    });
}