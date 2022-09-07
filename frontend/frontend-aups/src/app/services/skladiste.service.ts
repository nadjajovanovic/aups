import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Skladiste } from "../models/skladiste";

@Injectable({
    providedIn: 'root'
})
export class SkladisteService {

    private readonly skladisteUrl = 'http://localhost:8083/skladiste/';

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
    
    public getAllSkladista(): Observable<Skladiste[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<Skladiste[]>(this.skladisteUrl, {headers: reqHeaders});
    }

    public addSkladiste(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.skladisteUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateSkladiste(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.skladisteUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteSkladiste(skladisteid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.skladisteUrl + skladisteid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }
}