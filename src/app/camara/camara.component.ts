import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { QrService } from "../qrService/qr.service";
import { CarSelectService } from "../car-select/car-select.service";
import { Router } from "@angular/router";
import { AuthService } from "../authService/auth.service";

declare var $: any;

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent implements OnInit {

  @ViewChild('videoplayer') videoPlayer: any;
  @ViewChild('canvas') canvas: any;
  public showVideo: any = false;
  public codigoQR: any;
  public cargando: any;

  context: any;

  constructor(private http: HttpClient, private qrService: QrService, private car: CarSelectService, private router: Router, private auth: AuthService) { }

  @Input() width: number;
  @Input() height: number;

  ngOnInit() {
    if (!this.auth.isLoged()) {
      this.router.navigate(['/404']);
      this.cargando = true;
    }
    this.width = 500;
    this.height = 400;
    this.cargando = false;

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


    this.context = this.canvas.nativeElement.getContext('2d');


    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.videoPlayer.nativeElement.src = window.URL.createObjectURL(stream);
          this.videoPlayer.nativeElement.play();
        });
    }
  }

  capture() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.drawImage(this.videoPlayer.nativeElement, 0, 0, this.width, this.height);
    this.showVideo = true;
    this.codigoQR = this.canvas.nativeElement.toDataURL('img/png');
  }

  retake() {
    this.showVideo = false;
  }

  readImg() {
    this.cargando = true;
    this.qrService.leerQR(this.codigoQR)
      .then((resp) => {
        console.log(JSON.parse(resp['resp']['body'])[0]['symbol'][0]['data']);
        if (JSON.parse(resp['resp']['body'])[0]['symbol'][0]['data'] != null) {
          var vehiculo = {
            idVehiculo: Number(JSON.parse(resp['resp']['body'])[0]['symbol'][0]['data']),
          };
          this.car.selectCar(vehiculo);
          this.cargando = false;
          this.router.navigate(['modificararchivo']);
        } else {
          console.log('entre');
          alert('No pudimos encontrar este codigo, porfavor intente de nuevo');
          this.router.navigate(['/dashclient']);
          this.cargando = false;
        }
      })
      .catch((err) => {
        this.cargando = false;
        console.log(err);
      });
  }

}
