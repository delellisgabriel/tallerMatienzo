import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-side-bar-fav',
  templateUrl: './side-bar-fav.component.html',
  styleUrls: ['./side-bar-fav.component.css']
})
export class SideBarFavComponent implements OnInit {

  userID: number;
  userRol: number;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    const auxiliar = this.authService.getUser();
    if (auxiliar !== null) {
      this.userID = Number.parseInt((auxiliar as any).idUsuario);
      this.userRol = Number.parseInt((auxiliar as any).Rol);
    }
  }

}
