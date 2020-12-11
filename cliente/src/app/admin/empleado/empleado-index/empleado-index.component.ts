import {Component, Input, OnInit} from '@angular/core';
import {EmpleadoState} from '../../../store/reducers/empleado.reducer';
import {
  faEdit,
  faEllipsisV,
  faHashtag,
  faPlus,
  faSpinner,
  faTimes,
  faTrash,
  faUserCheck,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {deleteEmpleado, editEmpleado, irVistaEmpleado, paginateEmpleados} from '../../../store/actions/empleado.actions';
import {Empleado} from '../../../models/empleado';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styles: []
})
export class EmpleadoIndexComponent implements OnInit {

  @Input() empleadoState: EmpleadoState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;
  faUserCheck = faUserCheck;

  empleado: Empleado;

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
    this.store.dispatch(paginateEmpleados({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(paginateEmpleados({
          items: action.payload.items,
          page: action.payload.page,
        }));
        break;
    }
  }

  onCreate(): void {
    this.store.dispatch(irVistaEmpleado({location: 'create'}));
  }

  onEdit(empleado: Empleado): void {
    this.store.dispatch(editEmpleado({
      empleado
    }));
  }

  onDelete(empleado: Empleado): void {
    if (confirm(`¿Está seguro de Eliminar el registro de este Empleado?`)) {
      this.store.dispatch(deleteEmpleado({
        idempleado: empleado.id
      }));
    }
  }
}
