import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IntemPedido {
  idIntemPedido?: number;
  nomeProduto: string;
  categoriaProduto: string;
  precoUnitario: number;
  quantidadeItemCliente: number;
  descricaoProduto: string;
  tamanhosDisponiveis: string[];
  total?: number;
  dataPedido?: string;
  pedidoFinalizado?: boolean;
  tipoPagamento: string;
  cliente?: any; // para enviar o cliente junto no pedido, se necessário
}

@Injectable({
  providedIn: 'root'
})
export class IntemPedidoService {

  private clienteUrl = 'http://localhost:8080/cliente/cadastro';
  private pedidoUrl = 'http://localhost:8080/intempedido/enviapedidos';
  private listarPedidoUrl = 'http://localhost:8080/intempedido/listarpedidos';
  private vincularClienteUrl = 'http://localhost:8080/intempedido'; // usado no PUT

  constructor(private http: HttpClient) {}

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.clienteUrl, cliente); // retorna o cliente com id
  }

  criarPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.pedidoUrl, pedido); // envia idCliente junto
  }

  /** 3️⃣ Vincula cliente a um pedido */
  vincularClienteAoPedido(idPedido: number, idCliente: number): Observable<any> {
    return this.http.put(`${this.vincularClienteUrl}/${idPedido}/cliente/${idCliente}`, {});
  }

  /** Busca pedido por ID */
  buscarPedidoPorId(id: number): Observable<IntemPedido> {
    return this.http.get<IntemPedido>(`${this.listarPedidoUrl}/${id}`);
  }

  /** Lista todos os pedidos */
  buscarTodosPedidos(): Observable<IntemPedido[]> {
    return this.http.get<IntemPedido[]>(this.listarPedidoUrl);
  }
}
