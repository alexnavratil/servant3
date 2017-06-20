import {Component, Inject, OnInit} from '@angular/core';
import {Bon} from "../bon";
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-delete-bon-dialog',
  templateUrl: './delete-bon-dialog.component.html',
  styleUrls: ['./delete-bon-dialog.component.css']
})
export class DeleteBonDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public bon: Bon) { }

}
