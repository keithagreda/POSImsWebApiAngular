import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { jwtDecode } from 'jwt-decode';
import { UserAuthService } from '../nswag/nswag.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authserv: UserAuthService,
    private auth: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      // const decodedToken: { exp: number } = jwtDecode(token);
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (decodedToken.exp < currentTime) {
      //   // this.handleTokenExpiration();
      //   return throwError(() => new Error('Token expired'));
      // }

      const newCloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(newCloneRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleTokenExpiration();
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  onlogout() {
    localStorage.removeItem('token');

    this.router.navigate(['authentication/login']);
  }

  private handleTokenExpiration() {
    localStorage.removeItem('token');
    this.auth.onlogout();
    this.toastr.error(
      'Your session has expired. Please login again to continue using the app',
      'Session Expired',
      {
        progressBar: true,
        positionClass: 'toast-bottom-right',
      }
    );
    this.router.navigate(['authentication/login']);
  }
}
