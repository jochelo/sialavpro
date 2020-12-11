import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GavionState} from '../../../store/reducers/gavion.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaGavion, storeGavion} from '../../../store/actions/gavion.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-gavion-create',
  templateUrl: './gavion-create.component.html',
  styles: [
  ]
})
export class GavionCreateComponent implements OnInit {

  @Input() gavionState: GavionState;

  @ViewChild('labelFoto', {static: false}) labelFoto: ElementRef;

  gavionGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.gavionGroup = this.fb.group({
      tipoGavion: new FormControl(null, [Validators.required]),
      // celda: new FormControl(null, [Validators.required]),
      // alambre: new FormControl(null, [Validators.required]),
      alto: new FormControl(null, [Validators.required]),
      largo: new FormControl(null, [Validators.required]),
      ancho: new FormControl(null, [Validators.required]),
      numeroDiafragma: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      foto: new FormControl(null),
      cantidad: new FormControl(0, [Validators.required]),
      descripcion: new FormControl(null),
    });
  }

  uploadfile(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.gavionGroup.patchValue({
        foto: file
      });
      this.labelFoto.nativeElement.innerText = Array.from(event.target.files)
        .map((f: File) => f.name)
        .join(', ');
    }
  }

  onTipoGavion(): void {
    if (this.gavionGroup.get('tipoGavion').value === 'gavion') {
      this.gavionGroup.patchValue({
        numeroDiafragma: 1
      });
    } else {
      this.gavionGroup.patchValue({
        numeroDiafragma: null
      });
    }
  }

  onStore(): any {
    this.store.dispatch(storeGavion({
      gavion: toFormData(this.gavionGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaGavion({
      location: 'index'
    }));
  }

}
