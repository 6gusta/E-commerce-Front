import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PixResponse {
  payload: string;
  qrcodeBase64: string;
}

@Injectable({
  providedIn: 'root'
})
export class PixService {
   private apiUrl = 'http://localhost:8080/pix/pix/qrcode';

  constructor(private http: HttpClient) { }

   gerarPixQRCode(): Observable<PixResponse> {
    return this.http.get<PixResponse>(this.apiUrl);
  }
}
