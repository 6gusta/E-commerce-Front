import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../services/buscaservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-busca-modal',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [],
  template: `
    <div class="modal-container">
      <h2 class="modal-title">🔍 Resultados da Busca</h2>

      <div *ngIf="data && data.length > 0; else nenhum" class="produtos-lista">
        <div 
          *ngFor="let item of data" 
          class="produto-item"
          (click)="verProduto(item.idproduto)"
        >
          <img 
            *ngIf="item.imagemProduto" 
            [src]="getImagem(item.imagemProduto)" 
            alt="Imagem do produto"
            class="produto-img"
          />
          <div class="produto-info">
            <h3>{{ item.nomeProduto }}</h3>
            <p>{{ item.descProduto }}</p>
          </div>
        </div>
      </div>

      <ng-template #nenhum>
        <p class="mensagem-vazia">Nenhum produto encontrado.</p>
      </ng-template>

      <div class="botoes">
        <button (click)="fechar()">Fechar</button>
      </div>
    </div>
  `
})
export class BuscaModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BuscaModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Produto[] = []
  ) {}

  fechar() {
    this.dialogRef.close();
  }

  verProduto(id: number) {
    this.router.navigate(['/produto', id]);
    this.fechar();
  }

  getImagem(imagem: string): string {
    return imagem.startsWith('data:image')
      ? imagem
      : `data:image/webp;base64,${imagem}`;
  }
}
