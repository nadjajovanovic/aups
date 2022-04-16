import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Mesto } from "../models/mesto";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class MestoService {

    private readonly mestoUrl = 'http://localhost:8083/mesto/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllMesta(): Observable<Mesto[]> {
        return this.httpClient.get<Mesto[]>(this.mestoUrl);
    }

    addMesto(data: any) {
        return this.httpClient.post<any>(this.mestoUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    updateMesto(data: any) {
        return this.httpClient.put(this.mestoUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    deleteMesto(mestoid: number) {
        return this.httpClient.delete(this.mestoUrl + mestoid)
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