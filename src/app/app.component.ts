import {Component, OnInit, ViewChild} from '@angular/core';
import {BonService} from "./bon.service";
import {Bon} from "./bon";
import {MdDialog, MdSlideToggle, MdSlideToggleChange} from "@angular/material";
import {BonChange, BonChangeType, BonMode} from "./bon/bon.component";
import {DeleteBonDialogComponent} from "./delete-bon-dialog/delete-bon-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public bonList: Array<Bon> = null;
  public billMap: Map<Bon, number> = new Map<Bon, number>();
  public addBonMode: boolean = false;

  @ViewChild("editBonToggle")
  private editBonToggle: MdSlideToggle;

  @ViewChild("deleteBonToggle")
  private deleteBonToggle: MdSlideToggle;

  public bonMode: BonMode = BonMode.View;

  get billList(): Array<Bon> {
    return Array.from(this.billMap.keys());
  }

  constructor(private bonService: BonService,
              private dialog: MdDialog){
    this.bonService.list().subscribe(bonList => this.bonList = bonList);
  }

  public stopPropagation(event){
    event.stopPropagation()
  }

  public addToBill(bon: Bon){
    this.billMap.set(bon, this.billMap.has(bon) ? this.billMap.get(bon) + 1 : 1);
  }

  public bonCount(bon: Bon): number {
    return this.billMap.get(bon);
  }

  public bonUUID(_, bon): String {
    return bon.uuid;
  }

  public addBonChanged(event: MdSlideToggleChange){
    this.addBonMode = event.checked;
  }

  public editBonChanged(event: MdSlideToggleChange){
    if(event.checked){
      this.deleteBonToggle.checked = false;
      this.bonMode = BonMode.Edit;
    } else {
      this.bonMode = BonMode.View;
    }
  }

  public deleteBonChanged(event){
    if(event.checked){
      this.editBonToggle.checked = false;
      this.bonMode = BonMode.Remove;
    } else {
      this.bonMode = BonMode.View;
    }
  }

  public deleteBon(bon: Bon){
    let dialogRef = this.dialog.open(DeleteBonDialogComponent);
    dialogRef.componentInstance.bon = bon;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.bonService.remove(bon);
      }
    });
  }

  public bonChange(change: BonChange){
    if(change.type == BonChangeType.Remove){
      this.deleteBon(change.bon);
    } else if(change.type == BonChangeType.AddBill){
      this.addToBill(change.bon);
    }
  }
}
