import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtomodel } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class Editaexcluirservice {
  constructor(private http: HttpClient) {}

  editarProduto(id: number, produto: Produtomodel): Observable<Produtomodel> {
    return this.http.put<Produtomodel>(`http://localhost:8080/admin/up/${id}`, produto);
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/admin/intem/${id}`);
  }
}
