export class ImportePedido {
  constructor(
    public show: boolean,
    public pedido_id?: number,
    public importe?: number,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public id?: number) {
  }
}
