import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare const fullHeight: any;
declare const counter: any;
declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    fullHeight();
    counter();
    contentWayPoint();
    mobileMenuOutsideClick();
  }

}
