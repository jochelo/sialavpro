import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CajaclavoState} from '../../../store/reducers/cajaclavo.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaCajaclavo, storeCajaclavo} from '../../../store/actions/cajaclavo.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cajaclavo-create',
  templateUrl: './cajaclavo-create.component.html',
  styles: []
})
export class CajaclavoCreateComponent implements OnInit {

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
      tipoClavo: new FormControl(null, [Validators.required]),
      longitud: new FormControl(null, [Validators.required]),
      largo: new FormControl(null, [Validators.required]),
      largoFraccion: new FormControl(null),
      bwg: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      numeroBolsas: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      cantidad: new FormControl(0, [Validators.required]),
      descripcion: new FormControl(null),
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

  onStore(): any {
    this.store.dispatch(storeCajaclavo({
      cajaclavo: toFormData(this.cajaclavoGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaCajaclavo({
      location: 'index'
    }));
  }

}
