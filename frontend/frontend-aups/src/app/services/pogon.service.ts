import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { Pogon } from "../models/pogon"

@Injectable({
    providedIn: 'root'
})
export class PogonService {

    private readonly pogonUrl = 'http://localhost:8083/pogon/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllPogona(): Observable<Pogon[]> {
        return this.httpClient.get<Pogon[]>(this.pogonUrl);
    }

    public addPogon(data: any) {
        return this.httpClient.post<any>(this.pogonUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updatePogon(data: any) {
        return this.httpClient.put(this.pogonUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deletePogon(pogonid: number) {
        return this.httpClient.delete(this.pogonUrl + pogonid)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $pogonid: new FormControl(null),
        oznakap: new FormControl('')
    });
}