import { Injectable } from '@angular/core';

@Injectable()
export class OrdenSelectService {

  orden = {
    Vehiculos_idVehiculo: 0,
    FechaRecepcion: '',
    Cauchos: '',
    Llaves: '',
    Gato: '',
    Herramientas: '',
    EquipoSonido: '',
    Otros: '',
    Carroceria: '',
    Mecanico_idUsuario: 0,
    Diagnostico: '',
    Repuestos: [],
  };


constructor() { }

ordenSelect(orden:any){
  this.orden = orden;
}

getOrden(){
return this.orden;
}

}
