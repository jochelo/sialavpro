import {Component, Input, OnInit} from '@angular/core';
import {ReservaState} from '../../../store/reducers/reserva.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Reserva} from '../../../models/reserva';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteReserva, editReserva, irVistaReserva, paginateReservas, recepcionarReserva} from '../../../store/actions/reserva.actions';
import {ReservaService} from '../../../services/reserva.service';
import {NgxSpinnerService} from 'ngx-spinner';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-reserva-index',
  templateUrl: './reserva-index.component.html',
  styles: []
})

export class ReservaIndexComponent implements OnInit {

  @Input() reservaState: ReservaState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  reserva: Reserva;

  constructor(private store: Store<AdminState>,
              private spinner: NgxSpinnerService,
              private reservaService: ReservaService) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginateReservas({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateReservas({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaReserva({location: 'create'}));
  }

  onEdit(reserva: Reserva): void {
    this.store.dispatch(editReserva({
      reserva
    }));
  }

  onRecepcionar(reserva: Reserva, check: boolean): void {
    this.store.dispatch(recepcionarReserva({
      idreserva: reserva.id,
      recepcionado: check
    }));
  }

  onDelete(reserva: Reserva): void {
    if (confirm(`¿Está seguro de Eliminar el registro de esta Reserva?`)) {
      this.store.dispatch(deleteReserva({
        idreserva: reserva.id
      }));
    }
  }
}
