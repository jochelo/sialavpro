export class Cliente {
  constructor(
    public show: boolean,
    public nombres: string,
    public apellidos: string,
    public direccion: string,
    public celular: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public id?: number) {
  }
}
