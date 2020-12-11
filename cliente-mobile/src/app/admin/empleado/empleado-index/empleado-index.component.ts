import {Component, Input, OnInit} from '@angular/core';
import {Empleado} from '../../../models/empleado';
import {EmpleadoService} from '../../../services/empleado.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
    selector: 'app-empleado-index',
    templateUrl: './empleado-index.component.html',
    styleUrls: ['./empleado-index.component.scss'],
})
export class EmpleadoIndexComponent implements OnInit {

    @Input() empleadoState: any;

    empleados: Empleado[] = [];

    constructor(private empleadoService: EmpleadoService,
                private actionSheet: ActionSheetController) {
    }

    async presentActionSheet(empleado: Empleado) {
        const actionSheet = await this.actionSheet.create({
            header: `${empleado.nombres.toUpperCase()} ${empleado.apellidos.toUpperCase()}`,
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            buttons: [
                /*{
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },*/
                {
                    text: 'Agregar Huella',
                    icon: 'finger-print',
                    handler: () => {
                        this.empleadoState.empleado = empleado;
                        this.empleadoState.location = 'create-huella';
                        console.log('Agregar Huella');
                    }
                }, {
                    text: 'Editar Huella',
                    icon: 'finger-print',
                    handler: () => {
                        console.log('Play clicked');
                    }
                }, {
                    text: 'Cancelar',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

    ngOnInit() {
        this.empleadoService.getEmpleadosMalleros().subscribe((response: Empleado[]) => {
            this.empleados = response;
        });
    }

}
