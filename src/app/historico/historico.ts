import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.html',
  styleUrls: ['./historico.css']
})
export class HistoricoComponent implements OnInit {

  pedidosPendentes: IntemPedido[] = [];
  pedidosFinalizados: IntemPedido[] = [];

  constructor(private intemPedidoService: IntemPedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.intemPedidoService.buscarTodosPedidos().subscribe({
      next: (res) => {
        this.pedidosPendentes = res.filter(p => !p.pedidoFinalizado);
        this.pedidosFinalizados = res.filter(p => p.pedidoFinalizado);
      },
      error: (err) => console.error('Erro ao carregar pedidos:', err)
    });
  }

}
