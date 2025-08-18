import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../services/perfil-service';
import { Router } from '@angular/router';
import { RelatorioService } from '../services/relatorio-service';
import { FormsModule } from '@angular/forms';
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';
import { FinalizarPedidoService } from '../services/FinalizarPedidoService';

@Component({
  selector: 'app-minhaconta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './minhaconta.html',
  styleUrls: ['./minhaconta.css']
})
export class Minhaconta implements OnInit {
  filtroSelecionado: 'hoje' | 'semana' | 'mes' | 'ano' = 'hoje';
  totalVendas: number = 0;
  adminNome: string = '';
  pedidos: IntemPedido[] = [];
  adminFoto: string = '';



  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private relatorioService: RelatorioService,
    private intemPedidoService: IntemPedidoService,
    private   finalizarPedidoService:  FinalizarPedidoService
  ) {}

  ngOnInit(): void {
    const idadmin = 1;
    this.buscarTotal();
    this.carregarPedidos();
    this.buscarAdmin(idadmin);
  }

  private buscarAdmin(id: number): void {
    this.perfilService.getAdminById(id).subscribe({
      next: (res) => this.adminNome = res.nome,
      error: (err) => console.error('Erro ao buscar admin:', err)
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  buscarTotal(): void {
    this.relatorioService.getTotal(this.filtroSelecionado).subscribe({
      next: (total) => this.totalVendas = total || 0,
      error: (err) => console.error('Erro ao buscar total de vendas', err)
    });
  }

carregarPedidos(): void {
  this.intemPedidoService.buscarTodosPedidos().subscribe({
    next: (res) => this.pedidos = res.filter(p => !p.pedidoFinalizado),
    error: (err) => console.error('Erro ao carregar pedidos:', err)
  });
}


finalizarPedido(idIntemPedido: number, tipoPagamento: string) {
  this.finalizarPedidoService.finalizarPedido(idIntemPedido, tipoPagamento)
    .subscribe({
      next: (res) => {
        console.log('Pedido finalizado com sucesso', res);
        alert('Pedido finalizado!');

        // Remove o pedido da lista após finalizar
        this.pedidos = this.pedidos.filter(p => p.idIntemPedido !== idIntemPedido);
      },
      error: (err) => {
        console.error('Erro ao finalizar pedido', err);
        alert('Erro ao finalizar pedido');
      }
    });
}


  scrollCarousel(direction: 'prev' | 'next'): void {
    if (!this.carouselTrack) return;
    const track = this.carouselTrack.nativeElement;
    const scrollAmount = 300;

    track.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  // minhaconta.ts


trocarFoto(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.adminFoto = reader.result as string; // atualiza a foto na tela
    };
    reader.readAsDataURL(file);
  }
}

}
