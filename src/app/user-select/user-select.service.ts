import { Injectable } from '@angular/core';

@Injectable()
export class UserSelectService {

  user = {};

  constructor() { }

  selectUser(user: object) {
this.user = user;
  }

  getUser() {

    return this.user;
  }

}
