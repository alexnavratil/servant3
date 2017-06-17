export class Bon {
  public name: String;
  public price: number;
  public color: String;
  public uuid: String;

  public constructor(name: String, price: number, color: String, uuid?: String) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.uuid = uuid;
  }
}
