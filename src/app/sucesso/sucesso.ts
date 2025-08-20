import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.html',
  styleUrls: ['./sucesso.css'],
  imports:[RouterModule]
})
export class Sucesso implements OnInit {
  codigoRastreamento: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Simulação: você pode armazenar no localStorage quando vier do Stripe
    this.codigoRastreamento = localStorage.getItem('codigoRastreamento') || 'Gerado na finalização';
  }
}
