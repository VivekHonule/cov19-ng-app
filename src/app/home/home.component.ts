import {Component, OnInit} from '@angular/core';

import {Region, User} from '../_models';
import {AuthenticationService, DashboardService} from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  displayedColumns: string[] = ['name', 'confirmed', 'active', 'recovered', 'deceased'];
  dataSource: Region[];

  constructor(private authenticationService: AuthenticationService, private dashboardService: DashboardService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.dashboardService.getCountries()
      .subscribe((response) => {
        this.dataSource = response
      });
  }
}
