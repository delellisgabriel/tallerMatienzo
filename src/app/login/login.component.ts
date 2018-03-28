import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  user = {
    Password: '',
    Correo: '',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  Login() {
    this.authService.login(this.user).then((result) => {
      if (result.hasOwnProperty('resultado')) {
        if (result["resultado"][0]) {
          var id = result["resultado"][0].idUsuario;
          if (id) {
            this.router.navigate(['dashclient']);
          } else {
            document.getElementById("popup").hidden = false;
          }
        } else {
          document.getElementById("popup").hidden = false;
        }
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    document.getElementById("popup").hidden = true;
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
