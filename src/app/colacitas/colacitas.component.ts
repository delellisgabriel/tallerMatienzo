import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { DatabaseService } from "../database/database.service";
import { EmailService } from "../email/email-service.service";
import { QrService } from "../qrService/qr.service";
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";
import { StatusService } from "../status-service/status-service.service";
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-colacitas',
  templateUrl: './colacitas.component.html',
  styleUrls: ['./colacitas.component.css']
})
export class ColacitasComponent implements OnInit, AfterViewInit {

  colaCitas = [];

  loading = true;

  constructor(private database: DatabaseService, private email: EmailService, private qr: QrService, private router: Router, private auth: AuthService, private carStatus: StatusService ) { }

  async ngOnInit() {
    if (!(await this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.database.getMe('ModeloCitas')
      .then((result) => {
        this.colaCitas = result['resultado'];
        for (let i = 0; i < this.colaCitas.length; i++) {
          this.colaCitas[i].FechaTentativaInicial = moment(this.colaCitas[i].FechaTentativaInicial).format('DD/MM/YYYY');
          this.colaCitas[i].FechaTentativaFinal = moment(this.colaCitas[i].FechaTentativaFinal).format('DD/MM/YYYY');
        }
        this.loading = false;
        console.log(this.colaCitas);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async asignar(cita) {
    console.log(cita);
    var FotoQr;
    await this.qr.crearQR(JSON.stringify(cita.Vehiculo.idVehiculo), '300').then((res) => {
      console.log(res);
      FotoQr = res['resp'];
    }).catch((err) => {
      console.log(err);
      });
    var texto = '<table><tr><td style="" align="center"><h2 style="text-align: center; background-color: ;">Taller Matienzo - Cita</h2></td></tr><tr><td align="center"><b>Estimado ' + cita.Usuario.PrimerNombre + ' </b>,<br><br>Le informamos que la cita solicitada para su vehículo ' + cita.Vehiculo.Marca + " " + cita.Vehiculo.Modelo + ' ha sido aprobada y asignada para el dia ' + cita.FechaAsignada + '.<br>Su código identificador del vehículo es el siguiente:<br></tr><td align="center"><img style="width: 125px; height: 125px;" src="' + FotoQr + '" alt="Código QR"></td><br><br><br><tr><td align="center">Dirección: Distribuidor Universidad Autopista Petare- Guarenas.Urbanización Terrazas del Ávila.</td></tr></table>';
    await this.email.enviarEmail(cita['Usuario']['Correo'], 'Cita asignada', texto).then((res) => {
      console.log(res);
      this.router.navigate(['/dashclient']);
    }).catch((err) => { console.log(err); });



  }

  public rechazar(cita) {
    var texto = 'Su cita no pudo ser asignada ya que no tenemos capacidad para recibir mas autos en esas fechas'
      +         ', le pedimos disculpas y que por favor solicite otra cita para otro rango de fechas.';
    this.email.enviarEmail(cita['Usuario']['Correo'], 'Su cita no pudo ser asignada', texto).then((res) => {
      console.log(res);
      this.carStatus.updateStatus(cita['Vehiculo']['idVehiculo'], 'Normal');
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
