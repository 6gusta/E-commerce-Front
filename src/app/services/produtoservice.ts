import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Produtomodel } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  // ✅ ROTA DA AZURE ATUALIZADA
  private apiUrl = 'https://e-comeccer-a7gba5fkgfd2azek.canadacentral-01.azurewebsites.net/produto';

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
    // ✅ Usando a variável apiUrl para não precisar repetir a URL longa
    return this.http.post(`${this.apiUrl}/register`, produto, {
      responseType: 'text',
    });
  }

  atualizarProduto(id: number, produto: Produtomodel): Observable<Produtomodel> {
    // ✅ Ajustado para usar a URL da Azure também no Admin
    const adminUrl = 'https://e-comeccer-a7gba5fkgfd2azek.canadacentral-01.azurewebsites.net/admin';
    return this.http.put<Produtomodel>(`${adminUrl}/up/${id}`, produto);
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
