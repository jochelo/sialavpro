import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-entrega-pedido',
  templateUrl: './dialog-entrega-pedido.component.html',
  styles: [
  ]
})
export class DialogEntregaPedidoComponent implements OnInit {

  @ViewChild('inputFechaEntrega', {static: false}) inputFechaEntrega: ElementRef;

  dataGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEntregaPedidoComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataGroup = this.fb.group({
      fecha_entrega: new FormControl(moment().format('YYYY-MM-DD'), [Validators.required])
    });
    setTimeout( () => {
      this.inputFechaEntrega.nativeElement.focus();
    }, 300);
  }

  onOnSubmit(): void {
    if (this.dataGroup.value.fecha_entrega !== null) {
      this.dialogRef.close(this.dataGroup.value.fecha_entrega);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
