import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  private num: string = "";

  @Output()
  public change: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public type(num: number) {
    this.num+=num;
    this.change.next(this.num);
  }

  public delete() {
    this.num = this.num.substr(0, this.num.length-1);
    this.change.next(this.num);
  }

  public comma() {
    if(this.num.includes(".")) {
      return;
    } else {
      this.num += ".";
      this.change.next(this.num);
    }
  }

  public reset() {
    this.num = "";
    this.change.next(this.num);
  }

}
