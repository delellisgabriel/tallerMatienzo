import { Component, OnInit } from '@angular/core';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { CanvasWhiteboardOptions } from 'ng2-canvas-whiteboard/dist/canvas-whiteboard.component';

@Component({
  selector: 'app-car-canvas',
  templateUrl: './car-canvas.component.html',
  viewProviders: [CanvasWhiteboardComponent],
  styleUrls: ['./car-canvas.component.css']
})
export class CarCanvasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  canvasOptions: CanvasWhiteboardOptions = {
    drawButtonEnabled: true,
    drawButtonClass: "drawButtonClass",
    drawButtonText: "Dibujar",
    clearButtonEnabled: true,
    clearButtonClass: "clearButtonClass",
    clearButtonText: "Iniciar",
    undoButtonText: "<",
    undoButtonEnabled: true,
    redoButtonText: ">",
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    saveDataButtonEnabled: true,
    saveDataButtonText: "Salvar",
    lineWidth: 3,
    strokeColor: "rgb(229,57,53)",
    shouldDownloadDrawing: true,
    imageUrl: "http://img.turbo.fr/04353116-photo-bmw-serie-6-gran-coupe-premiers-croquis.jpg",
  };

}
