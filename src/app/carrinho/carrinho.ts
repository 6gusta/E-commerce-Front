import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/adicionarcartservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [RouterModule, HttpClientModule], // Importa HttpClientModule aqui
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class Carrinho implements OnInit {
  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.carregarCarrinho();
  }
  
  carregarCarrinho() {
    this.cartService.listarCarrinho().subscribe(items => {
      console.log(items);
    });
  }
}
