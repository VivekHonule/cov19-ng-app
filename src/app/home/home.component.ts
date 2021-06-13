import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {Region, User} from '../_models';
import {AuthenticationService, DashboardService} from '../_services';

@Component({templateUrl: 'home.component.html', styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {
  currentUser: User;
  displayedColumns: string[] = ['name', 'confirmed', 'active', 'recovered', 'deceased'];
  dataSource: Region[];
  globalConfirmed: number;
  globalActive: number;
  globalRecovered: number;
  globalDeceased: number;
  region: string;

  constructor(private authenticationService: AuthenticationService, private dashboardService: DashboardService, private changeDetectorRefs: ChangeDetectorRef) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.dashboardService.getCountries()
      .subscribe((response) => {
        this.dataSource = response
        this.dashboardService.calculateGlobalData(this.dataSource, this)
        this.region = 'world';
      });
  }

  getStates(country: Region) {
    this.dashboardService.getStates(country.name)
      .subscribe((response) => {
        this.dataSource = response
        this.dashboardService.calculateGlobalData(this.dataSource, this);
        this.region = country.name;
        this.changeDetectorRefs.detectChanges()
      });
  }
}
