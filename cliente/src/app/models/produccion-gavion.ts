import {Empleado} from './empleado';

export class ProduccionGavion {
  constructor(
    public show: boolean,
    public fecha: string,
    public cantidad: number,
    public concluido: boolean,
    public gavion_id: number,
    public cupo?: number,
    public desperdicio?: number,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public tipo_gavion?: string,
    public dimension?: string,
    public empleados_nombre_completo?: Empleado[],
    public change?: boolean,
    public id?: number) {
  }
}
