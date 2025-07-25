import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

// Seus componentes standalone
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { HeaderAdmin } from './header-admin/header-admin';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Angular CommonModule para diretivas como *ngIf, *ngFor, pipes, etc
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,    // Para carregar as rotas no template
    Header,
    HeaderAdmin,
    Footer,
    MatIconModule,
    MatButtonModule,
    CommonModule     // Importante para *ngIf, *ngFor, pipes e etc
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ecomeccer';

  private router = inject(Router);
  protected isAdminRoute = signal(false);

  constructor() {
    // Inicializa o sinal com base na rota atual
    this.isAdminRoute.set(this.router.url.startsWith('/admin'));

    // Escuta mudanças de rota para atualizar o sinal
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
      }
    });
  }
}
