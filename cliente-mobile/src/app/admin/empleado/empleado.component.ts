import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
})
export class EmpleadoComponent implements OnInit {

  // location = 'index';

  empleadoState = {
    location: 'index',
    empleado: null
  };

  constructor() { }

  ngOnInit() {}

}
