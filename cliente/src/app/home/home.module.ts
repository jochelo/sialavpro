import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {InicioComponent} from './inicio/inicio.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {GaleriaComponent} from './galeria/galeria.component';
import {ServiciosComponent} from './servicios/servicios.component';
import {ReservasComponent} from './reservas/reservas.component';
import {ContactosComponent} from './contactos/contactos.component';
import {AgmCoreModule} from '@agm/core';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AlertModule} from 'ngx-bootstrap/alert';
import {StoreModule} from '@ngrx/store';
import {adminReducers} from '../store/reducers/admin.reducer';
import {EffectsModule} from '@ngrx/effects';
import {adminEffects} from '../store/effects/admin.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [HomeComponent, InicioComponent, GaleriaComponent, ServiciosComponent, ReservasComponent, ContactosComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    TooltipModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature(adminEffects),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBx7k91omz7bxO7JtikAN0VV60yWUsbHtA',
      libraries: ['places']
    }),
    AlertModule
  ],
})
export class HomeModule {
}
