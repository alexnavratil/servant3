import { Component, OnInit } from '@angular/core';
import {BonService} from "../bon.service";
import {Bon} from "../bon";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sort-dialog.component.html',
  styleUrls: ['./sort-dialog.component.css']
})
export class SortDialogComponent implements OnInit {
  public bonList: Array<Bon> = null;

  constructor(private bonService: BonService,
              private dialogRef: MdDialogRef<SortDialogComponent>) { }

  ngOnInit() {
    this.dialogRef.updateSize("700px", "auto");

    this.bonService.list().subscribe(bonMap => {
      this.bonList = [];
      bonMap.forEach(b => this.bonList.push(b));

      this.sortBons();

      this.bonList.forEach((bon, index) => {
        bon.sortNr = index;
      });
    });
  }

  private sortBons(){
    this.bonList = this.bonList.sort((a, b) => {
      if(a.sortNr == null && b.sortNr == null) {
        return 0;
      } else if(a.sortNr == null){
        return 1;
      } else if(b.sortNr == null){
        return -1;
      } else {
        return a.sortNr - b.sortNr;
      }
    });
  }

  public up(bon: Bon) {
    if(bon.sortNr > 0) {
      let newSortNr = bon.sortNr - 1;
      this.bonList[newSortNr].sortNr = bon.sortNr;
      bon.sortNr = newSortNr;

      this.sortBons();
    }
  }

  public down(bon: Bon) {
    if(bon.sortNr < (this.bonList.length - 1)) {
      let newSortNr = bon.sortNr + 1;
      this.bonList[newSortNr].sortNr = bon.sortNr;
      bon.sortNr = newSortNr;

      this.sortBons();
    }
  }

  public save() {
    this.bonService.batchEdit(this.bonList);
    this.dialogRef.close();
  }

}
