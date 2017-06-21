import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bon} from "../bon";

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent {
  @Input()
  public bon: Bon;

  @Input()
  public count: number;

  @Output()
  public onReduce: EventEmitter<any> = new EventEmitter();

  constructor() { }

  public format(num: number): string {
    return Number(num).toFixed(2);
  }

}
