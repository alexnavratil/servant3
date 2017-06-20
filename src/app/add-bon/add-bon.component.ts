import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {Bon} from "app/bon";

@Component({
  selector: 'app-add-bon',
  templateUrl: './add-bon.component.html',
  styleUrls: ['./add-bon.component.css']
})
export class AddBonComponent {
  public bon: Bon = new Bon("", 0.00, "black");
  public editMode: boolean = false;

  constructor(public dialogRef: MdDialogRef<AddBonComponent>,
              @Inject(MD_DIALOG_DATA) public editBon: Bon) {
    if(editBon) {
      this.bon = editBon;
      this.editMode = true;
    }
  }
}
