export class Reserva {
  constructor(
    public show: boolean,
    public nombre: string,
    public celular: string,
    public detalle: string,
    public recepcionado: boolean,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public id?: number) {
  }
}
