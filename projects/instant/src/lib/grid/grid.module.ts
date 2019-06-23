import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatTableModule, MatSortModule, MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatPaginatorModule,
  MatMenuModule, MatRadioModule, MatDatepickerModule
} from '@angular/material';

import { GridComponent } from './grid.component';
import { ColumnDirective } from './column.directive';
import { GridToolbarComponent } from './toolbar/grid-toolbar.component';
import { GridRowMenuComponent } from './row-menu/grid-row-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDatepickerModule,
  ],
  declarations: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ],
  exports: [ GridComponent, ColumnDirective, GridToolbarComponent, GridRowMenuComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GridModule { }
