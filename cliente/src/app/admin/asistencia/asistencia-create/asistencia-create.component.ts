import { Component, OnInit } from '@angular/core';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-asistencia-create',
  templateUrl: './asistencia-create.component.html',
  styles: [
  ]
})
export class AsistenciaCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();
  }

}
