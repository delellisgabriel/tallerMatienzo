import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base } from '../base';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class QrService {

  private base1 = 'https://api.qrserver.com/v1/create-qr-code/?data=';
  private base2 = '&size=';
  private base3 = 'http://api.qrserver.com/v1/read-qr-code/?fileurl=';
  private password = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

  constructor(private http: HttpClient) { }

  crearQR(datos: string, tamano: string) {
    return this.http.post(base,
      {
        base: this.base1 + datos + this.base2 + tamano + 'x' + tamano,
        password: this.password,
        operacion: 'crear'
      }).toPromise();
  }

  leerQR(fotoBase64: string) {
   return this.http.post(base,
      {
        foto: fotoBase64,
        password: this.password,
        operacion: 'leer',
        base: this.base3
      }).toPromise();
  }
}
