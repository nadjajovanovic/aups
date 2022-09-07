import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Pogon } from "../models/pogon"

@Injectable({
    providedIn: 'root'
})
export class PogonService {

    private readonly pogonUrl = 'http://localhost:8083/pogon/';

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
    
    public getAllPogona(): Observable<Pogon[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<Pogon[]>(this.pogonUrl, {headers: reqHeaders});
    }

    public addPogon(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.pogonUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updatePogon(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.pogonUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deletePogon(pogonid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.pogonUrl + pogonid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $pogonid: new FormControl(null),
        oznakap: new FormControl('')
    });
}