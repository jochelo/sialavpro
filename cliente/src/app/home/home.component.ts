import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {faCaretDown, faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {MatDrawer} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

declare const burgerMenu: any;
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('menu')menu: MatDrawer;

  faUserCircle = faUserCircle;
  faGithub = faGithub;
  faSignInAlt = faSignInAlt;
  faCaretDown = faCaretDown;

  smallScreen: boolean;
  isCollapse = false;

  constructor(public router: Router,
              private breakPoint: BreakpointObserver) {
    this.breakPoint.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    burgerMenu();
    $('body').removeClass('offcanvas');

    if (localStorage.getItem('token-prodag') !== null) {
      localStorage.removeItem('token-prodag');
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
    //  this.menu.toggle();
    }
  }

}
