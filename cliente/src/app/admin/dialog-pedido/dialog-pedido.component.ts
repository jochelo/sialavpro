import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog-pedido',
  templateUrl: './dialog-pedido.component.html',
  styles: [
  ]
})
export class DialogPedidoComponent implements OnInit {

  @ViewChild('inputCantidad', {static: false}) inputCantidad: ElementRef;

  dataGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogPedidoComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dataGroup = this.fb.group({
      cantidadSolicitada: new FormControl(this.data.cantidad, [Validators.required])
    });
    setTimeout( () => {
      this.inputCantidad.nativeElement.focus();
    }, 300);
  }

  onOnSubmit(): void {
    if (this.dataGroup.value.cantidadSolicitada !== null) {
      this.dialogRef.close(this.dataGroup.value.cantidadSolicitada);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
