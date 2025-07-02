import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Produto, ProdutoService } from '../services/produtoservice';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class Index implements OnInit, OnDestroy {
  // ✅ Substitui o array único por 3 separados
  produtosNovidades: Produto[] = [];
  produtosPromocoes: Produto[] = [];
  produtosMaisPedidos: Produto[] = [];

  private routerSubscription!: Subscription;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutosPorCategoria();

    // Recarrega ao voltar pra /index
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const nav = event as NavigationEnd;
      if (nav.urlAfterRedirects === '/index') {
        this.carregarProdutosPorCategoria();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // ✅ Novo método que busca por categoria
  carregarProdutosPorCategoria(): void {
    this.produtoService.getProdutosPorCategoria('NOVIDADES').subscribe({
      next: (res) => this.produtosNovidades = res,
      error: (err) => console.error('Erro ao buscar novidades:', err)
    });

    this.produtoService.getProdutosPorCategoria('PROMOCOES').subscribe({
      next: (res) => this.produtosPromocoes = res,
      error: (err) => console.error('Erro ao buscar promoções:', err)
    });

    this.produtoService.getProdutosPorCategoria('MAISPEDIDOS').subscribe({
      next: (res) => this.produtosMaisPedidos = res,
      error: (err) => console.error('Erro ao buscar mais pedidos:', err)
    });
  }

  irParaProduto(id: number): void {
    this.router.navigate(['/produto', id]);
  }
}
