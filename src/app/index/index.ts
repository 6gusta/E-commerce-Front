import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {  ProdutoService } from '../services/produtoservice';
import { Produtomodel } from '../models/produto.model';
import { FiltroService } from '../services/filtro-service';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TipoProduto } from '../models/tipo-produto.model'; 

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class Index implements OnInit, OnDestroy {
  produtosNovidades: Produtomodel[] = [];
  produtosPromocoes: Produtomodel[] = [];
  produtosMaisPedidos: Produtomodel[] = [];

  produtosFiltrados: Produtomodel[] = [];
  // Se TipoProduto for enum:
tiposProduto = Object.values(TipoProduto);


  

  filtro = {
    tipo: '',
    tamanho: '',
    precoMin: undefined as number | undefined,
    precoMax: undefined as number | undefined
  };

  private routerSubscription!: Subscription;

  constructor(
    private produtoService: ProdutoService,
    private filtroService: FiltroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutosPorCategoria();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const nav = event as NavigationEnd;
      if (nav.urlAfterRedirects.includes('/index')) {
        this.carregarProdutosPorCategoria();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

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

  aplicarFiltro(): void {
    this.filtroService.filtrarProdutos(this.filtro).subscribe({
      next: (res) => {
        this.produtosFiltrados = res;
        console.log('Produtos filtrados:', res);
      },
      error: (err) => console.error('Erro ao filtrar produtos:', err)
    });
  }

  limparFiltro(): void {
    this.filtro = {
      tipo: '',
      tamanho: '',
      precoMin: undefined,
      precoMax: undefined
    };
    this.produtosFiltrados = [];
    console.log('Filtro limpo');
  }
}
