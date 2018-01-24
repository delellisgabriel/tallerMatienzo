import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ContactoComponent } from './app/contacto/contacto.component';
import { EquipoComponent } from './app/equipo/equipo.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';
import { DashclientComponent } from './app/dashclient/dashclient.component';
import { MycarsComponent } from './app/mycars/mycars.component'; 
import { AutoselectedComponent } from './app/autoselected/autoselected.component';
import { CarregisterComponent } from './app/carregister/carregister.component';

export const Rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashclient', component: DashclientComponent },
  { path: 'mycars', component: MycarsComponent },
  { path: 'autoselected', component: AutoselectedComponent },
  { path: 'carregister', component: CarregisterComponent },
];
