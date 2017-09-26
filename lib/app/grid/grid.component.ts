import { Component, OnInit, Input, ContentChildren, ViewChild, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { MdSort, Sort } from '@angular/material';

import { ColumnDirective } from './column.directive';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'instant-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() dataSource: Observable<any>;
  @ContentChildren(ColumnDirective) columns: ColumnDirective[];
  @ViewChild(MdSort) sort: MdSort;
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() filterChange = new EventEmitter<any>();

  _displayedColumns: string[];
  @Input()
  set displayedColumns(v) {
    this._displayedColumns = v;
  }
  get displayedColumns(): string[] {
    if (!this._displayedColumns) {
      this._displayedColumns = (this.columns ? this.columns.map(c => c.name) : null);
    }
    return this._displayedColumns;
  }
  private sortChangedSubscription: Subscription;
  private filterSubscriptions: Subscription[];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sortChangedSubscription = this.sort.sortChange.subscribe(c => this.sortChange.emit(c));
    this.filterSubscriptions = this.columns.map(c => c.filter.subscribe(f => {
      this.filterChange.emit({col: c.name, filter: f});
    }));
  }

  ngOnDestroy() {
    if (this.sortChangedSubscription) {
      this.sortChangedSubscription.unsubscribe();
    }
    if (this.filterSubscriptions && this.filterSubscriptions.length) {
      this.filterSubscriptions.map(f => f.unsubscribe());
    }
  }
}
