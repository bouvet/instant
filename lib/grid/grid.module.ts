import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule, MatMenuModule
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

    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
  ],
  declarations: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ],
  exports: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ]
})
export class GridModule { }
