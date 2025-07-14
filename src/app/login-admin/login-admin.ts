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
  const dadosLogin = {
    nome: this.login.nome,
    senha: this.login.senha
  };

  this.loginService.login(dadosLogin).subscribe({
    next: (token: string) => {
      this.authService.setToken(token);
      alert('Token armazenado: ' + this.authService.getToken());
      this.router.navigate(['/admin/homeadmin']);
    },
    error: (err) => {
      alert('Usuário sem permissão');
    }
  });
}
}