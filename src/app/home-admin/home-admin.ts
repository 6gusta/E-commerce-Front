import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { ProdutoService } from '../services/produtoservice';
import { Editaexcluirservice } from '../services/editaexcluirservice';

import { FiltroService } from '../services/filtro-service';
import { TipoProduto } from '../models/tipo-produto.model';
import { Produtomodel } from '../models/produto.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.html',
  styleUrls: ['./home-admin.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class HomeAdmin implements OnInit, OnDestroy {
  produtosNovidades: Produtomodel[] = [];
  produtosPromocoes: Produtomodel[] = [];
  produtosMaisPedidos: Produtomodel[] = [];
  produtosFiltrados: Produtomodel[] = [];

  tiposProduto = Object.values(TipoProduto);

  filtro = {
    tipo: '',
    tamanho: '',
    precoMin: undefined as number | undefined,
    precoMax: undefined as number | undefined
  };

  produtoEditando: Produtomodel | null = null;

  private routerSubscription!: Subscription;

  constructor(
    private produtoService: ProdutoService,
    private filtroService: FiltroService,
    private editaExcluiService: Editaexcluirservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutosPorCategoria();

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        if (nav.urlAfterRedirects.includes('/index')) {
          this.carregarProdutosPorCategoria();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  carregarProdutosPorCategoria(): void {
    this.produtoService.getProdutosPorCategoria('NOVIDADES').subscribe({
      next: res => this.produtosNovidades = res,
      error: err => console.error('Erro ao buscar novidades:', err)
    });

    this.produtoService.getProdutosPorCategoria('PROMOCOES').subscribe({
      next: res => this.produtosPromocoes = res,
      error: err => console.error('Erro ao buscar promoções:', err)
    });

    this.produtoService.getProdutosPorCategoria('MAISPEDIDOS').subscribe({
      next: res => this.produtosMaisPedidos = res,
      error: err => console.error('Erro ao buscar mais pedidos:', err)
    });
  }

  aplicarFiltro(): void {
    this.filtroService.filtrarProdutos(this.filtro).subscribe({
      next: res => this.produtosFiltrados = res,
      error: err => console.error('Erro ao filtrar produtos:', err)
    });
  }

  irParaProduto(id: number): void {
    this.router.navigate(['/produto', id]);
  }

  limparFiltro(): void {
    this.filtro = {
      tipo: '',
      tamanho: '',
      precoMin: undefined,
      precoMax: undefined
    };
    this.produtosFiltrados = [];
  }

  editarProduto(produto: Produtomodel): void {
    this.router.navigate(['admin/cadastrointem'], { state: { produto } });
  }

  salvarEdicao(): void {
    if (!this.produtoEditando) return;

    this.produtoService.atualizarProduto(this.produtoEditando.idproduto, this.produtoEditando).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.produtoEditando = null;
        this.carregarProdutosPorCategoria();
        this.produtosFiltrados = [];
      },
      error: err => {
        console.error('Erro ao atualizar produto:', err);
        alert('Erro ao atualizar produto');
      }
    });
  }

  excluirProduto(id: number): void {
    this.editaExcluiService.excluirProduto(id).subscribe({
      next: () => {
        this.produtosNovidades = this.produtosNovidades.filter(p => p.idproduto !== id);
        this.produtosPromocoes = this.produtosPromocoes.filter(p => p.idproduto !== id);
        this.produtosMaisPedidos = this.produtosMaisPedidos.filter(p => p.idproduto !== id);
        this.produtosFiltrados = this.produtosFiltrados.filter(p => p.idproduto !== id);
        alert('Produto excluído com sucesso!');
      },
      error: err => console.error('Erro ao excluir produto:', err)
    });
  }
}
