import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {

  currentUser = {};
  loged = false;

  constructor(private http: HttpClient, private database: DatabaseService) {
  }

  login(user: object): Promise<Object> {
    this.database.getMe('ModeloUsuarios', user).then((result) => {
      this.currentUser = result["resultado"][0];
      this.loged = true;
    });
    return this.database.getMe('ModeloUsuarios', user);
  }

  getUser() {
    return this.currentUser;
  }

  isLoged(): boolean {
    return this.loged;

  }
}
