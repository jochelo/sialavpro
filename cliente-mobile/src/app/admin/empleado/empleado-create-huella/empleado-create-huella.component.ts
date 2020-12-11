import {Component, Input, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-empleado-create-huella',
    templateUrl: './empleado-create-huella.component.html',
    styleUrls: ['./empleado-create-huella.component.scss'],
})
export class EmpleadoCreateHuellaComponent implements OnInit {

    @Input() empleadoState: any;

    // fingeroptions: FingerprintOptions;

    /*constructor(private fingerP: typeof FingerprintAIO,
                private platform: Platform) {
        this.fingeroptions = {
          // clientId: 'Fingerprent-demo',
          // clientSecret: 'password',
          // disableBackup: true
          title: 'Fingerprent-demo',
          description: 'descripcion',
          disableBackup: true
        };
    }

    async showFingerPrint() {
      try {
        await this.platform.ready();
        const available = await this.fingerP.isAvailable();
        console.error(available);
        if (available === 'OK') {
          const result = await this.fingerP.show(this.fingeroptions);
          console.log(result);
        }
      } catch (e) {
        console.error(e);
      }
    }*/

    ngOnInit() {
        console.log(this.empleadoState);
    }

}
