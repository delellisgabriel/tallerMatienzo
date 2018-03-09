import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class QrService {

  private base = 'http://localhost:3000/qr';
  private base1 = 'https://api.qrserver.com/v1/create-qr-code/?data=';
  private base2 = '&size=';
  private password = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

  constructor(private http: HttpClient) { }

  crearQR(datos: string, tamano: string) {
    return this.http.post(this.base,
      {
        base: this.base1 + datos + this.base2 + tamano + 'x' + tamano,
        password: this.password,
        operacion: 'crear'
      }).toPromise();
  }
}
