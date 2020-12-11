export class Alambre {
  constructor(
    public show: boolean,
    public tipoAlambre: string,
    public awg: number,
    public peso: number,
    public precio: number,
    public cantidad: number,
    public foto?: string,
    public descripcion?: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public id?: number) {
  }
}
