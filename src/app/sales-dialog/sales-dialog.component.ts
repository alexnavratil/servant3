import {Component, OnInit} from '@angular/core';
import {SalesService} from "../sales.service";
import {Bon} from "../bon";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.css']
})
export class SalesDialogComponent implements OnInit {
  public salesResult: Array<[Bon, number, number]> = [];

  public get totalSales(): number {
    var sum = 0;
    this.salesResult.forEach(tuple => {
      sum += tuple[2];
    });

    return sum;
  }

  constructor(private salesService: SalesService,
              private dialogRef: MdDialogRef<SalesDialogComponent>) {
    this.salesResult = salesService.salesResult();
  }

  ngOnInit(): void {
    this.dialogRef.updateSize("700px", "auto");
  }

  public format(num: number): string {
    return new Number(num).toFixed(2);
  }

  public resetSales(){
    this.salesService.reset();
    this.salesResult = this.salesService.salesResult();
  }

}
