import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {faEyeSlash, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgxImageGalleryComponent} from 'ngx-image-gallery';

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

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  faInfo = faInfoCircle;
  faEyeSlash = faEyeSlash;

  str = `hola
  este es un mensaje
  de varias lineas`;

  imagenes = [
    {
      url: './assets/home/images/img-gavion.jpg',
      name: 'Gavión y Colchoneta',
      description: `El gavión tipo caja es fabricado por una red tejida (malla de doble torsión), con triple capa de zinc, dandole un recubrimiento adicional. <br> <br> <b>Aplicaciones y uso</b> <ul><li>Muros de contención.</li><li>Conservación de suelos.</li><li>Control de rios, protección de estribos de puentes.</li></ul>
 <b>Espeficaciones</b><br> <ul><li>Hexagono: 8x10cm, 10x12cm</li><li>Alambre red: #12</li><li>Alambre bordes: #10</li><li>Alambre amarre: #14</li></ul>`,
      size: 'md',
      showDescription: false
    },
    {
      url: './assets/home/images/img-ganadera.jpg',
      name: 'Malla Ganadera',
      description: `Esta malla o cerco es fabricada con alambre galvanizado, su estructura consta de nudos y visagras, sus uniones estan articuladas, lo que permite que se adapte a cualquier tipo de terreno.<br> <br> <b>Aplicaciones y uso</b> <ul><li>Empleado en la construccion de cercos para ganado, de alto y bajo tamaño como: vacuno, ovinos, camelidos, alpaca entre otros.</li></ul>
<b>Presentación</b><ul><li>Rollos de 50 metros lineales</li><li>Altura: 1.40 mts</li></ul>`,
      size: 'sm',
      showDescription: false
    },
    {
      url: './assets/home/images/img-hexagonal.jpg',
      name: 'Malla Hexagonal',
      description: `Malla hecha de alambre galvanizado, posee una estructura resistente y moldeable, formado por hexagonos uniformes de triple torsión, haciendo de esta un producto versátil. <br><br>
<b>Aplicaciones y uso</b> <ul><li>En el sector agropecuario, en la fabricación de corrales. </li><li>Protección de viveros y cultivos.</li></ul>`,
      size: 'sm',
      showDescription: false
    },
    {
      url: './assets/home/images/img-olimpica.jpg',
      name: 'Malla Olimpica',
      description: `Es una cerca metalica hecha de alambre de acero galvanizado, es torcido helicoidalmente y entretegido, formando una malla continua compuesta de rombos sin nudos, obteniendo un producto que garantiza una mayor duración. <br> <br><b>Aplicaciones y uso</b> <ul><li>Ideal para cercos para ganaddo ovino, caprino, camelidos, industriales, canchas deportivas, entre otros.</li></ul>
<b>Espeficicaciones tecnicas</b>
<div class="table-reponsive">
  <table class="table table-light table-striped table-hover">
  <thead>
    <tr>
      <th>BWG(calibre)</th>
      <th>Diametro alambre (mm)<th>
      <th>Resistencia de tracción (mpa)<th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>14</td>
        <td>2.20</td>
        <td></td>
        <td rowspan="3" class="fs-2 pt-5 text-center">[380-500]</td>
    </tr>
    <tr>
        <td>12</td>
        <td>2.70</td>
        <td></td>
    </tr>
    <tr>
        <td>10</td>
        <td>3.40</td>
        <td></td>
    </tr>
    </tbody>
  </table>
</div>`,
      size: 'md',
      showDescription: false
    },
    {
      url: './assets/home/images/img-milimetrica.jpg',
      name: 'Malla Milimetrica',
      description: `Malla cuadrada de alambre galvanizado.<br> <br> <b>Aplicaciones y uso</b> <ul><li>Comunmente se utiliza en mosquiteros tarnices para cernir quinua, en las industrias y construcción</li></ul>`,
      size: 'md',
      showDescription: false
    }
  ];

  smallScren = false;

  constructor(public router: Router,
              private breakPoint: BreakpointObserver) {
    this.breakPoint.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScren = result.matches;
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // fullHeight();
    // counter();
    contentWayPoint();
    mobileMenuOutsideClick();
  }

  openGallery(index = 0): void {
    this.ngxImageGallery.open(index);
  }

}
