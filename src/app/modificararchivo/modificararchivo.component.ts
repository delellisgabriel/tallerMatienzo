import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarFavComponent } from '../side-bar-fav/side-bar-fav.component';
import { CarSelectService } from "../car-select/car-select.service";
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../authService/auth.service";
import { Router } from "@angular/router";
import { StatusService } from "../status-service/status-service.service";
import { OrdenSelectService } from "../orden-select/orden-select.service";


declare var $: any;

@Component({
  selector: 'app-modificararchivo',
  templateUrl: './modificararchivo.component.html',
  styleUrls: ['./modificararchivo.component.css']
})
export class ModificararchivoComponent implements OnInit, AfterViewInit {

  public detailsImg = [];

  public user: any;

  public vehiculo: any;

  public orden = {
    idVehiculo: 0,
    FechaRecepcion: '',
    Cauchos: '',
    Llaves: '',
    Gato: '',
    Herramientas: '',
    EquipoSonido: '',
    Otros: '',
    Carroceria: '00000000',
    Mecanico: '',
    Diagnostico: '',
    Repuestos: [],
  };

  public listaMecanicos = [];

  constructor(private car: CarSelectService,
              private database: DatabaseService,
              private auth: AuthService,
              private router: Router,
              private carStatus: StatusService,
              private selectedOrder: OrdenSelectService,
  ) {

    this.defineDetails();

    this.getMecanicos();
  }

  ngOnInit() {
    if (!(this.selectedOrder.getOrden() === {})) { this.orden = this.selectedOrder.getOrden() }
    if (!this.auth.isLoged()) { this.router.navigate(['/login']); }
    this.user = this.auth.getUser();
    this.getMecanicos();
    this.vehiculo = this.car.getCar();
    delete this.vehiculo['Usuario'];
    delete this.vehiculo['Activado'];
    delete this.vehiculo['FotoVehiculo'];
    this.orden.idVehiculo = this.vehiculo['idVehiculo'];
    this.database.getMe('ModeloVehiculos', this.vehiculo)
      .then((res) => {
        this.vehiculo = res['resultado'][0];
      }).catch((err) => {
        console.log(err);
      });
    this.calculateDetails();
  }

  async getMecanicos() {
    var mecanico = { Rol: 3 }
    await this.database.getMe('ModeloUsuarios', mecanico).then((resp) => {
      this.listaMecanicos = resp['resultado'];
    })
  }

  guardarChain() {
    var chain = '';
    for (let img of this.detailsImg) {
      chain = chain + img.active;
    }
    chain = (this.Bin2Hex(chain).toString());
    for (let i = 8 - chain.length; i > 0; i--) {
      chain = "0" + chain;
    }
    this.orden.Carroceria = chain;
  }

   crearOrden() {
     this.guardarChain();
     this.database.addThis('ModeloOrdenReparacion', this.orden)
      .then((res) => {
        this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Reparando');
        this.router.navigate(['/dashclient']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cerrar() {
    var ordenCerrada = {};
    ordenCerrada['Completada'] = true;
    this.database.changeThis('ModeloOrdenReparacion', this.orden, ordenCerrada).then((resp) => {
      alert('Orden cerrada exitosamente');
      this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Normal');
    }
    );
  }

  Terminar() {
    this.database.addThis('ModeloOrdenReparacion', this.orden)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.carStatus.updateStatus(this.vehiculo['idVehiculo'], 'Listo');
  }

 checkHex(n) { return /^[0-9A-Fa-f]{1,64}$/.test(n) }
 Hex2Bin(n) { if (!this.checkHex(n)) return 0; return parseInt(n, 16).toString(2) }
 checkBin(n) { return /^[01]{1,64}$/.test(n) }
 Bin2Hex(n) { if (!this.checkBin(n)) return 0; return parseInt(n, 2).toString(16) }

  calculateDetails() {

    //calcula la secuencia de trues y false
    var chain = this.Hex2Bin(this.orden.Carroceria);
    for (let i = 32 - chain.toString().length; i > 0; i--) {
      chain = "0" + chain.toString()
    }
    for (let i = 0; i < chain.toString().length; i++) {
      this.detailsImg[i].active = chain[i];
    }
    this.asignImg();
  }

  asignImg() {
    //asigna los true y false a las imagenes para iniciar
    for (let img of this.detailsImg) {
      if (img.active === "0") {
        img.img = img.imgURL;
      } else if (img.active === "1") {
        img.img = img.activeImgURL;
      }
      else {
        console.log('err');
      }
    }
  }

  changeDetails(num: any) {
    var img = this.detailsImg[num];
    if (img.active === "0") {
      img.active = "1";
    } else if (img.active === "1") {
      img.active = "0";
    }
    else {
      console.log('err');
    }
    if (img.active === "0") {
      img.img = img.imgURL;
    } else if (img.active === "1") {
      img.img = img.activeImgURL;
    }
    else {
      console.log('err');
    }
  }

  defineDetails() {//Imagenes de vista Frontal
    this.detailsImg[0] = {
      img: '',
      activeImgURL: 'assets/Front1_Mark.png',
      imgURL: 'assets/Front1_NoMark.png',
      active: ''
    };
    this.detailsImg[1] = {
      img: '',
      activeImgURL: 'assets/Front2_Mark.png',
      imgURL: 'assets/Front2_NoMark.png',
      active: ''
    };
    this.detailsImg[2] = {
      img: '',
      activeImgURL: 'assets/Front3_Mark.png',
      imgURL: 'assets/Front3_NoMark.png',
      active: ''
    };
    this.detailsImg[3] = {
      img: '',
      activeImgURL: 'assets/Front4_Mark.png',
      imgURL: 'assets/Front4_NoMark.png',
      active: ''
    };
    this.detailsImg[4] = {//Imagenes de Vista Trasera
      img: '',
      activeImgURL: 'assets/Back1_Mark.png',
      imgURL: 'assets/Back1_NoMark.png',
      active: ''
    };
    this.detailsImg[5] = {
      img: '',
      activeImgURL: 'assets/Back2_Mark.png',
      imgURL: 'assets/Back2_NoMark.png',
      active: ''
    };
    this.detailsImg[6] = {
      img: '',
      activeImgURL: 'assets/Back3_Mark.png',
      imgURL: 'assets/Back3_NoMark.png',
      active: ''
    };
    this.detailsImg[7] = {
      img: '',
      activeImgURL: 'assets/Back4_Mark.png',
      imgURL: 'assets/Back4_NoMark.png',
      active: ''
    };//Imagenes vista lateral copiloto
    this.detailsImg[8] = {
      img: '',
      activeImgURL: 'assets/Lat1_Mark.png',
      imgURL: 'assets/Lat1_NoMark.png',
      active: ''
    };
    this.detailsImg[9] = {
      img: '',
      activeImgURL: 'assets/Lat2_Mark.png',
      imgURL: 'assets/Lat2_NoMark.png',
      active: ''
    };
    this.detailsImg[10] = {
      img: '',
      activeImgURL: 'assets/Lat3_Mark.png',
      imgURL: 'assets/Lat3_NoMark.png',
      active: ''
    };
    this.detailsImg[11] = {
      img: '',
      activeImgURL: 'assets/Lat4_Mark.png',
      imgURL: 'assets/Lat4_NoMark.png',
      active: ''
    };
    this.detailsImg[12] = {
      img: '',
      activeImgURL: 'assets/Lat5_Mark.png',
      imgURL: 'assets/Lat5_NoMark.png',
      active: ''
    };
    this.detailsImg[13] = {
      img: '',
      activeImgURL: 'assets/Lat6_Mark.png',
      imgURL: 'assets/Lat6_NoMark.png',
      active: ''
    };//Imagenes Top View
    this.detailsImg[14] = {
      img: '',
      activeImgURL: 'assets/Top1_Mark.png',
      imgURL: 'assets/Top1_NoMark.png',
      active: ''
    };
    this.detailsImg[15] = {
      img: '',
      activeImgURL: 'assets/Top2_Mark.png',
      imgURL: 'assets/Top2_NoMark.png',
      active: ''
    };
    this.detailsImg[16] = {
      img: '',
      activeImgURL: 'assets/Top3_Mark.png',
      imgURL: 'assets/Top3_NoMark.png',
      active: ''
    };
    this.detailsImg[17] = {
      img: '',
      activeImgURL: 'assets/Top4_Mark.png',
      imgURL: 'assets/Top4_NoMark.png',
      active: ''
    };
    this.detailsImg[18] = {
      img: '',
      activeImgURL: 'assets/Top5_Mark.png',
      imgURL: 'assets/Top5_NoMark.png',
      active: ''
    };
    this.detailsImg[19] = {
      img: '',
      activeImgURL: 'assets/Top6_Mark.png',
      imgURL: 'assets/Top6_NoMark.png',
      active: ''
    };
    this.detailsImg[20] = {
      img: '',
      activeImgURL: 'assets/Top7_Mark.png',
      imgURL: 'assets/Top7_NoMark.png',
      active: ''
    };
    this.detailsImg[21] = {
      img: '',
      activeImgURL: 'assets/Top8_Mark.png',
      imgURL: 'assets/Top8_NoMark.png',
      active: ''
    };
    this.detailsImg[22] = {
      img: '',
      activeImgURL: 'assets/Top9_Mark.png',
      imgURL: 'assets/Top9_NoMark.png',
      active: ''
    };
    this.detailsImg[23] = {
      img: '',
      activeImgURL: 'assets/Top10_Mark.png',
      imgURL: 'assets/Top10_NoMark.png',
      active: ''
    };
    this.detailsImg[24] = {
      img: '',
      activeImgURL: 'assets/Top11_Mark.png',
      imgURL: 'assets/Top11_NoMark.png',
      active: ''
    };
    this.detailsImg[25] = {
      img: '',
      activeImgURL: 'assets/Top12_Mark.png',
      imgURL: 'assets/Top12_NoMark.png',
      active: ''
    };
    this.detailsImg[26] = {//Imagenes laterales piloto
      img: '',
      activeImgURL: 'assets/Lat1_Mark.png',
      imgURL: 'assets/Lat1_NoMark.png',
      active: ''
    };
    this.detailsImg[27] = {
      img: '',
      activeImgURL: 'assets/Lat2_Mark.png',
      imgURL: 'assets/Lat2_NoMark.png',
      active: ''
    };
    this.detailsImg[28] = {
      img: '',
      activeImgURL: 'assets/Lat3_Mark.png',
      imgURL: 'assets/Lat3_NoMark.png',
      active: ''
    };
    this.detailsImg[29] = {
      img: '',
      activeImgURL: 'assets/Lat4_Mark.png',
      imgURL: 'assets/Lat4_NoMark.png',
      active: ''
    };
    this.detailsImg[30] = {
      img: '',
      activeImgURL: 'assets/Lat5_Mark.png',
      imgURL: 'assets/Lat5_NoMark.png',
      active: ''
    };
    this.detailsImg[31] = {
      img: '',
      activeImgURL: 'assets/Lat6_Mark.png',
      imgURL: 'assets/Lat6_NoMark.png',
      active: ''
    };
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
      closeOnSelect: false, // Close upon selecting a date,
      format: 'yyyy-mm-dd',
    });

    $('.modal').modal();
    $('select').material_select();

  }
}
