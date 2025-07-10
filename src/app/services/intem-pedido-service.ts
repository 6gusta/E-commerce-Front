import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IntemPedido {
   idIntemPedido:number;
  nomeProduto: string;
  categoriaProduto: string;
  precoUnitario: number;
  quantidade: number;
  descricaoProduto: string;
  tamanhosDisponiveis: string[];
  quantidadeintemCliente: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class IntemPedidoService {
  private apiUrl = 'http://localhost:8080/intempedido/enviapedidos';
  private listarPedidoUrl = 'http://localhost:8080/intempedido/listarpedidos';
  private salvarEnderecoUrl = 'http://localhost:8080/cliente/cadastro'; // base da rota

  constructor(private http: HttpClient) {}

  // Corrigido: espera que o backend retorne { idPedido: number }
  enviarPedido(pedido: IntemPedido): Observable<{ idPedido: number }> {
    return this.http.post<{ idPedido: number }>(this.apiUrl, pedido);
  }

  buscarPedidoPorId(id: number): Observable<IntemPedido> {
    return this.http.get<IntemPedido>(`${this.listarPedidoUrl}/${id}`);
  }


 salvarEndereco(dadosEntrega: {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
}): Observable<any> {
  return this.http.post(`${this.salvarEnderecoUrl}`, dadosEntrega);
}

}
