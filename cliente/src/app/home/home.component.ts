import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faCaretDown, faSignInAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

declare const burgerMenu: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faUserCircle = faUserCircle;
  faGithub = faGithub;
  faSignInAlt = faSignInAlt;
  faCaretDown = faCaretDown;

  isCollapse = false;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    burgerMenu();

    if (localStorage.getItem('token-prodag') !== null) {
      localStorage.removeItem('token-prodag');
    }
  }

}
