import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmpleadoState} from '../../../store/reducers/empleado.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaEmpleado, storeEmpleado} from '../../../store/actions/empleado.actions';
import {toFormData} from '../../../helpers/toFormData';
import {NgxSpinnerService} from 'ngx-spinner';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-empleado-create',
  templateUrl: './empleado-create.component.html',
  styles: []
})
export class EmpleadoCreateComponent implements OnInit {

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
      rolEmpleado: new FormControl(null, [Validators.required]),
      nombres: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required]),
      carnet: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      direccion: new FormControl(null)
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

  onStore(): any {
    this.store.dispatch(storeEmpleado({
      empleado: toFormData(this.empleadoGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaEmpleado({
      location: 'index'
    }));
  }

}
