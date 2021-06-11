import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, AuthenticationService, UserService} from '../_services';

@Component({templateUrl: './register.component.html'})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private alertService: AlertService) {
    if (this.authenticationService.currentUserValue) {
      let succeed = this.router.navigate(['/']);
      if (!succeed) {
        //ToDo: add fallback here
      }
    }
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
