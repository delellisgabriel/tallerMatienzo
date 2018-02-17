import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from "@angular/forms/src/forms";
declare var $: any;

@Component({
  selector: 'app-solicitudcita',
  templateUrl: './solicitudcita.component.html',
  styleUrls: ['./solicitudcita.component.css']
})
export class SolicitudcitaComponent implements OnInit, AfterViewInit {

  userVehiculos = {};

  solicitud = {
    idVehiculo: '',
    idUsuario: '',
    motivo: '',
    fecha_inicial: '',
    fecha_final: '',
  };

  constructor(private authService: AuthService, private database: DatabaseService, private router: Router) {
    this.userVehiculos = this.authService.getUser()["Vehiculos"];
  }

  solicitarCita(citaForm: NgForm) {
    this.solicitud.idUsuario = this.authService.getUser()['idUsuario'];
    console.log(this.solicitud); //Cuando esta vaina bote el objeto que es. Podemos descomentar
    
    /*
    this.database.addThis('ModeloCitas', this.vehiculoSelected).then((result) => {
      console.log(result); //Esto deberia botar True
      this.router.navigate(['/mycars', this.authService.getUser()["idUsuario"]];
    });
    */
    
  }

  ngOnInit() {
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
