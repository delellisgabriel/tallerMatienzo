import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-gen-rep',
  templateUrl: './gen-rep.component.html',
  styleUrls: ['./gen-rep.component.css']
})
export class GenRepComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.auth.isLoged()) { this.router.navigate(['/404']); }
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
