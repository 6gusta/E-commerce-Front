// src/app/components/header/header.ts

import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { BuscaService, Produto } from '../services/buscaservice';
import { BuscaModalComponent } from '../services/busca-modal'; // certifique-se que o caminho está correto

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  showSearch: boolean = false;
  termoBusca: string = '';

  constructor(
    private buscaService: BuscaService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  pesquisar() {
    if (this.termoBusca.trim() === '') {
      return;
    }

    this.buscaService.buscar(this.termoBusca).subscribe({
      next: (produtos) => {
        this.dialog.open(BuscaModalComponent, {
          data: produtos,
          width: '80vw', // aumenta a largura
          maxWidth: '1000px',
          maxHeight: '80vh',
          panelClass: 'custom-dialog-container' // classe de estilo opcional
        });
      },
      error: (err) => console.error('Erro na busca:', err)
    });
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.search-bar, button');
    if (!clickedInside) {
      this.showSearch = false;
    }
  }
}
