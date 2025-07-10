
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // IMPORTAÇÃO NECESSÁRIA
import { IntemPedidoService, IntemPedido } from '../services/intem-pedido-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  paymentMethod: string = '';
  pixKey: string = '';
  timer: number = 0;
  private intervalId: any;

  pedido!: IntemPedido;
  subtotal = 0;
  frete = 0;
  total = 0;

  constructor(private intemPedidoService: IntemPedidoService, private http: HttpClient) {}  // INJETAR HttpClient

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

    const preco = Number(this.pedido.precoUnitario);
    const quantidade = Number(this.pedido.quantidade || this.pedido.quantidadeintemCliente || 1);

    this.subtotal = preco * quantidade;
    this.frete = 0; // ou lógica para frete
    this.total = Number(this.pedido.total) || (this.subtotal + this.frete);
  }

  onPaymentMethodChange(value: string) {
    this.paymentMethod = value;
    this.clearTimer();

    if (value === 'pix') {
      this.regeneratePixKey();
    } else {
      this.pixKey = '';
    }
  }

  generateRandomPixKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }

  regeneratePixKey() {
    this.pixKey = this.generateRandomPixKey();
    this.startTimer(10 * 60 * 1000); // 10 minutos em ms
  }

  startTimer(duration: number) {
    this.timer = duration;
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.timer -= 1000;

      if (this.timer <= 0) {
        this.timer = 0;
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  copyPixKey() {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      alert('Chave Pix copiada para a área de transferência!');
    }).catch(() => {
      alert('Falha ao copiar a chave Pix.');
    });
  }

  formatTimer(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    return `${minutesStr}:${secondsStr}`;
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  // <-- Método que faltava: botão finaliza pagamento cartão
  finalizarPagamentoCartao() {
    this.http.post<any>('http://localhost:8080/metodo/pagamentocartao', {})
      .subscribe({
        next: (res) => {
          if (res.url) {
            window.location.href = res.url;  // redireciona para a página do Stripe
          } else {
            alert('Não foi possível iniciar o pagamento.');
          }
        },
        error: (err) => {
          console.error('Erro no pagamento:', err);
          alert('Erro ao tentar realizar o pagamento.');
        }
      });
  }
}
