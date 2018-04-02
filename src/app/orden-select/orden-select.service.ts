import { Injectable } from '@angular/core';

@Injectable()
export class OrdenSelectService {

  orden: any;


constructor() { }

ordenSelect(orden:any){
  this.orden = orden;
}

getOrden(){
return this.orden;
}

}
