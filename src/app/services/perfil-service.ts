import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080/perfil/veradmin'; // novo endpoint

  constructor(private http: HttpClient) {}

  getAdminById(id: number): Observable<any> {
  let headers = new HttpHeaders();

  // ✅ Garante que só tenta acessar localStorage no navegador
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }

  return this.http.get(`${this.apiUrl}/${id}`, { headers });
}
}
