import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmpleadoState} from '../../../store/reducers/empleado.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaEmpleado, updateEmpleado} from '../../../store/actions/empleado.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styles: []
})
export class EmpleadoEditComponent implements OnInit {

  @Input() empleadoState: EmpleadoState;
  @ViewChild('labelFoto', {static: false}) labelFoto: ElementRef;

  empleadoGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.empleadoGroup = this.fb.group({
      rolEmpleado: new FormControl(this.empleadoState.empleado.rolEmpleado, [Validators.required]),
      nombres: new FormControl(this.empleadoState.empleado.nombres, [Validators.required]),
      apellidos: new FormControl(this.empleadoState.empleado.apellidos, [Validators.required]),
      celular: new FormControl(this.empleadoState.empleado.celular, [Validators.required]),
      carnet: new FormControl(this.empleadoState.empleado.carnet, [Validators.required]),
      foto: new FormControl(null),
      direccion: new FormControl(this.empleadoState.empleado.direccion),
      id: new FormControl(this.empleadoState.empleado.id),
    });
  }

  uploadfile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.empleadoGroup.patchValue({
        foto: file
      });
      this.labelFoto.nativeElement.innerText = Array.from(event.target.files)
        .map((f: File) => f.name)
        .join(', ');
    }
  }

  onUpdate(): any {
    this.store.dispatch(updateEmpleado({
      empleado: toFormData(this.empleadoGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaEmpleado({
      location: 'index'
    }));
  }

}
