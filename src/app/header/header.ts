import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,     // 👈 Importação do mat-icon
    MatButtonModule, 
    RouterModule   // 👈 Se estiver usando <button mat-icon-button>
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] // Corrigido: era `styleUrl`, o correto é `styleUrls`
})
export class Header { }
