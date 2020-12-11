import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {GavionService} from '../../services/gavion.service';
import {
  deleteGavion, deleteGavionFailure, deleteGavionSuccess,
  paginateGaviones,
  paginateGavionesFailure,
  paginateGavionesSuccess,
  storeGavion,
  storeGavionFailure,
  storeGavionSuccess, updateGavion, updateGavionFailure, updateGavionSuccess
} from '../actions/gavion.actions';
import {Paginate} from '../../models/paginate';
import {Gavion} from '../../models/gavion';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class GavionEffects {

  paginateGaviones$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateGaviones),
        switchMap((props: { items: number, page: number }) => {
          return this.gavionService.paginateGaviones(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateGavionesSuccess({
                  gaviones: response.data,
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
              catchError(error => of(paginateGavionesFailure(error)))
            );
        })
      ));

  storeGavion$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeGavion),
        switchMap((props: { gavion: Gavion | any }) => {
          this.spinner.show();
          return this.gavionService.storeGavion(props.gavion)
            .pipe(
              map((response: Gavion) => {
                this.spinner.hide();
                this.toastr.success('Gavion registrado Exitosamente');
                return storeGavionSuccess({
                  gavion: response
                });
              }),
              catchError(error => of(storeGavionFailure(error)))
            );
        })
      ));

  updateGavion$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateGavion),
        switchMap((props: { gavion: Gavion | any }) => {
          this.spinner.show();
          return this.gavionService.updateGavion(props.gavion)
            .pipe(
              map((response: Gavion) => {
                this.spinner.hide();
                this.toastr.success('Gavion actualizado Exitosamente');
                return updateGavionSuccess({
                  gavion: response
                });
              }),
              catchError(error => of(updateGavionFailure(error)))
            );
        })
      ));

  deleteGavion$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteGavion),
        switchMap((props: { idgavion: number }) => {
          this.spinner.show();
          return this.gavionService.deleteGavion(props.idgavion)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Gavion eliminado Exitosamente');
                return deleteGavionSuccess({
                  idgavion: response
                });
              }),
              catchError(error => of(deleteGavionFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private gavionService: GavionService,
              private router: Router) {
  }

}
