import {Component, Input, OnInit} from '@angular/core';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import {FingerprintAIO, FingerprintOptions, FingerprintSecretOptions} from '@ionic-native/fingerprint-aio/ngx';
import {KeychainTouchId} from '@ionic-native/keychain-touch-id/ngx';
import {EmpleadoService} from '../../../services/empleado.service';

@Component({
    selector: 'app-empleado-create-huella',
    templateUrl: './empleado-create-huella.component.html',
    styleUrls: ['./empleado-create-huella.component.scss'],
})
export class EmpleadoCreateHuellaComponent implements OnInit {

    @Input() empleadoState: any;

    mensaje = '';

    fingeroptions: FingerprintOptions;
    fingerSecretOptions: FingerprintSecretOptions;

    constructor(private faio: FingerprintAIO,
                private empleadoService: EmpleadoService,
                private alertController: AlertController,
                private toastController: ToastController,
                private platform: Platform) {
    }

    async mensajeAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: '¡Alerta!',
            // subHeader: 'Huella Erronea',
            message: this.mensaje,
            buttons: ['Cerrar']
        });

        await alert.present();
    }

    async aceptToast(color: string) {
        const toast = await this.toastController.create({
            message: this.mensaje,
            duration: 2000,
            position: 'top',
            color
        });
        toast.present();
    }

    showFingerPrintSave() {
        /*try {
          await this.platform.ready();
          const available = await this.faio.isAvailable();
          console.log(available);
          if (available === 'OK' || available === 'biometric') {
            const result = await this.faio.show(this.fingeroptions);
            console.log(result);
          }
        } catch (e) {
          console.error(e);
        }*/
        /*this.faio.show(this.fingeroptions).then((result: any) => {
            this.mensaje = 'Tocaste el sensor Dactilar';
            console.log(result.withFingerprint);
        }).catch((error: any) => console.log(error));*/
        this.fingerSecretOptions = {
            secret: `id: ${this.empleadoState.empleado.id} carnet: ${this.empleadoState.empleado.carnet}`,
            invalidateOnEnrollment: false,
            title: 'Huella dactilar',
            description: `${this.empleadoState.empleado.nombres.toUpperCase()} Ingrese su huella para vincular `,
            fallbackButtonTitle: 'Cancelar',
            disableBackup: true
        };
        this.faio.registerBiometricSecret(this.fingerSecretOptions).then((result: any) => {
            this.mensaje = 'Tocaste el sensor Dactilar';
            console.log(result);
            if (result.code) {
                switch (result.code) {
                    case -102:
                        this.mensaje = 'La Huella detectada No Existe.';
                        this.mensajeAlert();
                        break;
                }
            } else {
                this.empleadoState.empleado.huella = true;
                this.empleadoService.updateEmpleado(this.empleadoState.empleado).subscribe( () => {
                    this.mensaje = 'Huella Vinculada Exitosamente.';
                    this.aceptToast('success');
                });
            }
        }).catch((error: any) => console.log(error));

        /*this.kTouchId.isAvailable()
             .then( (data: any) => {
                 console.log(data);
                 this.kTouchId.has('clave');
             })
             .catch( (e: any) => {
                 console.error(e);
             });*/
    }

    showSecretFingerPrint() {
        this.fingeroptions = {
            title: 'Huella dactilar',
            description: `${this.empleadoState.empleado.nombres.toUpperCase()} Ingrese su huella por favor`,
            disableBackup: true
        };
        this.faio.loadBiometricSecret(this.fingeroptions).then((secret: any) => {
            console.log(secret);
            if (secret.code) {
                switch (secret.code) {
                    case -102:
                        this.mensaje = 'Huella Incorrecta.';
                        this.mensajeAlert();
                        break;
                }
            } else {
                this.mensaje = secret;
                this.aceptToast('success');
            }
        }).catch((error: any) => console.log(error));
    }

    ngOnInit() {
        // console.log(this.empleadoState);
    }

}
