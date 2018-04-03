import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  userID = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userID = this.authService.currentUser["idUsuario"];
  }

  ngAfterContentChecked() {
    this.userID = this.authService.currentUser["idUsuario"];
  }


}
