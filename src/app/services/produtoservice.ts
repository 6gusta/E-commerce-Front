import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtomodel } from '../models/produto.model'; // ✅ Importação correta

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:8080/produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produtomodel[]> {
    return this.http.get<Produtomodel[]>(`${this.apiUrl}/verproduto`);
  }

  getProdutoPorId(id: number): Observable<Produtomodel> {
    return this.http.get<Produtomodel>(`${this.apiUrl}/detalhes/${id}`);
  }

  getProdutosPorCategoria(categoria: string): Observable<Produtomodel[]> {
    return this.http.get<Produtomodel[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  cadastrarProduto(produto: Produtomodel): Observable<string> {
    return this.http.post('http://localhost:8080/produto/register', produto, {
      responseType: 'text',
    });
  }
}
