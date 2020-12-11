import {
  faBorderNone,
  faBoxes,
  faBoxOpen,
  faBullseye, faClock,
  faDesktop, faHandshake, faShoppingCart,
  faTools, faUserClock, faUserCog,
  faUserPlus,
  faUsers,
  faUsersCog, faUserTie
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
    label: 'Alta de Productos',
    urlPermiso: 'alta-productos',
    show: true,
    items: [
      {
        type: 'item',
        routerLink: '/admin/alta-mallas',
        search: 'alta-mallas',
        icon: faBorderNone,
        label: 'Alta de Mallas',
        urlPermiso: 'alta-mallas',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-gaviones',
        search: 'alta-gaviones',
        icon: faBoxOpen,
        label: 'Alta de Gaviones',
        urlPermiso: 'alta-gaviones',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-alambres',
        search: 'alta-alambres',
        icon: faBullseye,
        label: 'Alta de Alambres',
        urlPermiso: 'alta-alambres',
        show: true,
      },
      {
        type: 'item',
        routerLink: '/admin/alta-cajaclavos',
        search: 'alta-cajaclavos',
        icon: faTools,
        label: 'Alta Cajas Clavos',
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
  {
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
  },
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
    type: 'item',
    icon: faUsers,
    routerLink: '/admin/clientes',
    search: 'clientes',
    label: 'Clientes',
    urlPermiso: 'clientes',
    show: true,
  },
  {
    type: 'item',
    icon: faShoppingCart,
    routerLink: '/admin/pedidos',
    search: 'pedido',
    label: 'Pedidos',
    urlPermiso: 'pedidos',
    show: true,
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
];
