import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ContactoComponent } from './app/contacto/contacto.component';
import { AboutUsComponent } from './app/about-us/about-us.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';
import { DashclientComponent } from './app/dashclient/dashclient.component';
import { MycarsComponent } from './app/mycars/mycars.component'; 
import { AutoselectedComponent } from './app/autoselected/autoselected.component';
import { CarregisterComponent } from './app/carregister/carregister.component';
import { SolicitudcitaComponent } from './app/solicitudcita/solicitudcita.component';
import { PerfilComponent } from './app/perfil/perfil.component';
import { GenRepComponent } from './app/gen-rep/gen-rep.component';
import { RecibirvehiculoComponent } from './app/recibirvehiculo/recibirvehiculo.component';
import { ModificararchivoComponent } from './app/modificararchivo/modificararchivo.component';
import { ColacitasComponent } from './app/colacitas/colacitas.component';
import { UserManagerComponent } from './app/user-manager/user-manager.component';
import { UserDetailComponent } from './app/user-detail/user-detail.component';
import { PartsManageComponent } from './app/parts-manage/parts-manage.component';
import { PartDetailComponent } from './app/part-detail/part-detail.component';
import { PartNewComponent } from './app/part-new/part-new.component';
import { PartModifyComponent } from './app/part-modify/part-modify.component';
import { CarHistorialComponent } from './app/car-historial/car-historial.component';
import { CamaraComponent } from './app/camara/camara.component';

export const Rutas: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'equipo', component: AboutUsComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashclient/:id', component: DashclientComponent },
  { path: 'mycars/:id', component: MycarsComponent },
  { path: 'autoselected/:id', component: AutoselectedComponent },
  { path: 'carregister', component: CarregisterComponent },
  { path: 'solicitudcita/:id', component: SolicitudcitaComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'reportes', component: GenRepComponent },
  { path: 'recibirvehiculo', component: RecibirvehiculoComponent },
  { path: 'modificararchivo', component: ModificararchivoComponent },
  { path: 'colacitas', component: ColacitasComponent },
  { path: 'manageuser', component: UserManagerComponent },
  { path: 'userdetail/:id', component: UserDetailComponent },
  { path: 'parts-manage', component: PartsManageComponent },
  { path: 'parts-search', component: PartsManageComponent },
  { path: 'part-detail', component: PartDetailComponent },
  { path: 'part-new', component: PartNewComponent },
  { path: 'part-modify', component: PartModifyComponent },
  { path: 'car-historial/:id', component: CarHistorialComponent },
  { path: 'camara', component: CamaraComponent },
];
