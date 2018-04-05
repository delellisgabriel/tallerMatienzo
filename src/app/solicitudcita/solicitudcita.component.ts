import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { AuthService } from '../authService/auth.service';
import { DatabaseService } from '../database/database.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from "@angular/forms/src/forms";
import { FormBuilder, Validators } from '@angular/forms';
import { SelectControlValueAccessor } from '@angular/forms';

import { FormControl, FormGroup } from '@angular/forms';
import { EmailService } from "../email/email-service.service";
import { StatusService } from "../status-service/status-service.service";
declare var $: any;

@Component({
  selector: 'app-solicitudcita',
  templateUrl: './solicitudcita.component.html',
  styleUrls: ['./solicitudcita.component.css']
})
export class SolicitudcitaComponent implements OnInit, AfterViewInit {

  //vehiculos registrados por el usuario
  userVehiculos: any = {};

  // form para la solicitud de la cita
  solicitud: any = {
  };
  //spinner mientras cargamos
cargando: any;
  // boolean si tiene carros o no.
  cars: any;

  constructor(private auth: AuthService, private database: DatabaseService, private router: Router, public fb: FormBuilder, private email: EmailService, private carStatus: StatusService) {

  }

  async bringUser() {
    const temporal = await this.auth.getUser();
    this.solicitud.Usuarios_idUsuario = (temporal as any).idUsuario;
  }
  //enviar los datos para registrar la cita
  solicitarCita() {
    if (this.solicitud.idAux) {
      this.solicitud.Vehiculos_idVehiculo = Number.parseInt(this.solicitud.idAux);
      delete this.solicitud.idAux;
    }
    this.bringUser();
    //POST
    this.database.addThis('ModeloCitas', this.solicitud).then(async (result) => {
      if (result['resultado'] == true) {
        //Cambiamos el status del vehiculo
        this.carStatus.updateStatus(this.solicitud.Vehiculos_idVehiculo, 'Esperando');
        //Enviamos el correo al usuario
        var user = await this.auth.getUser();
        var texto = 'Su solicitud de cita ha sido recibida por nuestros gerentes exitosamente. \n Por favor, espere mientras revisamos tu solicitud y le asignamos una fecha para recibir su vehiculo. \n Gracias por preferir al TallerMatienzo.';
        this.email.enviarEmail(user['Correo'], 'Cita solicitada', texto).then((res) => {
          console.log(res);
        }).catch((err) => { console.log(err); });
        //Procede a ver sus autos
        this.router.navigate(['/mycars']);
      } else {
        alert('El vehiculo seleccionado ya tiene una cita pendiente.');
      }
    }).catch((err) => {
      console.log(err)
    });
/*<<<<<<< HEAD

    var user = this.auth.getUser();
    var texto = '<b>Su solicitud de cita</b> ha sido recibida por nuestros gerentes exitosamente. \n Por favor, espere mientras revisamos su solicitud y le asignamos una fecha para recibir su vehiculo. \n Gracias por preferir al TallerMatienzo.';
    this.email.enviarEmail(user['Correo'], 'Cita solicitada', texto).then((res) => {
      console.log(res);
    }).catch((err) => { console.log(err); });

=======
>>>>>>> origin/Entrega3*/
  }


  async ngOnInit() {
    //validamos que haya un usuario logeado

    if (!(await this.auth.isLoged())) { this.router.navigate(['/login']); }
    this.cargando = true;
    //pedimos los carros activos
    var carros = {
      idUsuario: 0,
      Activado: true,
    };
    //get
    const temporal = await this.auth.getUser();
    carros.idUsuario = temporal.idUsuario;
    console.log(carros);
    this.database.getMe('ModeloVehiculos', carros).then((resp) => {
      console.log(resp['resultado']);
      this.userVehiculos = resp['resultado'];
      if (this.userVehiculos) {
        if (this.userVehiculos[0] == null) {
          this.cars = false;
          this.cargando = false;
        } else {
          this.cars = true;
          this.cargando = false;
        }

      }
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
