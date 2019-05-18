import 'element-closest';
import {
  Component,
  Input,
  ContentChildren,
  ViewChild,
  OnDestroy,
  AfterContentInit,
  HostListener,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { MatSort, MatMenuTrigger } from '@angular/material';
import { Subscription, merge } from 'rxjs';

import { InstantDataSource } from './datasource';
import { ColumnDirective } from './column.directive';

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
  @Input() selectedIndex: number;
  @Input() sticky: boolean;
  @Input() rowAttributes: Array<any>;
  @ContentChildren(ColumnDirective) columns: ColumnDirective[];
  @Output() rowClicked = new EventEmitter<RowClickEvent>();
  @ViewChild(MatSort) sort: MatSort;

  _displayedColumns: string[];
  @Input()
  set displayedColumns(v) {
    this._displayedColumns = v;
  }
  get displayedColumns(): string[] {
    return (this._displayedColumns =
      this._displayedColumns ||
      (this.columns ? this.columns.map(c => c.name) : null));
  }
  private subscriptions: Subscription[];

  constructor(public elRef: ElementRef) {}

  ngAfterContentInit() {
    if (this.columns && this.columns.length) {
      this.dataSource.db._configure({
        sortChange: this.sort.sortChange,
        filterChange: merge(...this.columns.map(c => c.filter))
      });
    }
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length) {
      this.subscriptions.map(f => f.unsubscribe());
    }
  }

  onRowClicked(row, $event) {
    if ($event.target.closest('instant-grid-row-menu') === null) {
      const cellName = [].slice
        .call($event.target.closest('td').classList)
        .find(c => c.indexOf('mat-column-') > -1)
        .substr('mat-column-'.length);

      this.rowClicked.emit({ data: row, colName: cellName });
    }
  }

  @HostListener('document:click', ['$event'])
  onClick($event) {
    const headersToClose: string[] = [].slice
      // Find all header cells
      .call(this.elRef.nativeElement.querySelectorAll('th'))
      // Filter away current target
      .filter(b => !b.contains($event.target))
      // Get the name of the column
      .map(b =>
        [].slice
          .call(b.classList)
          .find(c => c.indexOf('mat-column-') > -1)
          .substr('mat-column-'.length)
      );

    // If any columns (not including current target) is marked as open close it.
    this.columns
      .filter(c => headersToClose.includes(c.name))
      .forEach(c => (c.filterOpen = false));
  }

  checkClose($event: KeyboardEvent, menuTrigger: MatMenuTrigger) {
    if ($event.key === 'Enter') {
      menuTrigger.closeMenu();
    }
  }

  onFilterChange($event, col) {
    col.setFilter($event.target.value);
  }

  getFilterValue(col) {
    if (col.filterValue !== undefined) {
      if (typeof col.filterValue === 'object') {
        return col.filterValue.key;
      }
      return col.filterValue;
    }
    return '';
  }

  getRowClasses(index: number) {
    let classes: string[] = [];

    if (index === this.selectedIndex) {
      classes.push('highlight');
    }

    if (this.rowAttributes && this.rowAttributes.length > 0) {
      const attr = this.rowAttributes;
      for (let i = 0; i < attr.length; i++) {
        if (attr[i]['index'] === index) {
          if (attr[i]['class'] && attr[i]['class'].length > 0) {
            classes = classes.concat(attr[i]['class']);
          }
        }
      }
    }
    return classes.join(' ');
  }

  getRowStyles(index: number) {
    let styles: string[] = [];

    if (this.rowAttributes && this.rowAttributes.length > 0) {
      const attr = this.rowAttributes;
      for (let i = 0; i < attr.length; i++) {
        if (attr[i]['index'] === index) {
          if (attr[i]['style'] && attr[i]['style'].length > 0) {
            styles = styles.concat(attr[i]['style']);
          }
        }
      }
    }
    return styles.join(' ');
  }

  removeFilters() {
    this.columns.forEach(col => {
      col.removeFilter();
    });
  }

  reload() {
    this.columns.forEach((col, index) => {
      if (index == 0) {
        col.setFilter(undefined);
      } else return;
    });
  }
}
