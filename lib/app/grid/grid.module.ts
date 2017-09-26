import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTableModule, MdSortModule, MdInputModule, MdCardModule, MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MdTableModule,
    MdSortModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    FormsModule
  ],
  declarations: [
    GridComponent,
    ColumnDirective
  ],
  exports: [
    GridComponent,
    ColumnDirective
  ]
})
export class GridModule { }
