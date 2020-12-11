import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeEsBo from '@angular/common/locales/es-BO';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {AppInterceptor} from './app.interceptor';
import {registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthEffects} from './store/effects/auth.effects';
import {AlertModule} from 'ngx-bootstrap/alert';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {NgxNavbarModule} from 'ngx-bootstrap-navbar';
import {ToastrModule} from 'ngx-toastr';
import {CollapseModule} from 'ngx-bootstrap/collapse';

registerLocaleData(localeEsBo, 'es-Bo');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    NgxNavbarModule,
    FontAwesomeModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        // disabled until https://github.com/ngrx/platform/issues/2109 is resolved
        /* strictActionImmutability: true, */
      },
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects]),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    // NgxPermissionsModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-Bo'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
