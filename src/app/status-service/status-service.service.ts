import { Injectable } from '@angular/core';
import { DatabaseService } from "../database/database.service";

@Injectable()
export class StatusService {

  constructor(private database: DatabaseService) { }

  updateStatus(id: any, status: string) {
    console.log(id + " " + status);
    var vehiculo = {
      idVehiculo: id,
    }
    console.log(vehiculo);
    var vehiculoUPDT = {};
    vehiculoUPDT['estatus'] = status;
    console.log(vehiculoUPDT);
    this.database.changeThis('ModeloVehiculos', vehiculo, vehiculoUPDT)
      .then((res) => {
        console.log(vehiculo['idVehiculo'] + ' ' +status + ' success');
      })
      .catch((err) => {
        console.log(err);
      });


  }

}
