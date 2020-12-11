import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MallaState} from '../../../store/reducers/malla.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaMalla, updateMalla} from '../../../store/actions/malla.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-malla-edit',
  templateUrl: './malla-edit.component.html',
  styles: []
})
export class MallaEditComponent implements OnInit {

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
      tipoMalla: new FormControl(this.mallaState.malla.tipoMalla, [Validators.required]),
      // celda: new FormControl(this.mallaState.malla.celda, [Validators.required]),
      // alambre: new FormControl(this.mallaState.malla.alambre, [Validators.required]),
      alto: new FormControl(this.mallaState.malla.alto, [Validators.required]),
      largo: new FormControl(this.mallaState.malla.largo, [Validators.required]),
      precio: new FormControl(this.mallaState.malla.precio, [Validators.required]),
      foto: new FormControl(null),
      m2: new FormControl(false, [Validators.required]),
      // cantidad: new FormControl(0, [Validators.required]),
      descripcion: new FormControl(this.mallaState.malla.descripcion),
      id: new FormControl(this.mallaState.malla.id),
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

  onUpdate(): any {
    this.store.dispatch(updateMalla({
      malla: toFormData(this.mallaGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaMalla({
      location: 'index'
    }));
  }

}
