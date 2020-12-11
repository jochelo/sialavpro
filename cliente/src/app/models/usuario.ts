export class Usuario {
  constructor(
  public nombre: string,
  public email: string,
  public cuenta: string,
  public password: string,
  public rol_id: number,
  public foto?: string,
  public id?: number) {}
}
