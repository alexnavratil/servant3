import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.css']
})
export class ExportDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public json: string) { }

}
