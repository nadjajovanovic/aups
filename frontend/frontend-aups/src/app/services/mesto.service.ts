import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Mesto } from "../models/mesto";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class MestoService {

    private readonly mestoUrl = 'http://localhost:8083/mesto/';

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

    public getAllMesta(): Observable<Mesto[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<Mesto[]>(this.mestoUrl, {headers: reqHeaders});
    }

    addMesto(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.mestoUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    updateMesto(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.mestoUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    deleteMesto(mestoid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.mestoUrl + mestoid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $mestoid: new FormControl(null),
        nazivm: new FormControl(''),
        postanskibroj: new FormControl('')
    });
}