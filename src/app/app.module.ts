
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './about-us/about-us.component';

import { Rutas } from '../rutas';

import { LoginComponent } from './login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashclientComponent } from './dashclient/dashclient.component';
import { MycarsComponent } from './mycars/mycars.component';
import { CarregisterComponent } from './carregister/carregister.component';
import { AutoselectedComponent } from './autoselected/autoselected.component';

import { GenRepComponent } from './gen-rep/gen-rep.component';

import { SolicitudcitaComponent } from './solicitudcita/solicitudcita.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ColacitasComponent } from './colacitas/colacitas.component';
import { RecibirvehiculoComponent } from './recibirvehiculo/recibirvehiculo.component';
import { ModificararchivoComponent } from './modificararchivo/modificararchivo.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SideBarFavComponent } from './side-bar-fav/side-bar-fav.component';
import { JavascriptComponent } from './javascript/javascript.component';


import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PartsManageComponent } from './parts-manage/parts-manage.component';
import { PartsSearchComponent } from './parts-search/parts-search.component';
import { PartDetailComponent } from './part-detail/part-detail.component';
import { PartNewComponent } from './part-new/part-new.component';
import { PartModifyComponent } from './part-modify/part-modify.component';

import { AuthService } from './authService/auth.service';
import { DatabaseService } from './database/database.service';
import { HttpClientModule } from '@angular/common/http';
import { UserSelectService } from './user-select/user-select.service';
import { CarSelectService } from "./car-select/car-select.service";
import { CarHistorialComponent } from './car-historial/car-historial.component';
import { OrdenSelectService } from "./orden-select/orden-select.service";





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
    AutoselectedComponent,
    GenRepComponent,
    SolicitudcitaComponent,
    PerfilComponent,
    ColacitasComponent,
    RecibirvehiculoComponent,
    ModificararchivoComponent,
    UserManagerComponent,
    UserDetailComponent,
    SideBarFavComponent,
    JavascriptComponent,
    PartDetailComponent,
    PartsManageComponent,
    PartsSearchComponent,
    PartNewComponent,
    PartModifyComponent,
    CarHistorialComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Rutas),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatabaseService,
    AuthService,
    UserSelectService,
    CarSelectService,
    OrdenSelectService,
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
