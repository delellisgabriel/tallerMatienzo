import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';
import { CookieService } from 'ngx-cookie';
import * as shajs from 'sha.js';
import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const base = 'http://localhost:3000/';

@Injectable()
export class AuthService {

  private clave = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

  currentUser = {};
  logged = false;

  constructor(private http: HttpClient, private database: DatabaseService, private cookies: CookieService) {
  }

  login(user: object): any {
    return new Promise((resolve, reject) => {
      const hashed = this.hashAndSalt((user as any).Password);
      this.database.getMe('ModeloUsuarios', {
        Correo: (user as any).Correo,
        Password: hashed
      }).then((result) => {
        if ((result as any).resultado.length !== 0) {
          this.currentUser = result['resultado'][0];
          this.http.post(base + 'login', {
            usuario: this.currentUser,
            password: this.clave
          }).toPromise()
            .then((resp) => {
              if ((resp as any).token) {
                if (this.cookies.get('TallerMatienzo') !== (resp as any).token) {
                  this.cookies.put('TallerMatienzo', (resp as any).token);
                }
              }
            });
          this.logged = true;
        }
        resolve(this.currentUser);
      }).catch((err) => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  getUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      if (this.cookies.get('TallerMatienzo')) {
        const token = this.cookies.get('TallerMatienzo');
        this.http.post(base + 'checktoken', {
          token: token,
          password: this.clave
        }).toPromise()
          .then((resp) => {
            if ((resp as any).err) {
              console.error((resp as any).err);
              return null;
            } else if ((resp as any).usuario) {
              this.currentUser = (resp as any).usuario;
              return this.currentUser;
            } else {
              console.error('An unknown error occurred.');
              return null;
            }
          });
      } else {
        return null;
      }
    }
  }

  logout() {
    if (this.currentUser) {
      this.http.post(base + 'logout', {
        token: this.cookies.get('TallerMatienzo'),
        password: this.clave
      }).toPromise()
        .then((resp) => {
          if ((resp as any).err) {
            console.error((resp as any).err);
            return false;
          } else {
            this.cookies.remove('TallerMatienzo');
            this.currentUser = null;
            return true;
          }
        });
    } else {
      return false;
    }
  }

  hashAndSalt(password: string): any {
    let semilla = 0;
    for (let i = 0; i < password.length; i++) {
      semilla += Number.parseInt(password.charAt(i));
    }
    const salt = this.generateSalt(semilla);
    return shajs('sha256').update(password + salt).digest('hex');
  }

  isLoged(): boolean {
    return this.logged;
  }

  private generateSalt(semilla: number): string {
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    let x;
    for (let i = 0; i < 20; i++) {
      x = Math.sin(semilla++) * 10000;
      x -= Math.floor(x);
      x = Math.floor(x * abc.length);
      salt += abc.charAt(x);
    }
    return salt;
  }
}
