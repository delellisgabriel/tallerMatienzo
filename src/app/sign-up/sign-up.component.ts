import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModeloUsuarios } from '../database/models/ModeloUsuarios';
import { NgModule } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { AuthService} from '../authService/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, AfterViewInit {

  user = {
    PrimerNombre: '',
    SegundoNombre: '',
    PrimerApellido: '',
    SegundoApellido: '',
    Cedula: '',
    Password: '',
    Rol: 0,
    Correo: '',
    Fecha_Nacimiento: '',
  };

  submitted = false;

  constructor(private databaseService: DatabaseService, private router: Router, private auth: AuthService) { }

  SignUp() {
    this.submitted = true;
    const fechaNacimiento = this.databaseService.dateFormatter(this.user.Fecha_Nacimiento);
    const hashed = this.auth.hashAndSalt(this.user.Password);
    this.databaseService.addThis('ModeloUsuarios', {
      PrimerNombre: this.user.PrimerNombre,
      SegundoNombre: this.user.SegundoNombre,
      PrimerApellido: this.user.PrimerApellido,
      SegundoApellido: this.user.SegundoApellido,
      Cedula: this.user.Cedula,
      Password: hashed,
      Rol: this.user.Rol,
      Correo: this.user.Correo,
      Fecha_Nacimiento: fechaNacimiento
    }).then((result) => {
      if (result['resultado'] === false) {
        document.getElementById('popup').hidden = false;
      } else if (result['resultado'] === true) {
        this.router.navigate(['/login']);
      }
    }).catch((err) => { console.log(err); });
  }

  ngOnInit() {
    document.getElementById('popup').hidden = true;
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
