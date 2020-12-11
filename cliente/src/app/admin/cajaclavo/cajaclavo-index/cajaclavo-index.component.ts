import {Component, Input, OnInit} from '@angular/core';
import {CajaclavoState} from '../../../store/reducers/cajaclavo.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Cajaclavo} from '../../../models/cajaclavo';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteCajaclavo, editCajaclavo, irVistaCajaclavo, paginateCajaclavos} from '../../../store/actions/cajaclavo.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-cajaclavo-index',
  templateUrl: './cajaclavo-index.component.html',
  styles: []
})
export class CajaclavoIndexComponent implements OnInit {

  @Input() cajaclavoState: CajaclavoState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  cajaclavo: Cajaclavo;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginateCajaclavos({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateCajaclavos({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaCajaclavo({location: 'create'}));
  }

  onEdit(cajaclavo: Cajaclavo): void {
    this.store.dispatch(editCajaclavo({
      cajaclavo
    }));
  }

  onDelete(cajaclavo: Cajaclavo): void {
    if (confirm(`¿Está seguro de Eliminar el registro de esta Caja de clavos?`)) {
      this.store.dispatch(deleteCajaclavo({
        idcajaclavo: cajaclavo.id
      }));
    }
  }
}
