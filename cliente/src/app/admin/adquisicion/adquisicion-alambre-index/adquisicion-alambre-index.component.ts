import {Component, OnInit} from '@angular/core';
import {AdquisicionAlambreState} from '../../../store/reducers/adquisicion-alambre.reducer';
import {faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {
  deleteAdquisicionAlambre,
  irVistaAdquisicionAlambre,
  paginateAdquisicionAlambres,
  updateAdquisicionAlambre
} from '../../../store/actions/adquisicion-alambre.actions';
import {AdquisicionAlambre} from '../../../models/adquisicion-alambre';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-adquisicion-alambre-index',
  templateUrl: './adquisicion-alambre-index.component.html',
  styles: []
})
export class AdquisicionAlambreIndexComponent implements OnInit {

  adquisicionAlambreState: AdquisicionAlambreState;

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
      this.adquisicionAlambreState = state.admin.adquisicionAlambre;
      if (this.adquisicionAlambreState?.location === 'index') {
        contentWayPoint();
      }
    });

    this.store.dispatch(irVistaAdquisicionAlambre({
      location: 'index'
    }));

    this.store.dispatch(paginateAdquisicionAlambres({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        this.store.dispatch(paginateAdquisicionAlambres({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaAdquisicionAlambre({location: 'create'}));
  }

  onEdit(adquisicionAlambre: AdquisicionAlambre): void {
    this.store.dispatch(updateAdquisicionAlambre({
      adquisicionAlambre
    }));
  }

  onDelete(adquisicionAlambre: AdquisicionAlambre): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Adquisicion de Alambre?`)) {
      this.store.dispatch(deleteAdquisicionAlambre({
        idadquisicionAlambre: adquisicionAlambre.id
      }));
    }
  }

}
