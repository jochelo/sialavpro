import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empleado-edit-huella',
  templateUrl: './empleado-edit-huella.component.html',
  styleUrls: ['./empleado-edit-huella.component.scss'],
})
export class EmpleadoEditHuellaComponent implements OnInit {

  @Input() empleadoState: any;

  constructor() { }

  ngOnInit() {}

}
