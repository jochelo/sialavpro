export class Pedido {
  constructor(
    public show: boolean,
    public fecha: string,
    public fecha_entrega: string,
    public total: number,
    public cancelado: number,
    public entregado: boolean,
    public cliente_id?: number,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    public nombre_cliente?: string,
    public lista_productos?: any[],
    public id?: number) {
  }
}
