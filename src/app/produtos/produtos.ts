import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProdutoService } from '../services/produtoservice';
import { Produtomodel } from '../models/produto.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IntemPedidoService } from '../services/intem-pedido-service';
import { CommonModule, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.css'],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgIf,
    NgForOf,
    DecimalPipe
  ],
})
export class Produtos implements OnInit {
  produto!: Produtomodel;
  errorMsg?: string;
  tamanhoSelecionado?: string;
  quantidadeintemCliente: number = 1;
  tipoPagamento: string = 'PIX';
  erroTamanho: string = '';
  erroQuantidade: string = '';
  temTamanhosDisponiveis: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private intemPedidoService: IntemPedidoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.getProdutoPorId(+id).subscribe({
        next: (res: Produtomodel) => {
          this.produto = res;
          this.temTamanhosDisponiveis = !!res.tamanhosDisponiveis?.length;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMsg = 'Erro ao carregar produto';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.errorMsg = 'ID do produto não encontrado na rota';
      this.cdr.detectChanges();
    }
  }

  incrementarQuantidade() {
    if (this.quantidadeintemCliente < (this.produto?.quantidade ?? 1)) {
      this.quantidadeintemCliente++;
      this.erroQuantidade = '';
    } else {
      this.erroQuantidade = `Quantidade máxima disponível é ${this.produto?.quantidade ?? 1}`;
    }
  }

  decrementarQuantidade() {
    if (this.quantidadeintemCliente > 1) {
      this.quantidadeintemCliente--;
      this.erroQuantidade = '';
    }
  }

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
    this.erroTamanho = '';
  }

  validarFormulario(): boolean {
    let valido = true;
    if (!this.tamanhoSelecionado && this.temTamanhosDisponiveis) {
      this.erroTamanho = 'Por favor, selecione um tamanho.';
      valido = false;
    }
    if (this.quantidadeintemCliente < 1) {
      this.erroQuantidade = 'A quantidade deve ser pelo menos 1.';
      valido = false;
    } else if (this.quantidadeintemCliente > (this.produto?.quantidade ?? 1)) {
      this.erroQuantidade = `Quantidade máxima disponível é ${this.produto?.quantidade ?? 1}`;
      valido = false;
    }
    return valido;
  }
finalizarCompra() {
  if (!this.validarFormulario()) return;

  const produtoSelecionado = {
    nomeProduto: this.produto.nomeProduto,
    categoriaProduto: this.produto.categoriaProduto,
    precoUnitario: Number(this.produto.precoProduto),
    quantidadeItemCliente: Number(this.quantidadeintemCliente),
    descricaoProduto: this.produto.descProduto,
    tamanhosDisponiveis: this.tamanhoSelecionado ? [this.tamanhoSelecionado] : [],
    tipoPagamento: this.tipoPagamento
  };

  localStorage.setItem('produtoSelecionado', JSON.stringify(produtoSelecionado));
  this.router.navigate(['/infocliente']);
}

}