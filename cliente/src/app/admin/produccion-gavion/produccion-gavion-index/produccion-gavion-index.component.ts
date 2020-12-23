import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ProduccionGavionState} from '../../../store/reducers/produccion-gavion.reducer';
import {
  faCaretLeft,
  faCaretRight,
  faDumpster,
  faEdit,
  faEllipsisV,
  faHashtag,
  faPlus,
  faSpinner,
  faSyncAlt,
  faTimes,
  faTrash,
  faUserCog,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {
  deleteProduccionGavion,
  irVistaProduccionGavion,
  paginateProduccionGaviones,
  updateProduccionGavion
} from '../../../store/actions/produccion-gavion.actions';
import {ProduccionGavion} from '../../../models/produccion-gavion';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-produccion-gavion-index',
  templateUrl: './produccion-gavion-index.component.html',
  styles: [
  ]
})
export class ProduccionGavionIndexComponent implements OnInit {

  @Input() produccionGavionState: ProduccionGavionState;

  now: any;
  showHoy = true;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faSyncAlt = faSyncAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;
  faUserCog = faUserCog;
  faUsersCog = faUsersCog;
  faDumpster = faDumpster;
  faCaretRight = faCaretRight;
  faCaretLetf = faCaretLeft;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.now = moment();
    this.store.dispatch(paginateProduccionGaviones({
      items: 5,
      page: 1,
      fecha: this.now.format('YYYY-MM-DD')
    }));
  }

  onChangeDate(addDay: number): void {
    if (addDay === 0) {
      this.now = moment();
    } else {
      this.now = moment(this.now).add(addDay, 'days');
    }
    this.store.dispatch(paginateProduccionGaviones({
      items: 5,
      page: 1,
      fecha: this.now.format('YYYY-MM-DD')
    }));

    this.showHoy = this.now.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateProduccionGaviones({
          items: action.payload.items,
          page: action.payload.page,
          fecha: this.now.format('YYYY-MM-DD')
        }));
        break;
    }
  }

  onCreateIndividual(): void {
    this.store.dispatch(irVistaProduccionGavion({location: 'create-individual'}));
  }

  onCreateGrupal(): void {
    this.store.dispatch(irVistaProduccionGavion({location: 'create-grupal'}));
  }

  onCreateSinCupo(): void {
    this.store.dispatch(irVistaProduccionGavion({location: 'create-sin-cupo'}));
  }

  onCumplido(produccionGavion: ProduccionGavion): boolean {
    if (produccionGavion.cupo !== null) {
      return produccionGavion.cupo <= produccionGavion.cantidad;
    } else {
      return true;
    }
  }

  onUpdate(produccionGavion: ProduccionGavion): void {
    this.store.dispatch(updateProduccionGavion({
      produccionGavion
    }));
  }

  onDelete(produccionGavion: ProduccionGavion): void {
    if (confirm(`¿Está seguro de Eliminar el registro de esta Producción de Gavion?`)) {
      this.store.dispatch(deleteProduccionGavion({
        idproduccionGavion: produccionGavion.id
      }));
    }
  }

}
