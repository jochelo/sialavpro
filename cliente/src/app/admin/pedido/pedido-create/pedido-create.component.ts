import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PedidoState} from '../../../store/reducers/pedido.reducer';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {faArrowRight, faEdit, faEllipsisV, faPlus, faSyncAlt, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons';
import {irVistaPedido, storePedido} from '../../../store/actions/pedido.actions';
import {Store} from '@ngrx/store';
import {AdminState} from '../../../store/reducers/admin.reducer';
import {ClienteState} from '../../../store/reducers/cliente.reducer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {getClientes, irVistaCliente, resetCliente, showCliente} from '../../../store/actions/cliente.actions';
import {NgxSpinnerService} from 'ngx-spinner';
import {MallaState} from '../../../store/reducers/malla.reducer';
import {getMallas} from '../../../store/actions/malla.actions';
import {MatStepper} from '@angular/material/stepper';
import {MatSelectionList} from '@angular/material/list';
import {GavionState} from '../../../store/reducers/gavion.reducer';
import {AlambreState} from '../../../store/reducers/alambre.reducer';
import {CajaclavoState} from '../../../store/reducers/cajaclavo.reducer';
import {getGaviones} from '../../../store/actions/gavion.actions';
import {getAlambres} from '../../../store/actions/alambre.actions';
import {getCajaclavos} from '../../../store/actions/cajaclavo.actions';
import {MatDialog} from '@angular/material/dialog';
import {DialogPedidoComponent} from '../../dialog-pedido/dialog-pedido.component';
import {Malla} from '../../../models/malla';
import {Gavion} from '../../../models/gavion';
import {Alambre} from '../../../models/alambre';
import {Cajaclavo} from '../../../models/cajaclavo';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

declare const contentWayPoint: any;
declare const mobileMenuOutsideClick: any;

@Component({
  selector: 'app-pedido-create',
  templateUrl: './pedido-create.component.html',
  styles: []
})
export class PedidoCreateComponent implements OnInit {

  @Input() pedidoState: PedidoState;

  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  @ViewChild('listMallas', {static: false}) listMallas: MatSelectionList;
  @ViewChild('listGaviones', {static: false}) listGaviones: MatSelectionList;
  @ViewChild('listAlambres', {static: false}) listAlambres: MatSelectionList;
  @ViewChild('listClavos', {static: false}) listClavos: MatSelectionList;

  smallScreen: boolean;
  stateSelectProductos = true;

  editTotal = false;

  ordenMallas: Malla[] = [];
  ordenGaviones: Gavion[] = [];
  ordenAlambres: Alambre[] = [];
  ordenCajaclavos: Cajaclavo[] = [];

  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faTimes = faTimes;
  faSyncAlt = faSyncAlt;
  faEllipsisV = faEllipsisV;
  faArrowRight = faArrowRight;

  searchGroup: FormGroup;
  pedidoGroup: FormGroup;
  data: FormControl = new FormControl('');
  buscador: FormControl = new FormControl('');

  clienteState: ClienteState = undefined;
  mallaState: MallaState = undefined;
  gavionState: GavionState = undefined;
  alambreState: AlambreState = undefined;
  cajaclavoState: CajaclavoState = undefined;

  constructor(private store: Store<AdminState>,
              private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private breakPoint: BreakpointObserver) {
    breakPoint.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit(): void {
    contentWayPoint();
    mobileMenuOutsideClick();

    this.searchGroup = this.fb.group({
      cliente_id: new FormControl(null, [Validators.required])
    });

    this.pedidoGroup = this.fb.group({
      total: new FormControl(0, [Validators.required]),
      cancelado: new FormControl(0, [Validators.required]),
      entregado: new FormControl(true, [Validators.required]),
      cliente_id: new FormControl(null, [Validators.required])
    });

    this.store.subscribe((state: any) => {
      this.clienteState = state.admin.cliente;
      this.mallaState = state.admin.malla;
      this.gavionState = state.admin.gavion;
      this.alambreState = state.admin.alambre;
      this.cajaclavoState = state.admin.cajaclavo;

      if (this.clienteState.location === 'index') {
        contentWayPoint();
      }

      if (this.clienteState !== undefined && this.clienteState.cliente !== null) {
        this.searchGroup.patchValue({
          cliente_id: this.clienteState.cliente.id
        });
      }
    });

    this.clienteState.cliente = null;
    this.searchGroup.patchValue({
      cliente_id: null
    });

    this.store.dispatch(getClientes());

    this.store.dispatch(getMallas());
    this.store.dispatch(getGaviones());
    this.store.dispatch(getAlambres());
    this.store.dispatch(getCajaclavos());
  }

  onGetCliente(): void {
    if (this.searchGroup.value.cliente_id !== null) {
      this.store.dispatch(showCliente({
        idcliente: this.searchGroup.value.cliente_id
      }));
    }
    this.stepper.next();
  }

  onResetCliente(): void {
    this.store.dispatch(resetCliente());
    this.searchGroup.patchValue({
      idcliente: null
    });
  }

  onFind(tipo: string, id: number): boolean {
    switch (tipo) {
      case 'malla':
        for (let i = 0; i < this.listMallas.selectedOptions.selected.length; i++) {
          if (id === this.listMallas.selectedOptions.selected[i].value.id) {
            this.ordenMallas.push(this.listMallas.selectedOptions.selected[i].value);
            return true;
          }
        }
        this.ordenMallas = this.ordenMallas.filter((malla: Malla) => {
          if (id !== malla.id) {
            return malla;
          }
        });
        return false;
      case 'gavion':
        for (let i = 0; i < this.listGaviones.selectedOptions.selected.length; i++) {
          if (id === this.listGaviones.selectedOptions.selected[i].value.id) {
            this.ordenGaviones.push(this.listGaviones.selectedOptions.selected[i].value);
            return true;
          }
        }
        this.ordenGaviones = this.ordenGaviones.filter((gavion: Gavion) => {
          if (id !== gavion.id) {
            return gavion;
          }
        });
        return false;
      case 'alambre':
        for (let i = 0; i < this.listAlambres.selectedOptions.selected.length; i++) {
          if (id === this.listAlambres.selectedOptions.selected[i].value.id) {
            this.ordenAlambres.push(this.listAlambres.selectedOptions.selected[i].value);
            return true;
          }
        }
        this.ordenAlambres = this.ordenAlambres.filter((alambre: Alambre) => {
          if (id !== alambre.id) {
            return alambre;
          }
        });
        return false;
      case 'cajaclavo':
        for (let i = 0; i < this.listClavos.selectedOptions.selected.length; i++) {
          if (id === this.listClavos.selectedOptions.selected[i].value.id) {
            this.ordenCajaclavos.push(this.listClavos.selectedOptions.selected[i].value);
            return true;
          }
        }
        this.ordenCajaclavos = this.ordenCajaclavos.filter((cajaclavo: Cajaclavo) => {
          if (id !== cajaclavo.id) {
            return cajaclavo;
          }
        });
        return false;
    }
  }

  onCreateCliente(): void {
    this.store.dispatch(irVistaCliente({
      location: 'create'
    }));
  }

  onShowDialog(data: any, tipo: string): void {
    if (this.onFind(tipo, data.id)) {
      let name = '';
      switch (tipo) {
        case 'malla':
        case 'gavion':
        case 'cajaclavo':
          name = data.tipo_dimension;
          break;
        case 'alambre':
          name = data.tipo_awg;
          break;
      }
      const dialogRef = this.dialog.open(DialogPedidoComponent, {
        disableClose: true,
        width: '300px',
        data: {name, cantidad: data.cantidadSolicitada}
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed', result);
        if (result) {
          data.cantidadSolicitada = result;
          this.pedidoGroup.patchValue({
            total: this.pedidoGroup.value.total + (data.precio * data.cantidadSolicitada)
          });
        } else {
          // borrar item
          this.onDeleteItem(tipo, data.id);
        }
      });
    } else {
      this.pedidoGroup.patchValue({
        total: this.pedidoGroup.value.total - (data.precio * data.cantidadSolicitada)
      });
      data.cantidadSolicitada = null;
    }
  }

  onDeleteItem(tipo: string, id: number): void {
    switch (tipo) {
      case 'malla':
        for (let i = 0; i < this.listMallas.selectedOptions.selected.length; i++) {
          if (id === this.listMallas.selectedOptions.selected[i].value.id) {
            this.listMallas.selectedOptions.selected[i].selected = false;
          }
        }
        this.ordenMallas = this.ordenMallas.filter((malla: Malla) => {
          if (id !== malla.id) {
            return malla;
          }
        });
        break;
      case 'gavion':
        for (let i = 0; i < this.listGaviones.selectedOptions.selected.length; i++) {
          if (id === this.listGaviones.selectedOptions.selected[i].value.id) {
            this.listGaviones.selectedOptions.selected[i].selected = false;
          }
        }
        this.ordenGaviones = this.ordenGaviones.filter((gavion: Gavion) => {
          if (id !== gavion.id) {
            return gavion;
          }
        });
        break;
      case 'alambre':
        for (let i = 0; i < this.listAlambres.selectedOptions.selected.length; i++) {
          if (id === this.listAlambres.selectedOptions.selected[i].value.id) {
            this.listAlambres.selectedOptions.selected[i].selected = false;
          }
        }
        this.ordenAlambres = this.ordenAlambres.filter((alambre: Alambre) => {
          if (id !== alambre.id) {
            return alambre;
          }
        });
        break;
      case 'cajaclavo':
        for (let i = 0; i < this.listClavos.selectedOptions.selected.length; i++) {
          if (id === this.listClavos.selectedOptions.selected[i].value.id) {
            this.listClavos.selectedOptions.selected[i].selected = false;
          }
        }
        this.ordenCajaclavos = this.ordenCajaclavos.filter((cajaclavo: Cajaclavo) => {
          if (id !== cajaclavo.id) {
            return cajaclavo;
          }
        });
        break;
    }
  }

  onSearch(): void {

  }

  onBuscar(): void {

  }

  onNexStep2(): void {
    if (!this.existeProductos()) {
      this.toastr.warning('Por favor registre al menos un producto');
    }
  }

  existeProductos(): boolean {
    if (this.ordenMallas.length > 0) {
      return true;
    }
    if (this.ordenGaviones.length > 0) {
      return true;
    }
    if (this.ordenAlambres.length > 0) {
      return true;
    }
    if (this.ordenCajaclavos.length > 0) {
      return true;
    }
    return false;
  }

  onStore(): void {
    if (confirm(`¿Esta Seguro de Realizar este Pedido por un valor de ${this.pedidoGroup.value.total} Bs.?`)) {
      this.ordenMallas.map((malla: Malla) => {
        if (malla.cantidadSolicitada > malla.cantidad) {
          this.pedidoGroup.patchValue({
            entregado: false
          });
        }
      });
      this.ordenGaviones.map((gavion: Gavion) => {
        if (gavion.cantidadSolicitada > gavion.cantidad) {
          this.pedidoGroup.patchValue({
            entregado: false
          });
        }
      });

      this.ordenAlambres.map((alambre: Alambre) => {
        if (alambre.cantidadSolicitada > alambre.cantidad) {
          this.pedidoGroup.patchValue({
            entregado: false
          });
        }
      });
      this.ordenCajaclavos.map((cajaclavo: Cajaclavo) => {
        if (cajaclavo.cantidadSolicitada > cajaclavo.cantidad) {
          this.pedidoGroup.patchValue({
            entregado: false
          });
        }
      });

      this.pedidoGroup.patchValue({
        cliente_id: this.searchGroup.value.cliente_id
      });

      this.store.dispatch(storePedido({
        data: {
          pedido: this.pedidoGroup.value,
          ordenMallas: this.ordenMallas,
          ordenAlambres: this.ordenAlambres,
          ordenGaviones: this.ordenGaviones,
          ordenCajaclavos: this.ordenCajaclavos,
        }
      }));
      this.router.navigate(['admin/pedidos/index']);
    }
  }

  onCancel(): void {
    if (confirm('¿Está seguro de salir del registro de nuevo Pedido?')) {
      /*this.store.dispatch(irVistaPedido({
        location: 'index'
      }));*/
      this.router.navigate(['admin/pedidos/index']);
    }
  }

}
