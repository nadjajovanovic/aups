import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Skladiste } from "../models/skladiste";

@Injectable({
    providedIn: 'root'
})
export class SkladisteService {

    private readonly skladisteUrl = 'http://localhost:8083/skladiste/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllSkladista(): Observable<Skladiste[]> {
        return this.httpClient.get<Skladiste[]>(this.skladisteUrl);
    }

    public addSkladiste(data: any) {
        return this.httpClient.post<any>(this.skladisteUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateSkladiste(data: any) {
        return this.httpClient.put(this.skladisteUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteSkladiste(skladisteid: number) {
        return this.httpClient.delete(this.skladisteUrl + skladisteid)
        .pipe(map((res: any) => {
            return res;
        }));
    }
}