import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Radnik } from "../models/radnik";

@Injectable({
    providedIn: 'root'
})
export class RadnikService {

    private readonly radnikUrl = 'http://localhost:8083/radnik/';

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
    
    public getAllRadnike(): Observable<Radnik[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<Radnik[]>(this.radnikUrl, {headers: reqHeaders});
    }

    public addRadnik(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.radnikUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateRadnik(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.radnikUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteRadnik(radnikid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.radnikUrl + radnikid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }
}