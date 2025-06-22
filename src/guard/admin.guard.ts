import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (token && parsedUser[0].role === 'admin') {
      return true;
    } else {
      alert('You are not authorized to access this page');
      this.router.navigate(['']);
      return false;
    }
  }
}
