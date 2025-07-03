import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IntemPedido {
  nomeProduto: string;
  categoriaProduto: string;
  precoUnitario: number;
  quantidade: number;
  descricaoProduto: string;
  tamanhosDisponiveis: string[];
  quantidadeintemCliente: number;
}

@Injectable({
  providedIn: 'root'
})
export class IntemPedidoService {
  private apiUrl = 'http://localhost:8080/intempedido/enviapedidos'; // URL para enviar pedido
   // URL para listar pedidos

  constructor(private http: HttpClient) {}

  enviarPedido(pedido: IntemPedido): Observable<string> {
    return this.http.post(this.apiUrl, pedido, { responseType: 'text' });
  }

 buscarPedidoPorId(id: number): Observable<IntemPedido> {
  return this.http.get<IntemPedido>(`http://localhost:8080/intempedido/listarpedidos/${id}`);
}

}
