import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-side-bar-fav',
  templateUrl: './side-bar-fav.component.html',
  styleUrls: ['./side-bar-fav.component.css']
})
export class SideBarFavComponent implements OnInit {

  userID = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userID = this.authService.currentUser.idUsuario;
  }

}
