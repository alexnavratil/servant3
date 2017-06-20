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
  MdSlideToggleModule,
  MdDialogModule,
  MdListModule,
  MdInputModule
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

@NgModule({
  declarations: [
    AppComponent,
    BonComponent,
    DeleteBonDialogComponent,
    CalculatorComponent,
    AddBonComponent,
    SalesDialogComponent,
    SortDialogComponent
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
    MdSlideToggleModule,
    MdDialogModule,
    MdListModule,
    MdInputModule
  ],
  entryComponents: [
    DeleteBonDialogComponent,
    AddBonComponent,
    SalesDialogComponent,
    SortDialogComponent
  ],
  providers: [BonService, SalesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
