import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Region} from "../_models";

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get<Region[]>(`${environment.apiUrl}/dashboard/countries`);
  }
}
