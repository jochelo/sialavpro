import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {EmpleadoService} from '../../services/empleado.service';
import {
  deleteEmpleado,
  deleteEmpleadoFailure,
  deleteEmpleadoSuccess,
  getEmpleadosMalleros, getEmpleadosMallerosFailure,
  getEmpleadosMallerosSuccess,
  paginateEmpleados,
  paginateEmpleadosFailure,
  paginateEmpleadosSuccess,
  storeEmpleado,
  storeEmpleadoFailure,
  storeEmpleadoSuccess,
  updateEmpleado,
  updateEmpleadoFailure,
  updateEmpleadoSuccess
} from '../actions/empleado.actions';
import {Paginate} from '../../models/paginate';
import {Empleado} from '../../models/empleado';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class EmpleadoEffects {

  getEmpleados$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getEmpleadosMalleros),
        switchMap(() => {
          return this.empleadoService.getEmpleadosMalleros()
            .pipe(
              map((response: Empleado[]) => {
                return getEmpleadosMallerosSuccess({
                  empleados: response,
                });
              }),
              catchError(error => of(getEmpleadosMallerosFailure(error)))
            );
        })
      ));

  paginateEmpleados$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateEmpleados),
        switchMap((props: { items: number, page: number }) => {
          return this.empleadoService.paginateEmpleados(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateEmpleadosSuccess({
                  empleados: response.data,
                  paginacion: new Paginate(
                    response.current_page,
                    response.from,
                    response.last_page,
                    response.per_page,
                    response.to,
                    response.total,
                    pages
                  )
                });
              }),
              catchError(error => of(paginateEmpleadosFailure(error)))
            );
        })
      ));

  storeEmpleado$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeEmpleado),
        switchMap((props: { empleado: Empleado | any }) => {
          this.spinner.show();
          return this.empleadoService.storeEmpleado(props.empleado)
            .pipe(
              map((response: Empleado) => {
                this.spinner.hide();
                this.toastr.success('Empleado registrado Exitosamente');
                return storeEmpleadoSuccess({
                  empleado: response
                });
              }),
              catchError(error => of(storeEmpleadoFailure(error)))
            );
        })
      ));

  updateEmpleado$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateEmpleado),
        switchMap((props: { empleado: Empleado | any }) => {
          this.spinner.show();
          return this.empleadoService.updateEmpleado(props.empleado)
            .pipe(
              map((response: Empleado) => {
                this.spinner.hide();
                this.toastr.success('Empleado actualizado Exitosamente');
                return updateEmpleadoSuccess({
                  empleado: response
                });
              }),
              catchError(error => of(updateEmpleadoFailure(error)))
            );
        })
      ));

  deleteEmpleado$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteEmpleado),
        switchMap((props: { idempleado: number }) => {
          this.spinner.show();
          return this.empleadoService.deleteEmpleado(props.idempleado)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Empleado eliminado Exitosamente');
                return deleteEmpleadoSuccess({
                  idempleado: response
                });
              }),
              catchError(error => of(deleteEmpleadoFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private empleadoService: EmpleadoService,
              private router: Router) {
  }

}
