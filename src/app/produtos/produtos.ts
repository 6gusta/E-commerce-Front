import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto, ProdutoService } from '../services/produtoservice';
import { CartService } from '../services/adicionarcartservice';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';


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

  tamanhoSelecionado?: string;  
  quantidade: number = 1; // controla o tamanho escolhido pelo usuário

  erroTamanho: string = '';
  erroQuantidade: string = '';

  constructor(
    private produtoService: ProdutoService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private intemPedidoService: IntemPedidoService
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

  incrementarQuantidade() {
    if (this.quantidade < this.produto.quantidade) {
      this.quantidade++;
      this.erroQuantidade = '';
    } else {
      this.erroQuantidade = `Quantidade máxima disponível é ${this.produto.quantidade}`;
    }
  }

  decrementarQuantidade() {
    if (this.quantidade > 1) {
      this.quantidade--;
      this.erroQuantidade = '';
    }
  }

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
    this.erroTamanho = '';
  }

  get temTamanhosDisponiveis(): boolean {
    return !!(this.produto && this.produto.tamanhosDisponiveis && this.produto.tamanhosDisponiveis.length > 0);
  }

  validarFormulario(): boolean {
    let valido = true;

    if (!this.tamanhoSelecionado) {
      this.erroTamanho = 'Por favor, selecione um tamanho.';
      valido = false;
    }

    if (this.quantidade < 1) {
      this.erroQuantidade = 'A quantidade deve ser pelo menos 1.';
      valido = false;
    } else if (this.quantidade > this.produto.quantidade) {
      this.erroQuantidade = `Quantidade máxima disponível é ${this.produto.quantidade}`;
      valido = false;
    }

    return valido;
  }

  finalizarCompra() {
    if (!this.validarFormulario()) {
      return; // Não prosseguir se houver erro
    }

    const pedido: IntemPedido = {
      nomeProduto: this.produto.nomeProduto,
      categoriaProduto: this.produto.categoriaProduto,
      precoUnitario: this.produto.precoProduto,
      quantidade: this.produto.quantidade,
      descricaoProduto: this.produto.descProduto,
      tamanhosDisponiveis: this.tamanhoSelecionado ? [this.tamanhoSelecionado] : [],
      quantidadeintemCliente: this.quantidade,
      total: this.produto.total // ou calcule o total aqui se quiser
    };

    this.intemPedidoService.enviarPedido(pedido).subscribe({
      next: () => {
        alert('✅ Pedido enviado com sucesso!');
        this.router.navigate(['/checkout']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Erro ao enviar pedido.');
      }
    });
  }
}
