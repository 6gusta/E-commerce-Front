import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // IMPORTA O AUTH SERVICE

@Component({
  selector: 'app-login-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-admin.html',
  styleUrls: ['./login-admin.css']  // corrigido para styleUrls
})
export class LoginAdmin {

  login = {
    nome: '',
    senha: '',
    role: ''
  }

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private authService: AuthService // INJETANDO AQUI
  ) {}

  fazerLogin() {
    this.loginService.login(this.login).subscribe({
      next: (token: string) => {
        this.authService.setToken(token);  // salva o token usando AuthService
        alert('Token armazenado: ' + this.authService.getToken());  // mostra o token
        this.router.navigate(['/admin/homeadmin']);
      },
      error: (err) => {
        alert('Usuario sem permisão ' );
      }
    });
  }
}
