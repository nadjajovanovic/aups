import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FormGroup, FormControl } from "@angular/forms";
import { RadnoMesto } from "../models/radnomesto";

@Injectable({
    providedIn: 'root'
})
export class RadnoMestoService {

    private readonly radnoMestoUrl = 'http://localhost:8083/radno-mesto/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllRadnaMesta(): Observable<RadnoMesto[]> {
        return this.httpClient.get<RadnoMesto[]>(this.radnoMestoUrl);
    }

    public addRadnoMesto(data: any) {
        return this.httpClient.post<any>(this.radnoMestoUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateRadnoMesto(data: any) {
        return this.httpClient.put(this.radnoMestoUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteRadnoMesto(radnomestoid: number) {
        return this.httpClient.delete(this.radnoMestoUrl + radnomestoid)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    form: FormGroup = new FormGroup({
        $radnomestoid: new FormControl(null),
        nazivrm: new FormControl('')
    });
}