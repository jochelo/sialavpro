import {Component, Input, OnInit} from '@angular/core';
import {ProduccionMallaState} from '../../../store/reducers/produccion-malla.reducer';
import {
  faCaretLeft,
  faCaretRight,
  faDumpster,
  faEdit,
  faEllipsisV,
  faHashtag,
  faPlus,
  faSpinner, faSyncAlt,
  faTimes,
  faTrash,
  faUserCog,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import {ProduccionMalla} from '../../../models/produccion-malla';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {
  deleteProduccionMalla,
  editProduccionMalla,
  irVistaProduccionMalla,
  paginateProduccionMallas, updateProduccionMalla
} from '../../../store/actions/produccion-malla.actions';
import * as moment from 'moment';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-produccion-malla-index',
  templateUrl: './produccion-malla-index.component.html',
  styles: []
})
export class ProduccionMallaIndexComponent implements OnInit {

  @Input() produccionMallaState: ProduccionMallaState;

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
    this.store.dispatch(paginateProduccionMallas({
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
    this.store.dispatch(paginateProduccionMallas({
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
        this.store.dispatch(paginateProduccionMallas({
          items: action.payload.items,
          page: action.payload.page,
          fecha: this.now.format('YYYY-MM-DD')
        }));
        break;
    }
  }

  onCreateIndividual(): void {
    this.store.dispatch(irVistaProduccionMalla({location: 'create-individual'}));
  }

  onCreateGrupal(): void {
    this.store.dispatch(irVistaProduccionMalla({location: 'create-grupal'}));
  }

  onCreateSinCupo(): void {
    this.store.dispatch(irVistaProduccionMalla({location: 'create-sin-cupo'}));
  }

  onCumplido(produccionMalla: ProduccionMalla): boolean {
    if (produccionMalla.cupo !== null) {
      return produccionMalla.cupo <= produccionMalla.cantidad;
    } else {
      return true;
    }
  }

  onUpdate(produccionMalla: ProduccionMalla): void {
    this.store.dispatch(updateProduccionMalla({
      produccionMalla
    }));
  }

  onDelete(produccionMalla: ProduccionMalla): void {
    if (confirm(`¿Está seguro de Eliminar el registro de esta Producción de Malla?`)) {
      this.store.dispatch(deleteProduccionMalla({
        idproduccionMalla: produccionMalla.id
      }));
    }
  }

}
