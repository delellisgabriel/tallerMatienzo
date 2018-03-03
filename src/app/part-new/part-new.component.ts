import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-part-new',
  templateUrl: './part-new.component.html',
  styleUrls: ['./part-new.component.css']
})
export class PartNewComponent implements OnInit {

  repuesto = {};

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  agregarRepuesto() {
    this.database.addThis('ModeloRepuestos', this.repuesto).then((res) => {
      console.log(res);
      this.router.navigate(['/parts-manage']);
    }).catch((err) => { console.log(err)});
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
