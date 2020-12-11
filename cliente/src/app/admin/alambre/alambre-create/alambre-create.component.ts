import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AlambreState} from '../../../store/reducers/alambre.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaAlambre, storeAlambre} from '../../../store/actions/alambre.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-alambre-create',
  templateUrl: './alambre-create.component.html',
  styles: []
})
export class AlambreCreateComponent implements OnInit {

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
      tipoAlambre: new FormControl(null, [Validators.required]),
      awg: new FormControl(null, [Validators.required]),
      peso: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      cantidad: new FormControl(0, [Validators.required]),
      descripcion: new FormControl(null),
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

  onStore(): any {
    this.store.dispatch(storeAlambre({
      alambre: toFormData(this.alambreGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaAlambre({
      location: 'index'
    }));
  }

}
