import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CajaclavoState} from '../../../store/reducers/cajaclavo.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaCajaclavo, updateCajaclavo} from '../../../store/actions/cajaclavo.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cajaclavo-edit',
  templateUrl: './cajaclavo-edit.component.html',
  styles: []
})
export class CajaclavoEditComponent implements OnInit {

  @Input() cajaclavoState: CajaclavoState;
  @ViewChild('labelFoto', {static: false}) labelFoto: ElementRef;

  fracciones = [
    {
      fraccion: '1⁄2'
    },
    {
      fraccion: '1⁄3'
    },
    {
      fraccion: '1⁄4'
    },
    {
      fraccion: '3⁄4'
    },
    {
      fraccion: '1⁄8'
    },
    {
      fraccion: '1⁄16'
    }
  ];

  cajaclavoGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.cajaclavoGroup = this.fb.group({
      tipoClavo: new FormControl(this.cajaclavoState.cajaclavo.tipoClavo, [Validators.required]),
      longitud: new FormControl(this.cajaclavoState.cajaclavo.longitud, [Validators.required]),
      largo: new FormControl(this.cajaclavoState.cajaclavo.longitud.split(' ')[0], [Validators.required]),
      largoFraccion: new FormControl(this.cajaclavoState.cajaclavo.longitud.split(' ')[1]),
      bwg: new FormControl(this.cajaclavoState.cajaclavo.bwg, [Validators.required]),
      precio: new FormControl(this.cajaclavoState.cajaclavo.precio, [Validators.required]),
      numeroBolsas: new FormControl(this.cajaclavoState.cajaclavo.numeroBolsas, [Validators.required]),
      id: new FormControl(this.cajaclavoState.cajaclavo.id, [Validators.required]),
      foto: new FormControl(null),
      descripcion: new FormControl(this.cajaclavoState.cajaclavo.descripcion),
    });
  }

  onChangeLongitud(): void {
    const fraccion = this.cajaclavoGroup.value.largoFraccion ? this.cajaclavoGroup.value.largoFraccion : '';
    this.cajaclavoGroup.patchValue({
      longitud: this.cajaclavoGroup.value.largo + ' ' + fraccion
    });
  }

  uploadfile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cajaclavoGroup.patchValue({
        foto: file
      });
      this.labelFoto.nativeElement.innerText = Array.from(event.target.files)
        .map((f: File) => f.name)
        .join(', ');
    }
  }

  onUpdate(): any {
    this.store.dispatch(updateCajaclavo({
      cajaclavo: toFormData(this.cajaclavoGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaCajaclavo({
      location: 'index'
    }));
  }

}
