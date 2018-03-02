import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../authService/auth.service";
import { SelectControlValueAccessor } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-parts-manage',
  templateUrl: './parts-manage.component.html',
  styleUrls: ['./parts-manage.component.css']
})
export class PartsManageComponent implements OnInit {

  user = {}

  repuestos = [];

  select = {
    Modelos: [],
    Marcas: [],
  };

  buscar = {
    Marca: "",
    Modelo: "",
  }

  constructor(private auth: AuthService, private database: DatabaseService) { }

  ngOnInit() {
    // identificar rol de usuario
    this.user = this.auth.getUser();
   //recibir repuestos de la bd
    this.database.getMe('ModeloRepuestos').then((res) => {
      this.repuestos = res['resultado'];
      this.filtrarDatos();
    }).catch((err) => {
      console.log(err);
    });
  }

  private filtrarDatos() {
    for (var i = 0; i < this.repuestos.length; i++) {
      if (this.repuestos[i]) {
        //Agregar diferentes marcas al select
        if (!this.existeMarca(this.repuestos[i]['Marca'])){
          this.select.Marcas[this.select.Marcas.length] = this.repuestos[i]['Marca'];
        }
        //Agregar diferentes Modelos al select
        if (!this.existeModelo(this.repuestos[i]['Modelo'])) {
          this.select.Modelos[this.select.Modelos.length] = this.repuestos[i]['Modelo'];
        }
      }
    }
    console.log(this.select);
  }

    existeMarca(marca: string): boolean {
    for (var i = 0; i < this.select.Marcas.length; i++) {
      if (marca === this.select.Marcas[i]) {
        return true;
      }
    }
    return false;
    }

    existeModelo(modelo: string): boolean {
      for (var i = 0; i < this.select.Modelos.length; i++) {
        if (modelo === this.select.Modelos[i]) {
          return true;
        }
      }
      return false;
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
