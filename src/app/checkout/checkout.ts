import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit {

  pedido!: IntemPedido;
  subtotal = 0;
  frete = 0;
  total = 0;

  constructor(private intemPedidoService: IntemPedidoService) {}

  ngOnInit(): void {
    this.intemPedidoService.buscarPedidoPorId(1).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.calcularValores();
      },
      error: (err) => console.error('Erro ao buscar pedido:', err)
    });
  }

  calcularValores(): void {
    if (!this.pedido) return;

    // Garante que valores sejam convertidos corretamente
    const preco = Number(this.pedido.precoUnitario);
    const quantidade = Number(this.pedido.quantidade || this.pedido.quantidadeintemCliente || 1);

    this.subtotal = preco * quantidade;

    // Frete fixo ou calculado
    this.frete = 0;

    // Se total já veio do back-end, você pode usar direto:
    this.total = Number(this.pedido.total) || (this.subtotal + this.frete);
  }
}
