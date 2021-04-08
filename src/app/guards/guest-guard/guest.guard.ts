import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  Router  } from '@angular/router';
import { AuthenticationService } from '../../services/auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.authService.isLoggedIn
  }
}
