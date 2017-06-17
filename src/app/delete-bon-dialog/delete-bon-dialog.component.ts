import { Component, OnInit } from '@angular/core';
import {Bon} from "../bon";

@Component({
  selector: 'app-delete-bon-dialog',
  templateUrl: './delete-bon-dialog.component.html',
  styleUrls: ['./delete-bon-dialog.component.css']
})
export class DeleteBonDialogComponent {
  public bon: Bon;

  constructor() { }

}
