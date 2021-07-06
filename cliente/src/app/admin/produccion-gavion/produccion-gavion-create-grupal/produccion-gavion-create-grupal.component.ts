import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ProduccionGavionState} from '../../../store/reducers/produccion-gavion.reducer';
import {faPlus, faTrash, faUserCog, faUsersCog} from '@fortawesome/free-solid-svg-icons';
import {Empleado} from '../../../models/empleado';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GavionState} from '../../../store/reducers/gavion.reducer';
import {EmpleadoState} from '../../../store/reducers/empleado.reducer';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {getGaviones, irVistaGavion} from '../../../store/actions/gavion.actions';
import {getEmpleadosMalleros} from '../../../store/actions/empleado.actions';
import {
  irVistaProduccionGavion,
  storeProduccionGavionGrupal,
  storeProduccionGavionIndividual
} from '../../../store/actions/produccion-gavion.actions';
import {irVistaAlambre} from '../../../store/actions/alambre.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-produccion-gavion-create-grupal',
  templateUrl: './produccion-gavion-create-grupal.component.html',
  styles: [
  ]
})
export class ProduccionGavionCreateGrupalComponent implements OnInit {

  @Input() produccionGavionState: ProduccionGavionState;

  faTrash = faTrash;
  faPlus = faPlus;
  faUsersCog = faUsersCog;

  empleados: Empleado[] = [];

  produccionGavionGroup: FormGroup;

  gavionState: GavionState;
  empleadoState: EmpleadoState;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    const now = new Date();
    this.produccionGavionGroup = this.fb.group({
      fecha: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
      idgavion: new FormControl(null, [Validators.required]),
      cupo: new FormControl(null, [Validators.required]),
      empleados: new FormControl(null, [Validators.required]),
      empleado: new FormControl(null),
    });

    this.store.subscribe((state: any) => {
      this.gavionState = state.admin.gavion;
      this.empleadoState = state.admin.empleado;
      if (this.gavionState?.location === 'index') {
        contentWayPoint();
      }
      if (this.gavionState !== undefined && this.gavionState.gavion !== null) {
        this.produccionGavionGroup.patchValue({
          idgavion: this.gavionState.gavion.id
        });
      }
    });
    this.store.dispatch(irVistaGavion({location: 'index'}));
    this.store.dispatch(getGaviones());
    this.store.dispatch(getEmpleadosMalleros());
  }

  onCreateGavion(): void {
    this.store.dispatch(irVistaGavion({location: 'create'}));
  }

  onPushEmpleado(): void {
    const empleado = this.produccionGavionGroup.get('empleado').value;

    const existe = this.empleados.find((emp: Empleado) => {
      return emp.id === empleado.id;
    });
    if (existe === undefined) {
      this.empleados.push(empleado);
      this.toastr.info(`${empleado.nombres.split(' ')[0].toUpperCase()} ¡fue agregado!`);
    } else {
      this.toastr.warning(`${empleado.nombres.split(' ')[0].toUpperCase()} ya fue agregado a esta lista`);
    }
    this.produccionGavionGroup.patchValue({
      empleado: null,
      empleados: this.empleados
    });
  }

  onDeleteEmpleado(emp: Empleado): void {
    this.empleados = this.empleados.filter((empleado: Empleado) => {
      if (empleado.id !== emp.id) {
        return empleado;
      }
    });
    this.produccionGavionGroup.patchValue({
      empleados: this.empleados
    });
    this.toastr.error(`${emp.nombres.split(' ')[0].toUpperCase()} ¡fue retirado de la lista!`);
  }

  onStore(): any {
    this.store.dispatch(storeProduccionGavionGrupal({
      produccionGavion: this.produccionGavionGroup.value
    }));
  }

  onCancel(): void {
    if (confirm('¿Está seguro de salir del registro de producción grupal masiva de gaviones?')) {
      this.store.dispatch(irVistaProduccionGavion({
        location: 'index'
      }));
    }
  }

}
