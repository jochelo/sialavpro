import {
  faArchive,
  faBorderNone,
  faBoxes,
  faBoxOpen,
  faBullseye,
  faCartPlus,
  faClock,
  faDesktop,
  faDollyFlatbed,
  faFile,
  faHandshake,
  faShoppingCart,
  faTools, faTruckLoading,
  faUserClock,
  faUserPlus,
  faUsers,
  faUsersCog,
  faUserTie,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';

export const items = [
  {
    type: 'item',
    icon: faDesktop,
    routerLink: '/admin/dashboard',
    search: 'dashboard',
    label: 'Dashboard',
    urlPermiso: 'dashboard',
    show: true,
  },
  {
    type: 'menu',
    isCollapsed: true,
    icon: faBoxes,
    routerLink: null,
    search: null,
    label: 'Alta Productos',
    urlPermiso: 'alta-productos',
    show: true,
    items: [
      {
        type: 'item',
        routerLink: '/admin/alta-mallas',
        search: 'alta-mallas',
        icon: faBorderNone,
        label: 'Mallas',
        urlPermiso: 'alta-mallas',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-gaviones',
        search: 'alta-gaviones',
        icon: faBoxOpen,
        label: 'Gaviones',
        urlPermiso: 'alta-gaviones',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-alambres',
        search: 'alta-alambres',
        icon: faBullseye,
        label: 'Alambres',
        urlPermiso: 'alta-alambres',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-cajaclavos',
        search: 'alta-cajaclavos',
        icon: faTools,
        label: 'Cajas de Clavos',
        urlPermiso: 'alta-cajaclavos',
        show: true,
      }
    ]
  },
  {
    type: 'menu',
    isCollapsed: true,
    icon: faUserTie,
    routerLink: null,
    search: null,
    label: 'Empleados',
    urlPermiso: 'empleados',
    show: true,
    items: [
      {
        type: 'item',
        icon: faUserPlus,
        routerLink: '/admin/empleados',
        search: 'empleados',
        label: 'Registro Empleados',
        urlPermiso: 'empleados-lista',
        show: true,
      }
    ]
  },
  /*{
    type: 'menu',
    isCollapsed: true,
    icon: faClock,
    routerLink: null,
    search: null,
    label: 'Asistencia',
    urlPermiso: 'asistencia',
    show: true,
    items: [
      {
        type: 'item',
        icon: faUserClock,
        routerLink: '/admin/asistencia/asistencia-create',
        search: 'asistencia-create',
        label: 'Marcar Asistencia',
        urlPermiso: 'asistencia-create',
        show: true,
      }
    ]
  },*/
  {
    type: 'menu',
    isCollapsed: true,
    icon: faUsersCog,
    routerLink: null,
    search: null,
    label: 'Producción',
    urlPermiso: 'produccion',
    show: true,
    items: [
      {
        type: 'item',
        icon: faBorderNone,
        routerLink: '/admin/produccion/produccion-mallas',
        search: 'produccion-mallas',
        label: 'Producción de Mallas',
        urlPermiso: 'produccion-mallas',
        show: true,
      },
      {
        type: 'item',
        icon: faBoxOpen,
        routerLink: '/admin/produccion/produccion-gaviones',
        search: 'produccion-gaviones',
        label: 'Producción Gaviones',
        urlPermiso: 'produccion-gaviones',
        show: true,
      }
    ]
  },
  {
    type: 'menu',
    isCollapsed: true,
    icon: faTruckLoading,
    routerLink: null,
    search: null,
    label: 'Adquisicion',
    urlPermiso: 'adquisicion',
    show: true,
    items: [
      {
        type: 'item',
        icon: faBullseye,
        routerLink: '/admin/adquisicion/adquisicion-alambres',
        search: 'adquisicion-alambres',
        label: 'Adquisición Alambres',
        urlPermiso: 'adquisicion-alambres',
        show: true,
      },
      {
        type: 'item',
        icon: faArchive,
        routerLink: '/admin/adquisicion/adquisicion-cajaclavos',
        search: 'adquisicion-cajaclavos',
        label: 'Adquisición Cajas Clavos',
        urlPermiso: 'adquisicion-cajaclavos',
        show: true,
      }
    ]
  },
  {
    type: 'item',
    icon: faUsers,
    routerLink: '/admin/clientes',
    search: 'clientes',
    label: 'Clientes',
    urlPermiso: 'clientes',
    show: true,
  },
  {
    type: 'menu',
    isCollapsed: true,
    icon: faShoppingCart,
    routerLink: null,
    search: null,
    label: 'Pedidos',
    urlPermiso: 'pedidos',
    show: true,
    items: [
      {
        type: 'item',
        icon: faCartPlus,
        routerLink: '/admin/pedidos/create',
        search: 'pedidos/create',
        label: 'Registrar Pedido',
        urlPermiso: 'pedido-create',
        show: true,
      },
      {
        type: 'item',
        icon: faDollyFlatbed,
        routerLink: '/admin/pedidos/index',
        search: 'pedidos/index',
        label: 'Lista de Pedidos',
        urlPermiso: 'pedido-index',
        show: true,
      }
    ]
  },
  {
    type: 'item',
    icon: faHandshake,
    routerLink: '/admin/reservas',
    search: 'reservas',
    label: 'Reservas',
    urlPermiso: 'reservas',
    show: true,
  },
  {
    type: 'menu',
    isCollapsed: true,
    icon: faFile,
    routerLink: null,
    search: null,
    label: 'Reportes',
    urlPermiso: 'reportes',
    show: true,
    items: [
      {
        type: 'item',
        icon: faWarehouse,
        routerLink: '/admin/reportes/inventarios',
        search: 'reportes/inventarios',
        label: 'Inventario de Productos',
        urlPermiso: 'inventario-reporte',
        show: true,
      }
    ]
  },
];
