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

  constructor(private authService: AuthService, private databaseService: DatabaseService, private router: Router) { }

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
    FotoVehiculo: '',
    Usuario_idUsuario: '',
  }

  ngOnInit() {
    this.user.idUsuario = this.authService.getUser()["idUsuario"];
    console.log(this.user);
  }

  carRegister() {
    this.vehiculo.Usuario_idUsuario = this.user.idUsuario;
    this.databaseService.addThis('ModeloVehiculos', this.vehiculo).then((result) => {
      console.log(result);
      this.router.navigate(['/mycars', this.user.idUsuario]);
    }).catch((err) => { console.log(err);});
    
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
