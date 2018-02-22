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
    Vehiculos_idVehiculo: 0,
    idAux: '',
    Usuarios_idUsuario: '',
    Motivo: '',
    FechaTentativaInicial: '',
    FechaTentativaFinal: '',
  };
  
  cars: any;

  constructor(private authService: AuthService, private database: DatabaseService, private router: Router, public fb: FormBuilder) {
    this.userVehiculos = this.authService.getUser()["Vehiculos"];
    if(this.userVehiculos){
    if (this.userVehiculos[0] == null) {
      this.cars = false;
    } else {
      this.cars = true;
    }
    }
  }

  solicitarCita() {
    if (this.solicitud.idAux) {
      this.solicitud.Vehiculos_idVehiculo = Number.parseInt(this.solicitud.idAux);
      delete this.solicitud.idAux;
    }
    this.solicitud.Usuarios_idUsuario = this.authService.getUser()['idUsuario'];
    this.solicitud.FechaTentativaInicial = this.database.dateFormatter(this.solicitud.FechaTentativaInicial);
    this.solicitud.FechaTentativaFinal = this.database.dateFormatter(this.solicitud.FechaTentativaFinal);

    this.database.addThis('ModeloCitas', this.solicitud).then((result) => {
      console.log(result); //Esto deberia botar True
      if (result['resultado'] == true) {
        this.router.navigate(['/mycars', this.authService.getUser()["idUsuario"]]);
      } else {
        console.log('Algo Salio Mal');
      }
    }).catch((err) => {
      console.log(err)
    });

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
