import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { CarSelectService } from "../car-select/car-select.service";
import { OrdenSelectService } from "../orden-select/orden-select.service";

declare var $: any;

@Component({
  selector: 'app-autoselected',
  templateUrl: './autoselected.component.html',
  styleUrls: ['./autoselected.component.css']
})
export class AutoselectedComponent implements OnInit, AfterViewInit {

  orden = {};

  vehiculo = {};

  constructor(private ordenSelected: OrdenSelectService, private carSelected: CarSelectService) {}

  ngOnInit() {
    this.orden = this.ordenSelected.getOrden();
    this.vehiculo = this.carSelected.getCar();
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
