import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Sastojci } from "../models/sastojci";

@Injectable({
    providedIn: 'root'
})
export class SastojciService {

    private readonly sastojciUrl = 'http://localhost:8083/sastojci/';

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
    
    public getAllSastojke(): Observable<Sastojci[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<Sastojci[]>(this.sastojciUrl, {headers: reqHeaders});
    }

    public addSastojak(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.sastojciUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateSastojak(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.sastojciUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteSastojak(sastojciid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.sastojciUrl + sastojciid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $sastojciid: new FormControl(null),
        nazivs: new FormControl('')
    });
}