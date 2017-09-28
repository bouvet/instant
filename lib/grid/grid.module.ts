import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdTableModule, MdSortModule, MdInputModule, MdCardModule, MdButtonModule, MdToolbarModule, MdPaginatorModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { FormsModule } from '@angular/forms';
import { GridToolbarComponent } from './toolbar/grid-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MdTableModule,
    MdSortModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdPaginatorModule,
    FormsModule
  ],
  declarations: [
    GridComponent,
    ColumnDirective,
    GridToolbarComponent
  ],
  exports: [
    GridComponent,
    ColumnDirective,
    GridToolbarComponent
  ]
})
export class GridModule { }
