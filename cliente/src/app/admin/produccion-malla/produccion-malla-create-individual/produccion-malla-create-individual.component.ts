import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProduccionMallaState} from '../../../store/reducers/produccion-malla.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaProduccionMalla, storeProduccionMallaIndividual} from '../../../store/actions/produccion-malla.actions';
import {MallaState} from '../../../store/reducers/malla.reducer';
import {getMallas, irVistaMalla} from '../../../store/actions/malla.actions';
import {EmpleadoState} from '../../../store/reducers/empleado.reducer';
import {getEmpleadosMalleros} from '../../../store/actions/empleado.actions';
import {Empleado} from '../../../models/empleado';
import {faPlus, faTrash, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-produccion-malla-create-individual',
  templateUrl: './produccion-malla-create-individual.component.html',
  styles: []
})
export class ProduccionMallaCreateIndividualComponent implements OnInit {

  @Input() produccionMallaState: ProduccionMallaState;

  faTrash = faTrash;
  faPlus = faPlus;
  faUserCog = faUserCog;

  empleados: Empleado[] = [];

  produccionMallaGroup: FormGroup;

  mallaState: MallaState;
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
    this.produccionMallaGroup = this.fb.group({
      fecha: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
      idmalla: new FormControl(null, [Validators.required]),
      cupo: new FormControl(null, [Validators.required]),
      empleados: new FormControl(null, [Validators.required]),
      empleado: new FormControl(null),
    });

    this.store.subscribe((state: any) => {
      this.mallaState = state.admin.malla;
      this.empleadoState = state.admin.empleado;
      if (this.mallaState?.location === 'index') {
        contentWayPoint();
      }
      if (this.mallaState !== undefined && this.mallaState.malla !== null) {
        this.produccionMallaGroup.patchValue({
          idmalla: this.mallaState.malla.id
        });
      }
    });

    this.store.dispatch(getMallas());
    this.store.dispatch(getEmpleadosMalleros());
  }

  onCreateMalla(): void {
    this.store.dispatch(irVistaMalla({location: 'create'}));
  }

  onPushEmpleado(): void {
    const empleado = this.produccionMallaGroup.get('empleado').value;

    const existe = this.empleados.find((emp: Empleado) => {
      return emp.id === empleado.id;
    });
    if (existe === undefined) {
      this.empleados.push(empleado);
      this.toastr.info(`${empleado.nombres.split(' ')[0].toUpperCase()} ¡fue agregado!`);
    } else {
      this.toastr.warning(`${empleado.nombres.split(' ')[0].toUpperCase()} ya fue agregado a esta lista`);
    }
    this.produccionMallaGroup.patchValue({
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
    this.produccionMallaGroup.patchValue({
      empleados: this.empleados
    });
    this.toastr.error(`${emp.nombres.split(' ')[0].toUpperCase()} ¡fue retirado de la lista!`);
  }

  onStore(): any {
    this.store.dispatch(storeProduccionMallaIndividual({
      produccionMalla: this.produccionMallaGroup.value
    }));
  }

  onCancel(): void {
    if (confirm('¿Está seguro de salir del registro de producción individual masiva?')) {
      this.store.dispatch(irVistaProduccionMalla({
        location: 'index'
      }));
    }
  }

}
