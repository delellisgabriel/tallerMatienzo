import { Injectable } from '@angular/core';

@Injectable()
export class OrdenSelectService {

  orden = {
    idVehiculo: 0,
    FechaRecepcion: '',
    Cauchos: '',
    Llaves: '',
    Gato: '',
    Herramientas: '',
    EquipoSonido: '',
    Otros: '',
    Carroceria: '',
    Mecanico: '',
    Diagnostico: '',
    Repuestos: [],
  };


constructor() { }

ordenSelect(orden:object){
  this.orden = orden;
}

getOrden(){
return this.orden;
}

}
