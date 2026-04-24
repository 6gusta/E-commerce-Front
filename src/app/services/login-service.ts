import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://e-comeccer-a7gba5fkgfd2azek.canadacentral-01.azurewebsites.net/admin/login';

  constructor(private http: HttpClient) {}

  login(dadosLogin: { nome: string; senha: string }): Observable<string> {
  return this.http.post(this.apiUrl, dadosLogin, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'
  });
}



}
