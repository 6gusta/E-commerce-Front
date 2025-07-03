import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface que representa um item no carrinho
export interface CartItem {
  produto: {
    nomeProduto: string;
    precoProduto: number;
    imagemProduto?: string; // imagem é opcional
  };
  quantidade: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // URLs da API (ajuste se necessário)
  private apiUrlAdd = 'http://localhost:8080/cart/adicionar';
  private apiUrlList = 'http://localhost:8080/cart/listacart';

  constructor(private http: HttpClient) {}

  // Método para adicionar item ao carrinho
  adicionarAoCarrinho(cartItem: CartItem): Observable<any> {
    return this.http.post(this.apiUrlAdd, cartItem);
  }

  // Método para listar todos os itens do carrinho
  listarCarrinho(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrlList);
  }
}
