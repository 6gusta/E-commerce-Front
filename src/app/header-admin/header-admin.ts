import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BuscaService, Produto } from '../services/buscaservice';
import { BuscaModalComponent } from '../services/busca-modal'; // ajuste o caminho

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule, MatButtonModule, FormsModule, MatDialogModule],
  templateUrl: './header-admin.html',
  styleUrls: ['./header-admin.css']
})
export class HeaderAdmin {
  showSearch: boolean = false;
  termoBusca: string = '';

  constructor(
    private buscaService: BuscaService,
    public dialog: MatDialog
  ) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  pesquisar() {
    if (!this.termoBusca.trim()) return;

    this.buscaService.buscar(this.termoBusca).subscribe({
      next: (produtos: Produto[]) => {
        this.dialog.open(BuscaModalComponent, {
          data: produtos,
          width: '80vw',
          maxWidth: '1000px',
          maxHeight: '80vh',
          panelClass: 'custom-dialog-container'
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
