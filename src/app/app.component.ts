import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BonService} from "./bon.service";
import {Bon} from "./bon";
import {MdCheckbox, MdDialog, MdSlideToggleChange} from "@angular/material";
import {BonChange, BonChangeType, BonMode} from "./bon/bon.component";
import {DeleteBonDialogComponent} from "./delete-bon-dialog/delete-bon-dialog.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {AddBonComponent} from "./add-bon/add-bon.component";
import {SalesService} from "./sales.service";
import {SalesDialogComponent} from "./sales-dialog/sales-dialog.component";
import {SortDialogComponent} from "./sort-dialog/sort-dialog.component";
import {ExportDialogComponent} from "./export-dialog/export-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public bonMap: Map<string, Bon> = null;
  public bonList: Array<Bon> = [];

  public billMap: Map<string, number> = new Map<string, number>();
  public addBonMode: boolean = false;

  @ViewChild("editBonToggle")
  private editBonToggle: MdCheckbox;

  @ViewChild("deleteBonToggle")
  private deleteBonToggle: MdCheckbox;

  @ViewChild(CalculatorComponent)
  private calculatorComponent: CalculatorComponent;

  public calculatorResult: string = "0.00€";
  private calculatorResultNum: number = 0;

  public returnMoney: number = 0;
  public totalResult: number = 0;

  public recalculateReturnMoney() {
    this.returnMoney = this.calculatorResultNum - this.totalResult;
  }

  public bonMode: BonMode = BonMode.View;

  public billList: Array<Bon> = [];

  constructor(private bonService: BonService,
              private salesService: SalesService,
              private dialog: MdDialog,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.bonService.list().subscribe(bonMap => {
      this.bonMap = bonMap;
      this.regenerateBonList();
    });
  }

  private regenerateBonList() {
    this.bonList = [];

    this.bonMap.forEach(bon => this.bonList.push(bon));

    this.sortBons();
    this.changeDetectorRef.markForCheck();
  }

  public stopPropagation(event) {
    event.stopPropagation()
  }

  public addToBill(bon: Bon) {
    let currentCount = this.billMap.get(bon.uuid);
    if (currentCount) {
      this.billMap.set(bon.uuid, currentCount + 1);
    } else {
      this.billList.push(bon);
      this.billMap.set(bon.uuid, 1);
    }

    this.recalculateTotalResult()
  }

  public reduceBon(bon: Bon) {
    let currentCount = this.billMap.get(bon.uuid);
    if (--currentCount == 0) {
      this.billMap.delete(bon.uuid);
      this.billList = this.billList.filter(b => b.uuid != bon.uuid);
    } else {
      this.billMap.set(bon.uuid, currentCount);
    }

    this.recalculateTotalResult();
  }

  public bonUUID(_, bon): string {
    return bon.uuid;
  }

  public billUUID = (_, bon) => {
    return this.billMap.get(bon.uuid) + bon.uuid;
  };

  public addBonChanged(event: MdSlideToggleChange) {
    this.addBonMode = event.checked;
  }

  public editBonChanged(event: MdSlideToggleChange) {
    if (event.checked) {
      this.deleteBonToggle.checked = false;
      this.bonMode = BonMode.Edit;
    } else {
      this.bonMode = BonMode.View;
    }
  }

  public deleteBonChanged(event) {
    if (event.checked) {
      this.editBonToggle.checked = false;
      this.bonMode = BonMode.Remove;
    } else {
      this.bonMode = BonMode.View;
    }
  }

  public deleteBon(bon: Bon) {
    let dialogRef = this.dialog.open(DeleteBonDialogComponent, {
      data: bon
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonService.remove(bon);
        this.salesService.removeBon(bon);
      }
    });
  }

  public bonChange(change: BonChange) {
    if (change.type == BonChangeType.AddBill) {
      this.addToBill(change.bon);
    } else if (change.type == BonChangeType.Remove) {
      this.deleteBon(change.bon);
    } else if (change.type == BonChangeType.Edit) {
      this.editBon(change.bon);
    }
  }

  public calculatorChange(change: string) {
    if (change != "") {
      this.calculatorResult = (change != "" ? change : "0.00") + "€";
      this.calculatorResultNum = parseFloat(change);
    } else {
      this.calculatorResult = "0.00€";
      this.calculatorResultNum = 0.0;
    }

    this.recalculateReturnMoney();
  }

  public addBon() {
    let dialogRef = this.dialog.open(AddBonComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonService.add(result)
      }
    });
  }

  public editBon(bon: Bon) {
    let dialogRef = this.dialog.open(AddBonComponent, {
      data: bon
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bonService.edit(result);
      }
    });
  }

  public recalculateTotalResult() {
    var total = 0;
    this.billMap.forEach((count, bonUUID) => {
      total += this.bonMap.get(bonUUID).price * count;
    });

    this.totalResult = total;

    this.recalculateReturnMoney();
  }

  public format(num: number): string {
    return Number(num).toFixed(2);
  }

  public reset() {
    this.billMap = new Map<string, number>();
    this.calculatorComponent.reset();
    this.recalculateTotalResult();
    this.billList = [];
  }

  public pay() {
    this.salesService.add(this.billMap);
    this.reset();
  }

  public revert() {
    this.salesService.revert(this.billMap);
    this.reset();
  }

  public import() {
    let importPrompt = prompt("Bitte die Importdaten in das Eingabefeld kopieren.");

    if (importPrompt != null && importPrompt != "") {
      this.bonService.import(importPrompt);
      alert("Data imported!");
    }
  }

  public export() {
    let dialogRef = this.dialog.open(ExportDialogComponent, {
      data: this.bonService.export()
    });
  }

  public openSalesDialog() {
    this.dialog.open(SalesDialogComponent);
  }

  public openSortDialog() {
    this.dialog.open(SortDialogComponent);
  }

  private sortBons() {
    this.bonList = this.bonList.sort((a, b) => {
      if (a.sortNr == null && b.sortNr == null) {
        return 0;
      } else if (a.sortNr == null) {
        return 1;
      } else if (b.sortNr == null) {
        return -1;
      } else {
        return a.sortNr - b.sortNr;
      }
    });
  }

  private enableFullscreen() {
    let elem = document.getElementsByTagName("body")[0];

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  private leaveFullscreen(){
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (typeof(document.webkitCancelFullScreen) === "function") {
      document.webkitCancelFullScreen();
    }
  }

  public toggleFullscreen(){
    if(this.isFullscreen){
      this.leaveFullscreen();
    } else {
      this.enableFullscreen();
    }
  }

  public get isFullscreen(): boolean {
    return document.webkitIsFullScreen
  }
}
