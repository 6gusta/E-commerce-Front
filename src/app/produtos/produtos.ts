import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto, ProdutoService } from '../services/produtoservice';
import { CartService } from '../services/adicionarcartservice';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.css']
})
export class Produtos implements OnInit {
  produto!: Produto;
  errorMsg?: string;

  tamanhoSelecionado?: string;  // controla o tamanho escolhido pelo usuário

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.produtoService.getProdutoPorId(+id).subscribe({
          next: (res) => {
            this.produto = res;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.errorMsg = 'Erro ao carregar produto';
            this.cdr.detectChanges();
          }
        });
      } else {
        this.errorMsg = 'ID do produto não encontrado na rota';
        this.cdr.detectChanges();
      }
    });
  }

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
  }

  adicionarAoCarrinho() {
    if (!this.tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }

    const item = {
      produto: this.produto,
      tamanho: this.tamanhoSelecionado,  // inclui o tamanho no item do carrinho
      quantidade: 1
    };

    this.cartService.adicionarAoCarrinho(item).subscribe({
      next: () => {
        console.log('Produto adicionado ao carrinho!');
        this.router.navigate(['/carrinho']);
      },
      error: (err) => {
        console.error('Erro ao adicionar ao carrinho', err);
      }
    });
  }

  get temTamanhosDisponiveis(): boolean {
  return !!(this.produto && this.produto.tamanhosDisponiveis && this.produto.tamanhosDisponiveis.length > 0);
}

}
