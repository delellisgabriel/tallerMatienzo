import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email-service.service";

declare var $: any;

@Component({
  selector: 'app-colacitas',
  templateUrl: './colacitas.component.html',
  styleUrls: ['./colacitas.component.css']
})
export class ColacitasComponent implements OnInit, AfterViewInit {

  colaCitas = [];

  loading = true;

  constructor(private database: DatabaseService, private email: EmailService) { }

  ngOnInit() {
    this.database.getMe('ModeloCitas')
      .then((result) => {
        this.colaCitas = result['resultado'];
        this.loading = false;
        console.log(this.colaCitas);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public asignar(cita) {
    console.log(cita);
    var texto = 'Estimado ' + cita.Usuario.PrimerNombre + ',\nLe informamos que la cita que solicitó para su vehículo ' + cita.Vehiculo.Marca +
      " " + cita.Vehiculo.Modelo +
      ' se asigno para el dia ' + cita.FechaAsignada + '\n\nSu codigo identificador del vehiculo es el siguiente: **QR AQUI**';
    this.email.enviarEmail(cita['Usuario']['Correo'], 'Cita asignada', texto).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err); });

  }

  public rechazar(cita) {
    var texto = 'Su cita no pudo ser asignada ya que no tenemos capacidad para recibir mas autos en esas fechas'
      +         ', le pedimos disculpas y que por favor solicite otra cita para otro rango de fechas.';
    this.email.enviarEmail(cita['Usuario']['Correo'], 'Su cita no pudo ser asignada', texto).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err); });

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
