import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto, ProdutoService } from '../services/produtoservice';
import {CartService} from '../services/adicionarcartservice'
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private produtoService: ProdutoService,
      private cartService: CartService,
        private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // injeta ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('ngOnInit Produtos chamado');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID da rota:', id);
      if (id) {
        this.produtoService.getProdutoPorId(+id).subscribe({
          next: (res) => {
            console.log('Produto recebido:', res);
            this.produto = res;
            this.cdr.detectChanges(); // força atualizar a view
          },
          error: (err) => {
            console.error('Erro ao carregar produto', err);
            this.errorMsg = 'Erro ao carregar produto';
            this.cdr.detectChanges(); // também força no erro
          }
        });
      } else {
        this.errorMsg = 'ID do produto não encontrado na rota';
        this.cdr.detectChanges();
      }
    });
  }
  adicionarAoCarrinho() {
  const item = {
    produto: this.produto,
    quantidade: 1
  };

  this.cartService.adicionarAoCarrinho(item).subscribe({
    next: () => {
      console.log('Produto adicionado ao carrinho!');
      this.router.navigate(['/carrinho']); // ou `/produto/${id}/checkout`
    },
    error: (err) => {
      console.error('Erro ao adicionar ao carrinho', err);
    }
  });
}
}
