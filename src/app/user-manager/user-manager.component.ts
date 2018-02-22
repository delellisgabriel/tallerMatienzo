import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { DatabaseService } from '../database/database.service';
import { UserSelectService } from '../user-select/user-select.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit, AfterViewInit {

  userBuscado = {
    PrimerNombre: '',
  }

   users = [];

  constructor(private database: DatabaseService, private userSelect: UserSelectService, private router: Router) { }

  buscar() {
    this.database.getMe('ModeloUsuarios', this.userBuscado).then((result) => {
      var array = $.map(result["resultado"], function (value, index) {
        return value;
      });
      this.users = array;
      this.formatearRol();
      console.log(this.users);
    });
  }

  private formatearRol() {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].Rol === 0) {
        this.users[i].Rol = 'Cliente';
      } else if (this.users[i].Rol === 1) {
        this.users[i].Rol = 'Gerente';
      } else if (this.users[i].Rol === 2) {
        this.users[i].Rol = 'Administrador';
      } else if (this.users[i].Rol === 3) {
        this.users[i].Rol = 'Mecanico';
      }
    }
  }

  selectUser(user: object) {
    console.log(user);
    this.userSelect.selectUser(user);
    this.router.navigate(['userdetail', user['idUsuario']]);

  }

  ngOnInit() {
    this.database.getMe('ModeloUsuarios')
      .then((result) => {
        this.users = result['resultado'];
        this.formatearRol();
      })
      .catch((err) => {
        console.log(err);
      });
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
