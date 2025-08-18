import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.html',
  styleUrls: ['./info-cliente.css'],
   imports: [CommonModule, FormsModule]
})
export class InfoCliente implements OnInit {

  pedido!: IntemPedido;
  cliente = {
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    complemento: ''
  };

  constructor(
    private router: Router,
    private intemPedidoService: IntemPedidoService
  ) {}

  ngOnInit() {
  const pedidoParcialJson = localStorage.getItem('pedidoParcial');
  if (pedidoParcialJson) {
    this.pedido = JSON.parse(pedidoParcialJson);
  } else {
    console.warn('Pedido parcial não encontrado no localStorage');
  }
}

salvarEndereco() {
  const produtoSelecionadoJson = localStorage.getItem('produtoSelecionado');
  if (!produtoSelecionadoJson) {
    alert('Produto não encontrado. Volte e selecione um produto.');
    return;
  }

  const produtoSelecionado = JSON.parse(produtoSelecionadoJson);

  // 1️⃣ Salva o cliente primeiro
  this.intemPedidoService.cadastrarCliente(this.cliente).subscribe({
    next: (clienteCriado) => {
      console.log('Cliente salvo:', clienteCriado);

      // 2️⃣ Monta o pedido incluindo o cliente corretamente
      const pedidoCompletoDTO = {
        ...produtoSelecionado,
        cliente: {
          idCliente: clienteCriado.idCliente
        }
      };

      // 3️⃣ Salva o pedido
      this.intemPedidoService.criarPedido(pedidoCompletoDTO).subscribe({
        next: (pedidoCriado) => {
          alert('Pedido criado com sucesso!');
          localStorage.removeItem('produtoSelecionado');
         this.router.navigate(['/checkout', pedidoCriado.idPedido]); // CORRETO

        },
        error: (err) => {
          console.error('Erro ao criar pedido:', err);
          alert('Erro ao criar pedido.');
        }
      });
    },
    error: (err) => {
      console.error('Erro ao salvar cliente:', err);
      alert('Erro ao salvar cliente.');
    }
  });
}



}
