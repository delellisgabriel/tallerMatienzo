import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { CarSelectService } from "../car-select/car-select.service";
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";
import { StatusService } from "../status-service/status-service.service";

declare var $: any;

@Component({
  selector: 'app-modificararchivo',
  templateUrl: './modificararchivo.component.html',
  styleUrls: ['./modificararchivo.component.css']
})
export class ModificararchivoComponent implements OnInit, AfterViewInit {

  public user: any;

  public vehiculo: any;

  public orden = {
    Cauchos: '',
    Llaves: '',
    Gato: '',
    Herramientas: '',
    Carroceria: '',
    EquipoSonido: '',
    Otros: '',
    idVehiculo: 0,
    FechaRecepcion: '',
    Mecanico: {},
  };

  public listaMecanicos = [];

  constructor(private car: CarSelectService, private database: DatabaseService, private auth: AuthService, private router: Router, private carStatus: StatusService) {

    this.getMecanicos();
  }

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/login']); }
    this.user = this.auth.getUser();
    this.getMecanicos();
    this.vehiculo = this.car.getCar();
    delete this.vehiculo['Usuario'];
    delete this.vehiculo['Activado'];
    delete this.vehiculo['FotoVehiculo'];
    this.orden.idVehiculo = this.vehiculo['idVehiculo'];
    this.database.getMe('ModeloVehiculos', this.vehiculo)
      .then((res) => {
        this.vehiculo = res['resultado'][0];
      }).catch((err) => {
        console.log(err);
      });




  }

  async getMecanicos() {
    var mecanico = { Rol: 3 }
    await this.database.getMe('ModeloUsuarios', mecanico).then((resp) => {
      this.listaMecanicos = resp['resultado'];
      console.log(this.listaMecanicos);
    })
  }

  crearOrden() {
    console.log(this.orden);
    this.database.addThis('ModeloOrdenReparacion', this.orden)
      .then((res) => {
        console.log(res);
        this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Reparando');
        this.router.navigate
      })
      .catch((err) => {
        console.log(err);
      });

  }

  cerrar() {
    var ordenCerrada = {};
    ordenCerrada['Completada'] = true;
    this.database.changeThis('ModeloOrdenReparacion', this.orden, ordenCerrada).then((resp) => {
      alert('Orden cerrada exitosamente');
      this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Normal');
    }
    );
  }

  Terminar() {
    this.database.addThis('ModeloOrdenReparacion', this.orden)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Listo');
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
