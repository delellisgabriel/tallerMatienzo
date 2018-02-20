import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from "@angular/forms/src/forms";
import { FormBuilder, Validators } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-solicitudcita',
  templateUrl: './solicitudcita.component.html',
  styleUrls: ['./solicitudcita.component.css']
})
export class SolicitudcitaComponent implements OnInit, AfterViewInit {

  userVehiculos = {};

  solicitud = {
    idVehiculo: 0,
    idAux: '',
    idUsuario: '',
    motivo: '',
    fecha_inicial: '',
    fecha_final: '',
  };

  constructor(private authService: AuthService, private database: DatabaseService, private router: Router, public fb: FormBuilder) {
    this.userVehiculos = this.authService.getUser()["Vehiculos"];
  }

  solicitarCita() {
    if (this.solicitud.idAux) {
      this.solicitud.idVehiculo = Number.parseInt(this.solicitud.idAux);
      delete this.solicitud.idAux;
    }
    this.solicitud.idUsuario = this.authService.getUser()['idUsuario'];
    this.solicitud.fecha_inicial = this.database.dateFormatter(this.solicitud.fecha_final);
    this.solicitud.fecha_final = this.database.dateFormatter(this.solicitud.fecha_final);

    console.log(this.solicitud); // Cuando esta vaina bote el objeto que es. Podemos descomentar

    /* this.database.addThis('ModeloCitas', this.vehiculoSelected).then((result) => {
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

    $('.modal').modal();
    $('select').material_select();

  }
}
