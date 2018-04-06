import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";
import {ReporteService} from '../reporte/reporte.service';
import {DatabaseService} from '../database/database.service';

declare var $: any;

@Component({
  selector: 'app-gen-rep',
  templateUrl: './gen-rep.component.html',
  styleUrls: ['./gen-rep.component.css']
})
export class GenRepComponent implements OnInit, AfterViewInit {

  datosReporte: any = {
    FechaInicial: undefined,
    FechaFinal: undefined,
    Modelo: undefined,
    Excel: false,
    PDF: false
  };

  usuarios: any = [];

  mecanicos: any = [];

  vehiculos: any = [];

  constructor(private auth: AuthService, private router: Router, private reportes: ReporteService,
              private db: DatabaseService) { }

  ngOnInit() {
    if (!(this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.db.getMe('ModeloUsuarios').then((resp) => {
      const usuariox = (resp as any).resultado;
      this.usuarios = usuariox;
      let cadena = '';
      for (let i = 0; i < this.usuarios.length; i++) {
        const usuario = this.usuarios[i];
        switch (usuario.Rol) {
          case 0:
            cadena = 'Cliente';
            break;
          case 1:
            cadena = 'Gerente';
            break;
          case 2:
            cadena = 'Administrador';
            break;
          case 3:
            cadena = 'Mecánico';
            this.mecanicos.push(this.usuarios[i]);
            break;
        }
        this.usuarios[i].Rol = cadena;
      }
    }).catch((err) => console.error(err));
    this.db.getMe('ModeloVehiculos').then((resp) => {
      const vehiculos = (resp as any).resultado;
      this.vehiculos = vehiculos;
    }).catch((err) => console.error(err));
  }

  excel() {
    this.datosReporte.Excel = !this.datosReporte.Excel;
  }

  pdf() {
    this.datosReporte.PDF = !this.datosReporte.PDF;
  }

  reporteModelo() {
    if (this.datosReporte.Excel || this.datosReporte.PDF) {
      this.reportes.generarReporte(this.datosReporte.Excel, this.datosReporte.PDF, this.datosReporte.FechaInicial,
        this.datosReporte.FechaFinal, undefined, undefined, this.datosReporte.Modelo, false);
    }
  }

  reporteMecanico(mecanico: object) {
    if (this.datosReporte.Excel || this.datosReporte.PDF) {
      this.reportes.generarReporte(this.datosReporte.Excel, this.datosReporte.PDF, this.datosReporte.FechaInicial,
        this.datosReporte.FechaFinal, {
          idUsuario: (mecanico as any).idUsuario
        }, undefined, undefined, true);
    }
  }

  reporteVehiculo(vehiculo: object) {
    if (this.datosReporte.Excel || this.datosReporte.PDF) {
      this.reportes.generarReporte(this.datosReporte.Excel, this.datosReporte.PDF, this.datosReporte.FechaInicial,
        this.datosReporte.FechaFinal, undefined, {
          idVehiculo: (vehiculo as any).idVehiculo
        }, undefined, false);
    }
  }

  reporteUsuario(usuario: object) {
    if (this.datosReporte.Excel || this.datosReporte.PDF) {
      this.reportes.generarReporte(this.datosReporte.Excel, this.datosReporte.PDF, this.datosReporte.FechaInicial,
        this.datosReporte.FechaFinal, {
          idUsuario: (usuario as any).idUsuario
        }, undefined, undefined, false);
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
