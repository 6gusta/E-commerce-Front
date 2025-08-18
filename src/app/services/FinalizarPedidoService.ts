import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinalizarPedidoService {
  private apiUrl = 'http://localhost:8080/finalizar'; // URL do seu backend

  constructor(private http: HttpClient) {}

  finalizarPedido(idIntemPedido: number, tipoPagamento: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/pedido/${idIntemPedido}?tipoPagamento=${tipoPagamento}`,
      {} // corpo vazio, já que a API só usa o @RequestParam
    );
  }
}
