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


  listaCarrosDes = []; /*Lista de carros desactivados*/

  loading = true;

  constructor(private database: DatabaseService, private router: Router, private auth: AuthService) { }

  async ngOnInit() {
    if (!(await this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.database.getMe('ModeloVehiculos')
      .then((result) => {
        this.listaCarrosDes = result['resultado'];
        this.loading = false;
        console.log(this.listaCarrosDes);
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
    $('.modal').modal();
    $('select').material_select();

  }

}
