import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import htmlString = JQuery.htmlString;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const base = 'http://localhost:3000/';

@Injectable()
export class EmailService {

  private remitente = '';
  private password = '';

  constructor(private http: HttpClient) { }

  enviarEmail(email: String, subject: String, texto: htmlString, archivo?: File): Promise<Object> {
    return this.http.post(base, {
      email,
      texto,
      archivo,
      subject,
      remitente: this.remitente,
      password: this.password
    }).toPromise();
  }

}
