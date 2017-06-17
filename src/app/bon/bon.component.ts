import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Bon} from "../bon";

@Component({
  selector: 'app-bon',
  templateUrl: './bon.component.html',
  styleUrls: ['./bon.component.css']
})
export class BonComponent {
  @Input()
  public bon: Bon;

  @Input()
  public mode: BonMode = BonMode.View;

  public BonMode = BonMode;

  @Output()
  public change: EventEmitter<BonChange> = new EventEmitter<BonChange>();

  constructor() { }

  public delete(){
    this.change.emit(new BonChange(BonChangeType.Remove, this.bon));
  }

  public addToBill(){
    this.change.emit(new BonChange(BonChangeType.AddBill, this.bon));
  }

}

export class BonChange {
  public type: BonChangeType;
  public bon: Bon;

  constructor(type: BonChangeType, bon: Bon){
    this.type = type;
    this.bon = bon;
  }
}

export enum BonChangeType {
  Edit, Remove, AddBill
}

export enum BonMode {
  View, Edit, Remove
}
