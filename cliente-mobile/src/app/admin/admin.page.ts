import {Component, OnInit} from '@angular/core';
import {items} from './admin-items';
import {Platform, ToastController} from '@ionic/angular';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Plugins, StatusBarStyle} from '@capacitor/core';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    selectedIndex = 0;

    items = items;

    constructor(private platform: Platform,
                private router: Router,
                private toast: ToastController,
                private authService: AuthService) {
        this.initializeApp();
    }

    /*initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }*/



    ngOnInit() {
    }

    async initializeApp() {
        const { SplashScreen, StatusBar } = Plugins;
        try {
            await SplashScreen.hide();
            await StatusBar.setStyle({ style: StatusBarStyle.Light });
            if (this.platform.is('android')) {
                StatusBar.setBackgroundColor({ color: '#CDCDCD' });
            }
        } catch (e) {
            console.log('This is normal in a browser', e);
        }
    }

    async presentToast() {
        const toast = await this.toast.create({
            header: 'Saliendo del sistema',
            message: 'Cerrando sesión',
            duration: 2000
        });
        toast.present();
    }

    logout(): void {
        this.authService.logout()
            .subscribe((res: any) => {
                if (res) {
                    this.presentToast();
                    // this.splashScreen.hide();
                    setTimeout( () => {
                        this.router.navigate(['/']);
                    }, 1000);
                }
            });
    }

}
