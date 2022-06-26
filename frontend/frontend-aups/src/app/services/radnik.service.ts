import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Radnik } from "../models/radnik";

@Injectable({
    providedIn: 'root'
})
export class RadnikService {

    private readonly radnikUrl = 'http://localhost:8083/radnik/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllRadnike(): Observable<Radnik[]> {
        return this.httpClient.get<Radnik[]>(this.radnikUrl);
    }

    public addRadnik(data: any) {
        return this.httpClient.post<any>(this.radnikUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateRadnik(data: any) {
        return this.httpClient.put(this.radnikUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteRadnik(radnikid: number) {
        return this.httpClient.delete(this.radnikUrl + radnikid)
        .pipe(map((res: any) => {
            return res;
        }));
    }
}