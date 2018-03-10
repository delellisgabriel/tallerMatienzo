import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CamaraService } from "./camara.service";
import { HttpClient } from "@angular/common/http";

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
  public json = {
    MAX_FILE_SIZE: 1048576,
    file: '',
  };

  context: any;

  constructor(private camaraService: CamaraService, private http: HttpClient) { }

  @Input() width: number;
  @Input() height: number;

  ngOnInit() {
    this.width = 500;
    this.height = 400;

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
    console.log(this.canvas.nativeElement);
    this.codigoQR = this.canvas.nativeElement.toDataURL('img/png');
    console.log(this.codigoQR);
  }

  retake() {
    this.showVideo = false;
  }

  readImg() {
    var base = 'http://api.qrserver.com/v1/read-qr-code/';
    this.json.file = this.codigoQR;
    this.http.post(base, this.json)
      .subscribe((res) => {
        console.log(res);
    }, (err) => {
      console.log(err);
      });
  }

}
