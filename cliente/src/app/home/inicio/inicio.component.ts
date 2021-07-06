import {Component, OnInit} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import TypeWriter from 't-writer.js';

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

  textSubtitle = [
    'Productos de Acero Galvanizado',
    'Industria nacional, 100% Boliviana',
    'Calidad y garantia'
  ];

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

    const subTitles = document.getElementsByClassName('overlay-subtitle');

    for (let i = 0 ; i < subTitles.length ; i++) {
      const write = new TypeWriter(subTitles[i], {
        loop: true,
        typeSpeed: 80,
        deleteSpeed: 55,
        typeColor: 'white'
      });
      write
        .type(this.textSubtitle[i])
        .rest(500)
        .remove(this.textSubtitle[i].length)
        .clear()
        .start();
    }
  }

}
