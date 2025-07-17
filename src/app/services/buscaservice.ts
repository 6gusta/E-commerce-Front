// src/app/services/busca.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  idproduto: number;
  nomeProduto: string;
  descProduto: string;
  precoProduto: number;
  categoriaProduto: string;
  imagemProduto: string;
  // adicione outros campos que seu backend retorna
}

@Injectable({
  providedIn: 'root',
})
export class BuscaService {
  buscarPorTermo(termoBusca: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/buscar/intem';

  constructor(private http: HttpClient) {}

  buscar(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}?termo=${encodeURIComponent(termo)}`);
  }
}
