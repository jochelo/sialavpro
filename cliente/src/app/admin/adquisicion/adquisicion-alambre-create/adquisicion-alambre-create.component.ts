import {Component, Input, OnInit} from '@angular/core';
import {AdquisicionAlambreState} from '../../../store/reducers/adquisicion-alambre.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {irVistaAdquisicionAlambre, storeAdquisicionAlambre} from '../../../store/actions/adquisicion-alambre.actions';
import {AlambreState} from '../../../store/reducers/alambre.reducer';
import {getAlambres, irVistaAlambre} from '../../../store/actions/alambre.actions';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-adquisicion-alambre-create',
  templateUrl: './adquisicion-alambre-create.component.html',
  styles: []
})
export class AdquisicionAlambreCreateComponent implements OnInit {

  @Input() adquisicionAlambreState: AdquisicionAlambreState;

  faPlus = faPlus;

  adquisicionAlambreGroup: FormGroup;

  alambreState: AlambreState;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.adquisicionAlambreGroup = this.fb.group({
      fecha: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
      alambre_id: new FormControl(null, [Validators.required]),
    });

    this.store.subscribe((state: any) => {
      this.alambreState = state.admin.alambre;
      if (this.alambreState?.location === 'index') {
        contentWayPoint();
      }
      if (this.alambreState !== undefined && this.alambreState.alambre !== null) {
        this.adquisicionAlambreGroup.patchValue({
          alambre_id: this.alambreState.alambre.id
        });
      }
    });
    this.store.dispatch(irVistaAlambre({location: 'index'}));
    this.store.dispatch(getAlambres());
  }

  onCreateAlambre(): void {
    this.store.dispatch(irVistaAlambre
    ({location: 'create'}));
  }

  onStore(): any {
    this.store.dispatch(storeAdquisicionAlambre({
      adquisicionAlambre: this.adquisicionAlambreGroup.value
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaAdquisicionAlambre({
      location: 'index'
    }));
  }

}
