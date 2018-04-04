import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../authService/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartsService } from "../parts/parts.service";
import { Router } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-parts-manage',
  templateUrl: './parts-manage.component.html',
  styleUrls: ['./parts-manage.component.css']
})
export class PartsManageComponent implements OnInit {

  public user: any = {}; //esto es el usuario, se recibe bien! nada raro aqui!

  public repuestos: any = []; // Mi lista de repuestos! todo bien aqui!

  public select = {
    Modelos: [],
    Marcas: [],
  };

  public form: FormGroup;

  // este es mi objeto que le voy a pasar a la database para que me busque ese repuesto en especifico.
  public buscar = {
  };

  public emergencia: any = [
    {
      name: 'Todas'
    },
    {
      name: 'Toyota'
    },
    {
      name: 'Ford'
    }
  ];

   constructor(private auth: AuthService, private database: DatabaseService, public fb: FormBuilder, private parts:PartsService, private router: Router) {
    // identificar rol de usuario
     this.bringUser();
    // recibir repuestos de la bd
    this.database.getMe('ModeloRepuestos').then((res) => {
      this.repuestos = res['resultado'];
      this.filtrarDatos();
    }).catch((err) => {
      console.log(err);
      });
  }

   async bringUser() {
     this.user = await this.auth.getUser();
   }

   ngOnInit() {
     if (!this.auth.isLoged()) { this.router.navigate(['/login']); }
     this.formCreate();
  }

  private formCreate() {
    this.form = this.fb.group({
      Marca: ['', Validators.compose([Validators.required])],
      Modelo: ['', Validators.compose([Validators.required])],
      Nombre: ['', Validators.compose([Validators.required])],
    });
  }


  //este es el metodo con el que lleno el objeto select que tiene las array de las marcas y los vehiculos

 filtrarDatos() {
    for (let i = 0; i < this.repuestos.length; i++) { //para cada uno de los repuestos
      if (this.repuestos[i]) { //si el repuesto existe
        // Agregar diferentes marcas al select
        if (!this.existeMarca(this.repuestos[i]['Marca'])){ //veo que no este repetido
          this.select.Marcas[this.select.Marcas.length] = this.repuestos[i]['Marca']; //y lo guardo
        }
        // Agregar diferentes Modelos al select
        if (!this.existeModelo(this.repuestos[i]['Modelo'])) { //veo que no este repetido
          this.select.Modelos[this.select.Modelos.length] = this.repuestos[i]['Modelo']; //y lo guardo
        }
      }
   }
  }

 buscarRepuestos() {
   this.buscar = this.form.value;
   if (this.buscar['Marca'] === "") {
     delete this.buscar['Marca'];
   }
   if (this.buscar['Modelo'] === "") {
     delete this.buscar['Modelo'];
   }
   if (this.buscar['Nombre'] === "") {
     delete this.buscar['Nombre'];
   }
   if (JSON.stringify(this.buscar) === '{}') {
     this.database.getMe('ModeloRepuestos').then((res) => {
       this.repuestos = res['resultado'];
     }).catch((err) => {
       console.log(err);
     });
   } else
   {
     this.database.getMe('ModeloRepuestos', this.buscar).then((res) => {
       this.repuestos = res['resultado'];
     }).catch((err) => {
       console.log(err);
     });
   }

 }

    existeMarca(marca: string): boolean {
    for (let i = 0; i < this.select.Marcas.length; i++) {
      if (marca === this.select.Marcas[i]) {
        return true;
      }
    }
    return false;
    }

    existeModelo(modelo: string): boolean {
      for (let i = 0; i < this.select.Modelos.length; i++) {
        if (modelo === this.select.Modelos[i]) {
          return true;
        }
      }
      return false;
    }

    modificar(repuesto) {
      this.parts.setPart(repuesto);
      this.router.navigate(['/part-modify']);
    }

    detalles(repuesto) {
      this.parts.setPart(repuesto);
      this.router.navigate(['/part-detail']);
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
