import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {ProduccionGavionService} from '../../services/produccion-gavion.service';
import {
  deleteProduccionGavion,
  deleteProduccionGavionFailure,
  deleteProduccionGavionSuccess,
  paginateProduccionGaviones,
  paginateProduccionGavionesFailure,
  paginateProduccionGavionesSuccess,
  storeProduccionGavionGrupal,
  storeProduccionGavionGrupalFailure,
  storeProduccionGavionGrupalSuccess,
  storeProduccionGavionIndividual,
  storeProduccionGavionIndividualFailure,
  storeProduccionGavionIndividualSuccess,
  storeProduccionGavionSinCupo,
  storeProduccionGavionSinCupoFailure,
  storeProduccionGavionSinCupoSuccess,
  updateProduccionGavion,
  updateProduccionGavionFailure,
  updateProduccionGavionSuccess
} from '../actions/produccion-gavion.actions';
import {Paginate} from '../../models/paginate';
import {ProduccionGavion} from '../../models/produccion-gavion';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ProduccionGavionEffects {

  paginateProduccionGaviones$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateProduccionGaviones),
        switchMap((props: { items: number, page: number, fecha: string }) => {
          return this.produccionGavionService.paginateProduccionGavionesFecha(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateProduccionGavionesSuccess({
                  produccionGaviones: response.data,
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
              catchError(error => of(paginateProduccionGavionesFailure(error)))
            );
        })
      ));

  storeProduccionGavionIndividual$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionGavionIndividual),
        switchMap((props: { produccionGavion: ProduccionGavion | any }) => {
          this.spinner.show();
          return this.produccionGavionService.storeProduccionGavionIndividual(props.produccionGavion)
            .pipe(
              map((response: ProduccionGavion[]) => {
                this.spinner.hide();
                this.toastr.success('Producción de Gavion Individual registrada Exitosamente');
                return storeProduccionGavionIndividualSuccess({
                  produccionGaviones: response
                });
              }),
              catchError(error => of(storeProduccionGavionIndividualFailure(error)))
            );
        })
      ));

  storeProduccionGavionGrupal$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionGavionGrupal),
        switchMap((props: { produccionGavion: ProduccionGavion | any }) => {
          this.spinner.show();
          return this.produccionGavionService.storeProduccionGavionGrupal(props.produccionGavion)
            .pipe(
              map((response: ProduccionGavion[]) => {
                this.spinner.hide();
                this.toastr.success('Produccion Gavion Grupal registrada Exitosamente');
                return storeProduccionGavionGrupalSuccess({
                  produccionGaviones: response
                });
              }),
              catchError(error => of(storeProduccionGavionGrupalFailure(error)))
            );
        })
      ));

  storeProduccionGavionSinCupo$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeProduccionGavionSinCupo),
        switchMap((props: { produccionGavion: ProduccionGavion | any }) => {
          this.spinner.show();
          return this.produccionGavionService.storeProduccionGavionSinCupo(props.produccionGavion)
            .pipe(
              map((response: ProduccionGavion[]) => {
                this.spinner.hide();
                this.toastr.success('Produccion Gavion Sin Cupo registrada Exitosamente');
                return storeProduccionGavionSinCupoSuccess({
                  produccionGaviones: response
                });
              }),
              catchError(error => of(storeProduccionGavionSinCupoFailure(error)))
            );
        })
      ));

  updateProduccionGavion$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateProduccionGavion),
        switchMap((props: { produccionGavion: ProduccionGavion | any }) => {
          this.spinner.show();
          return this.produccionGavionService.updateProduccionGavion(props.produccionGavion)
            .pipe(
              map((response: ProduccionGavion) => {
                this.spinner.hide();
                this.toastr.success('Producción de Gavion actualizada Exitosamente');
                return updateProduccionGavionSuccess({
                  produccionGavion: response
                });
              }),
              catchError(error => of(updateProduccionGavionFailure(error)))
            );
        })
      ));

  deleteProduccionGavion$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteProduccionGavion),
        switchMap((props: { idproduccionGavion: number }) => {
          this.spinner.show();
          return this.produccionGavionService.deleteProduccionGavion(props.idproduccionGavion)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Producción de Gavion eliminada Exitosamente');
                return deleteProduccionGavionSuccess({
                  idproduccionGavion: response
                });
              }),
              catchError(error => of(deleteProduccionGavionFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private produccionGavionService: ProduccionGavionService,
              private router: Router) {
  }

}
