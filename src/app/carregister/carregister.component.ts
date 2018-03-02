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
    this.user.idUsuario = this.authService.getUser()["idUsuario"];
  }

  carRegister() {
    this.vehiculo.Usuario_idUsuario = this.user.idUsuario;
    this.databaseService.addThis('ModeloVehiculos', this.vehiculo).then((result) => {
      this.router.navigate(['/mycars', this.user.idUsuario]);
    }).catch((err) => { console.log(err); });
  }

  onChange(evt: EventTarget) {
      const files = (evt as any).target.files;
      const file = files[0];

      if (files && file) {
        switch(file.type) {
          case 'image/gif':
            break;
          case 'image/jpeg':
            break;
          case 'image/png':
            break;
          case 'image/svg+xml':
            break;
          default:
            return;
        }
        const reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
      }
    }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    this.vehiculo.FotoVehiculo = base64textString;
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
