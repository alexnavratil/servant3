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
  MdListModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BonService} from "./bon.service";
import {BonComponent} from './bon/bon.component';
import { DeleteBonDialogComponent } from './delete-bon-dialog/delete-bon-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BonComponent,
    DeleteBonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
    MdCardModule,
    MdSlideToggleModule,
    MdDialogModule,
    MdListModule
  ],
  entryComponents: [
    DeleteBonDialogComponent
  ],
  providers: [BonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
