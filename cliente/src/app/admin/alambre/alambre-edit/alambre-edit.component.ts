import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AlambreState} from '../../../store/reducers/alambre.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaAlambre, storeAlambre, updateAlambre} from '../../../store/actions/alambre.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-alambre-edit',
  templateUrl: './alambre-edit.component.html',
  styles: [
  ]
})
export class AlambreEditComponent implements OnInit {

  @Input() alambreState: AlambreState;
  @ViewChild('labelFoto', {static: false}) labelFoto: ElementRef;

  alambreGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.alambreGroup = this.fb.group({
      tipoAlambre: new FormControl(this.alambreState.alambre.tipoAlambre, [Validators.required]),
      awg: new FormControl(this.alambreState.alambre.awg, [Validators.required]),
      peso: new FormControl(this.alambreState.alambre.peso, [Validators.required]),
      precio: new FormControl(this.alambreState.alambre.precio, [Validators.required]),
      foto: new FormControl(null),
      id: new FormControl(this.alambreState.alambre.id, [Validators.required]),
      descripcion: new FormControl(this.alambreState.alambre.descripcion),
    });
  }

  uploadfile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.alambreGroup.patchValue({
        foto: file
      });
      this.labelFoto.nativeElement.innerText = Array.from(event.target.files)
        .map((f: File) => f.name)
        .join(', ');
    }
  }

  onUpdate(): any {
    this.store.dispatch(updateAlambre({
      alambre: toFormData(this.alambreGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaAlambre({
      location: 'index'
    }));
  }

}
