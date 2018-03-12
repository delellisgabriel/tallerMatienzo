import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
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

  @Output() onSave = new EventEmitter<string | Blob>();

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

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);

    //Returns base64 string representation of the canvas
    let generatedString = this.canvasWhiteboard.generateCanvasDataUrl("image/jpeg", 0.3);

    //Generates a IE canvas blob using a callbak method
    this.canvasWhiteboard.generateCanvasBlob((blob: any) => {
      console.log(blob);
    }, "image/png");

    //This method uses both of the above method and returns either string or blob
    //using a callback method
    this.canvasWhiteboard.generateCanvasData((generatedData: string | Blob) => {
      console.log(generatedData);
    }, "image/png", 1);

    //If you need the context of the canvas
    let context = this.canvasWhiteboard.context;
  }



}
