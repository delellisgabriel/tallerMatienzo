import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authService/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userID = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userID = this.authService.currentUser["idUsuario"];
  }

  ngAfterContentChecked() {
    this.userID = this.authService.currentUser["idUsuario"];
  }

}
