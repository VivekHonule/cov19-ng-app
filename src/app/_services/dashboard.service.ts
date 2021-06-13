import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Region} from "../_models";
import {HomeComponent} from "../home";

@Injectable({providedIn: 'root'})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get<Region[]>(`${environment.apiUrl}/dashboard/countries`);
  }

  getStates(name: string) {
    return this.http.get<Region[]>(`${environment.apiUrl}/dashboard/states/${name}`);
  }

  calculateGlobalData(countries: Region[], homeComponent: HomeComponent) {
    let globalConfirmed: number = 0;
    let globalActive: number = 0;
    let globalRecovered: number = 0;
    let globalDeceased: number = 0;

    for (let country of countries) {
      globalConfirmed += country.confirmed;
      globalActive += country.active;
      globalRecovered += country.recovered;
      globalDeceased += country.deceased;
    }

    homeComponent.globalConfirmed = globalConfirmed;
    homeComponent.globalActive = globalActive;
    homeComponent.globalRecovered = globalRecovered;
    homeComponent.globalDeceased = globalDeceased;
  }
}
