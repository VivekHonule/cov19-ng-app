import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';
import {User} from './_models';
import './_content/app.less';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  currentUser!: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    let succeed = this.router.navigate(['/login']);
    if (!succeed) {
      //ToDo: add fallback here.
    }
  }
}
