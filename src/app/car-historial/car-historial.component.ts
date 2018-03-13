import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { CarSelectService } from "../car-select/car-select.service";
import { OrdenSelectService } from "../orden-select/orden-select.service";
import { Router } from "@angular/router";
import { AuthService } from "../authService/auth.service";

declare var $: any;

@Component({
  selector: 'app-car-historial',
  templateUrl: './car-historial.component.html',
  styleUrls: ['./car-historial.component.css']
})
export class CarHistorialComponent implements OnInit {

  vehiculo = {
    idVehiculo: 0,
  };

  carModified = {};

  ordenes = [];

  constructor(private database: DatabaseService, private carSelect: CarSelectService, private orden: OrdenSelectService,
              private router: Router, private auth: AuthService) { }

  deshabilitar() {
    this.carModified['Activado'] = false;
    this.database.changeThis('ModeloVehiculos', this.vehiculo, this.carModified).then((res) => {
      console.log(res);
      this.router.navigate(['dashclient', this.auth.getUser()['idUsuario']]);
    });
  }

  detallesOrden(orden: object) {
    this.orden.ordenSelect(orden);
    this.router.navigate(['autoselected', orden['idOrdenReparacion']]);
  }

  ngOnInit() {
    this.vehiculo.idVehiculo = Number(this.carSelect.getCar()['idVehiculo']);
    console.log(this.vehiculo)
    this.database.getMe('ModeloOrdenReparacion', this.vehiculo).then((result) => {
      console.log(result);
      this.ordenes = result['resultado'];

      for (var i = 0; i < this.ordenes.length; i++) {
        if (this.ordenes[i]['Completada'] === '000') {
          this.ordenes[i]['Completada'] = 'En Curso';
        } else if (this.ordenes[i]['Completada'] === '001') {
          this.ordenes[i]['Completada'] = 'Cerrada';
        }
      }
      console.log(this.ordenes);

    });

  }

  ngAfterViewInit() {

    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $('.parallax').parallax();

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

    $('.modal').modal();
    $('select').material_select();

  }

}
