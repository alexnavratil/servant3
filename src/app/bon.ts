export class Bon {
  public name: string;
  public price: number;
  public color: string;
  public uuid: string;
  public sortNr: number;

  public constructor(name: string, price: number, color: string, uuid?: string, sortNr?: number) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.uuid = uuid;
    this.sortNr = sortNr;
  }
}
