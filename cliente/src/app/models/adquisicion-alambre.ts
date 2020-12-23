export class AdquisicionAlambre {
  constructor(
    public show: boolean,
    public fecha: string,
    public cantidad: number,
    public alambre_id: number,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public tipo_alambre_awg?: string,
    public change?: boolean,
    public id?: number) {
  }
}
