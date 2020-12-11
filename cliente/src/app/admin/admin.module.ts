import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {NgxNavbarModule} from 'ngx-bootstrap-navbar';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AlertModule} from 'ngx-bootstrap/alert';
import {MallaComponent} from './malla/malla.component';
import {MallaIndexComponent} from './malla/malla-index/malla-index.component';
import {MallaCreateComponent} from './malla/malla-create/malla-create.component';
import {MallaEditComponent} from './malla/malla-edit/malla-edit.component';
import {StoreModule} from '@ngrx/store';
import {adminReducers} from '../store/reducers/admin.reducer';
import {adminEffects} from '../store/effects/admin.effects';
import {EffectsModule} from '@ngrx/effects';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgxSpinnerModule} from 'ngx-spinner';
import {GavionComponent} from './gavion/gavion.component';
import {GavionIndexComponent} from './gavion/gavion-index/gavion-index.component';
import {GavionCreateComponent} from './gavion/gavion-create/gavion-create.component';
import {GavionEditComponent} from './gavion/gavion-edit/gavion-edit.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {AlambreComponent} from './alambre/alambre.component';
import {AlambreIndexComponent} from './alambre/alambre-index/alambre-index.component';
import {AlambreCreateComponent} from './alambre/alambre-create/alambre-create.component';
import {AlambreEditComponent} from './alambre/alambre-edit/alambre-edit.component';
import {CajaclavoComponent} from './cajaclavo/cajaclavo.component';
import {CajaclavoIndexComponent} from './cajaclavo/cajaclavo-index/cajaclavo-index.component';
import {CajaclavoCreateComponent} from './cajaclavo/cajaclavo-create/cajaclavo-create.component';
import {CajaclavoEditComponent} from './cajaclavo/cajaclavo-edit/cajaclavo-edit.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ClienteComponent} from './cliente/cliente.component';
import {ClienteIndexComponent} from './cliente/cliente-index/cliente-index.component';
import {ClienteCreateComponent} from './cliente/cliente-create/cliente-create.component';
import {ClienteEditComponent} from './cliente/cliente-edit/cliente-edit.component';
import {EmpleadoComponent} from './empleado/empleado.component';
import {EmpleadoIndexComponent} from './empleado/empleado-index/empleado-index.component';
import {EmpleadoCreateComponent} from './empleado/empleado-create/empleado-create.component';
import {EmpleadoEditComponent} from './empleado/empleado-edit/empleado-edit.component';
import {AdminComponent} from './admin.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaIndexComponent } from './reserva/reserva-index/reserva-index.component';
import { ProduccionMallaComponent } from './produccion-malla/produccion-malla.component';
import { ProduccionMallaIndexComponent } from './produccion-malla/produccion-malla-index/produccion-malla-index.component';
import { ProduccionMallaCreateIndividualComponent } from './produccion-malla/produccion-malla-create-individual/produccion-malla-create-individual.component';
import { ProduccionMallaCreateGrupalComponent } from './produccion-malla/produccion-malla-create-grupal/produccion-malla-create-grupal.component';
import { ProduccionMallaCreateSincupoComponent } from './produccion-malla/produccion-malla-create-sincupo/produccion-malla-create-sincupo.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AsistenciaCreateComponent } from './asistencia/asistencia-create/asistencia-create.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    MallaComponent,
    MallaIndexComponent,
    MallaCreateComponent,
    MallaEditComponent,
    GavionComponent,
    GavionIndexComponent,
    GavionCreateComponent,
    GavionEditComponent,
    AlambreComponent,
    AlambreIndexComponent,
    AlambreCreateComponent,
    AlambreEditComponent,
    CajaclavoComponent,
    CajaclavoIndexComponent,
    CajaclavoCreateComponent,
    CajaclavoEditComponent,
    ClienteComponent,
    ClienteIndexComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    EmpleadoComponent,
    EmpleadoIndexComponent,
    EmpleadoCreateComponent,
    EmpleadoEditComponent,
    ReservaComponent,
    ReservaIndexComponent,
    ProduccionMallaComponent,
    ProduccionMallaIndexComponent,
    ProduccionMallaCreateIndividualComponent,
    ProduccionMallaCreateGrupalComponent,
    ProduccionMallaCreateSincupoComponent,
    AsistenciaComponent,
    AsistenciaCreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CollapseModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(adminEffects),
    StoreModule.forFeature('admin', adminReducers),
    PaginationModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    // MatBadgeModule,
    // MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FontAwesomeModule,
    TooltipModule,
    NgxNavbarModule,
    NgxSpinnerModule,
    AlertModule,
    NgSelectModule,
  ]
})
export class AdminModule {
}
