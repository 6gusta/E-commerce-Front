// src/app/services/relatorio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private baseUrl = 'http://localhost:8080/relatorio';

  constructor(private http: HttpClient) {}

  getTotal(tipo: 'hoje' | 'semana' | 'mes' | 'ano'): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${tipo}`);
  }
}
