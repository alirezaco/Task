export class BaseResponse {
  public id: string;

  public createAt: number | any;

  public updateAt: number | any;

  constructor(initial?: Partial<BaseResponse>) {
    this.id = initial.id;
    this.createAt = initial.createAt.low;
    this.updateAt = initial.updateAt.low;
  }
}
