export class Empleado {
  constructor(
    public show: boolean,
    public nombres: string,
    public apellidos: string,
    public celular: string,
    public carnet: string,
    public rolEmpleado: string,
    public foto?: string,
    public direccion?: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public nombre_compledo_ci?: string,
    public id?: number) {
  }
}
