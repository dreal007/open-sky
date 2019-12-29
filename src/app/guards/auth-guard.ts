import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.isAuthenticated()) {
            return true
        }
        else {
            this.router.navigate(['/login'], {});
            return false
        }
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.isAuthenticated()) {
            return true
        }
        else {
            this.router.navigate(['/login'], {});
            return false
        }
    }

}
