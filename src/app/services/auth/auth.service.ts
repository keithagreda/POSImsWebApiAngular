import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  token: string | null = null;

  getUserId(): string | null {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decoded: any = jwtDecode(this.token);

      return (
        decoded[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ] || null
      );
    } else {
      return null;
    }
  }

  getUserRoles(): string[] {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decoded: any = jwtDecode(this.token);

      return (
        decoded[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || []
      );
    } else {
      return [];
    }
  }

  onlogout() {
    localStorage.removeItem('token');

    this.router.navigate(['auth/user-login']);
  }
}
