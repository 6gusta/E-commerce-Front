import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CartItem {
  produto: {
    nomeProduto: string;
    precoProduto: number;
    imagemProduto?: string;
  };
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrlAdd = 'http://localhost:8080/cart/adicionar'; // ajuste se necessário
  private apiUrlList = 'http://localhost:8080/cart/listacart'; // endpoint para listar

  constructor(private http: HttpClient) {}

  adicionarAoCarrinho(cartItem: any): Observable<any> {
    return this.http.post(this.apiUrlAdd, cartItem);
  }

  listarCarrinho(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrlList);
  }
}
