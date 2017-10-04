import {
  Component, Input, ViewChildren, ContentChildren, ViewChild, OnDestroy, AfterContentInit, HostListener,
  ElementRef, QueryList, EventEmitter, Output
} from '@angular/core';
import { MdSort, Sort } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/merge';

import { InstantDatabase, InstantDataSource } from './datasource';
import { ColumnFilter, ColumnDirective } from './column.directive';

export interface RowClickEvent {
  data: any;
  colName: string;
}
@Component({
  selector: 'instant-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterContentInit, OnDestroy {
  @Input() dataSource: InstantDataSource<any>;
  @ContentChildren(ColumnDirective) columns: ColumnDirective[];
  @Output() rowClicked = new EventEmitter<RowClickEvent>();
  @ViewChild(MdSort) sort: MdSort;

  _displayedColumns: string[];
  @Input()
  set displayedColumns(v) { this._displayedColumns = v; }
  get displayedColumns(): string[] {
    return this._displayedColumns = this._displayedColumns || (this.columns ? this.columns.map(c => c.name) : null);
  }
  private filterSubscriptions: Subscription[];

  constructor(private elRef: ElementRef) { }

  ngAfterContentInit() {
    if (this.columns && this.columns.length) {
      this.dataSource.db._configure({
        sortChange: this.sort.sortChange,
        filterChange: Observable.merge(...this.columns.map(c => c.filter))
      });
    }
  }

  ngOnDestroy() {
    if (this.filterSubscriptions && this.filterSubscriptions.length) {
      this.filterSubscriptions.map(f => f.unsubscribe());
    }
  }

  onRowClicked(row, $event) {
    const cellName = [].slice.call($event.target.closest('md-cell').classList)
      .find(c => c.indexOf('mat-column-') > -1)
      .substr('mat-column-'.length);

    this.rowClicked.emit({data: row, colName: cellName});
  }

  @HostListener('document:click', ['$event'])
  onClick($event) {
    const headersToClose: string[] = [].slice
      // Find all header cells
      .call(this.elRef.nativeElement.querySelectorAll('md-header-cell'))
      // Filter away current target
      .filter(b => !b.contains($event.target))
      // Get the name of the column
      .map(b => [].slice.call(b.classList).find(c => c.indexOf('mat-column-') > -1).substr('mat-column-'.length));

    // If any columns (not including current target) is marked as open close it.
    this.columns.filter(c => headersToClose.includes(c.name)).forEach(c => c.filterOpen = false);
  }
}
