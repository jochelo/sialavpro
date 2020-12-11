import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AdminState} from '../../store/reducers/admin.reducer';
import {ReservaState} from '../../store/reducers/reserva.reducer';
import {storeReserva} from '../../store/actions/reserva.actions';
import {NgxSpinnerService} from 'ngx-spinner';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  faWhatsapp = faWhatsapp;

  reservaGroup: FormGroup;

  reservaState: ReservaState;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    contentWayPoint();
    mobileMenuOutsideClick();

    this.store.subscribe((state: any) => {
      this.reservaState = state.admin.reserva;
      if (this.reservaState.loaded) {
        this.reservaGroup.reset();
      }
    });

    this.reservaGroup = this.fb.group({
      nombre: new FormControl(null, [Validators.required]),
      celular: new FormControl(null, [Validators.required]),
      detalle: new FormControl(null, [Validators.required])
    });
  }

  onStore(): void {
    this.store.dispatch(storeReserva({
      reserva: this.reservaGroup.value
    }));
  }

}
