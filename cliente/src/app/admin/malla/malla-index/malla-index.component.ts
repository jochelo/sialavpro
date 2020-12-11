import {Component, Input, OnInit} from '@angular/core';
import {MallaState} from '../../../store/reducers/malla.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteMalla, editMalla, irVistaMalla, paginateMallas} from '../../../store/actions/malla.actions';
import {Malla} from '../../../models/malla';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-malla-index',
  templateUrl: './malla-index.component.html',
  styles: []
})
export class MallaIndexComponent implements OnInit {

  @Input() mallaState: MallaState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  malla: Malla;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginateMallas({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateMallas({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaMalla({location: 'create'}));
  }

  onEdit(malla: Malla): void {
    this.store.dispatch(editMalla({
      malla
    }));
  }

  onDelete(malla: Malla): void {
    if (confirm(`¿Está seguro de Eliminar el registro de esta Malla?`)) {
      this.store.dispatch(deleteMalla({
        idmalla: malla.id
      }));
    }
  }
}
