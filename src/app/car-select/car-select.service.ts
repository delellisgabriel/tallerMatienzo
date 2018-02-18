import { Injectable } from '@angular/core';

@Injectable()
export class CarSelectService {

  car = {};

  constructor() { }

  selectCar(car: object) {
    this.car = car;
  }

  getCar() {

    return this.car;
  }

}
