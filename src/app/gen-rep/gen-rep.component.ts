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
    FechaInicia: undefined,
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

  async ngOnInit() {
    await this.auth.getUser();
    if (!(await this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.db.getMe('ModeloUsuarios').then((resp) => {
      const usuarios = (resp as any).resultado;
      this.usuarios = usuarios;
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
    console.log(this.datosReporte.Modelo);
  }

  reporteMecanico(mecanico: object) {
    console.log(mecanico);
  }

  reporteVehiculo(vehiculo: object) {
    console.log(vehiculo);
  }

  reporteUsuario(usuario: object) {
    console.log(usuario);
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
