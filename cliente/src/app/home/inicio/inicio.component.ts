import { Component, OnInit } from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

declare const fullHeight: any;
declare const counter: any;
declare const counterWayPoint: any;
declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;
declare const sliderMain: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  faCheck = faCheck;

  constructor() {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    fullHeight();
    counter();
    contentWayPoint();
    counterWayPoint();
    mobileMenuOutsideClick();
    sliderMain();
  }

}
