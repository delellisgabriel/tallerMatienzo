import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-carregister',
  templateUrl: './carregister.component.html',
  styleUrls: ['./carregister.component.css']
})
export class CarregisterComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService, private databaseService: DatabaseService, private router: Router) { }

  file: File;

  user = {
    idUsuario: '',
  };

  vehiculo = {
    Marca: '',
    Modelo: '',
    Color: '',
    SerialMotor: '',
    Placa: '',
    Activado: 1,
    Ano: '',
    FotoVehiculo: null,
    Usuario_idUsuario: '',
  };

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/404']); }
    this.user.idUsuario = this.auth.getUser()["idUsuario"];

  }

  carRegister() {
    this.vehiculo.Usuario_idUsuario = this.user.idUsuario;
    console.log(this.vehiculo);
    this.databaseService.addThis('ModeloVehiculos', this.vehiculo).then((result) => {
      this.router.navigate(['/mycars', this.user.idUsuario]);
   }).catch((err) => { console.log(err); });
  }

  onChange(evt: EventTarget) {
    console.log(evt);
    this.databaseService.loadImage2Base64(evt).then((algo) => {
      this.vehiculo.FotoVehiculo = algo;
    }).catch((err) => console.log(err));
  }

  getVehiculo() {
    return this.vehiculo;
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
