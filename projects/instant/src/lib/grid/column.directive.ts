import { Input, Directive, TemplateRef, ContentChild, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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
  @Input() filterable = true;
  @Input() sortable = true;
  @Input() sticky = false;
  @Input('instant-style') instantStyle = {};

  // Template refs
  @ContentChild('filter') filterRef: TemplateRef<any>;
  @ContentChild('cell') cellRef: TemplateRef<any>;


  // Filter properties
  filterOpen: boolean;
  filter = new ReplaySubject<ColumnFilter>();
  filterValue: any;
  oldFilter: any;

  /**
   *
   */
  constructor() { }

  ngOnInit() {
    if (this.label == null) {
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
  setFilter(obj: any, noEmit: boolean = false) {
    if ((obj !== this.oldFilter) || (obj === null)) {
      if (!noEmit) {
        this.filter.next({active: this.name, filter: obj});
      }
      this.filterValue = obj;
      this.oldFilter = obj;
    }
    this.filterOpen = false;
  }

  removeFilter() {
    this.setFilter(null);
  }
}


