export class AdquisicionCajaclavo {
  constructor(
    public show: boolean,
    public fecha: string,
    public cantidad: number,
    public cajaclavo_id: number,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public tipo_dimension?: string,
    public change?: boolean,
    public id?: number) {
  }
}
