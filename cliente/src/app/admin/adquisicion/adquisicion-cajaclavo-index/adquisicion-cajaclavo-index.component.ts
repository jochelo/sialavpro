import { Component, OnInit } from '@angular/core';
import {AdquisicionCajaclavoState} from '../../../store/reducers/adquisicion-cajaclavo.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {
  deleteAdquisicionCajaclavo,
  irVistaAdquisicionCajaclavo,
  paginateAdquisicionCajaclavos,
  updateAdquisicionCajaclavo
} from '../../../store/actions/adquisicion-cajaclavo.actions';
import {AdquisicionCajaclavo} from '../../../models/adquisicion-cajaclavo';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-adquisicion-cajaclavo-index',
  templateUrl: './adquisicion-cajaclavo-index.component.html',
  styles: [
  ]
})
export class AdquisicionCajaclavoIndexComponent implements OnInit {

  adquisicionCajaclavoState: AdquisicionCajaclavoState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.subscribe((state: any) => {
      this.adquisicionCajaclavoState = state.admin.adquisicionCajaclavo;
      if (this.adquisicionCajaclavoState?.location === 'index') {
        contentWayPoint();
      }
    });

    this.store.dispatch(irVistaAdquisicionCajaclavo({
      location: 'index'
    }));

    this.store.dispatch(paginateAdquisicionCajaclavos({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        this.store.dispatch(paginateAdquisicionCajaclavos({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaAdquisicionCajaclavo({location: 'create'}));
  }

  onEdit(adquisicionCajaclavo: AdquisicionCajaclavo): void {
    this.store.dispatch(updateAdquisicionCajaclavo({
      adquisicionCajaclavo
    }));
  }

  onDelete(adquisicionCajaclavo: AdquisicionCajaclavo): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Adquisicion de Caja de clavos?`)) {
      this.store.dispatch(deleteAdquisicionCajaclavo({
        idadquisicionCajaclavo: adquisicionCajaclavo.id
      }));
    }
  }

}
