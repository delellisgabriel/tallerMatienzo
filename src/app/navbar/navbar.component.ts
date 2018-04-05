import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authService/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userID = null;
  salir = false;

  constructor(private authService: AuthService, private router: Router) { }

  async traerUsuario() {
    this.userID = await this.authService.getUser();
  }

   async ngOnInit() {
     this.userID = await this.authService.getUser();
     if (this.userID !== null) {
       this.salir = true;
     }
  }

    ngAfterContentChecked() {
    this.userID =  this.authService.getUser();
  }

  logout() {
    console.log(this.salir);
    this.authService.logout();
    this.salir = false;
    console.log(this.salir);
  }

}
