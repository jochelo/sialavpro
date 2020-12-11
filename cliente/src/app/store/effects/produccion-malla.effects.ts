import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {ProduccionMallaService} from '../../services/produccion-malla.service';
import {
  deleteProduccionMalla,
  deleteProduccionMallaFailure,
  deleteProduccionMallaSuccess,
  paginateProduccionMallas,
  paginateProduccionMallasFailure,
  paginateProduccionMallasSuccess,
  storeProduccionMallaGrupal,
  storeProduccionMallaGrupalFailure,
  storeProduccionMallaGrupalSuccess,
  storeProduccionMallaIndividual,
  storeProduccionMallaIndividualFailure,
  storeProduccionMallaIndividualSuccess,
  storeProduccionMallaSinCupo,
  storeProduccionMallaSinCupoFailure,
  storeProduccionMallaSinCupoSuccess,
  updateProduccionMalla,
  updateProduccionMallaFailure,
  updateProduccionMallaSuccess
} from '../actions/produccion-malla.actions';
import {Paginate} from '../../models/paginate';
import {ProduccionMalla} from '../../models/produccion-malla';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ProduccionMallaEffects {

  paginateProduccionMallas$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateProduccionMallas),
        switchMap((props: { items: number, page: number, fecha: string }) => {
          return this.produccionMallaService.paginateProduccionMallasFecha(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateProduccionMallasSuccess({
                  produccionMallas: response.data,
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
              catchError(error => of(paginateProduccionMallasFailure(error)))
            );
        })
      ));

  storeProduccionMallaIndividual$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionMallaIndividual),
        switchMap((props: { produccionMalla: ProduccionMalla | any }) => {
          this.spinner.show();
          return this.produccionMallaService.storeProduccionMallaIndividual(props.produccionMalla)
            .pipe(
              map((response: ProduccionMalla[]) => {
                this.spinner.hide();
                this.toastr.success('Producción de Malla Individual registrada Exitosamente');
                return storeProduccionMallaIndividualSuccess({
                  produccionMallas: response
                });
              }),
              catchError(error => of(storeProduccionMallaIndividualFailure(error)))
            );
        })
      ));

  storeProduccionMallaGrupal$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionMallaGrupal),
        switchMap((props: { produccionMalla: ProduccionMalla | any }) => {
          this.spinner.show();
          return this.produccionMallaService.storeProduccionMallaGrupal(props.produccionMalla)
            .pipe(
              map((response: ProduccionMalla[]) => {
                this.spinner.hide();
                this.toastr.success('Produccion Malla Grupal registrada Exitosamente');
                return storeProduccionMallaGrupalSuccess({
                  produccionMallas: response
                });
              }),
              catchError(error => of(storeProduccionMallaGrupalFailure(error)))
            );
        })
      ));

  storeProduccionMallaSinCupo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionMallaSinCupo),
        switchMap((props: { produccionMalla: ProduccionMalla | any }) => {
          this.spinner.show();
          return this.produccionMallaService.storeProduccionMallaSinCupo(props.produccionMalla)
            .pipe(
              map((response: ProduccionMalla[]) => {
                this.spinner.hide();
                this.toastr.success('Produccion Malla Sin Cupo registrada Exitosamente');
                return storeProduccionMallaSinCupoSuccess({
                  produccionMallas: response
                });
              }),
              catchError(error => of(storeProduccionMallaSinCupoFailure(error)))
            );
        })
      ));

  updateProduccionMalla$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateProduccionMalla),
        switchMap((props: { produccionMalla: ProduccionMalla | any }) => {
          this.spinner.show();
          return this.produccionMallaService.updateProduccionMalla(props.produccionMalla)
            .pipe(
              map((response: ProduccionMalla) => {
                this.spinner.hide();
                this.toastr.success('Producción de Malla actualizada Exitosamente');
                return updateProduccionMallaSuccess({
                  produccionMalla: response
                });
              }),
              catchError(error => of(updateProduccionMallaFailure(error)))
            );
        })
      ));

  deleteProduccionMalla$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteProduccionMalla),
        switchMap((props: { idproduccionMalla: number }) => {
          this.spinner.show();
          return this.produccionMallaService.deleteProduccionMalla(props.idproduccionMalla)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Producción de Malla eliminada Exitosamente');
                return deleteProduccionMallaSuccess({
                  idproduccionMalla: response
                });
              }),
              catchError(error => of(deleteProduccionMallaFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private produccionMallaService: ProduccionMallaService,
              private router: Router) {
  }

}
