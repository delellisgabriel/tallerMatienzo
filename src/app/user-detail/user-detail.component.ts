import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { UserSelectService } from '../user-select/user-select.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from "../authService/auth.service";

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

  private userRol: any;

  private userSelected = {};

  constructor(private userSelect: UserSelectService, private database: DatabaseService, private auth: AuthService, private router: Router) { }

  async bringUser() {
    this.userRol = await this.auth.getUser()['Rol'];
  }

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/login']); }
    document.getElementById("popup").hidden = true;
    this.bringUser();
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

  async modificarPerfil() {
    var userNew = this.userSelected;
    delete userNew["CantVehiculos"];
    delete userNew["Vehiculos"];
    this.database.changeThis('ModeloUsuarios', this.userViejo, userNew).then((result) => {
      document.getElementById("popup").hidden = false;
      if (this.userSelected["Rol"] === 0) {
        this.userSelected["Rol"] = 'Cliente';
      } else if (this.userSelected["Rol"] === 1) {
        this.userSelected["Rol"] = 'Gerente';
      } else if (this.userSelected["Rol"] === 2) {
        this.userSelected["Rol"] = 'Administrador';
      } else if (this.userSelected["Rol"] === 3) {
        this.userSelected["Rol"] = 'Mecanico';
      }
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
    $('.modal').modal();
    $('select').material_select();

  }
}
