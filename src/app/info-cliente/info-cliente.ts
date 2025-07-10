import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-info-cliente',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,  FormsModule],
  templateUrl: './info-cliente.html',
  styleUrls: ['./info-cliente.css']
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
    private route: ActivatedRoute,
    private intemPedidoService: IntemPedidoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.intemPedidoService.buscarPedidoPorId(id).subscribe({
        next: pedido => this.pedido = pedido,
        error: err => console.error('Erro ao buscar pedido:', err)
      });
    } else {
      console.warn('ID do pedido inválido ou não informado na rota.');
    }
  }

  irParaCheckout(idPedido: number) {
    this.router.navigate(['/checkout', idPedido]);
  }

salvarEndereco() {
  this.intemPedidoService.salvarEndereco(this.cliente).subscribe({
    next: (res) => {
      console.log('Endereço salvo com sucesso:', res);
      this.irParaCheckout(this.pedido.idIntemPedido);
    },
    error: (err) => {
      if (err.status === 200) {
            alert('✅ Produto cadastrado com sucesso!');
        this.irParaCheckout(this.pedido.idIntemPedido);
      } else {
        console.error('Erro ao salvar endereço:', err);
      }
    }
  });
}
}
