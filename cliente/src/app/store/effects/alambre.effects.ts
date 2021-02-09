import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of, range} from 'rxjs';
import {AlambreService} from '../../services/alambre.service';
import {
  deleteAlambre, deleteAlambreFailure, deleteAlambreSuccess, getAlambres, getAlambresFailure, getAlambresSuccess,
  paginateAlambres,
  paginateAlambresFailure,
  paginateAlambresSuccess,
  storeAlambre,
  storeAlambreFailure,
  storeAlambreSuccess, updateAlambre, updateAlambreFailure, updateAlambreSuccess
} from '../actions/alambre.actions';
import {Paginate} from '../../models/paginate';
import {Alambre} from '../../models/alambre';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class AlambreEffects {

  getAlambres$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(getAlambres),
        switchMap(() => {
          return this.alambreService.getAlambres()
            .pipe(
              map((response: Alambre[]) => {
                return getAlambresSuccess({
                  alambres: response
                });
              }),
              catchError(error => of(getAlambresFailure(error)))
            );
        })
      ));

  paginateAlambres$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(paginateAlambres),
        switchMap((props: { items: number, page: number }) => {
          return this.alambreService.paginateAlambres(props)
            .pipe(
              map((response: any) => {
                const pages: number[] = [];
                range(1, 10).subscribe(item => pages.push(item * 10));
                return paginateAlambresSuccess({
                  alambres: response.data,
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
              catchError(error => of(paginateAlambresFailure(error)))
            );
        })
      ));

  storeAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(storeAlambre),
        switchMap((props: { alambre: Alambre | any }) => {
          this.spinner.show();
          return this.alambreService.storeAlambre(props.alambre)
            .pipe(
              map((response: Alambre) => {
                this.spinner.hide();
                this.toastr.success('Alambre registrado Exitosamente');
                return storeAlambreSuccess({
                  alambre: response
                });
              }),
              catchError(error => {
                this.spinner.hide();
                return of(storeAlambreFailure(error));
              })
            );
        })
      ));

  updateAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(updateAlambre),
        switchMap((props: { alambre: Alambre | any }) => {
          this.spinner.show();
          return this.alambreService.updateAlambre(props.alambre)
            .pipe(
              map((response: Alambre) => {
                this.spinner.hide();
                this.toastr.success('Alambre actualizado Exitosamente');
                return updateAlambreSuccess({
                  alambre: response
                });
              }),
              catchError(error => {
                this.spinner.hide();
                return of(updateAlambreFailure(error));
              })
            );
        })
      ));

  deleteAlambre$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(deleteAlambre),
        switchMap((props: { idalambre: number }) => {
          this.spinner.show();
          return this.alambreService.deleteAlambre(props.idalambre)
            .pipe(
              map((response: number) => {
                this.spinner.hide();
                this.toastr.success('Alambre eliminado Exitosamente');
                return deleteAlambreSuccess({
                  idalambre: response
                });
              }),
              catchError(error => of(deleteAlambreFailure(error)))
            );
        })
      ));

  constructor(private actions$: Actions,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private alambreService: AlambreService,
              private router: Router) {
  }

}
