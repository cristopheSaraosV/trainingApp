import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth/auth.service";
import { Router } from '@angular/router';

@Injectable({
	providedIn: "root",
})

export class AuthGuard implements CanActivate {
  
	constructor(public authService: AuthService,  private router :Router ) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const itHasToken = this.authService.isLoggedIn();

	
		if(!itHasToken){
			this.router.navigate(['/login'])
		}
		return itHasToken;
	}
}
