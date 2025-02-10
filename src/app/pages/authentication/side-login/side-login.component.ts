import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { UserAuthService } from 'src/app/services/nswag/nswag.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  saving = false;
  constructor(
    private router: Router,
    private userAuth: UserAuthService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    this.saving = true;
    // console.log(this.form.value);
    this.userAuth
      .login(this.form.value.uname ?? '', this.form.value.password ?? '')
      .subscribe({
        next: (res) => {
          this.saving = false;
          if (res.isSuccess) {
            localStorage.setItem('token', res.data.userToken ?? '');
            const userRoles = this.authService.getUserRoles();
            if (userRoles.includes('Admin')) {
              this.router.navigate(['/dashboard']);
            } else if (userRoles.includes('Owner')) {
              this.router.navigate(['/dashboard']);
            } else if (userRoles.includes('Cashier')) {
              this.router.navigate(['/cashier']);
            } else if (userRoles.includes('Inventory')) {
              this.router.navigate(['/inventory']);
            }
            // this.router.navigate(['/dashboard']);
            this.toastr.success('Login Successful');
          }
          if (!res.isSuccess) {
            this.toastr.error('Error! ' + res.message);
          }
        },
        error: (err) => {
          this.toastr.error('Error! ' + err.message);
          this.saving = false;
        },
      });
    // this.router.navigate(['/']);
  }
}
