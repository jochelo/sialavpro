export class Malla {
  constructor(
    public show: boolean,
    public tipoMalla: string,
    public celda: number,
    public alambre: number,
    public precio: number,
    public m2: boolean,
    public cantidad: number,
    public foto?: string,
    public alto?: number,
    public largo?: number,
    public descripcion?: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public tipo_dimension?: string,
    public cantidadSolicitada?: number,
    public id?: number) {
  }
}
