// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const loggedIn = this.authService.isLoggedIn();
    alert(`AuthGuard: usuário está logado? ${loggedIn}`);

    if (loggedIn) {
      alert('AuthGuard: acesso permitido!');
      return true;  // deixa acessar
    } else {
      alert('AuthGuard: acesso negado! Redirecionando para login...');
      return this.router.parseUrl('/admin/login');  // redireciona para login
    }
  }
}
