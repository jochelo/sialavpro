export class Gavion {
  constructor(
    public show: boolean,
    public tipoGavion: string,
    public alto: number,
    public ancho: number,
    public largo: number,
    public alambre: number,
    public celda: number,
    public numeroDiafragma: number,
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
