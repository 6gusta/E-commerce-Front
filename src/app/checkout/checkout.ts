import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  pixQRCodeImage: string = '';
  timer: number = 0;
  private intervalId: any;

  pedido!: IntemPedido;
  subtotal = 0;
  frete = 0;
  total = 0;

  constructor(private intemPedidoService: IntemPedidoService, private http: HttpClient) {}

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
    this.frete = 0;
    this.total = Number(this.pedido.total) || (this.subtotal + this.frete);
  }

  onPaymentMethodChange(value: string) {
    this.paymentMethod = value;
    this.clearTimer();

    if (value === 'pix') {
      this.chamarPixQRCode();
    } else {
      this.pixKey = '';
      this.pixQRCodeImage = '';
    }
  }

  chamarPixQRCode() {
   this.http.get<{ payload: string, qrcodeBase64: string }>('http://localhost:8080/pix/pix/qrcode', {
  params: { idIntemPedido: this.pedido.idIntemPedido.toString() }
})

      .subscribe({
        next: (res) => {
          this.pixKey = res.payload;
          this.pixQRCodeImage = res.qrcodeBase64;
          this.startTimer(10 * 60 * 1000);
        },
        error: (err) => {
          console.error('Erro ao gerar QR Code PIX:', err);
          alert('Erro ao gerar QR Code Pix. Tente novamente.');
        }
      });
  }

  startTimer(duration: number) {
    this.clearTimer();
    this.timer = duration;

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

  regeneratePixKey() {
    this.chamarPixQRCode();
  }

  finalizarPagamentoCartao() {
    const pedidoId = this.pedido.idIntemPedido;
    if (!pedidoId) {
      alert('ID do pedido não encontrado!');
      return;
    }

    this.http.post<any>('http://localhost:8080/metodo/pagamentocartao', { idPedido: pedidoId })
      .subscribe({
        next: (res) => {
          if (res.url) {
            window.location.href = res.url;
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

  ngOnDestroy() {
    this.clearTimer();
  }
}
