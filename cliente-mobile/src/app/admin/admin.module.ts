import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AdminPageRoutingModule} from './admin-routing.module';

import {AdminPage} from './admin.page';
import {EmpleadoComponent} from './empleado/empleado.component';
import {EmpleadoCreateHuellaComponent} from './empleado/empleado-create-huella/empleado-create-huella.component';
import {EmpleadoEditHuellaComponent} from './empleado/empleado-edit-huella/empleado-edit-huella.component';
import {EmpleadoIndexComponent} from './empleado/empleado-index/empleado-index.component';
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        AdminPageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    declarations: [
        AdminPage,
        DashboardComponent,
        EmpleadoComponent,
        EmpleadoCreateHuellaComponent,
        EmpleadoEditHuellaComponent,
        EmpleadoIndexComponent],
})
export class AdminPageModule {
}
