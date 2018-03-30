import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from "@angular/forms/src/forms";
import { FormBuilder, Validators } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms';
import { EmailService } from "../email/email-service.service";
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

cargando: any;

  cars: any;

  constructor(private auth: AuthService, private database: DatabaseService, private router: Router, public fb: FormBuilder, private email: EmailService) {

  }

  solicitarCita() {
    if (this.solicitud.idAux) {
      this.solicitud.Vehiculos_idVehiculo = Number.parseInt(this.solicitud.idAux);
      delete this.solicitud.idAux;
    }
    this.solicitud.Usuarios_idUsuario = this.auth.getUser()['idUsuario'];

    this.database.addThis('ModeloCitas', this.solicitud).then((result) => {
      console.log(result); //Esto deberia botar True
      if (result['resultado'] == true) {
        this.router.navigate(['/mycars', this.auth.getUser()["idUsuario"]]);
      } else {
        console.log('Algo Salio Mal');
      }
    }).catch((err) => {
      console.log(err)
    });

    var user = this.auth.getUser();
    var texto = '<b>Su solicitud de cita</b> ha sido recibida por nuestros gerentes exitosamente. \n Por favor, espere mientras revisamos su solicitud y le asignamos una fecha para recibir su vehiculo. \n Gracias por preferir al TallerMatienzo.';
    this.email.enviarEmail(user['Correo'], 'Cita solicitada', texto).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err); });

  }

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/404']); }
    this.cargando = true;
    var carros = {
      idUsuario: 0,
      Activado: true,
    }
    carros.idUsuario = this.auth.getUser()['idUsuario'];
    console.log(carros);
    this.database.getMe('ModeloVehiculos', carros).then((resp) => {
      console.log(resp['resultado']);
      this.userVehiculos = resp['resultado'];
      if (this.userVehiculos) {
        if (this.userVehiculos[0] == null) {
          this.cars = false;
          this.cargando = false;
        } else {
          this.cars = true;
          this.cargando = false;
        }

      }
    });

  }

  ngAfterInit() {
    this.userVehiculos = this.auth.getUser()["Vehiculos"];
    if (this.userVehiculos) {
      if (this.userVehiculos[0] == null) {
        this.cars = false;
      } else {
        this.cars = true;
      }
    }
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
