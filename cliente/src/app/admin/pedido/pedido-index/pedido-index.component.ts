import {Component, Input, OnInit} from '@angular/core';
import {PedidoState} from '../../../store/reducers/pedido.reducer';
import {faDollarSign, faEdit, faEllipsisV, faHashtag, faPlus, faSpinner, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Pedido} from '../../../models/pedido';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {
  deletePedido,
  editPedido,
  irVistaHistorialPagosPedido,
  irVistaPedido,
  paginatePedidos,
  searchPedidos,
  updatePedido
} from '../../../store/actions/pedido.actions';
import {FormControl, FormGroup} from '@angular/forms';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {DialogEntregaPedidoComponent} from '../../dialog-entrega-pedido/dialog-entrega-pedido.component';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {PedidoService} from 'src/app/services/pedido.service';
import {ImportePedido} from 'src/app/models/importe-pedido';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {justificarParr} from 'src/app/helpers/reportes';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styles: []
})
export class PedidoIndexComponent implements OnInit {

  @Input() pedidoState: PedidoState;

  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faHashtag = faHashtag;
  faEdit = faEdit;
  faDollarSign = faDollarSign;
  faTrash = faTrash;
  faPlus = faPlus;
  faSpinner = faSpinner;

  pedido: Pedido;

  searchGroup: FormGroup;

  smallScreen: boolean;

  constructor(private store: Store<AdminState>,
              private pedidoService: PedidoService,
              private dialog: MatDialog,
              private breakPoint: BreakpointObserver) {
    breakPoint.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    moment().locale('es');

    this.searchGroup = new FormGroup({
      fecha_registro: new FormControl(null),
      fecha_entrega: new FormControl(null),
      nombre_cliente: new FormControl(null),
      option: new FormControl('option1')
    });

    this.store.dispatch(paginatePedidos({
      items: 5,
      page: 1
    }));
  }

  onChangeState(action: any): any {
    switch (action.type) {
      case 'paginate':
        // this.store.dispatch(loadActivoFijos(action.payload));
        this.store.dispatch(searchPedidos({
          items: 5,
          page: 1,
          data: this.searchGroup.value
        }));
        break;
    }
  }

  onSearch(): void {
    this.store.dispatch(searchPedidos({
      items: 5,
      page: 1,
      data: this.searchGroup.value
    }));
  }

  onCreate(): void {
    this.store.dispatch(irVistaPedido({location: 'create'}));
  }

  onUpdatePago(pedido: Pedido): void {
    this.store.dispatch(editPedido({
      pedido
    }));
  }

  onEntregar(pedido: Pedido): void {
    if (confirm('¿Esta seguro de actualizar el estado del pedido a ENTREGADO?')) {
      const data = {
        id: pedido.id,
        entregado: true,
        fecha_entrega: null,
      };
      const dialogRef = this.dialog.open(DialogEntregaPedidoComponent, {
        disableClose: true,
        width: '350px',
        data
      });
      dialogRef.afterClosed().subscribe(result => {
        data.fecha_entrega = result;
        if (result !== null && result !== undefined) {
          this.store.dispatch(updatePedido({
            pedido: data
          }));
        }
      });
    }
  }

  onShowHistorialPago(pedido: Pedido): void {
    this.store.dispatch(irVistaHistorialPagosPedido({
      location: 'historial-pago',
      pedido
    }));
  }

  onPrintHistorialPago(pedido: Pedido): void {
    let h = 0;
    const doc = new jsPDF('p', 'mm', [215, 158]);
    const tableCompra = {
      head: [[
        'Nro',
        'Detalle',
        'Cantidad',
        ''
      ]],
      body: [],
      foot: [],
      startY: 40,
      margin: {
        left: 15
      },
      styles: {
        fontSize: 7,
        cellPadding: 1,
      },
      headStyles: {
        fillColor: '#d0d9ff',
        textColor: '#2c2c2c'
      },
      footStyles: {
        fillColor: '#d0d9ff',
        textColor: '#2c2c2c'
      },
      didParseCell: function(data) {
        const col = data.column.index;
        if (col === 2 || col === 3 || col === 4) {
          data.cell.styles.halign = 'right';
        }
      }
    };
    const table = {
      head: [[
        'Nro',
        'Fecha',
        'Monto'
      ]],
      body: [],
      foot: [],
      startY: 40,
      margin: {
        left: 15
      },
      styles: {
        fontSize: 7,
        cellPadding: 1,
      },
      headStyles: {
        fillColor: '#ceb4dc',
        textColor: '#2c2c2c'
      },
      footStyles: {
        fillColor: '#ceb4dc',
        textColor: '#2c2c2c'
      },
      didParseCell: function(data) {
        const col = data.column.index;
        if (col === 2) {
          data.cell.styles.halign = 'right';
        }
      },
      /*didDrawPage: function (data) {
        centrarTexto(doc, '' + data.pageNumber, 10, 0, 265);
        h = data.pageNumber;
      },
      columnStyles: {
        0: {
          cellWidth: 15
        },
        1: {
          cellWidth: 17
        },
        2: {
          cellWidth: 12
        },
        3: {
          cellWidth: 126
        },
        4: {
          cellWidth: 18
        }
      }*/
    };
    tableCompra.foot.push([
      '',
      'TOTAL',
      '',
      '' + new Intl.NumberFormat('de-DE').format(pedido.total) + ' Bs.',
    ]);
    this.pedidoService.historialPagosPedido(pedido.id).pipe(map((importesPedido: ImportePedido[]) => {
      let count = 1;
      let importeTotal = 0;
      importesPedido.map((importePedido: ImportePedido) => {
        table.body.push([
          '' + count,
          '' + moment(importePedido.created_at).locale('es').format('LLLL'),
          '' + new Intl.NumberFormat('de-DE').format(importePedido.importe) + ' Bs.'
        ]);
        importeTotal += importePedido.importe;
        count++;
      });
      table.foot.push([
        '',
        'TOTAL PAGOS',
        '' + new Intl.NumberFormat('de-DE').format(importeTotal) + ' Bs.',
      ]);
      count = 1;
      pedido.lista_productos.map((data: any) => {
        tableCompra.body.push([
          '' + count,
          '' + data.producto,
          '' + data.cantidadSolicitada,
          ''
        ]);
        count++;
      });
    })).subscribe(() => {
      doc.setFontSize(16);
      justificarParr(doc, `Historial de Pagos ${pedido.id}`, 15, 15, 1, 0, 'center');

      doc.setFontSize(8);
      doc.text(`Cliente: `, 15, 25);
      doc.text(`${pedido.nombre_cliente.charAt(0).toUpperCase() + pedido.nombre_cliente.slice(1)}`, 37, 25);

      doc.text(`Fecha Registro: `, 15, 30);
      doc.text(`${moment(pedido.created_at).locale('es').format('LL')}`, 37, 30);

      doc.setFont(doc.getFont().fontName, 'bold');
      doc.text(`DETALLE DE LA COMPRA`, 15, 38);

      (doc as any).autoTable(tableCompra);

      doc.text(`PAGOS`, 15, (doc as any).previousAutoTable.finalY + 10);

      table.startY = (doc as any).previousAutoTable.finalY + 12;

      (doc as any).autoTable(table);

      doc.save(`historialPagosPedido${pedido.id}.pdf`);
    });
  }

  onDelete(pedido: Pedido): void {
    if (confirm(`¿Está seguro de Eliminar este Pedido?`)) {
      this.store.dispatch(deletePedido({
        idpedido: pedido.id
      }));
    }
  }

}
