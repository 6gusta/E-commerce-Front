import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../services/perfil-service';
import { Router } from '@angular/router'; // ✅ IMPORTAÇÃO CORRETA

@Component({
  selector: 'app-minhaconta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minhaconta.html',
  styleUrls: ['./minhaconta.css']
})
export class Minhaconta implements OnInit {
  adminNome: string = '';
  
  constructor(
    private perfilService: PerfilService,
    private router: Router // ✅ CORRETA INJEÇÃO
  ) {}

  ngOnInit(): void {
    const idadmin = 1;

    this.perfilService.getAdminById(idadmin).subscribe({
      next: (res) => {
        this.adminNome = res.nome;
        console.log('Admin nome:', this.adminNome);
      },
      error: (err) => {
        console.error('Erro ao buscar admin:', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']); // ✅ FUNCIONARÁ AGORA
  }
}
