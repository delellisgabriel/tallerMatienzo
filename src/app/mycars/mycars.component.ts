import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';

declare var $: any;

@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit, AfterViewInit {

  user = {
    idUsuario: '',
  };

  vehiculos = {};

  constructor(private authService: AuthService, private database: DatabaseService) {
    this.user.idUsuario = this.authService.getUser()['idUsuario'];

    this.database.getMe('ModeloUsuarios', this.user).then((result) => {
      var array = $.map(result["resultado"][0]["Vehiculos"], function (value, index) {
        return [value];
      });
      this.vehiculos = array;
    });
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
