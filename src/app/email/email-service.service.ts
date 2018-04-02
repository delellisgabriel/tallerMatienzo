import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { base } from '../base';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const codigo = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

@Injectable()
export class EmailService {

  private remitente = 'tallermatienzo@tm.com';
  private password = 'gabogabomax';

  constructor(private http: HttpClient) { }

  enviarEmail(email: String, subject: String, html: String): Promise<Object> {
    return this.http.post(base, {
      email,
      html,
      subject,
      remitente: this.remitente,
      password: this.password,
      seguridad: codigo
    }).toPromise();
  }

}
