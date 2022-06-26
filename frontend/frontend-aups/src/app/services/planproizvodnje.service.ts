import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { PlanProizvodnje } from "../models/planproizvodnje";

@Injectable({
    providedIn: 'root'
})
export class PlanProizvodnjeService {

    private readonly planProizvodnjeUrl = 'http://localhost:8083/plan-proizvodnje/';

    constructor (private httpClient : HttpClient) {}
    
    public getAllPlanaProizvodnje(): Observable<PlanProizvodnje[]> {
        return this.httpClient.get<PlanProizvodnje[]>(this.planProizvodnjeUrl);
    }

    public addPlanProizvodnje(data: any) {
        return this.httpClient.post<any>(this.planProizvodnjeUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public updatePlanProizvodnje(data: any) {
        return this.httpClient.put(this.planProizvodnjeUrl, data)
        .pipe(map((res: any) => {
            return res;
        }));
    }

    public deletePlanProizvodnje(planproizvodnjeid: number) {
        return this.httpClient.delete(this.planProizvodnjeUrl + planproizvodnjeid)
        .pipe(map((res: any) => {
            return res;
        }));
    }
}