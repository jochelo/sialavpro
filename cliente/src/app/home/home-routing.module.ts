import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {InicioComponent} from './inicio/inicio.component';
import {GaleriaComponent} from './galeria/galeria.component';
import {ServiciosComponent} from './servicios/servicios.component';
import {ReservasComponent} from './reservas/reservas.component';
import {ContactosComponent} from './contactos/contactos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'galeria',
        component: GaleriaComponent
      },
      {
        path: 'servicios',
        component: ServiciosComponent
      },
      {
        path: 'reservas',
        component: ReservasComponent
      },
      {
        path: 'contactos',
        component: ContactosComponent
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
