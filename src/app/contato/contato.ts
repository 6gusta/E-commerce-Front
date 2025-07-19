import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contato',
  imports: [CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {

  faqs = [
    {
      pergunta: 'Como faço para rastrear meu pedido?',
      resposta: 'Você pode rastrear seu pedido acessando a área "Minha Conta" > "Meus Pedidos".'
    },
    {
      pergunta: 'Qual é o prazo de entrega?',
      resposta: 'O prazo de entrega varia de acordo com sua região, mas geralmente é de 3 a 7 dias úteis.'
    },
    {
      pergunta: 'Posso trocar ou devolver um produto?',
      resposta: 'Sim! Você pode solicitar troca ou devolução em até 7 dias após o recebimento.'
    },
    {
      pergunta: 'Quais formas de pagamento são aceitas?',
      resposta: 'Aceitamos Pix, Cartão de Crédito, Boleto e Carteiras Digitais como Mercado Pago e PayPal.'
    }
  ];

  faqAtivoIndex: number | null = null;

  toggleFAQ(index: number) {
    this.faqAtivoIndex = this.faqAtivoIndex === index ? null : index;
  }

}
