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
    quantidade: number = 1// controla o tamanho escolhido pelo usuário
produtoForm: any;

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
  this.quantidade++;
}

decrementarQuantidade() {
  if (this.quantidade > 1) {
    this.quantidade--;
  }
}

  selecionarTamanho(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
  }

  

  get temTamanhosDisponiveis(): boolean {
  return !!(this.produto && this.produto.tamanhosDisponiveis && this.produto.tamanhosDisponiveis.length > 0);
}

finalizarCompra() {
  const pedido: IntemPedido = {
    nomeProduto: this.produto.nomeProduto,
    categoriaProduto: this.produto.categoriaProduto,
    precoUnitario: this.produto.precoProduto,
    quantidade: this.produto.quantidade,
    descricaoProduto: this.produto.descProduto,
    tamanhosDisponiveis: this.tamanhoSelecionado ? [this.tamanhoSelecionado] : [],

    quantidadeintemCliente: this.quantidade
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
