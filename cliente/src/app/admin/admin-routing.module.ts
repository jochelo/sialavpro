import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MallaComponent} from './malla/malla.component';
import {GavionComponent} from './gavion/gavion.component';
import {AlambreComponent} from './alambre/alambre.component';
import {CajaclavoComponent} from './cajaclavo/cajaclavo.component';
import {ClienteComponent} from './cliente/cliente.component';
import {EmpleadoComponent} from './empleado/empleado.component';
import {ReservaComponent} from './reserva/reserva.component';
import {ProduccionMallaComponent} from './produccion-malla/produccion-malla.component';
import {AsistenciaCreateComponent} from './asistencia/asistencia-create/asistencia-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'alta-mallas',
        component: MallaComponent
      },
      {
        path: 'alta-gaviones',
        component: GavionComponent
      },
      {
        path: 'alta-alambres',
        component: AlambreComponent
      },
      {
        path: 'alta-cajaclavos',
        component: CajaclavoComponent
      },
      {
        path: 'clientes',
        component: ClienteComponent
      },
      {
        path: 'empleados',
        component: EmpleadoComponent
      },
      {
        path: 'asistencia',
        children: [
          {
            path: 'asistencia-create',
            component: AsistenciaCreateComponent
          }
        ]
      },
      {
        path: 'reservas',
        component: ReservaComponent
      },
      {
        path: 'produccion',
        children: [
          {
            path: 'produccion-mallas',
            component: ProduccionMallaComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
