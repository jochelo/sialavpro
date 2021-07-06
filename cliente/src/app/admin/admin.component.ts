import {Component, OnInit, ViewChild} from '@angular/core';
import {faCaretDown, faCaretUp, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {items} from './admin-items';
import {environment} from '../../environments/environment.prod';
import {AuthState} from '../store/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectCuentaUsuario} from '../store/selectors/auth.selectors';
import {AdminState} from '../store/reducers/admin.reducer';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr';
import {setAuth} from '../store/actions/auth.actions';
import {MatDrawer} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

declare const burgerMenu: any;
declare const $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  @ViewChild('menu') menu: MatDrawer;

  BASE_URL = environment.base;

  faUserCircle = faUserCircle;
  faGithub = faGithub;
  faSignOutAlt = faSignOutAlt;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  smallScreen: boolean;

  items = [];
  isCollapse = false;
  dropdown = true;

  auth$: Observable<string>;

  authState: AuthState;

  constructor(public router: Router,
              private toastr: ToastrService,
              private authService: AuthService,
              private breakPoint: BreakpointObserver,
              private store$: Store<AdminState>) {
    this.breakPoint.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    burgerMenu();

    this.items = items;

    this.auth$ = this.store$.pipe(
      select(selectCuentaUsuario)
    );

    this.store$.subscribe((state: any) => {
      this.authState = state.auth;
    });

    if (this.authState.usuario === null) {
      this.store$.dispatch(setAuth());
    }
  }

  /*onShowNav(): boolean {
    if (!this.smallScreen) {
      return true;
    } else {
      this.menu.toggle();
    }
  }*/

  onLimpiar(): any {
    this.items = this.items.map((it: any) => {
      it.isCollapsed = true;
      return it;
    });
  }

  onCollapse(item: any): boolean {
    if (item.isCollapsed) {
      this.onLimpiar();
      return false;
    } else {
      return true;
    }
  }

  onCollapseMenu(): void {
    if ($('body').hasClass('offcanvas')) {
      if (this.smallScreen) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    }
    if (this.smallScreen) {
      // this.menu.toggle();
    }
  }

  logout(): void {
    this.dropdown = false;
    this.authService.logout().subscribe();
  }

}
