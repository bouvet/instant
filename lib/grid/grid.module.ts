import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdTableModule, MdSortModule, MdInputModule, MdCardModule, MdButtonModule, MdToolbarModule, MdPaginatorModule
} from '@angular/material';

import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { GridToolbarComponent } from './toolbar/grid-toolbar.component';
import { GridRowMenuComponent } from './row-menu/grid-row-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    BrowserAnimationsModule,

    MdTableModule,
    MdSortModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdPaginatorModule,
  ],
  declarations: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ],
  exports: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ]
})
export class GridModule { }
