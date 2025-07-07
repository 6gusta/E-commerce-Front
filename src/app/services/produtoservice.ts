import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  idproduto: number;
  nomeProduto: string;
  descProduto: string;
  precoProduto: number;
  categoriaProduto: string;
  estoqueProduto: boolean;
  dataCadastro: string;
  quantidade: number;
  imagemProduto: string;
   tamanhosDisponiveis?: string[];
     total: number;
     valorPromocional: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/verproduto`);
  }

  getProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/detalhes/${id}`);
  }

  getProdutosPorCategoria(categoria: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  // ✅ Novo método de cadastro
  cadastrarProduto(produto: Produto): Observable<string> {
    return this.http.post('http://localhost:8080/produto/register', produto, {
      responseType: 'text',
    });
  }
}
