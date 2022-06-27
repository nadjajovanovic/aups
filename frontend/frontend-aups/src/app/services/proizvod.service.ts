import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Proizvod } from '../models/proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  private readonly proizvodUrl = 'http://localhost:8083/proizvod/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllProizvode(): Observable<Proizvod[]> {
        return this.httpClient.get<Proizvod[]>(this.proizvodUrl);
    }

    public addProizvod(data: any) {
        return this.httpClient.post<any>(this.proizvodUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updateProizvod(data: any) {
        return this.httpClient.put(this.proizvodUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deleteProizvod(proizvodid: number) {
        return this.httpClient.delete(this.proizvodUrl + proizvodid)
        .pipe(map((res: any) => {
            return res;
        }));
    }
}
