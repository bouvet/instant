import { Input, Directive, TemplateRef, ContentChild } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * Column definition for the instant-grid.
 * Defines a set of cells available for a table column.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'instant-column'
})
export class ColumnDirective {
  /** Unique name for this column. */
  @Input() name: string;
  @ContentChild('filter') filterRef: TemplateRef<any>;
  @ContentChild('cell') cellRef: TemplateRef<any>;
  filterOpen: boolean;
  filter = new ReplaySubject<any>();
  filterValue: any;
  private oldFilter: any;

  constructor() { }

  setFilter(obj: any) {
    if (obj !== this.oldFilter) {
      this.filter.next(obj);
      this.filterValue = obj;
      this.oldFilter = obj;
    }
    this.filterOpen = false;
  }
}


