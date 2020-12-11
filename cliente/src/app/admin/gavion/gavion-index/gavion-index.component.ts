import {Component, Input, OnInit} from '@angular/core';
import {GavionState} from '../../../store/reducers/gavion.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Gavion} from '../../../models/gavion';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteGavion, editGavion, irVistaGavion, paginateGaviones} from '../../../store/actions/gavion.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-gavion-index',
  templateUrl: './gavion-index.component.html',
  styles: [
  ]
})
export class GavionIndexComponent implements OnInit {

  @Input() gavionState: GavionState;

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
    this.store.dispatch(paginateGaviones({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateGaviones({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaGavion({location: 'create'}));
  }

  onEdit(gavion: Gavion): void {
    this.store.dispatch(editGavion( {
      gavion
    }));
  }

  onDelete(gavion: Gavion): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Gavion?`)) {
      this.store.dispatch(deleteGavion( {
        idgavion: gavion.id
      }));
    }
  }

}
