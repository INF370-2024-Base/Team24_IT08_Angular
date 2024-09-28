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
    // Retrieve the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Check if the user is logged in (has a token)
    if (currentUser && currentUser.token) {
      // Check if the route is restricted by a role
      if (route.data['roles']) {
        const requiredRoles = route.data['roles'];
        
        // Check if the user's role is allowed for the route
        if (!requiredRoles.includes(currentUser.role)) {
          // If not, redirect to login or another page, depending on your app
          this.router.navigate(['/login']);
          return false;
        }
      }
      // User is logged in and has the correct role, allow access
      return true;
    }

    // If not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
