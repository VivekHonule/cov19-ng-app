import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

import {User} from '../_models';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/registration/new`, user);
  }
}
