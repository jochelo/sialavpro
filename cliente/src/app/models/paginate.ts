export class Paginate {
  constructor(public current_page: number,
              public from: number,
              public last_page: number,
              public per_page: string,
              public to: number,
              public total: number,
              public pages: number[]) {
  }
}
