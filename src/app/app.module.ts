//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JavascriptComponent } from './javascript/javascript.component';
import { WebCamComponent } from 'ng2-webcam';
import { CookieModule } from 'ngx-cookie';
//Rutas
import { Rutas } from '../rutas';
//Componentes visibles
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarHistorialComponent } from './car-historial/car-historial.component';
import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashclientComponent } from './dashclient/dashclient.component';
import { MycarsComponent } from './mycars/mycars.component';
import { CarregisterComponent } from './carregister/carregister.component';
import { GenRepComponent } from './gen-rep/gen-rep.component';
import { SolicitudcitaComponent } from './solicitudcita/solicitudcita.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ColacitasComponent } from './colacitas/colacitas.component';
import { ModificararchivoComponent } from './modificararchivo/modificararchivo.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SideBarFavComponent } from './side-bar-fav/side-bar-fav.component';
import { PartsManageComponent } from './parts-manage/parts-manage.component';
import { PartDetailComponent } from './part-detail/part-detail.component';
import { PartNewComponent } from './part-new/part-new.component';
import { PartModifyComponent } from './part-modify/part-modify.component';
import { CamaraComponent } from './camara/camara.component';
//Servicios
import { AuthService } from './authService/auth.service';
import { DatabaseService } from './database/database.service';
import { UserSelectService } from './user-select/user-select.service';
import { CarSelectService } from "./car-select/car-select.service";
import { OrdenSelectService } from "./orden-select/orden-select.service";
import { PartsService } from "./parts/parts.service";
import { EmailService } from './email/email-service.service';
import { QrService } from './qrService/qr.service';
import { StatusService } from "./status-service/status-service.service";
import { CookieService } from 'ngx-cookie';
import { DeactivatedCarListComponent } from './deactivated-car-list/deactivated-car-list.component';


declare var $: any;


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    LoginComponent,
    ContactoComponent,
    SignUpComponent,
    DashclientComponent,
    MycarsComponent,
    CarregisterComponent,
    GenRepComponent,
    SolicitudcitaComponent,
    PerfilComponent,
    ColacitasComponent,
    ModificararchivoComponent,
    UserManagerComponent,
    UserDetailComponent,
    SideBarFavComponent,
    JavascriptComponent,
    PartDetailComponent,
    PartsManageComponent,
    PartNewComponent,
    PartModifyComponent,
    CarHistorialComponent,
    CamaraComponent,
    DeactivatedCarListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Rutas),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterializeModule,
    CookieModule.forRoot()
  ],
  providers: [
    DatabaseService,
    AuthService,
    UserSelectService,
    CarSelectService,
    OrdenSelectService,
    PartsService,
    EmailService,
    QrService,
    StatusService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit, AfterViewInit {

  ngOnInit() {

  }

  ngAfterViewInit() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
    });
    $('.parallax').parallax();

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });

    $('.modal').modal();
    $('select').material_select();
  }

}
