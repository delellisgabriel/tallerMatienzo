import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { DatabaseService } from "../database/database.service";

declare var $: any;

@Component({
  selector: 'app-colacitas',
  templateUrl: './colacitas.component.html',
  styleUrls: ['./colacitas.component.css']
})
export class ColacitasComponent implements OnInit, AfterViewInit {

  colaCitas = [];

  loading = true;

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.database.getMe('ModeloCitas')
      .then((result) => {
        this.colaCitas = result['resultado'];
        this.loading = false;
        console.log(this.colaCitas);
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
