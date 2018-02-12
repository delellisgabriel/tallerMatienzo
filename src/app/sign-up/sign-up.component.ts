import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModeloUsuarios } from '../database/models/ModeloUsuarios';
import { NgModule } from '@angular/core';
import { DatabaseService } from '../database/database.service';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, AfterViewInit {

  user = {
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Cedula: '',
    Password: '',
    Rol: 0,
    Correo: '',
    Fecha_Nacimiento: '',
  }

  submitted = false;

  constructor(private databaseService: DatabaseService) { }

  SignUp() {
    console.log('enviando:' + this.user.Correo);
    this.submitted = true;
    this.databaseService.addThis('ModeloUsuarios', this.user);
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
