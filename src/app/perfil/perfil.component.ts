import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatabaseService } from '../database/database.service';

declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {

  user = {};
  userViejo = {
    idUsuario: '',
  };

  constructor(private authService: AuthService, private database: DatabaseService, private router: Router) { }

  modificarPerfil() {
    this.database.changeThis('ModeloUsuarios', this.userViejo, this.user)
      .then((result) => {
        document.getElementById("popup").hidden = false;
      });
  }

  ngOnInit() {
    document.getElementById("popup").hidden = true;
    this.user = this.authService.getUser();
    delete this.user["Vehiculos"];
    this.userViejo.idUsuario = this.authService.getUser()["idUsuario"];
    console.log(this.user, this.userViejo);
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
      closeOnSelect: false, // Close upon selecting a date,
      format: 'yyyy-mm-dd',
    });

    $('.modal').modal();
    $('select').material_select();

  }
}
