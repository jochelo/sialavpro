import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './app.interceptor';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {KeychainTouchId} from '@ionic-native/keychain-touch-id/ngx';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
    ],
    providers: [
        HttpClient,
        KeychainTouchId,
        FingerprintAIO,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
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
