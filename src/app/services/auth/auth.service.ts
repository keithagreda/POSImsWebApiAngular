import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRolesSubject = new BehaviorSubject<string[]>([]);
  userRoles$ = this.userRolesSubject.asObservable();
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
      try {
        const decoded: any = jwtDecode(this.token);
        const roles =
          decoded[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ] || [];
        this.userRolesSubject.next(roles); // Correct assignment
        console.log(this.userRolesSubject);
        return roles;
      } catch (error) {
        console.error('Invalid token:', error);
        this.userRolesSubject.next([]);
        return [];
      }
    } else {
      this.userRolesSubject.next([]);
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.userRolesSubject.value?.includes(role) ?? false;
  }

  onlogout() {
    localStorage.removeItem('token');
    this.userRolesSubject.next([]); // Clear roles on logout
    this.router.navigate(['authentication/login']);
  }
}
