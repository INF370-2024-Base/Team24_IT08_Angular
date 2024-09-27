import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (currentUser && currentUser.token) {
      // Check if the route is restricted by role
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(currentUser.role) === -1
      ) {
        // Role not authorized so redirect to login page
        this.router.navigate(['/login']);
        return false;
      }
      // Authorized so return true
      return true;
    }

    // Not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
