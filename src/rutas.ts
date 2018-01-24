import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ContactoComponent } from './app/contacto/contacto.component';
import { EquipoComponent } from './app/equipo/equipo.component';

export const Rutas: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'contacto', component: ContactoComponent },
];
