import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PlanProizvodnje } from "../models/planproizvodnje";

@Injectable({
    providedIn: 'root'
})
export class PlanProizvodnjeService {

    private readonly planProizvodnjeUrl = 'http://localhost:8083/plan-proizvodnje/';

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
    
    public getAllPlanaProizvodnje(): Observable<PlanProizvodnje[]> {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.get<PlanProizvodnje[]>(this.planProizvodnjeUrl, {headers: reqHeaders});
    }

    public addPlanProizvodnje(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.post<any>(this.planProizvodnjeUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updatePlanProizvodnje(data: any) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.put(this.planProizvodnjeUrl, data, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deletePlanProizvodnje(planproizvodnjeid: number) {
        let token = this.getToken();
        let reqHeaders = this.getHttpHeaders(token);
        return this.httpClient.delete(this.planProizvodnjeUrl + planproizvodnjeid, {headers: reqHeaders})
        .pipe(map((res: any) => {
            return res;
        }));
    }
}