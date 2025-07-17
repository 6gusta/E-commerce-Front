import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtomodel } from '../models/produto.model'; // ✅ Importação correta

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private readonly baseUrl = 'http://localhost:8080/filtro';

  constructor(private http: HttpClient) {}

  filtrarProdutos(filtro: {
    tipo?: string;
    tamanho?: string;
    precoMin?: number;
    precoMax?: number;
  }): Observable<Produtomodel[]> {
    let params = new HttpParams();

    if (filtro.tipo) {
      params = params.set('produto', filtro.tipo);
    }
    if (filtro.tamanho) {
      params = params.set('tamanho', filtro.tamanho);
    }
    if (filtro.precoMin !== null && filtro.precoMin !== undefined) {
      params = params.set('precoMin', filtro.precoMin.toString());
    }
    if (filtro.precoMax !== null && filtro.precoMax !== undefined) {
      params = params.set('precoMax', filtro.precoMax.toString());
    }

    return this.http.get<Produtomodel[]>(`${this.baseUrl}/filtrar`, { params });
  }
}
