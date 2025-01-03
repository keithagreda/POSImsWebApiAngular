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
  constructor(private router: Router, private userAuth: UserAuthService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  login() {
    // console.log(this.form.value);
    this.userAuth
      .login(this.form.value.uname ?? '', this.form.value.password ?? '')
      .subscribe((res) => {
        if (res.isSuccess) {
          localStorage.setItem('token', res.data.userToken ?? '');
          this.router.navigate(['/dashboard']);
          console.log(res.data);
        }
      });
    // this.router.navigate(['/']);
  }
}
