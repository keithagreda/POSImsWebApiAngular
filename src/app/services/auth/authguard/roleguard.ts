import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles = this.authService.getUserRoles();
    const allowedRoles = route.data['roles'] as string[];

    if (!allowedRoles.some((role) => roles.includes(role))) {
      return this.router.parseUrl(
        '/authentication/login?redirect=' + state.url
      );
    }

    return true;
  }
}
