
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {EmailService} from '../email/email-service.service';
import {QrService} from '../qrService/qr.service';
import {DatabaseService} from '../database/database.service';
import {CookieService} from 'ngx-cookie';
import {ReporteService} from '../reporte/reporte.service';
import {AuthService} from '../authService/auth.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private reporte: ReporteService, private auth: AuthService) {
    this.funcionAux();
  }

  async funcionAux() {
    const usuario = await this.auth.getUser();
    this.reporte.generarReporte(true, false, '1992-08-15', '2019-01-01', {
      idUsuario: 13
    }, undefined, 'Focus', true);
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

