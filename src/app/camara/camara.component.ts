import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CamaraService } from "./camara.service";

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

  context: any;

  constructor(private camaraService: CamaraService) { }

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
    console.log(this.context);
    console.log(this.videoPlayer.nativeElement.width);
    console.log(this.videoPlayer.nativeElement.height);

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
  }

  retake() {
    this.showVideo = false;
  }

  saveImage() {
    this.showVideo = false;
    let imgData: any = this.canvas.nativeElement.toDataURL('img/png');
    imgData = imgData.replace('data:image/png;base64,', '');
    let postData: any = JSON.stringify({
      'ImageBase64String': imgData,
    });

  /*this.camaraService.sendImage(postData).then
    ( //metodo en el servicio, que retorne una promesa
        (resp) =>
      {
      console.log(resp);

      //TODO Manejo de la imagen

      }.catch
      ((err) =>
        {
        console.log('Algo salio mal');
        }
      )
    );*/
    }

}
