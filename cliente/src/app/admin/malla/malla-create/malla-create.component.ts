import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MallaState} from '../../../store/reducers/malla.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaMalla, storeMalla} from '../../../store/actions/malla.actions';
import {toFormData} from '../../../helpers/toFormData';
import {NgxSpinnerService} from 'ngx-spinner';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-malla-create',
  templateUrl: './malla-create.component.html',
  styles: []
})
export class MallaCreateComponent implements OnInit {

  @Input() mallaState: MallaState;
  @ViewChild('labelFoto', {static: false}) labelFoto: ElementRef;

  mallaGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.mallaGroup = this.fb.group({
      tipoMalla: new FormControl(null, [Validators.required]),
      // celda: new FormControl(null, [Validators.required]),
      // alambre: new FormControl(null, [Validators.required]),
      alto: new FormControl(null, [Validators.required]),
      largo: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      m2: new FormControl(false, [Validators.required]),
      cantidad: new FormControl(0, [Validators.required]),
      descripcion: new FormControl(null),
    });

    /*this.store.subscribe((state: any) => {
      this.mallaState = state.admin.malla;
      console.log(this.mallaState);
      if (this.mallaState.loading) {
        this.spinner.show(this.mallaState.message);
      } else {
        // this.spinner.hide();
      }
    });*/
  }

  onM2(checked: boolean): void {
    if (checked) {
      this.mallaGroup.get('alto').setValidators([Validators.required]);
      this.mallaGroup.get('largo').setValidators([Validators.required]);
      this.mallaGroup.get('alto').updateValueAndValidity();
      this.mallaGroup.get('largo').updateValueAndValidity();
      this.mallaGroup.patchValue({
        m2: false
      });
    } else {
      this.mallaGroup.get('alto').clearValidators();
      this.mallaGroup.get('largo').clearValidators();
      this.mallaGroup.get('alto').updateValueAndValidity();
      this.mallaGroup.get('largo').updateValueAndValidity();
      this.mallaGroup.patchValue({
        m2: true
      });
    }
  }

  uploadfile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mallaGroup.patchValue({
        foto: file
      });
      this.labelFoto.nativeElement.innerText = Array.from(event.target.files)
        .map((f: File) => f.name)
        .join(', ');
    }
  }

  onStore(): any {
    this.store.dispatch(storeMalla({
      malla: toFormData(this.mallaGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaMalla({
      location: 'index'
    }));
  }

}
