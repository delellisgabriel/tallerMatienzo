import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { CarSelectService } from "../car-select/car-select.service";
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";

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
  };

  constructor(private car: CarSelectService, private database: DatabaseService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/404']); }
    this.user = this.auth.getUser();
    this.vehiculo = this.car.getCar();
    console.log(this.vehiculo);
    this.orden.idVehiculo = this.vehiculo['idVehiculo'];
    this.database.getMe('ModeloVehiculos', this.vehiculo)
      .then((res) => {
        this.vehiculo = res['resultado'][0];
      }).catch((err) => {
        console.log(err);
      });

  }

  crearOrden() {
    console.log(this.orden);
    this.database.addThis('ModeloOrdenReparacion', this.orden)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
