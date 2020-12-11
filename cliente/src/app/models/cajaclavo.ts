export class Cajaclavo {
  constructor(
    public show: boolean,
    public tipoClavo: string,
    public longitud: string,
    public bwg: number,
    public precio: number,
    public numeroBolsas: number,
    public cantidad: number,
    public foto?: string,
    public descripcion?: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public id?: number) {
  }
}
