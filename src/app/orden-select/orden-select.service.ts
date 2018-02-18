import { Injectable } from '@angular/core';

@Injectable()
export class OrdenSelectService {

orden = {};


  constructor() { }

ordenSelect(orden:object){
  this.orden = orden;
}

getOrden(){
return this.orden;
}

}
