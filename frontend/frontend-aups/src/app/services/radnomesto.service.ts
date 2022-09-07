import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { RadnoMesto } from "../models/radnomesto";

@Injectable({
    providedIn: 'root'
})
export class RadnoMestoService {

    private readonly radnoMestoUrl = 'http://localhost:8083/radno-mesto/';

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
    
    public getAllRadnaMesta(): Observable<RadnoMesto[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<RadnoMesto[]>(this.radnoMestoUrl, { headers: reqHeaders});
    }

    public addRadnoMesto(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.radnoMestoUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateRadnoMesto(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.radnoMestoUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteRadnoMesto(radnomestoid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.radnoMestoUrl + radnomestoid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $radnomestoid: new FormControl(null),
        nazivrm: new FormControl('')
    });
}