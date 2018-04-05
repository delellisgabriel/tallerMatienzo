import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { AuthService } from '../authService/auth.service';
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-deactivated-car-list',
  templateUrl: './deactivated-car-list.component.html',
  styleUrls: ['./deactivated-car-list.component.css']
})
export class DeactivatedCarListComponent implements OnInit {


  vehiculosDes: any = []; /*Lista de carros desactivados*/

  selected: any = undefined;

  loading = true;

  usuarios: any = [];

  constructor(private database: DatabaseService, private router: Router, private auth: AuthService) { }

  async ngOnInit() {
    if (!(await this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.database.getMe('ModeloVehiculos')
      .then(async (result) => {
        await this.database.getMe('ModeloUsuarios').then((resp) => {
          this.usuarios = (resp as any).resultado;
          const vehiculos = (result as any).resultado;
          this.loading = false;
          for (const vehiculo of vehiculos) {
            if (Number.parseInt((vehiculo as any).Activado) === 0) {
              this.vehiculosDes.push(vehiculo);
            }
          }
        }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => { console.error(err); });
  }

  activar(usuario: object) {
    if (this.selected !== undefined) {
      const idUsuario = (usuario as any).idUsuario;
      this.database.changeThis('ModeloVehiculos', {
        idVehiculo: this.selected
      }, {
        Activado: 1,
        Usuario_idUsuario: idUsuario
      }).then((resp) => {
        this.router.navigate(['/dashclient']);
        console.log(resp);
      }).catch((err) => { console.error(err); });
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
    $('.modal').modal();
    $('select').material_select();

  }

}
