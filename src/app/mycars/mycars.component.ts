import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { CarSelectService } from "../car-select/car-select.service";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit, AfterViewInit {

  carro = {
    idUsuario: '',
    Activado: true,
  };

  vehiculos = [];

  loading = true;

  constructor(private auth: AuthService, private database: DatabaseService, private carService: CarSelectService, private router: Router) {

  }


  selectCar(car: object) {
    this.carService.selectCar(car);
    this.router.navigate(['car-historial']);
  }

  async bringUser() {
    
  }

  async ngOnInit() {
    this.carro.idUsuario = await this.auth.getUser()['idUsuario'];
    if (!this.auth.isLoged()) { this.router.navigate(['/login']); }



    this.database.getMe('ModeloVehiculos', this.carro).then((result) => {
      var array = $.map(result["resultado"], function (value, index) {
        return value;
      });
      for (const carro of array) {
        if (carro.FotoVehiculo) {
          carro.FotoVehiculo = this.database.BLOB2Base64(carro.FotoVehiculo.data);
        }
      }
      this.vehiculos = array;
      this.loading = false;
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
