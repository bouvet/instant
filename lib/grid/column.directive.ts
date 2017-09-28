import { Input, Directive, TemplateRef, ContentChild, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 *
 */
export interface ColumnFilter {
  active: string;
  filter: any;
}

/**
 * Column definition for the instant-grid.
 * Defines a set of cells and optional filters available for a table column.
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'instant-column'
})
export class ColumnDirective implements OnInit {
  // Inputs
  @Input() name: string;  // Unique identifier for this column.
  @Input() label: string; // Defaults to the identifier of column

  // Template refs
  @ContentChild('filter') filterRef: TemplateRef<any>;
  @ContentChild('cell') cellRef: TemplateRef<any>;

  // Filter properties
  filterOpen: boolean;
  filter = new ReplaySubject<ColumnFilter>();
  filterValue: any;
  private oldFilter: any;

  /**
   *
   */
  constructor() { }

  ngOnInit() {
    if (!this.label) {
      this.label = this.name;
    }
  }

  /**
   * This method is invoked directly from the filter template.
   * Any custom implementation of a column filter, must fire this
   * method when user has made choices.
   *
   * @param obj The filter as received from the filter template
   */
  setFilter(obj: any) {
    if (obj !== this.oldFilter) {
      this.filter.next({active: this.name, filter: obj});
      this.filterValue = obj;
      this.oldFilter = obj;
    }
    this.filterOpen = false;
  }
}


