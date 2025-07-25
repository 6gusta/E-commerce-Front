import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Produtomodel } from '../models/produto.model';

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

  atualizarProduto(id: number, produto: Produtomodel): Observable<Produtomodel> {
    return this.http.put<Produtomodel>(`http://localhost:8080/admin/up/${id}`, produto);
  }

  private produtoEditandoSubject = new BehaviorSubject<Produtomodel | null>(null);
  produtoEditando$ = this.produtoEditandoSubject.asObservable();

  setProdutoEditando(produto: Produtomodel | null) {
    this.produtoEditandoSubject.next(produto);
  }

  getProdutoEditando(): Produtomodel | null {
    return this.produtoEditandoSubject.getValue();
  }
}
