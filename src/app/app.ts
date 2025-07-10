import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Footer } from './footer/footer';

// Importar os headers separados
import { Header } from './header/header';
import { HeaderAdmin } from './header-admin/header-admin';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    HeaderAdmin,
    Footer,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'ecomeccer';

  private router = inject(Router);
  protected isAdminRoute = signal(false);

  constructor() {
    // Define o valor inicial da rota
    this.isAdminRoute.set(this.router.url.startsWith('/admin'));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute.set(event.urlAfterRedirects.startsWith('/admin'));
      }
    });
  }
}
