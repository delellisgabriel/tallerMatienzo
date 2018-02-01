import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(database: DatabaseService) {
    database.prueba().then((algo) => console.log(algo)).catch((err) => console.log(err));
  }

  ngOnInit() {

  }

}
