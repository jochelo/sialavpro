import {Component, Input, OnInit} from '@angular/core';
import {AlambreState} from '../../../store/reducers/alambre.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Alambre} from '../../../models/alambre';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteAlambre, editAlambre, irVistaAlambre, paginateAlambres} from '../../../store/actions/alambre.actions';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-alambre-index',
  templateUrl: './alambre-index.component.html',
  styles: []
})
export class AlambreIndexComponent implements OnInit {

  @Input() alambreState: AlambreState;

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
    this.store.dispatch(paginateAlambres({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        this.store.dispatch(paginateAlambres({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaAlambre({location: 'create'}));
  }

  onEdit(alambre: Alambre): void {
    this.store.dispatch(editAlambre({
      alambre
    }));
  }

  onDelete(alambre: Alambre): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Alambre?`)) {
      this.store.dispatch(deleteAlambre({
        idalambre: alambre.id
      }));
    }
  }
}
