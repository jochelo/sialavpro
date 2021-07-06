import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {AdquisicionCajaclavoState} from '../../../store/reducers/adquisicion-cajaclavo.reducer';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CajaclavoState} from '../../../store/reducers/cajaclavo.reducer';
import {NgxSpinnerService} from 'ngx-spinner';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {getCajaclavos, irVistaCajaclavo} from '../../../store/actions/cajaclavo.actions';
import {irVistaAdquisicionCajaclavo, storeAdquisicionCajaclavo} from '../../../store/actions/adquisicion-cajaclavo.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-adquisicion-cajaclavo-create',
  templateUrl: './adquisicion-cajaclavo-create.component.html',
  styles: []
})
export class AdquisicionCajaclavoCreateComponent implements OnInit {

  @Input() adquisicionCajaclavoState: AdquisicionCajaclavoState;

  faPlus = faPlus;

  adquisicionCajaclavoGroup: FormGroup;

  cajaclavoState: CajaclavoState;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.adquisicionCajaclavoGroup = this.fb.group({
      fecha: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required]),
      cantidad: new FormControl(null, [Validators.required]),
      cajaclavo_id: new FormControl(null, [Validators.required]),
    });

    this.store.subscribe((state: any) => {
      this.cajaclavoState = state.admin.cajaclavo;
      if (this.cajaclavoState?.location === 'index') {
        contentWayPoint();
      }
      if (this.cajaclavoState !== undefined && this.cajaclavoState.cajaclavo !== null) {
        this.adquisicionCajaclavoGroup.patchValue({
          cajaclavo_id: this.cajaclavoState.cajaclavo.id
        });
      }
    });
    this.store.dispatch(irVistaCajaclavo({location: 'index'}));
    this.store.dispatch(getCajaclavos());
  }

  onCreateCajaclavo(): void {
    this.store.dispatch(irVistaCajaclavo
    ({location: 'create'}));
  }

  onStore(): any {
    this.store.dispatch(storeAdquisicionCajaclavo({
      adquisicionCajaclavo: this.adquisicionCajaclavoGroup.value
    }));
  }

  onCancel(): void {
    this.store.dispatch(irVistaAdquisicionCajaclavo({
      location: 'index'
    }));
  }

}
