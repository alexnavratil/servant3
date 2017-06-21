import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import 'hammerjs';
import {
  MdToolbarModule,
  MdIconModule,
  MdMenuModule,
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdListModule,
  MdInputModule,
  MdCheckboxModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BonService} from "./bon.service";
import {BonComponent} from './bon/bon.component';
import { DeleteBonDialogComponent } from './delete-bon-dialog/delete-bon-dialog.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CalculatorComponent } from './calculator/calculator.component';
import { AddBonComponent } from './add-bon/add-bon.component';
import {FormsModule} from "@angular/forms";
import {SalesService} from "./sales.service";
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SortDialogComponent } from './sort-dialog/sort-dialog.component';
import { BillItemComponent } from './bill-item/bill-item.component';
import { ExportDialogComponent } from './export-dialog/export-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BonComponent,
    DeleteBonDialogComponent,
    CalculatorComponent,
    AddBonComponent,
    SalesDialogComponent,
    SortDialogComponent,
    BillItemComponent,
    ExportDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdListModule,
    MdInputModule,
    MdCheckboxModule
  ],
  entryComponents: [
    DeleteBonDialogComponent,
    AddBonComponent,
    SalesDialogComponent,
    SortDialogComponent,
    ExportDialogComponent
  ],
  providers: [BonService, SalesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
