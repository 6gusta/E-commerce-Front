import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // IMPORTAR aqui para o ngFor e pipes funcionarem
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],  // aqui
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
    // Supondo que busca pedido por ID 1, por exemplo
    this.intemPedidoService.buscarPedidoPorId(1).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.calcularValores();
      },
      error: (err) => console.error('Erro ao buscar pedido:', err)
    });
  }

  calcularValores() {
    // Converte BigDecimal para number (caso venha como string ou objeto)
    const preco = Number(this.pedido.precoUnitario);
    this.subtotal = preco * this.pedido.quantidadeintemCliente;

    // Exemplo fixo de frete, você pode ajustar
    this.frete = 0;

    this.total = this.subtotal + this.frete;
  }
}