import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GavionState} from '../../../store/reducers/gavion.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaGavion, updateGavion} from '../../../store/actions/gavion.actions';
import {toFormData} from '../../../helpers/toFormData';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-gavion-edit',
  templateUrl: './gavion-edit.component.html',
  styles: []
})
export class GavionEditComponent implements OnInit {

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
      tipoGavion: new FormControl(this.gavionState.gavion.tipoGavion, [Validators.required]),
      // celda: new FormControl(this.gavionState.gavion.celda, [Validators.required]),
      // alambre: new FormControl(this.gavionState.gavion.alambre, [Validators.required]),
      alto: new FormControl(this.gavionState.gavion.alto, [Validators.required]),
      largo: new FormControl(this.gavionState.gavion.largo, [Validators.required]),
      ancho: new FormControl(this.gavionState.gavion.ancho, [Validators.required]),
      numeroDiafragma: new FormControl(this.gavionState.gavion.numeroDiafragma, [Validators.required]),
      precio: new FormControl(this.gavionState.gavion.precio, [Validators.required]),
      foto: new FormControl(null),
      id: new FormControl(this.gavionState.gavion.id, [Validators.required]),
      descripcion: new FormControl(this.gavionState.gavion.descripcion),
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

  onUpdate(): any {
    this.store.dispatch(updateGavion({
      gavion: toFormData(this.gavionGroup.value)
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaGavion({
      location: 'index'
    }));
  }

}
