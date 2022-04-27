import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Sastojci } from "../models/sastojci";

@Injectable({
    providedIn: 'root'
})
export class SastojciService {

    private readonly sastojciUrl = 'http://localhost:8083/sastojci/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllSastojke(): Observable<Sastojci[]> {
        return this.httpClient.get<Sastojci[]>(this.sastojciUrl);
    }

    public addSastojak(data: any) {
        return this.httpClient.post<any>(this.sastojciUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateSastojak(data: any) {
        return this.httpClient.put(this.sastojciUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteSastojak(sastojciid: number) {
        return this.httpClient.delete(this.sastojciUrl + sastojciid)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $sastojciid: new FormControl(null),
        nazivs: new FormControl('')
    });
}