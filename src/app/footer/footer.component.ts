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

  async traerUsuario() {
    this.userID = await this.authService.getUser();
  }

  async logout() {
    await this.authService.logout();
    await this.traerUsuario();
    this.router.navigate(['/']);
  }

  async ngOnInit() {
    await this.traerUsuario();
    this.ciclo();
  }

  async ciclo() {
    await this.refresh();
    this.ciclo();
  }

  async refresh() {
    return new Promise(resolve => setTimeout(resolve, 800));
  }

  ngAfterContentChecked() {
  }


}
