import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { UserSelectService } from '../user-select/user-select.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, AfterViewInit {

  private userViejo = {
    idUsuario: '',
  }

  private userSelected = {};

  constructor(private userSelect: UserSelectService, private database: DatabaseService,) { }

  ngOnInit() {
    document.getElementById("popup").hidden = true;
    this.userSelected = this.userSelect.getUser();
    this.userViejo.idUsuario = this.userSelected['idUsuario'];
    if (this.userSelected["Rol"] === 0) {
      this.userSelected["Rol"] = 'Cliente';
    } else if (this.userSelected["Rol"] === 1) {
      this.userSelected["Rol"] = 'Gerente';
    } else if (this.userSelected["Rol"]=== 2) {
      this.userSelected["Rol"] = 'Administrador';
    } else if (this.userSelected["Rol"] === 3) {
      this.userSelected["Rol"] = 'Mecanico';
    }

    this.userSelected["CantVehiculos"] = this.userSelected["Vehiculos"].length;
    

    console.log(this.userViejo);
    console.log(this.userSelected);
  }

  modificarPerfil() {
    delete this.userSelected["CantVehiculos"];
    delete this.userSelected["Vehiculos"];
    console.log(this.userSelected);
    /*   //Esto se descomenta cuando se arreglen los datepickers y los Select!!!!
    this.database.changeThis('ModeloUsuarios', this.userViejo, this.userSelected).then((result) => {
        document.getElementById("popup").hidden = false;
    }); */
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
